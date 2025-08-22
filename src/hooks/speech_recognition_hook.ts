import { useEffect, useState } from "react";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setText(event.results[0][0].transcript);
      console.log("on result: ", event);
      stopListening();
    };
  }, []);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  const setTextValue = (typedText: string) => {
    setText(typedText);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setError(null);
      setData(null);
      try {
        const response = await fetch(
          `http://localhost:8080/products/products-by-search?name=${text}&filterBy=dsc&minPrice=${0}&maxPrice=${25000}&page=${1}&instockFilter=all`
        );
        const data = await response.json();

        console.log(response.status);
        console.log(data);

        if (response.status === 200) {
          console.log("Data fetched.");
          setData(data);
        } else {
          console.log("Error while fetching.");
          const error = new Error(data.message);
          setError(error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [text]);

  return {
    isLoading,
    error,
    data,
    text,
    isListening,
    startListening,
    hasRecognitionSupport: !!recognition,
    setTextValue,
  };
};

export default useSpeechRecognition;
