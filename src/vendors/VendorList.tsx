import { useEffect, useState } from "react";

import { vendorAPI } from "./VendorApi";
import { Vendor } from "./Vendor";
import { VendorCard } from "./VendorCard";
import toast from "react-hot-toast";

//gonna have the useState of vendors/useForm in here
//need the busy state,
export function VendorList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [busy, setBusy] = useState(false);

  //async function loadVendors() which has a var called data, which awaits the VendorAPIlist
  async function loadVendors() {
    try {
      setBusy(true);
      let data = await vendorAPI.list();
      setVendors(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  //useEffect() - needed for the API calls. Has an open array for rendering only after first render. loadVendors inside of the arrow function
  useEffect(() => {
    loadVendors();
  }, []);

  async function remove(vendor: Vendor){
    if(confirm("Are you sure you want to delete this vendor?"))
        if(vendor.id){
            await vendorAPI.delete(vendor.id);
            let updatedVendors = vendors.filter((v) => v.id !== vendor.id);
            setVendors(updatedVendors);
            toast.success("Successfully deleted.");
        }
  }

  return (
    <>
        {busy && (
            <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </section>
        )}
        <section className="d-flex flex-wrap gap-2">
            {vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} onRemove={remove}/>
            ))}
        </section>
    </>
  )
}
