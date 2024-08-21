import { Link } from "react-router-dom";
import { Request } from "./Request";
import { SyntheticEvent } from "react";


interface RequestTableRowProps {
    request: Request;
    onRemove: (request: Request) => void;
  }

export function RequestTableRow({request, onRemove}: RequestTableRowProps){
      
      return (

          <tr>
      <td>
        <Link to={`/request/detail/${request.id}`}>{request.description}</Link>
      </td>

      <td>
        <div className="d-flex gap-2">
          <Link className="small" to={`/requests/edit/${request.id}`}>
            Edit
          </Link>
          |
          <a
            className="small"
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