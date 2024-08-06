import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:5000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function getColor(idCategory) {
    const category = categories.find((category) => category.id === idCategory);
    return category ? category.color : "";
  }
  function getTitle(idCategory) {
    const category = categories.find((category) => category.id === idCategory);
    return category ? category.title : "";
  }

  async function handleDelete(productId) {
    try {
      await fetch(`http://localhost:5000/products/${productId}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  // Calculate pagination variables
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-light">
      <div className="d-flex justify-content-between my-3">
        <h1>Product List</h1>
        <div className="mr-auto p-2">
          <Link to="/addProduct" className="btn btn-primary">
            Add Product
          </Link>
        </div>
      </div>
      <div className="bg-light">
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={`http://localhost:5000${product.thumbnail}`}
                    alt="Thumbnail"
                    width="200"
                  />
                </td>
                <td>
                    
                  <Link className="text-decoration-none text-black" to={`/detailProduct/${product.id}`}>
                    <b>{product.title}</b>
                  </Link>
                </td>
                <td>
                  <Link
                    className="text-decoration-none"
                    to={`/detailCategory/${product.categoryId}`}
                  >
                    <span
                      style={{
                        color: getColor(product.categoryId),
                      }}
                    >
                      <b><i>{getTitle(product.categoryId)}</i> </b>
                    </span>
                  </Link>
                </td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn"><Link to={`/updateProduct/${product.id}`}>Edite</Link></button> 
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(products.length / itemsPerPage) },
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProductList;
