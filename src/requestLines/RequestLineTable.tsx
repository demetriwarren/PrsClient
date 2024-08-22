import { Link } from "react-router-dom";
import { Request } from "../requests/Request";
import { RequestLine } from "./RequestLine";

interface RequestLineTableProps {
  request: Request;
  onRemove: (requestLine: RequestLine) => void;
}

export function RequestLineTable({ request, onRemove }: RequestLineTableProps) {
  return (
    <table className="table table-hover table-light w-50">
      <thead>
        <tr>
          <th>Actor</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {request.requestLines?.map((requestLine) => (
          <tr key={requestLine.id}>
            <td className="d-flex gap-2">
              <Link to={`/requests/detail/${request.id}/requestlines/edit/${requestLine.id}`}>edit</Link>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  onRemove(requestLine);
                }}
              >
                delete
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}