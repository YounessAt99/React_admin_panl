import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateProduct() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [thumbnail,setThumbnail] =useState("")
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [err, setErr] = useState("");

    useEffect(()=>{
        fetchProduct();
        fetchCategories();
    },[])
    
    const fetchProduct = async() =>{
      const response =await fetch(`http://localhost:5000/products/${id}`);
      const data =await response.json();
      setThumbnail(data.thumbnail);setTitle(data.title);setPrice(data.price);
      setStock(data.stock);setDescription(data.description);setCategoryId(data.categoryId)
    }

    const fetchCategories = async()=>{
      const response = await fetch('http://localhost:5000/categories');
      const data = await response.json();
      setCategories(data);
    }

    const handleUpdateProduct = async(e)=>{
      e.preventDefault();
      const fileData = new FormData();
      fileData.append("file",image)

      try {
        if (image) {
        const fileresponce =await fetch('http://localhost:5000/files/upload',{
          method:"POST",
          body:fileData,
        });
        const fileDataresponse =await fileresponce.json();

        const formData ={
          title:title,
          price:Number(price),
          stock:Number(stock),
          description:description,
          thumbnail:"/files/download/"+fileDataresponse.file,
          categoryId:Number(categoryId)
        };
        const response =await fetch(`http://localhost:5000/products/${id}`,{
          method:'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData) 
        });
        const res = response.json()
        console.log("response",res);
        }else{
          return (setErr("required"))
        }

      } catch (error) {
        console.error("Error uploading file or submitting data:", error);
      }
      navigate('/products')
    }

  return (
    <div className="">
      <h1>Nouveau Produit</h1>
      <div className="bg-light p-5 border border-primary rounded">
        <form onSubmit={handleUpdateProduct}>
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
                    src={`http://localhost:5000${thumbnail}`}
                    width="300"
                    alt="placeholder"
                  />
                )}
              </div>
                <span style={{color:"red"}}>{err}</span>
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
                  value={title}
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
                    value={price}
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
                    value={stock}
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
                  <option >shose category</option>
                  {categories.map((category,index) => (
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="text-end p-4">
              <button type="submit" className="btn btn-success">
                Update
              </button>
              <Link to={'/products'}>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;