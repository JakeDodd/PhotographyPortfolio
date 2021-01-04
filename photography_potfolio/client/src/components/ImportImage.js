import React, { Component, useState } from "react";
import useInput from "../utils/useInput";

const ImportImage = () => {
  const [name, setName] = useInput("");
  const [image, setImage] = useState();

  const handleSubmit = () => {
    const uploadData = new FormData();
    uploadData.append('name', name);
    uploadData.append('image', image, image.name)
    
    fetch("/api/post-image", {
      method: 'POST',
      body: uploadData
    }).then(res => console.log(res)).catch(error => console.log(error))
  };

  return (
    <div>
      <h1>Import Image</h1>
      <label>
        Name
        <input type="text" value={name} onChange={setName} />
      </label>
      <br/>
      <label>
        image
        <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
      </label>
      <br/>
      <button onClick={() => handleSubmit()} >New Image</button>
    </div>
  );
};

export default ImportImage;
