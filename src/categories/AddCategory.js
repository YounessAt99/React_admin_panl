import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          color: color,
        }),
      });
      if (response.ok) {
        console.log("Category added successfully");
        navigate("/");
      } else {
        console.log("Failed to add category");
      }
    } catch (error) {
      console.log("eror", error);
    }

  }

  return (
    <div className="p-5 ">
      <h1>Nouvelle Categorie</h1>
      <div className="p-5  bg-light shadow">
        <form onSubmit={handleSubmit}>
          <div classNameName="container-fluid">
            <div className="form-outline col-sm-1 ms-4 p-3 ">
              <label className="form-label" for="color">
                Color
              </label>
              <input
                type="color"
                id="color"
                className="form-control form-control-lg"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="form-outline col-md-6 ms-5">
              <label className="form-label" for="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-outline col-6 m-5 ">
              <button className="btn btn-success mx-3" type="submit">
                Add
              </button>
              <Link to="/">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
