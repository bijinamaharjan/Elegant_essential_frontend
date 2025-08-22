import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "../styles/home.css";
import { useAppSelector } from "../hooks/hooks";
import toast from "react-hot-toast";

const WriteReview: React.FC<{
  id: string;
  showWriteReview: boolean;
  close: () => void;
}> = (props) => {
  const [rating, setRating] = useState<number>(1);
  const [review, setReview] = useState<string>("");

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const postReview = async () => {
    console.log("data", rating, review, authState.user._id, authState.token);
    try {
      const response = await fetch(
        `http://localhost:8080/reviews/post-review/${authState.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify({
            productId: props.id,
            rating: rating,
            feedback: review,
          }),
        }
      );
      console.log(response.status);

      if (!response.ok) {
        throw new Error("Failed to post review");
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error: any) {
      console.error("Error posting review:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "heading-text-1-active",
              "heading-text-2-active",
              "header-data-active"
            );
          } else {
          }
        });
      },
      { threshold: 0.5, root: null }
    );
    const hiddenElements = document.querySelectorAll(
      ".heading-text-1, .heading-text-2, .header-data"
    );
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  return (
    <div
      onClick={props.close}
      className="fixed z-50 inset-0 flex justify-center items-center bg-gray-800 bg-opacity-45"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`heading-text-1  p-8 rounded-lg shadow-lg mx-4 md:mx-0 ${
          darkMode ? "bg-zinc-800" : "bg-slate-100"
        }`}
      >
        <div className="flex flex-row justify-between">
          <p className="header-data text-xl  tracking-wider font-semibold">
            Write a review
          </p>
          <FontAwesomeIcon
            className="text-end cursor-pointer "
            onClick={props.close}
            icon={faClose}
          ></FontAwesomeIcon>
        </div>
        <div className="flex flex-col w-full items-start gap-y-3 mt-5">
          <p className="header-data text-start text-lg  tracking-wider font-normal">
            Overall, how satisfied are you with this product?
          </p>
          <Rating
            className="header-data"
            name="simple-controlled"
            value={rating}
            precision={0.5}
            onChange={(event, value) => {
              setRating(value!);
            }}
            sx={{
              "& .MuiRating-iconFilled": {
                color: "purple",
                fontSize: "2.5rem", // Change the filled star color
              },
              "& .MuiRating-iconEmpty": {
                borderColor: "purple",
                fontSize: "2.5rem", // Change the border color
              },
              "& .MuiSvgIcon-root": {
                fill: "purple",
                fontSize: "2.5rem", // Make the unfilled stars transparent
                //   stroke: "red", // Change the border color of the unfilled stars
              },
            }}
          />
          <textarea
            className={`${
              darkMode ? "bg-zinc-900" : "bg-slate-200"
            } header-data px-3 py-3 w-full rounded-lg `}
            rows={5}
            placeholder="Please leave us a review ..."
            onChange={(event) => {
              setReview(event.target.value);
            }}
          ></textarea>
          <div className="flex flex-row gap-x-4 justify-end w-full">
            <div
              onClick={async () => {
                if (review.length === 0) {
                  toast.error("Provide some feedbacks to continue.");
                  return;
                }
                postReview()
                  .then((data) => {
                    toast.success(data.message);
                    props.close();
                  })
                  .catch((e: any) => {
                    toast.error(e.message);
                    props.close();
                  });
              }}
              className="text-white bg-purple-500 text-center rounded-md px-3 py-2 hover:bg-purple-700 transition-all duration-700 cursor-pointer"
            >
              {" "}
              Submit
            </div>
            <div
              onClick={props.close}
              className="text-white bg-zinc-700 text-center rounded-md px-3 py-2 hover:bg-purple-600 transition-all duration-700 cursor-pointer"
            >
              {" "}
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
