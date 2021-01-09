import React, { useEffect, useState } from "react";
import useInput from "../utils/useInput";

const ImportImage = () => {
  const [imageName, setimageName] = useInput("");
  const [image, setImage] = useState();
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioList, setPortfolioList] = useState([]);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    const portfolios = [];
    const response = await fetch('/api/portfolio');
    const data = await response.json();
    data.forEach((obj) => {
      portfolios.push(obj.portfolioName);
    })
    setPortfolioList(portfolios);
    setPortfolioName(portfolios[0]);
  }

  const handleSubmit = () => {
    const uploadData = new FormData();
    uploadData.append('imageName', imageName);
    uploadData.append('portfolioName', portfolioName);
    uploadData.append('image', image, image.imageName);
    
    fetch("/api/post-image", {
      method: 'POST',
      body: uploadData
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  };

  return (
    <div>
      <h1>Import Image</h1>
      <label>
        image name
        <input type="text" value={imageName} onChange={setimageName} />
      </label>
      <br/>
      <label>
        image
        <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
      </label>
      <br/>
      <select onChange={e => {setPortfolioName(e.target.value)}} value={portfolioName}>
        {portfolioList.map(port => (
          <option>{port}</option>
        ))}
      </select>
      <br/>
      <button onClick={() => handleSubmit()} >New Image</button>
    </div>
  );
};

export default ImportImage;
