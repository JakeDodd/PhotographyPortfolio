import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../static/css/index.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import useInput from "../utils/useInput";

const ImportImage = () => {
  const [name, setName] = useInput("");
  const [portfolio, setPortfolio] = useInput("");
  const [file, onFileChange] = useInput(null);

  const handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        portfolio: portfolio,
        image: file,
      }),
    };
    fetch("/api/post-image", requestOptions).then((response) =>
      response.json()
    );
  };

  return (
    <div>
      <h1>Import Image</h1>
      <Form enctype="multipart/form-data">
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={setName} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Portfolio</Form.Label>
            <Form.Control value={portfolio} onChange={setPortfolio} />
          </Form.Group>
        </Form.Row>
        <div className="mb-3">
          <Form.File id="formcheck-api-regular">
            <Form.File.Label>Regular file input</Form.File.Label>
            <Form.File.Input onChange={onFileChange} />
          </Form.File>
        </div>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ImportImage;
