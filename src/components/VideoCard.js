import React from "react";

function VideoCard({ image, title, date, name }) {
  return (
    <div>
      <div className={name}>
        <img src={image} alt="" />
      </div>
      <div className="videoText">
        <h4>{title}</h4>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default VideoCard;
