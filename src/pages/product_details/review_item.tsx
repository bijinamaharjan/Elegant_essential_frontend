import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Rating } from "@mui/material";

const ReviewItem: React.FC<{ reviewData: any }> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const errorColor = themeState.errorColor;

  const getFormattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={`w-full flex flex-col `}>
      <div className="flex flex-row gap-x-5">
        <div
          className={`h-12 w-12 flex flex-col items-center justify-center shadow-sm shadow-black rounded-full ${
            darkMode
              ? "border border-solid border-white"
              : "border border-solid border-black"
          }`}
        >
          {" "}
          <p> {props.reviewData.userId.username.split("")[0].toUpperCase()} </p>
        </div>
        <div className="flex flex-col">
          <p> {props.reviewData.userId.username} </p>
          <div className="flex flex-row items-center gap-x-7">
            <Rating
              className=""
              name="simple-controlled"
              value={props.reviewData.rating}
              readOnly
              size="small"
            />
            <p className="text-sm text-gray-600 tracking-wider">
              {" "}
              {getFormattedDate(props.reviewData.createdAt)}{" "}
            </p>
          </div>
        </div>
      </div>
      <p className="my-3"> {props.reviewData.feedback} </p>
      <div
        style={{
          height: "0.5px",
        }}
        className={`${errorColor}`}
      ></div>
    </div>
  );
};

export default ReviewItem;
