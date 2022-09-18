/* eslint-disable react/prop-types */
import React from "react";
import Imgix from "react-imgix";

export default function ImageGallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image) => (
        <Imgix
          sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={image}
          key={image}
          imgixParams={{
            fit: "crop",
            fm: "jpg",
          }}
          width="50"
          height="100"
        />
      ))}
    </div>
  );
}
