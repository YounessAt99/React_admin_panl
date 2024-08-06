import React from "react";
import logo from "../image/lorial.svg";
import { Link } from "react-router-dom";

function Aside() {
  return (
    <div className="bg-secondary shadow" >
      <div className="h-100 d-flex flex-column flex-shrink-0 p-3">
        <img
          className="rounded mx-auto d-block"
          width={100}
          src={logo}
          id="img1"
          alt="Logo"
        />
        <hr />
        <div className="container">
          <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item h5">
            <Link to="/" className="nav-link text-white" aria-current="page">
              Categories
            </Link>
          </li>
          <li className="nav-item h5">
            <Link to="/products" className="nav-link text-white">
              Products
            </Link>
          </li>
          <li className="nav-item h5">
            <Link to="/orders" className="nav-link text-white">
              Commands
            </Link>
          </li>
          <li className="nav-item h5">
            <Link  className="nav-link text-white">
              Users
            </Link>
          </li>
        </ul>
        </div>
        
      </div>
    </div>
  );
}

export default Aside;
