import { Link } from "react-router-dom";
import { Product } from "./Product";

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
                <span className="badge text-bg-secondary">{product.price}</span>
            </div>
            <div className="mt-4">
                <p className="m-0">{product.name}</p>

            </div>
            <div>
                <Link to={`edit/${product.id}`}>Edit</Link> |
                <Link to="remove/:id" className="ms-1">Delete</Link>
            </div>

        </div>

    </div>
    )
}