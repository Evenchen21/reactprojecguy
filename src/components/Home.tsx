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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const fetchCards = () => {
    getAllCards()
      .then((res) => {
        const normalized = res.data.map((c: any) => ({
          ...c,
          id: c.id || c._id,
        }));
        setCards(normalized);
      })
      .catch((err) => {
        // Error fetching cards
      });
  };

  useEffect(() => {
    // Checking if user is logged in and get user details
    const userId = sessionStorage.getItem("userId");
    const userDetailsStr = sessionStorage.getItem("userDetails");

    if (userId && userDetailsStr) {
      setIsLoggedIn(true);
      try {
        const userDetails = JSON.parse(userDetailsStr);
        setUser(userDetails);
        setIsAdmin(userDetails.isAdmin || false);
        setIsBusiness(userDetails.isBusiness || false);
      } catch (error) {
        <></>;
      }
    }
    fetchCards();
  }, []);

  return (
    <>
      <NavBar />
      {/* add Create Card Button */}
      <div className="container">
        {(isBusiness || isAdmin) && (
          <div className="d-flex justify-content-end mt-3 ms-1">
            <button
              className="btn btn-dark btn-lg"
              onClick={() => setShowCreateModal(true)}
            >
              <i className="fa-solid fa-circle-plus me-2"></i>
              Add Card
            </button>
          </div>
        )}

        <h4 className="display-4 text-center my-4">Business Cards</h4>
        {cards.length ? (
          <div className="row">
            {cards.map((card: CardInterface) => (
              <div className="col-md-4 mb-4" key={card.id || (card as any)._id}>
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
                      {(isAdmin || isBusiness) && (
                        <>
                          <button
                            className="btn btn-link border-0 p-0 text-muted"
                            onClick={() => {
                              setSelectedCardId(
                                card.id || (card as any)._id || ""
                              );
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>

                          <button
                            className="btn btn-link border-0 p-0 text-muted"
                            onClick={() => {
                              setSelectedCardId(
                                card.id || (card as any)._id || ""
                              );
                              setShowUpdateModal(true);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </>
                      )}

                      {isLoggedIn && (
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
