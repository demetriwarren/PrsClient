import { Link } from "react-router-dom";
import { Request } from "../requests/Request";
import { RequestLine } from "./RequestLine";

interface RequestLineTableProps {
  request: Request;
  onRemove: (requestLine: RequestLine) => void;
}

export function RequestLineTable({ request, onRemove }: RequestLineTableProps) {
  return (
    <table className="table table-hover w-50">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {request.requestLines?.map((requestLine) => (
          <tr key={requestLine.id}>
            <td>{requestLine.product?.name}</td>
            <td>${requestLine.product?.price}</td>
            <td>{requestLine.quantity}</td>
            <td>${(requestLine.product?.price ?? 0) * (requestLine.quantity ?? 0)}</td>
            <td className="d-flex gap-2">
              <Link className="btn btn-outline-primary" to={`/requests/detail/${request.id}/requestline/edit/${requestLine.id}`}>Edit</Link>
              <a className="btn btn-outline-primary"
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  onRemove(requestLine);
                }}
              >
                Delete
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
