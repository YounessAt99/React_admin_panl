import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function DetailProduct() {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function productID() {
      const response = await fetch(`http://localhost:5000/products/${id}`);
      const data = await response.json();
      const res = await fetch(`http://localhost:5000/categories/${data.categoryId}`)
      const dd =await res.json();
      setCategory(dd)
      setProduct(data);
    }
    productID();
  }, [id]);


  function hundelDelete(idProduct) {
    fetch(`http://localhost:5000/products/${idProduct}`, {
      method: "DELETE",
    });
    navigate("/products");
  }

  if (!product) {
    return <div>loading...!</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h3>Detail Product</h3>
        </div>
        <div>
          <button className="btn btn-secondary mx-2">modifer</button>
          <button
            className="btn btn-outline-danger"
            onClick={() => hundelDelete(product.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
      <div className="card py-4">
        <div className="ms-5 row">
          <div className=" col-md-4">
            <img
              src={`http://localhost:5000${product.thumbnail}`}
              alt="image"
              className="img-fluid pe-4"
            />
          </div>
          <div className="col-md-6 ms-5 card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <tr>
              <th className="px-3">price</th>
              <th className="px-3">quantity</th>
              <th className="px-3">Category</th>
            </tr>
            <tr>
              <td className="px-3">{product.price}</td>
              <td className="px-3">{product.stock}</td>
              <td className="px-3"><Link to={`/detailCategory/${category.id}`}>{category.title}</Link> </td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
