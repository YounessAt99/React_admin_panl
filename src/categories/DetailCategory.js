import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

function DetailCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [productsOfCa, setProductsOfCa] = useState(null);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (products) {
      filterProducts();
    }
  }, [products]);

  async function fetchCategory() {
    let response = await fetch(`http://localhost:5000/categories/${id}`);
    const data = await response.json();
    setCategory(data);
  }

  async function fetchProducts() {
    let response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    setProducts(data);
  }

  function filterProducts() {
    const data = products.filter((item) => item.categoryId == id);
    setProductsOfCa(data);
  }

  async function hundelDeleteCategoy(idCategory) {
    await fetch(`http://localhost:5000/categories/${idCategory}`, {
      method: "DELETE",
    });
    navigate('/')
  }

  async function hundelDeleteProduct(idProduct) {
    await fetch(`http://localhost:5000/products/${idProduct}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  console.log("data", productsOfCa);

  if (!productsOfCa) {
    return <div>Loading...!</div>;
  } else if (productsOfCa.length === 0) {
    return (
      <div >
        No products in <span className="h3" style={{color:category.color}}> {category.title}</span> category
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <h2>
            Category:<span style={{color:category.color}}> {category.title}</span>
          </h2>
        </div>
        <div className="mx-3">
          <button className="btn">modifer</button>
          <button
            className="btn btn-outline-danger"
            onClick={() => hundelDeleteCategoy(category.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
      <div className="bg-light p-3">
        <h4>List Products</h4>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Titre</th>
              <th>Prix</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsOfCa.map((item) => (
              <tr key={item.id}>
                <td> {item.id} </td>
                <td>
                  <img src={`http://localhost:5000${item.thumbnail}`} alt="IMG" width={300} />
                </td>
                <td> {item.title} </td>
                <td>${item.price} </td>
                <td> {item.stock} </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => hundelDeleteProduct(item.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailCategory;
