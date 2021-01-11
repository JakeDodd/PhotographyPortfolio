import React, { useEffect, useState, useCallback, useRef } from "react";

const ImageCard = props => {
  const [spans, setSpans] = useState(0);

  const updateSpans = useCallback(() => {
    const height = imageRef.current.clientHeight;

    const span = Math.ceil(height / 10);

    setSpans(span);
  });

  const imageRef = useRef(null);

  useEffect(() => {
    imageRef.current.addEventListener("load", updateSpans);
    return () => {
      imageRef.current.removeEventListener("load", updateSpans);
    };
  }, []);

  const { imageName, portfolioName, image } = props.image;

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img ref={imageRef} alt={imageName} src={image} />
    </div>
  );
};

export default ImageCard;