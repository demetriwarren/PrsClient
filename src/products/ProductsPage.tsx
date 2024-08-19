import { NavLink } from "react-router-dom";
import { ProductList } from "./ProductList";

export function ProductsPage() {
  return (
    <>
        <header className="d-flex justify-content-between">
          <h2>Products</h2>
          <NavLink to="create" className="btn btn-primary pt-2">
            <svg className="bi me-1" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#plus" />
            </svg>
            New Product
          </NavLink>
        </header>
        <section className="card bg-body-tertiary p-4 mt-4">

        <ProductList/>

        </section>
    </>
  );
}
