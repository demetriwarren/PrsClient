import { NavLink } from "react-router-dom";

function NavPanel() {
  return (
    <nav className=" d-flex flex-column p-3 border-end vh-100 bg-body-tertiary">
      <span>
        <NavLink to="/create-new" className="ms-3 text-decoration-none">
          <svg className="bi me-1" width={20} height={20} fill="currentColor">
            <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#plus-circle-fill" />
          </svg>
          Create New
        </NavLink>
      </span>
      <span className="d-flex mt-3 ps-4">Purchase</span>
      <ul className="nav nav-pills flex-column px-3">
        <li className="nav-item p-2">
          <NavLink to="/requests" className="nav-link">
            <svg className="bi me-2" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#cart" />
            </svg>
            Requests
          </NavLink>
        </li>
        <li className="nav-item p-2">
          <NavLink to="/products" className="nav-link">
            <svg className="bi me-2" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#grid" />
            </svg>
            Products
          </NavLink>
        </li>
        <li className="nav-item p-2">
          <NavLink to={"/vendors"} className="nav-link">
            {/* <a className="nav-link active" aria-current="page" href="vendors.html"> */}
            <svg className="bi me-2" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#building" />
            </svg>
            Vendors
          </NavLink>
        </li>
        <li className="nav-item p-2">
        <NavLink to={"/users"} className="nav-link">
            <svg className="bi me-2" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#people" />
            </svg>
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavPanel;
