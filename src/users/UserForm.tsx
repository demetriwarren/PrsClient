import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "./User";
import { userAPI } from "./UserApi";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: async () => {
      if (!userId) {
        return Promise.resolve(new User());
      } else {
        return await userAPI.find(userId);
      }
    },
  });

  const save: SubmitHandler<User> = async (user: User) => {
    try {
      if (user.isNew) {
        await userAPI.post(user);
      } else {
        await userAPI.put(user);
      }
      navigate("/users");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="w-100 gap-4" onSubmit={handleSubmit(save)}>
        <div className="row-1 d-flex w-75 gap-2">
          <div className="w-100">
            <label className="form-label " htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required." })}
              type="text"
              className={`form-control ${errors.username && "is-invalid"}`}
              placeholder="Enter a username"
            />
            <div className="invalid-feedback">{errors?.username?.message}</div>
          </div>
          <br />
          <div className="w-100">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required." })}
              type="password"
              className={`form-control w-100 ${errors.password && "is-invalid"} password`}
              placeholder="Enter a password"
            />
            <div className="invalid-feedback">{errors?.password?.message}</div>
          </div>
        </div>
        <br />
        <div className="row-2 d-flex w-75 gap-2">
          <div className="w-100">
            <label className="form-label " htmlFor="firstName">
              First Name
            </label>
            <input
              {...register("firstname", { required: "First name is required." })}
              type="text"
              className={`form-control ${errors.firstname && "is-invalid"}`}
              placeholder="Enter a first name"
            />
            <div className="invalid-feedback">{errors?.firstname?.message}</div>
          </div>
          <br />
          <div className="w-100">
            <label className="form-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              {...register("lastname", { required: "Last name is required." })}
              type="text"
              className={`form-control w-100 ${errors.lastname && "is-invalid"} password`}
              placeholder="Enter a last name"
            />
            <div className="invalid-feedback">{errors?.lastname?.message}</div>
          </div>
        </div>
        <br />
        <div className="row-3 d-flex gap-3">
          <div className="w-25">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input {...register("phone")} type="text" className="form-control" placeholder="Enter a phone number" />
          </div>
          <div className="w-50">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input {...register("email")} type="text" className="form-control" placeholder="Enter an email address" />
          </div>
        </div>
        <br />
            <span>Role:</span>
            
        <div className="row-4 d-flex gap-3 mt-1 px-1">
          <div>
            <input className="me-2" type="checkbox" id="isAdmin" {...register("isAdmin")} />
            <label htmlFor="isAdmin">Admin</label>
          </div>
          <div>
            <input className="me-2" type="checkbox" id="isReviewer" {...register("isReviewer")} />
            <label htmlFor="isReviewer">Reviewer</label>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-end gap-2">
          <Link to="/users" className="btn btn-outline-primary">
            Cancel
          </Link>
          <button className="btn btn-primary" onSubmit={handleSubmit(save)}>
            Save User
          </button>
        </div>
      </form>
    </>
  );
}
