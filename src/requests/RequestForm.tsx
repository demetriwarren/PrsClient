import { Link, useNavigate, useParams } from "react-router-dom";
import { Request } from "./Request";
import { requestAPI } from "./RequestApi";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function RequestForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const requestId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>({
    defaultValues: async () => {
      if (!requestId) {
        return Promise.resolve(new Request());
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
      <form className="w-75" onSubmit={handleSubmit(save)}>
        
        

        <div className="leftRow ">

        <div className=" w-50">
            <label htmlFor="description">Description</label>
            <input className={`form-control ${errors.description && "is-invalid"}`} type="text" {...register("description", {required:"Description is required"})} placeholder="Enter a brief description for your purchase request"/>
            <div className="invalid-feedback">{errors?.description?.message}</div>
        </div>
        <br />
        <div className="w-50">
            <label htmlFor="justification">Justification</label>
            <input className={`form-control ${errors.justification && "is-invalid"}`} type="text" {...register("justification", {required:"Justification is required"})} placeholder="Enter a brief justification for your purchase request"/>
            <div className="invalid-feedback">{errors?.justification?.message}</div>
        </div>
        </div>
        <br />
        <div className="row-3 w-50">
            
            <div>
            <label htmlFor="deliveryMethod">Delivery Method</label>
            <select className="form-select" id="deliveryMethod">
                <option value="">Select Delivery Method</option>
            </select>
            </div>
            
            <div>

            <label htmlFor="Status">Status</label>
            <select className="form-select" id="deliveryMethod">
                <option value="">Select Status</option>
            </select>
            </div>
            
            <div >

            <label htmlFor="requestedBy">Requested By</label>
            <select className="form-select" id="deliveryMethod">
            <option value="">Select Requested By</option></select>
            </div>
                





        </div>




        <div className="row-4 d-flex justify-content-end">
          <a className="btn btn-outline-primary" href="/requests">
            Cancel
          </a>
          <button className="btn btn-primary ms-2">Save request</button>
        </div>
      </form>
    </>
  );
}
