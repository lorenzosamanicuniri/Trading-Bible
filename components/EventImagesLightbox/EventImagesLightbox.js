import React, { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";

const EventImagesLightbox = ({
  activeEvent,
  isLightboxOpen,
  setisLightboxOpen,
}) => {
  const [photoIndex, setphotoIndex] = useState(0);

  const images = activeEvent.examples?.map((example, i) => {
    const dateTest = new Date(example.date);
    return {
      url: "https://api.tbible.club/uploads/" + example.image,
      title: <b>{dateTest.toLocaleDateString("hr-HR")}</b>,
      caption: (
        <p>
          Actual : <b>{example.measureActual}</b> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          Forecast : <b>{example.measureForecast}</b> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          Previous : <b>{example.measurePrevious}</b>
        </p>
      ),
    };
  });
  if (isLightboxOpen && images.length > 0) {
    return (
      <Lightbox
        mainSrc={images[photoIndex].url}
        nextSrc={images[(photoIndex + 1) % images.length].url}
        prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
        onCloseRequest={() => {
          setphotoIndex(0);
          setisLightboxOpen(false);
        }}
        onMovePrevRequest={() =>
          setphotoIndex((photoIndex + images.length - 1) % images.length)
        }
        onMoveNextRequest={() =>
          setphotoIndex((photoIndex + 1) % images.length)
        }
        imageTitle={images[photoIndex].title}
        imageCaption={images[photoIndex].caption}
        imagePadding="50"
      />
    );
  }
};

export default EventImagesLightbox;
