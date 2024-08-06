import React from "react";

function Header() {
  return (
    <div className="shadow">
      <nav className="navbar navbar-expand-lg navbar-white bg-white">
        <div className="container-fluid d-flex justify-content-end">
            <a className="text-reset me-3" href="/">
              ADMIN
            </a>

            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-circle"
              height="25"
              alt="profil img"
              loading="lazy"
            />
        </div>
      </nav>
    </div>
  );
}

export default Header;
