import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/plainb-logo.svg";
import ProductStore from "../../store/ProductStore";
import UserStore from "../../store/UserStore";
import UserSubmitButton from "../user/UserSubmitButton";
import CartStore from "../../store/CartStore";
import WishStore from "../../store/WishStore";

const AppNavBar = () => {
  const { SearchKeyword, SetSearchKeyword } = ProductStore();
  const { isLogin, UserLogoutRequest } = UserStore();
  const { CartCount, CartListRequest } = CartStore();
  const { WishCount, WishListRequest } = WishStore();
  const navigate = useNavigate();

  const onLogout = async () => {
    await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      if (isLogin()) {
        await CartListRequest();
        await WishListRequest();
      }
    })();
  }, [isLogin, CartListRequest, WishListRequest]);

  return (
    <>
      <div className="container-fluid text-white p-2 bg-success">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6">
              <span>
                <span className="f-12 me-3">
                  <i className="bi bi-envelope"></i> Support@PlanB.com
                </span>
                <span className="f-12">
                  <i className="bi bi-phone"></i> 01774688159
                </span>
              </span>
            </div>
            <div className="col-md-6 text-md-end">
              <span className="bodySmall mx-2">
                <i className="bi bi-whatsapp"></i>
              </span>
              <span className="bodySmall mx-2">
                <i className="bi bi-youtube"></i>
              </span>
              <span className="bodySmall">
                <i className="bi bi-facebook"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar sticky-top shadow-sm bg-white navbar-expand-lg navbar-light py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={Logo} alt="Logo" width="96" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav06"
            aria-controls="nav06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav06">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="btn btn-light ms-2 position-relative" to="/">
                  <i className="bi bi-house"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-light ms-2 position-relative"
                  to="/cart"
                >
                  <i className="bi text-dark bi-bag"></i> Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {CartCount}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-light ms-2 position-relative"
                  to="/wish"
                >
                  <i className="bi text-dark bi-heart"></i> Wish
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {WishCount}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-light ms-2 position-relative"
                  to="/orders"
                >
                  <i className="bi text-dark bi-truck"></i> Order
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <div className="input-group me-3">
                <input
                  onChange={(e) => SetSearchKeyword(e.target.value)}
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <Link
                  to={
                    SearchKeyword.length > 0
                      ? `/by-keyword/${SearchKeyword}`
                      : `/`
                  }
                  className="btn btn-outline-dark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ width: 24, height: 24 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </Link>
              </div>
              {isLogin() ? (
                <>
                  <UserSubmitButton
                    onClick={onLogout}
                    text="Logout"
                    className="btn btn-success me-2"
                  />
                  <Link type="button" className="btn btn-success" to="/profile">
                    Profile
                  </Link>
                </>
              ) : (
                <Link type="button" className="btn btn-success" to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;
