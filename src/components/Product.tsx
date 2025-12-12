import { FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { getAllProducts } from "../Services/productsService";
import Product from "../Interfaces/Product";
import { addToCard } from "../Services/cartsService";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((res: { data: SetStateAction<Product[]> }) => {
        setProducts(res.data);
      })
      .catch((err: any) => {
        // Error fetching products
      });
  }, []);

  return (
    <>
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
                    onClick={() => {
                      addToCard(product)
                        .then(() => {
                          alert("Product was added to card successfully!");
                        })
                        .catch((err: any) => {
                          // Error adding to card
                        });
                    }}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Add to Card
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
