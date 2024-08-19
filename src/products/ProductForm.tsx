import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "./Product";
import { productAPI } from "./ProductApi";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: async () => {
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
        
    </>
  );
}
