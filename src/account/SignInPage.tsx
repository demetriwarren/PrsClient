import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { userAPI } from "../users/UserApi";

import { User } from "../users/User";
import toast from "react-hot-toast";
import { useUserContext } from "../users/UserContext";

interface IAccount {
  username: string;
  password: string;
}

let emptyAccount = {
  username: "",
  password: "",
};

function persistUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function SignInPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccount>({
    defaultValues: async () => {
      return emptyAccount;
    },
  });
  const { setUser } = useUserContext();

  const signin: SubmitHandler<IAccount> = async (account) => {
    try {
      const user = await userAPI.findByAccount(account.username, account.password);
      persistUser(user);
      setUser(user);

      navigate("/");
    } catch (error: any) {
      toast.error("Unsuccessful sign in. Please try again.");
    }
  };

  return (
    <main className="signin d-flex flex-column gap-4 justify-content-center align-items-center">
      <svg id="logo-35" width={75} height={50} viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF" />
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          className="ccustom"
          fill="#312ECB"
        />
      </svg>
      <span className="mx-2 fw-semibold">Purchase Request System</span>
      <div className="card w-25 h-25 p-4">
        <h4 className="card-title">Sign in</h4>
        <form className="d-flex flex-column" onSubmit={handleSubmit(signin)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              {...register("username", {
                required: "Username is required",
              })}
              type="text"
              className={`form-control ${errors?.username && "is-invalid"} `}
            />
            <div className="invalid-feedback">{errors?.username?.message}</div>
          </div>
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              className={`form-control ${errors?.password && "is-invalid"} `}
            />
            <div className="invalid-feedback">{errors?.password?.message}</div>
          </div>
          <div className="mb-4 form-text">
            <a href="#">Forgot It?</a>
          </div>
          <div className="mb-3 d-grid gap-2">
            <button className="btn btn-lg btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </main>
  );
}
