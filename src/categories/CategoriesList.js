import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const promise = await fetch("http://localhost:5000/categories");
    const data = await promise.json();
    setCategories(data);
  }

  const hundelDelete = (idCategory) => {
    fetch(`http://localhost:5000/categories/${idCategory}`, {
      method: "DELETE",
    });
    fetchCategories();
  };

  return (
    <div className="bg-light ">
      <div className="d-flex justify-content-between my-3">
        <h1>Categories List</h1>
        <div className="mr-auto p-2">
          <Link to="/addCategory" className="btn btn-primary ml-auto">
            Add Category
          </Link>
        </div>
      </div>

      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Color</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Link to={`/detailCategory/${item.id}`}>{item.title}</Link>
                </td>
                <td>
                  <span
                    style={{ backgroundColor: item.color, color: item.color }}
                  >
                    color
                  </span>
                </td>
                <td>
                  <Link to={`/editeCategory/${item.id}`}>Update</Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => hundelDelete(item.id)}
                  >
                    Delete
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

export default CategoriesList;
