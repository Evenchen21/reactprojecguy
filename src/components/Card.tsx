import { FunctionComponent, useEffect, useState } from "react";
import CardInterface from "../Interfaces/Card";
import { getAllCards } from "../Services/CardService";
import { Card } from "react-bootstrap";
import NavBar from "./NavBar";

interface CardProps {}

const Cart: FunctionComponent<CardProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  // Fetch all cards on component
  useEffect(() => {
    getAllCards()
      .then((res: any) => {
        setCards(res.data || []);
      })
      .catch((err: any) => {
        <></>;
      });
  }, []);

  return (
    <>
      <NavBar />
      {/* Display user's cards */}
      <div className="container">
        <h4 className="display-4 text-center my-4">My Cards</h4>
        {cards.length ? (
          <div className="row">
            {cards.map((cardItem: CardInterface) => (
              <div className="col-md-4 mb-4" key={cardItem.id}>
                <Card className="h-100 shadow">
                  <Card.Img
                    variant="top"
                    src={cardItem.image.url}
                    alt={cardItem.image.alt}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{cardItem.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {cardItem.subtitle}
                    </Card.Text>
                    <hr />
                    <p className="mb-1">
                      <strong>Phone:</strong> {cardItem.phone}
                    </p>
                    <p className="mb-1">
                      <strong>Address:</strong> {cardItem.address.street}{" "}
                      {cardItem.address.houseNumber}
                    </p>
                    <p className="mb-1">
                      <strong>Card Number:</strong> {cardItem.bizNumber}
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
