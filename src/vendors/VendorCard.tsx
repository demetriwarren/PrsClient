import { Link } from "react-router-dom";
import { Vendor } from "./Vendor";

interface VendorCardProps {
    vendor: Vendor;
    onRemove: (vendor: Vendor) => void;
}

export function VendorCard({vendor, onRemove}: VendorCardProps){
    return (
    <div className="card p-4 ">
        <div className="card-body ">
            <div className="d-flex ">
                <h2 className="card-title">{vendor.name}</h2>
                <span className="badge">{vendor.code}</span>
            </div>
            <div>
                <span>{vendor.address}</span>
                <span>{`${vendor.city}, ${vendor.state} ${vendor.zip}`}</span>
                <span>{vendor.phone}</span>
                <span>{vendor.email}</span>
            </div>

        </div>

    </div>
    )
}