import { useNavigate, useParams } from "react-router-dom";
import { Request } from "./Request";
import { requestAPI } from "./RequestApi";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "../users/User"
import { useState } from "react";
import { userAPI } from "../users/UserApi";

export function RequestForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const requestId = Number(id);
  const [users, setUsers] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>({
    defaultValues: async () => {
        let usersData = await userAPI.list();
        setUsers(usersData);

      if (!requestId) {
        return Promise.resolve(new Request({userId: 61}));
      } else {
        return await requestAPI.find(requestId);
      }
    },
  });

  const save: SubmitHandler<Request> = async (request: Request) => {
    try {
      if (request.isNew) {
        await requestAPI.post(request);
        toast.success("Request created successfully!");
      } else {
        await requestAPI.put(request);
        toast.success("Request updated successfully!");
      }
      navigate("/requests");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <form className=" " onSubmit={handleSubmit(save)}>
        <div className="d-flex ">
          <section className="box1 container">
            <div className="w-75">
              <label htmlFor="description">Description</label>
              <input
                className={`form-control ${errors.description && "is-invalid"} mt-2`}
                type="text"
                {...register("description", { required: "Description is required" })}
                placeholder="Enter a brief description for your purchase request"
              />
              <div className="invalid-feedback">{errors?.description?.message}</div>
              <br />
            </div>

            <div className="w-75">
              <label htmlFor="justification">Justification</label>
              <input
                className={`form-control ${errors.justification && "is-invalid"} mt-2`}
                type="text"
                {...register("justification", { required: "Justification is required" })}
                placeholder="Enter a brief justification for your purchase request"
              />
              <div className="invalid-feedback">{errors?.justification?.message}</div>
            </div>
          </section>

          <section className="box2 container">
            <div className="w-50">
              <label htmlFor="deliveryMode">Delivery Method</label>
              <select
                className={`form-select mt-2 ${errors.deliveryMode && "is-invalid"} `}
                 
                id="deliveryMode"
                {...register("deliveryMode", { required: "Delivery method is required" })}
              >
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
                <option value="Signature Delivery">Signature Delivery</option>
              </select>
              <br />
            </div>

            <div className="w-50">
              <label htmlFor="Status">Status</label>
              <select
                className={`form-select mt-2 ${errors.status && "is-invalid"}`}
                id="deliveryMethod"
                {...register("status", { required: "Status is required" })}
              >
                <option value="">Select...</option>
                <option value="NEW">New</option>
                <option value="REVIEW">Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <br />
            </div>

            <div className="w-50">
              <label htmlFor="requestedBy">Requested By</label>
              <select className="form-select mt-2" id="requestedBy" {...register("userId", {valueAsNumber: true})}>
                <option value="-1">Select...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstname} {user.lastname}
                  </option>
                ))}
              </select>
              <br />
            </div>

          </section>
        </div>
        <div className="row-4 d-flex justify-content-end w-75">
          <a className="btn btn-outline-primary" href="/requests">
            Cancel
          </a>
          <button className="btn btn-primary ms-2">Save request</button>
          
        </div>
      </form>
    </>
  );
}
