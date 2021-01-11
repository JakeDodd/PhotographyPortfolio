import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ImageList from "./ImageList";

const GalleryPage = (props) => {
  const [images, setImages] = useState([]);

  let { portfolio } = useParams();
  
  useEffect(async () => {
    const url = "/api/get-images?portfolio=" + portfolio
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setImages(data);
  }, [])

  return (
    <div>
      <h1>{portfolio}</h1>
      <ImageList images={images} />
    </div>
  );
};

export default GalleryPage;
