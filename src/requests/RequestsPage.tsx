import { NavLink } from "react-router-dom";
import { RequestTable } from "./RequestTable";

export function RequestsPage(){
    return (
        <>
        <header className="d-flex justify-content-between">
          <h2>Requests</h2>
          <NavLink to="create" className="btn btn-primary pt-2">
            <svg className="bi me-1" width={20} height={20} fill="currentColor">
              <use xlinkHref="/node_modules/bootstrap-icons/bootstrap-icons.svg#plus" />
            </svg>
            New Request
          </NavLink>
        </header>
            <RequestTable/>
        </>
    )
}