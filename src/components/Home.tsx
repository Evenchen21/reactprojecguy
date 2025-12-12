import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import NavBar from "./NavBar";
import CardInterface from "../Interfaces/Card";
import { getAllCards } from "../Services/CardService";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import CreateCardModal from "./CreateCardModal";

interface HomeProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  isBusiness?: boolean;
  user?: any;
}

const Home: FunctionComponent<HomeProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const fetchCards = () => {
    getAllCards()
      .then((res) => {
        console.log("Cards received:", res.data);
        console.log("Number of cards:", res.data.length);
        setCards(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
        console.error("Error details:", err.response?.data || err.message);
      });
  };

  useEffect(() => {
    // Checking if user is logged in
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
    fetchCards();
  }, []);

  return (
    <>
      <NavBar />

      <div className="container">
        <div className="d-flex justify-content-start mt-3 ms-1">
          <button
            className="btn btn-dark btn-lg"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </div>
      </div>
      <div className="container">
        {/* Add Card Button - Top Right Corner */}
        {(isLoggedIn || user?.isBusiness) && (
          <div className="d-flex justify-content-end mt-3 mb-3">
            <button className="btn btn-primary btn-lg me-3">
              <i className="fa-solid fa-circle-plus me-2"></i>
              Add Card
            </button>
          </div>
        )}
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
                  <Card.Footer className="bg-white border-0 d-flex justify-content-between align-items-center">
                    {/* Buttons */}
                    <button className="btn btn-link border-0 p-0 text-muted">
                      <i
                        className="fa-solid fa-phone"
                        style={{ fontSize: "1.3rem" }}
                      ></i>
                    </button>

                    <div className="d-flex gap-3">
                      {(isAdmin || user?.isBusiness) && (
                        <>
                          <button
                            className="btn btn-link border-0 p-0 text-muted"
                            onClick={() => {
                              setSelectedCardId(card.id || "");
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>

                          <button
                            className="btn btn-link border-0 p-0 text-muted"
                            onClick={() => {
                              setSelectedCardId(card.id || "");
                              setShowUpdateModal(true);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </>
                      )}

                      {(isLoggedIn || user?.isBusiness) && (
                        <button className="btn btn-link border-0 p-0 text-muted">
                          <i className="fa-solid fa-heart"></i>
                        </button>
                      )}
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <> NO CARDS </>
        )}
      </div>

      {/* Modals */}
      <CreateCardModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        refresh={fetchCards}
      />
      <DeleteCardModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        cardId={selectedCardId}
        refresh={fetchCards}
      />
      <UpdateCardModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        cardId={selectedCardId}
        refresh={fetchCards}
      />
    </>
  );
};

export default Home;
