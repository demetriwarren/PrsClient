import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Request } from "./Request";
import { requestAPI } from "./RequestApi";
import { requestLineAPI } from "../requestLines/RequestLineApi";
import { RequestLine } from "../requestLines/RequestLine";
import { RequestLineTable } from "../requestLines/RequestLineTable";
import { SubmitHandler, useForm } from "react-hook-form";

export function RequestDetailPage() {
  const { requestId: requestIdAsString } = useParams<{
    requestId: string;
  }>();

  const requestId = Number(requestIdAsString);
  const [request, setRequest] = useState<Request | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function loadRequest() {
    try {
      if (!requestId) return;
      setBusy(true);
      const data = await requestAPI.find(requestId);
      setRequest(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadRequest();
  }, []);

  const { handleSubmit } = useForm<Request>({
    defaultValues: async () => {
      if (!requestId) {
        return Promise.resolve(new Request());
      } else {
        return await requestAPI.find(requestId);
      }
    },
  });

  const reviewRequest: SubmitHandler<Request> = async (request: Request) => {
    try {
      await requestAPI.submitForReview(request);
      navigate("/requests");
      toast.success("Request successfully sent for review!")
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const approveRequest: SubmitHandler<Request> = async (request: Request) => {
    try {
      await requestAPI.approveRequest(request);
      navigate("/requests");
      toast.success("Request successfully approved!")
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const rejectRequest: SubmitHandler<Request> = async (request: Request) => {
    try {
      await requestAPI.rejectRequest(request);
      navigate("/requests");
      toast.success("Request successfully rejected!")
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  async function removeRequestLine(requestLine: RequestLine) {
    if (confirm("Are you sure you want to delete this Request?")) {
      if (requestLine.id) {
        await requestLineAPI.delete(requestLine.id);
        toast.success("Successfully deleted.");
        let updatedRequestLines = request?.requestLines?.filter((rl) => rl.id !== requestLine.id);
        if (request) {
          setRequest({ ...request, requestLines: updatedRequestLines } as Request);
        }
      }
    }
  }

  if (!request) return null;

  return (
    <>
      <header className="d-flex justify-content-between">
        <h2>Request details</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={handleSubmit(approveRequest)}>
            Approve Request
          </button>
          <button className="btn btn-outline-primary" onClick={handleSubmit(rejectRequest)}>
            Reject Request
          </button>
          <button className="btn btn-primary" onClick={handleSubmit(reviewRequest)}>
            Submit for Review
          </button>
          <Link to={`/requests/edit/${request.id}`} className="btn btn-primary">
            Edit Request
          </Link>
        </div>
      </header>
      <>
        {busy && (
          <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
            <div className=" spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </section>
        )}
        {request && (
          <>
            <section className=" d-flex flex-row gap-5 p-4 w-100 mt-4 justify-content-between">
              <dl>
                <dt>Description</dt>
                <dd>{request.description}</dd>
                <dt>Justification</dt>
                <dd>{request.justification}</dd>
              </dl>
              <dl>
                <dt>Delivery Method</dt>
                <dd>{request.deliveryMode}</dd>
                <dt>Status</dt>
                <dd className="badge text-bg-primary">{request.status}</dd>
              </dl>
              <dl>
                <dt>Requested By</dt>
                <dd>
                  {request.user?.firstname} {request.user?.lastname}
                </dd>
              </dl>
            </section>
            <section className="card p-4 mt-4 w-100">
              <header className="d-flex justify-content-between">
                <h5>Items</h5>
              </header>
              <RequestLineTable request={request} onRemove={removeRequestLine} />

              <div>
                <Link
                  className="btn btn-outline-primary px-1 ms-1"
                  to={`/requests/detail/${request.id}/requestline/create`}
                >
                  + Add a line
                </Link>
              </div>
            </section>
          </>
        )}
      </>
    </>
  );
}
