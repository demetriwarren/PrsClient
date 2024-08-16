import { useEffect, useState } from "react";

import { vendorAPI } from "./VendorApi";
import { Vendor } from "./Vendor";

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

  
}
