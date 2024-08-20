import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "./Product";
import { productAPI } from "./ProductApi";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { Vendor } from "../vendors/Vendor";
import { vendorAPI } from "../vendors/VendorApi";

export function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: async () => {
      let vendorsData = await vendorAPI.list();
      setVendors(vendorsData);

      if (!productId) {
        return Promise.resolve(new Product());
      } else {
        return await productAPI.find(productId);
      }
    },
  });

  const save: SubmitHandler<Product> = async (product: Product) => {
    try {
      if (product.isNew) {
        await productAPI.post(product);
      } else {
        await productAPI.put(product);
      }
      navigate("/products");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="w-100 gap-4" onSubmit={handleSubmit(save)}>
        <div className="row-1 d-flex w-75 gap-2">
          <div className="w-100">
            <label className="form-label " htmlFor="partNbr">
              Part Number
            </label>
            <input
              {...register("partNbr", { required: "Part number is required." })}
              type="text"
              className={`form-control ${errors.partNbr && "is-invalid"}`}
              placeholder="Enter a part number"
            />
            <div className="invalid-feedback">{errors?.partNbr?.message}</div>
          </div>
          <br />
          <div className="w-100">
            <label className="form-label" htmlFor="name">
              Product Name
            </label>
            <input
              {...register("name", { required: "Product name is required." })}
              type="text"
              className={`form-control w-100 ${errors.name && "is-invalid"}`}
              placeholder="Enter a product name"
            />
            <div className="invalid-feedback">{errors?.name?.message}</div>
          </div>
        </div>
        <br />
        <div className="row-2 d-flex w-75 gap-2">
          <div className="w-25">
            <label className="form-label " htmlFor="price">
              Price
            </label>
            <input
              {...register("price", { required: "Price is required." })}
              type="text"
              className={`form-control ${errors.price && "is-invalid"}`}
              placeholder="Enter product's price"
            />
            <div className="invalid-feedback">{errors?.price?.message}</div>
          </div>
          <br />
          <div className="w-25">
            <label className="form-label" htmlFor="lastName">
              Unit
            </label>
            <input
              {...register("unit", { required: "Unit is required." })}
              type="text"
              className={`form-control w-100 ${errors.unit && "is-invalid"}`}
              placeholder="Enter a unit"
            />
            <div className="invalid-feedback">{errors?.unit?.message}</div>
            <br />
          </div>
          <div className="w-50 ms-2 pt-1">
            <label htmlFor="vendorId">Vendor</label>
            <select
              className={`form-select mt-1 ${errors.vendorId && "is-invalid"}`}
              id="vendorId"
              {...register("vendorId", { required: "Vendor is required."})}
            >
              <option value="">--- Select a vendor ---</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors?.vendorId?.message}</div>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-end gap-2 w-75">
          <Link to="/products" className="btn btn-outline-primary">
            Cancel
          </Link>
          <button className="btn btn-primary" onSubmit={handleSubmit(save)}>
            Save Product
          </button>
        </div>
      </form>
    </>
  );
}
