import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import ThePulseLoader from '../../components/pulse-loader';
import "../../styles/scan-image.css";
import toast from "react-hot-toast";
import ProductItem from '../home/product_item';

const ScanImage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showGlowingEffect, setShowGlowingEffect] = useState<boolean>(false);
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
    const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCameraClick = () => {
        setIsCameraOpen(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                })
                .catch((err) => {
                    console.error('Error accessing camera:', err);
                });
        }
    };

    const handleCapturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            const width = videoRef.current.videoWidth;
            const height = videoRef.current.videoHeight;
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            context?.drawImage(videoRef.current, 0, 0, width, height);
            const dataUrl = canvasRef.current.toDataURL('image/png');
            setImagePreview(dataUrl);
            setIsCameraOpen(false);

            if (streamRef.current) {
                const tracks = streamRef.current.getTracks();
                tracks.forEach(track => track.stop());
                streamRef.current = null;
            }
        }
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile && !imagePreview) {
            toast.error('Please select or capture a photo to continue.');
        } else {
            setRecommendedProducts([]);
            setLoading(true);
            setShowGlowingEffect(true);

            const formData = new FormData();
            if (selectedFile) {
                formData.append('file', selectedFile);
            } else if (imagePreview) {
                const response = await fetch(imagePreview);
                const blob = await response.blob();
                formData.append('file', new File([blob], 'captured-image.png'));
            }

            try {
                const response = await fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setPrediction(result.prediction);

                const thePrediction = `${result.prediction.toUpperCase()} SKIN`
                // Fetch recommended products based on prediction
                const productsResponse = await fetch(`http://localhost:8080/products/recommendations/${thePrediction}?page=1`);
                if (!productsResponse.ok) {
                    throw new Error('Failed to fetch recommended products');
                }
                const productsData = await productsResponse.json();
                setRecommendedProducts(productsData.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
                setShowGlowingEffect(false);
            }
        }
    };

    const scrollRef = useRef(0);

    useEffect(() => {
        window.scrollTo(0, scrollRef.current);
    }, []);

    return (
        <div className="relative flex flex-col justify-center items-center">
            <form
                className="shadow-md rounded-lg p-6 w-full max-w-md relative"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Analyze Skin</h1>

                <div className="flex justify-around mb-4">
                    <button
                        type="button"
                        onClick={handleCameraClick}
                        className="text-purple-500 font-semibold"
                    >
                        Capture from Camera
                    </button>
                </div>

                <div
                    className="border-2 border-dashed border-purple-500 p-6 flex flex-col justify-center items-center cursor-pointer rounded-md relative"
                    onClick={() => !isCameraOpen && handleUploadClick()} // Ensure file input only triggers when the camera is not open
                >
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="text-center">
                        {imagePreview && (
                            <div className="relative mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Selected Preview"
                                    className="max-w-full h-auto rounded-md"
                                />
                                {showGlowingEffect && (
                                    <div className="absolute inset-0 glowing-effect"></div>
                                )}
                            </div>
                        )}

                        {isCameraOpen && (
                            <>
                                <video ref={videoRef} className="w-full max-w-full h-auto"></video>
                                <button
                                    type="button"
                                    onClick={handleCapturePhoto}
                                    className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md"
                                >
                                    Capture Photo
                                </button>
                                <canvas ref={canvasRef} className="hidden"></canvas>
                            </>
                        )}

                        {!isCameraOpen && !imagePreview && (
                            <FontAwesomeIcon icon={faCamera} className='text-purple-700 text-4xl' />
                        )}

                        <p className="text-gray-500">
                            {selectedFile ? selectedFile.name : 'Click or Drag an image here'}
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`mt-6 w-full text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 ${loading ? 'bg-gray-500' : 'bg-purple-500'}`}
                >
                    {loading ? <ThePulseLoader color='white' /> : 'Submit'}
                </button>

                {prediction && (
                    <div className="mt-4 text-center text-gray-700 tracking-wide">
                        <p>Prediction: <span className='font-semibold text-purple-900'>{prediction.toUpperCase()} SKIN</span></p>
                    </div>
                )}
            </form>
            {(!loading && recommendedProducts.length === 0) && <p className='mt-8 tracking-wide'> No recommended products.</p>}
            {(!loading && recommendedProducts.length > 0) && (
                <div className="mt-6 w-full">
                    <h2 className="text-xl font-bold mb-4 text-center">Recommended Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recommendedProducts.map((product: any, index: number) => (
                            <ProductItem
                                key={product.id}
                                product={{
                                    id: product._id,
                                    brand: product.brand,
                                    category: product.category,
                                    name: product.name,
                                    images: product.images,
                                    price: product.price,
                                    description: product.description,
                                    availableQuantity: product.quantityAvailable,
                                    rating: product.rating,
                                    totalReviews: product.totalReviews,
                                    skinType: product.skinType,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanImage;