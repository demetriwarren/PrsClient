function NavPanel() {
  return (
    <nav className=" d-flex flex-column p-3 border-end vh-100 bg-body-tertiary">
      <span>
        <a className="ms-3 text-decoration-none">
          <svg className="bi me-1" width={20} height={20} fill="currentColor">
            <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#plus-circle-fill" />
          </svg>
          Create New
        </a>
      </span>
      <span className="d-flex mt-3 ps-4">Purchase</span>
      <ul className="nav nav-pills flex-column px-3">
        <li className="nav-item p-2">
          <a className="nav-link" aria-current="page" href="requests/requests.html">
            <svg className="bi me-2" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#cart" />
            </svg>
            Requests
          </a>
        </li>
        <li className="nav-item p-2">
          <a className="nav-link" aria-current="page" href="products/products.html">
            <svg className="bi me-2" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#grid" />
            </svg>
            Products
          </a>
        </li>
        <li className="nav-item p-2">
          <a className="nav-link" aria-current="page" href="vendors/vendors.html">
            <svg className="bi me-2" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#building" />
            </svg>
            Vendors
          </a>
        </li>
        <li className="nav-item p-2">
          <a className="nav-link" aria-current="page" href="users/users.html">
            <svg className="bi me-2" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#people" />
            </svg>
            Users
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavPanel