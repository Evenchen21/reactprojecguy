import { FunctionComponent, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import NavBar from "./NavBar";
import CardInterface from "../Interfaces/Card";
import { getAllCards } from "../Services/CardService";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import CreateCardModal from "./CreateCardModal";
import Footer from "./Footer";
import { toast } from "react-toastify";

interface HomeProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  isBusiness?: boolean;
  user?: any;
}

const Home: FunctionComponent<HomeProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const fetchCards = () => {
    setLoading(true);
    getAllCards()
      .then((res) => {
        const normalized = (res.data || []).map((c: any) => ({
          ...c,
          // Hosted API uses _id, local uses id
          id: c.id || c._id,
          likes: c.likes || [],
        }));
        setCards(normalized);
      })
      .catch(() => setCards([]))
      .finally(() => setLoading(false));
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

  const favoritesStorageKey = currentUserId
    ? `favorites:${currentUserId}`
    : "favorites:anonymous";

  const getFavoriteIds = (): string[] => {
    try {
      const raw = localStorage.getItem(favoritesStorageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const setFavoriteIds = (ids: string[]) => {
    try {
      localStorage.setItem(favoritesStorageKey, JSON.stringify(ids));
    } catch {
      // ignore storage errors
    }
  };

  const isCardLiked = (card: CardInterface) => {
    if (!currentUserId) return false;
    const cardId = card.id || (card as any)._id;
    if (!cardId) return false;
    return getFavoriteIds().includes(String(cardId));
  };

  const toggleFavorite = async (card: CardInterface) => {
    const cardId = card.id || (card as any)._id;
    if (!cardId) return;
    if (!currentUserId) {
      return;
    }

    try {
      const liked = isCardLiked(card);
      const prevFavorites = getFavoriteIds();
      const nextFavorites = liked
        ? prevFavorites.filter((id) => id !== String(cardId))
        : [...prevFavorites, String(cardId)];
      setFavoriteIds(nextFavorites);

      // Optional: try to persist on server if supported.
      // The DigitalOcean bcard2 API rejects `likes` updates via PUT (Joi: "likes" is not allowed)
      // so we keep favorites locally.
      setCards((prev) => [...prev]);
    } catch (error) {
      const err: any = error;
      toast.error(
        err?.response?.data || err?.message || "Failed to update favorite"
      );
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
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : cards.length ? (
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
      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Home;
