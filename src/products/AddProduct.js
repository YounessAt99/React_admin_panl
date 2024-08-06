import React, { useState, useEffect } from "react";
import imageDefault from "../image/phon.jpg";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  async function handleAddProduct(e) {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append("file", image);

    try {
      const fileResponse = await fetch("http://localhost:5000/files/upload", {
        method: "POST",
        body: fileData,
      });
      const fileDataResponse = await fileResponse.json();

      let formData = {
        thumbnail: "/files/download/"+fileDataResponse.file,
        title: title,
        price: Number(price),
        stock: Number(stock),
        categoryId: Number(categoryId),
        description: description,
      };
      console.log("formData", formData);

      const productResponse = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const productData = await productResponse.json();
      console.log("Response from server:", productData);
      navigate("/products");
    } catch (error) {
      console.error("Error uploading file or submitting data:", error);
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:5000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="">
      <h1>Nouveau Produit</h1>
      <div className="bg-light p-5 border border-primary rounded">
        <form onSubmit={handleAddProduct}>
          <div className="row">
            {/* image */}
            <div className="col-md-4 mb-4 ">
              <div className="">
                {image ? (
                  <img
                    className="img-thumbnail"
                    width="300"
                    src={URL.createObjectURL(image)}
                    alt="product"
                  />
                ) : (
                  <img
                    className="img-thumbnail"
                    src={imageDefault}
                    width="300"
                    alt="placeholder"
                  />
                )}
              </div>
              <div className="form-outline">
                <label
                  className="btn btn-outline-secondary form-label mt-3 ms-5"
                  htmlFor="image"
                >
                  + Add Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  style={{ visibility: "hidden" }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-md-8  ">
              {/* title */}
              <div className="col-md form-outline mb-4">
                <label className="form-label" htmlFor="title">
                  Titre
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="row mb-4">
                {/* price */}
                <div className="col-md form-outline ">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                {/* stock */}
                <div className="col-md form-outline ">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="form-control"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
              {/* categories */}
              <div className="col-md form-outline mb-4">
                <label className="form-label" htmlFor="title">
                  Category
                </label>
                <select
                  className="form-control"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Categories</option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      style={{ color: category.color }}
                      value={category.id}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* description */}
            <div className="col-md form-outline">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="form-control"
                rows="4"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="text-end p-4">
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
