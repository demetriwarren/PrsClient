import { useEffect, useState } from "react";
import { requestAPI } from "./RequestApi";
import { Request } from "./Request";
import toast from "react-hot-toast";
import RequestTableRow from "./RequestTableRow";

function RequestTable() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadRequest() {
    try {
      setBusy(true);
      const data = await requestAPI.list();
      setRequests(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadRequest();
  }, []);

  async function remove(request: Request) {
    if (confirm("Are you sure you want to delete this request?")) {
      if (request.id) {
        await requestAPI.delete(request.id);
        let updatedRequests = requests.filter((r) => r.id !== request.id);
        setRequests(updatedRequests);
        toast.success("Successfully deleted.");
      }
    }
  }

  return (
    <>
      {busy && (
        <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
          <div className=" spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </section>
      )}
      <table className="table table-hover w-75">
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Director</th>
            <th>Budget</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <MovieTableRow key={movie.id} movie={movie} onRemove={remove} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MovieTable;