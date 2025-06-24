import React, {useState} from "react";
import {useParams} from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound.";
import {useNavigate} from "react-router-dom";

export default function Detail() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [sku, setSku] = useState("")

    const { data: product, loading, error } = useFetch(
        `products/${id}`
    );

    if (error) throw error;
    if (loading) return <Spinner />;
    if (product.length === 0) return <PageNotFound />;

    return (
      <div id="detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        <select
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
          >
            <option value="">What size</option>
            {product.skus.map((sku) => (
                <option key={sku.sku} value={sku.sku}>{sku.size}</option>
            ))}
        </select>
        <p>
            <button
                className="btn btn-primary"
                disabled={!sku}
                onClick={()=> navigate("/cart")}
            >
                add to cart
            </button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
      </div>
    );
}