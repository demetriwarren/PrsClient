import { Link, useNavigate, useParams } from "react-router-dom";
import { Vendor } from "./Vendor";
import { vendorAPI } from "./VendorApi";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function VendorForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vendorId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vendor>({
    defaultValues: async () => {
      if (!vendorId) {
        return Promise.resolve(new Vendor());
      } else {
        return await vendorAPI.find(vendorId);
      }
    },
  });

  const save: SubmitHandler<Vendor> = async (vendor: Vendor) => {
    try {
      if (vendor.isNew) {
        await vendorAPI.post(vendor);
      } else {
        await vendorAPI.put(vendor);
      }
      navigate("/vendors");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="w-100 gap-4" onSubmit={handleSubmit(save)}>
        <div className="row-1 d-flex w-75 gap-2">
          <div className="w-50">
            <label className="form-label " htmlFor="code">
              Vendor Code
            </label>
            <input
              {...register("code", { required: "Vendor code is required." })}
              type="text"
              className={`form-control ${errors.code && "is-invalid"}`}
              placeholder="Enter a vendor code"
            />
            <div className="invalid-feedback">{errors?.code?.message}</div>
          </div>
          <br />
          <div className="w-100">
            <label className="form-label" htmlFor="name">
              Vendor Name
            </label>
            <input
              {...register("name", { required: "Vendor name is required." })}
              type="text"
              className={`form-control w-100 ${errors.name && "is-invalid"}`}
              placeholder="Enter a vendor name"
            />
            <div className="invalid-feedback">{errors?.name?.message}</div>
          </div>
        </div>
        <br />
        <div>

        <div className="w-75">
          <label className="form-label" htmlFor="address">
            Address
          </label>
          <input
            {...register("address", { required: "Address is required." })}
            type="text"
            className={`form-control ${errors.address && "is-invalid"}`}
            placeholder="Enter an address"
            />
          <div className="invalid-feedback">{errors?.address?.message} </div>
        </div>
        <br />
        <div className="d-flex gap-3 w-75">
          <div className="w-50">
            <label className="form-label" htmlFor="city">
              City
            </label>
            <input
              {...register("city", { required: "City is required." })}
              type="text"
              className={`form-control w-100 ${errors.city && "is-invalid"}`}
              placeholder="Enter a city"
              />
            <div className="invalid-feedback">{errors?.city?.message}</div>
          </div>
          <br />
          <div className="w-25">
            <label className="form-label" htmlFor="state">
              State
            </label>
            <select
              {...register("state", { required: "State is required." })}
              className={`form-control w-100 ${errors.state && "is-invalid"}`}
              >
              <option value="">--Select a State--</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <div className="invalid-feedback">{errors?.state?.message}</div>
          </div>
          <br />
          <div className="w-25">
            <label className="form-label" htmlFor="zip">
              Zip Code
            </label>
            <input
              {...register("zip", { required: "Zip code is required." })}
              type="text"
              className={`form-control w-100 ${errors.zip && "is-invalid"}`}
              placeholder="Enter a zip code"
              />
            <div className="invalid-feedback">{errors?.zip?.message}</div>
          </div>
        </div>
              </div>
        <br />
        <div className="d-flex gap-3 w-75">
          <div className="w-25">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input {...register("phone")} type="text" className="form-control" placeholder="Enter a phone number" />
          </div>
          <div className="w-75">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input {...register("email")} type="text" className="form-control" placeholder="Enter an email address" />
          </div>
        </div>
        <br />
        <br />
        <div className="d-flex justify-content-end gap-2 w-75">
          <Link to="/vendors" className="btn btn-outline-primary">
            Cancel
          </Link>
          <button className="btn btn-primary" onSubmit={handleSubmit(save)}>
            Save Vendor
          </button>
        </div>
      </form>
    </>
  );
}
