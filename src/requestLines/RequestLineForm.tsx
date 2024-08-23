import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RequestLine } from "./RequestLine";
import toast from "react-hot-toast";
import { requestLineAPI } from "./RequestLineApi";
import { useState } from "react";
import { productAPI } from "../products/ProductApi";
import { Product } from "../products/Product";

export function RequestLineForm() {
  const navigate = useNavigate();
  let { requestLineId: requestLineIdAsString } = useParams<{ requestLineId: string }>();
  let { requestId: requestIdAsString } = useParams<{ requestId: string }>();
  let requestLineId = Number(requestLineIdAsString);
  let requestId = Number(requestIdAsString);
  const [products, setProducts] = useState<Product[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestLine>({
    defaultValues: async () => {
      let productsData = await productAPI.list();
      setProducts(productsData);

      if (!requestLineId) {
        let newRequestLine = new RequestLine({ requestId: requestId });
        return Promise.resolve(newRequestLine);
      } else {
        return await requestLineAPI.find(requestLineId);
      }
    },
  });

  const save: SubmitHandler<RequestLine> = async (requestLine) => {
    try {
      if (requestLine.isNew) {
        await requestLineAPI.post(requestLine);
      } else {
        await requestLineAPI.put(requestLine);
      }
      navigate(`/requests/detail/${requestId}?lastUpdated=${Date.now()}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form className="w-50" onSubmit={handleSubmit(save)} noValidate>
      <div className="mb-3">
        <label className="form-label" htmlFor="product">
          Product
        </label>
        <select
          {...register("productId", {
            required: "Product is required",
          })}
          className={`form-select ${errors.requestId && "is-invalid"} `}
          id="productId"
        >
          <option value="">Select...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.productId?.message}</div>
      </div>
          <div>
            <label htmlFor="price">Price</label>                                                {/* product price is here */}
            <p>$0.00</p>
          </div>


      <div className="mb-3">
        <label className="form-label" htmlFor="quantity">
          Quantity
        </label>
        <input
          {...register("quantity", {
            required: "Quantity is required",
          })}
          className="form-control"
          type="text"
          id="quantity"
        />
        <div className="invalid-feedback">{errors?.quantity?.message}</div>
      </div>

      <div>
        <label htmlFor="amount">Amount</label>                                          {/* Product * quantity total goes here  */}
        <p>$0.00</p>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <Link className="btn btn-outline-primary" to={`/requests/detail/${requestId}`}>
          Cancel
        </Link>
        <button className="btn btn-primary">Save line</button>
      </div>
    </form>
  );
}
