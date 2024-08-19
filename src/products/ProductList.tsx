import { useEffect, useState } from "react";

import { productAPI } from "./ProductApi";
import { Product } from "./Product";
import { ProductCard } from "./ProductCard";
import toast from "react-hot-toast";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadProducts() {
    try {
      setBusy(true);
      let data = await productAPI.list();
      setProducts(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function remove(product: Product){
    if(confirm("Are you sure you want to delete this product?"))
        if(product.id){
            await productAPI.delete(product.id);
            let updatedProducts = products.filter((p) => p.id !== product.id);
            setProducts(updatedProducts);
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
        <section className="d-flex flex-wrap gap-5">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onRemove={remove}/>
            ))}
        </section>
    </>
  )
}
