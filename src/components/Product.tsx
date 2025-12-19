import { FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { getAllCards } from "../Services/CardService";
import Product from "../Interfaces/Product";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch all products on component
  useEffect(() => {
    getAllCards()
      .then((res: { data: SetStateAction<Product[]> }) => {
        setProducts(res.data);
      })
      .catch((err: any) => {
        <></>;
      });
  }, []);

  return (
    <>
      {/* Display products in a grid   */}
      <div className="container">
        <h4 className="display-4 text-center">PRODUCTS</h4>
        <div className="row">
          {products.length ? (
            products.map((product: Product) => (
              <div
                className="card col-md-3"
                key={product.id}
                style={{ width: "18rem" }}
              >
                <div className="card-header">{product.category}</div>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text text-success">{product.price}₪</p>
                  {!product.quantity && (
                    <p className="text-center text-danger">Out of stock!</p>
                  )}
                  <button
                    className="btn btn-primary"
                    disabled={!product.quantity}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Add to Card
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products</p> // Show message if no products are available
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
