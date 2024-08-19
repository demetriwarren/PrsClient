import { Link } from "react-router-dom";
import { Vendor } from "./Vendor";
import { SyntheticEvent } from "react";

interface VendorCardProps {
    vendor: Vendor;
    onRemove: (vendor: Vendor) => void;
}

export function VendorCard({vendor, onRemove}: VendorCardProps){
    return (
    <div className="card p-4 " style={{width: "25rem"}} >
        <div className="card-body ">
            <div>
                <h5 className="card-title">{vendor.name}</h5>
                <span className="badge text-bg-secondary">{vendor.code}</span>
            </div>
            <div className="mt-4">
                <p className="m-0">{vendor.address}</p>
                <p className="m-0">{`${vendor.city}, ${vendor.state} ${vendor.zip}`}</p>
                <p className="m-0">{vendor.phone}</p>
                <p className="m-0">{vendor.email}</p>
            </div>
            <div>
                <Link to={`edit/${vendor.id}`}>Edit</Link> |
                <a className="ms-1 hover" onClick={(event: SyntheticEvent) =>{
                    event.preventDefault();
                    onRemove(vendor);
                }}>Delete</a>
            </div>

        </div>

    </div>
    )
}