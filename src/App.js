import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Header from "./component/Header";
import Aside from "./component/Aside";
import Footer from "./component/Footer";
import CategoriesList from "./categories/CategoriesList";
import AddCategory from "./categories/AddCategory";
import UpdateCategory from "./categories/UpdateCategory";
import DetailCategory from "./categories/DetailCategory";
import ProductList from "./products/productsList";
import AddProduct from "./products/AddProduct";
import DetailProduct from "./products/DetailProduct";
import UpdateProduct from "./products/UpdateProduct";

function App() {
  return (
    <div className="d-flex">
      <BrowserRouter>
        <Aside />
        <div className="flex-grow-1">
          <Header />
          {/* <CategoriesList/> */}
          <div className="container p-4">
            {/* <AddCategory/> */}
            <Routes>
              <Route path="/" element={<CategoriesList />} />
              <Route path="/addCategory" element={<AddCategory />} />
              <Route path="/editeCategory/:id" element={<UpdateCategory />} />
              <Route path="detailCategory/:id" element={<DetailCategory />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/detailProduct/:id" element={<DetailProduct />} />
              <Route path="/updateProduct/:id" element={<UpdateProduct />} />
            </Routes>
          </div>
            <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
