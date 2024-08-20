import { Link } from "react-router-dom";
import { Product } from "./Product";
import { SyntheticEvent } from "react";


interface ProductCardProps {
    product: Product;
    onRemove: (product: Product) => void;
}

export function ProductCard({product, onRemove}: ProductCardProps){
    return (
    <div className="card p-4 " style={{width: "25rem"}} >
        <div className="card-body ">
            <div>
                <h5 className="card-title">{product.name}</h5>
                <span className="">${product.price} / {product.unit}</span>
            </div>
            <div className="mt-4">
                <p className="m-0">{product.id}</p>
                <p className="m-0 badge text-bg-secondary">{product.partNbr}</p>
            </div>
            <div className="mt-3">
                <Link className="btn btn-outline-primary px-2 py-1" to={`edit/${product.id}`}>Edit</Link>
                <a className="ms-2 btn btn-outline-primary px-2 py-1" onClick={(event: SyntheticEvent) =>{
                    event.preventDefault();
                    onRemove(product);
                }}>Delete</a>
            </div>

        </div>

    </div>
    )
}