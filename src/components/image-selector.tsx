import React, { useState } from "react";

const ImageSelectors: React.FC<{ images: string[] }> = (props) => {
  const [selectedImage, setSelectedImage] = useState<string>(props.images[0]);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="flex flex-row flex-wrap w-full justify-end mb-2 gap-x-1 gap-y-1">
        {props.images.map((image) => {
          return (
            <div key={image} className="flex relative h-12 w-12">
              <img
                onClick={() => {
                  setSelectedImage(image);
                }}
                src={`http://localhost:8080/images/${image}`}
                alt="pet-accessory"
                className="h-12 w-12 object-cover border border-solid border-white cursor-pointer"
              />
              {selectedImage === image && (
                <div className="absolute h-12 w-12 bg-black bg-opacity-70"></div>
              )}
            </div>
          );
        })}
      </div>
      <img
        className="rounded-lg object-cover w-full h-44 md:h-96"
        src={`http://localhost:8080/images/${selectedImage}`}
        alt="paws-nepal"
      ></img>
    </div>
  );
};

export default ImageSelectors;
