import { Link,useParams, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

function UpdateCategory() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  useEffect(()=>{
    getCategory()
  },[])

  const getCategory = async()=>{
    const response = await fetch(`http://localhost:5000/categories/${id}`)
    const data = await response.json()
    setColor(data.color);
    setTitle(data.title)
  }
  const updateCat = async()=>{

    const data ={
      title:title,
      color:color
    };
    await fetch(`http://localhost:5000/categories/${id}`,{
      method:'PUT',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    navigate('/')
  }


  return (
    <div>
      <h1>Update Category</h1>
      <div className="container p-5">
        <div class="form-outline col-1 ">
          <input type="color" id="color" class="form-control form-control-lg" value={color} onChange={(e)=>setColor(e.target.value)} />
          <label class="form-label" for="color">
            Color
          </label>
        </div>

        <div class="form-outline col-6">
          <input type="text" id="name" class="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <label class="form-label" for="name">
            Title
          </label>
        </div>
        <div class="form-outline col-6">
          <button onClick={updateCat}>Update </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;
