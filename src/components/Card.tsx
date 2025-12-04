import { FunctionComponent, useEffect, useState } from "react";
import Product from "../Interfaces/Product";
import { getUserCart } from "../Services/cartsService";
import { Card } from "react-bootstrap";
import NavBar from "./NavBar";

interface CardProps {}

const Cart: FunctionComponent<CardProps> = () => {
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  useEffect(() => {
    getUserCart()
      .then((res) => {
        setProductsInCart(res.data[0].products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <h4 className="display-4 text-center my-4">CART</h4>
        {productsInCart.length ? (
          <div className="row">
            {productsInCart.map((product: Product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <Card className="h-100 shadow">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {product.description}
                    </Card.Text>
                    <hr />
                    <p className="mb-1">
                      <strong>Phone:</strong> 050-0000000
                    </p>
                    <p className="mb-1">
                      <strong>Address:</strong> test 3 test
                    </p>
                    <p className="mb-1">
                      <strong>Card Number:</strong> {product.id}
                    </p>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 d-flex justify-content-end">
                    <i
                      className="fa-solid fa-phone text-muted"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No info in cards</p>
        )}
      </div>
    </>
  );
};

export default Cart;
