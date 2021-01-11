import React, { useEffect, useState } from "react";
import useInput from "../utils/useInput";

const ImportImage = (props) => {
  const [imageName, setimageName] = useInput("");
  const [image, setImage] = useState();
  const [portfolioName, setPortfolioName] = useInput("");
  const [portfolioList, setPortfolioList] = useState([]);
  const [imagePortfolio, setImagePortfolio] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useInput("");

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
    setImagePortfolio(portfolios[0]);
  }

  const handleImageSubmit = () => {
    const uploadData = new FormData();
    uploadData.append('imageName', imageName);
    uploadData.append('portfolioName', imagePortfolio);
    uploadData.append('image', image, image.imageName);
    
    fetch("/api/post-image", {
      method: 'POST',
      body: uploadData
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  };

  const handlePortfolioSubmit = () => {
    const uploadData = new FormData();
    uploadData.append('portfolioName', portfolioName);
    uploadData.append('description', portfolioDescription);

    fetch("/api/post-portfolio", {
      method: "POST",
      body: uploadData
    })
    .then(res => console.log(res))
    .then(() => loadPortfolios())
    .catch(error => console.log(error))
  }

  return (
    <div>
      <div>
        <h1>Import Portfolio</h1>
        <label>
          Portfolio name
          <input type="text" value={portfolioName} onChange={setPortfolioName} />
        </label>
        <br/>
        <label>
          Description
          <input type="text" value={portfolioDescription} onChange={setPortfolioDescription} />
        </label>
        <br/>
        <button onClick={() => handlePortfolioSubmit()}>New Portfolio</button>
      </div>
      <br/>
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
        <label>
          Portfolio
          <select onChange={e => {setImagePortfolio(e.target.value)}} value={imagePortfolio}>
            {portfolioList.map(port => (
              <option>{port}</option>
            ))}
          </select>
        </label>
        <br/>
        <button onClick={() => handleImageSubmit()} >New Image</button>
      </div>
    </div>
  );
};

export default ImportImage;
