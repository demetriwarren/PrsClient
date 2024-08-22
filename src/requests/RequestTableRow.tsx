import { Link } from "react-router-dom";
import { Request } from "./Request";
import { SyntheticEvent } from "react";

interface RequestTableRowProps {
  request: Request;
  onRemove: (request: Request) => void;
}

export function RequestTableRow({ request, onRemove }: RequestTableRowProps) {
  return (
    <tr>
      <td>
        <p>{request.id}</p>
      </td>

      <td>
        <span>{request.description}</span>
        <p className="small">{request.justification}</p>
      </td>

    <td>
        <span className="badge text-bg-primary">{request.status}</span>
    </td>

    <td>${request.total}</td>

    <td>
        <span className="">{request.user?.firstname} {request.user?.lastname}</span>
        <p className="small">{request.deliveryMode}</p>

    </td>



      <td>
        <div className="d-flex gap-2">
        <Link className="" to={`/requests/detail/${request.id}`}>
            Review
          </Link> |

          <Link className="" to={`/requests/edit/${request.id}`}>
            Edit
          </Link>
          |
          <a
            className=""
            onClick={(event: SyntheticEvent) => {
                event.preventDefault();
                onRemove(request);
            }}
            >
            Delete
              </a>  

        </div>
      </td>
    </tr>
  );
}
