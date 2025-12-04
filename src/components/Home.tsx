import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import NavBar from "./NavBar";
import CardInterface from "../Interfaces/Card";
import { getAllCards } from "../Services/CardService";
import { log } from "console";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Checking if user is logged in
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }

    console.log("API URL:", process.env.REACT_APP_API);
    getAllCards()
      .then((res) => {
        console.log("Cards received:", res.data);
        setCards(res.data);
      })
      .catch((err) => {
        console.log("Error fetching cards:");
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <h4 className="display-4 text-center my-4">Business Cards</h4>
        {cards.length ? (
          <div className="row">
            {cards.map((card: CardInterface) => (
              <div className="col-md-4 mb-4" key={card.id}>
                <Card className="h-100 shadow">
                  <Card.Img
                    variant="top"
                    src={card.image.url}
                    alt={card.image.alt}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {card.subtitle}
                    </Card.Text>
                    <hr />
                    <p className="mb-1">
                      <strong>Phone:</strong> {card.phone}
                    </p>
                    <p className="mb-1">
                      <strong>Address:</strong> {card.address.street}{" "}
                      {card.address.houseNumber}
                    </p>
                    <p className="mb-1">
                      <strong>Card Number:</strong> {card.bizNumber}
                    </p>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 d-flex justify-content-end">
                    <i
                      className="fa-solid fa-phone text-muted"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    {isLoggedIn ? (
                      <>
                        <button style={{ margin: "0 8px" }}>
                          <i
                            className="fa-solid fa-heart"
                            style={{ marginRight: "6px" }}
                          ></i>{" "}
                        </button>
                      </>
                    ) : (
                      <> </>
                    )}
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">-- No cards available---</p>
        )}
      </div>
    </>
  );
};

export default Home;
