import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import NavBar from "./NavBar";
import CardInterface from "../Interfaces/Card";
import { getAllCards, updateCard } from "../Services/CardService";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import CreateCardModal from "./CreateCardModal";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  isBusiness?: boolean;
  user?: any;
}

const Home: FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();
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
        const normalized = (res.data || []).map((c: any) => ({
          ...c,
          id: c.id || c._id,
          likes: c.likes || [],
          isLikedCards: c.isLikedCards ?? false,
        }));
        setCards(normalized);
      })
      .catch((err) => {
        // Error fetching cards
        setCards([]);
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

  const currentUserId = user?._id || user?.id || user?.userId || "";

  const isCardLiked = (card: CardInterface) => {
    if (!currentUserId) return false;
    return (card.likes || []).includes(currentUserId);
  };

  const toggleFavorite = async (card: CardInterface) => {
    if (!card.id) return;
    if (!currentUserId) {
      return;
    }

    try {
      const liked = isCardLiked(card);
      const nextLikes = liked
        ? (card.likes || []).filter((id) => id !== currentUserId)
        : [...(card.likes || []), currentUserId];

      const updatedCard = {
        ...card,
        likes: nextLikes,
        isLikedCards: !liked,
      };

      await updateCard(card.id, updatedCard);

      setCards((prev) => prev.map((c) => (c.id === card.id ? updatedCard : c)));
    } catch (error) {
      // handle error silently for now
    }
  };

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
              <div className="col-md-4 mb-4" key={card.id || ""}>
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

                      {isLoggedIn && (
                        <button
                          className="btn btn-link border-0 p-0 text-muted"
                          onClick={() => toggleFavorite(card)}
                        >
                          {isCardLiked(card) ? (
                            <i className="fa-solid fa-heart text-danger"></i>
                          ) : (
                            <i className="fa-regular fa-heart"></i>
                          )}
                        </button>
                      )}
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <> NO_CARDS_IS_AVAILABLE</>
        )}
      </div>

      {/* Modals DO NOT TOUCH */}
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

      {isLoggedIn && (
        <>
          {/* Footer navigation */}
          <footer className="footer-nav">
            <div className="footer-nav-inner">
              <button
                type="button"
                className="footer-nav-item"
                onClick={() => navigate("/home#about")}
              >
                <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
                <span>About</span>
              </button>
              <button
                type="button"
                className="footer-nav-item"
                onClick={() => navigate("/home")}
              >
                <i className="fa-solid fa-heart" aria-hidden="true"></i>
                <span>Favorites</span>
              </button>
              <button
                type="button"
                className="footer-nav-item"
                onClick={() => navigate("/home")}
              >
                <i className="fa-solid fa-id-card" aria-hidden="true"></i>
                <span>My Cards</span>
              </button>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default Home;
