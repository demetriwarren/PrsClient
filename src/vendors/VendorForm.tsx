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
        
    </>
  );
}
