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
  const [cards, setCards] = useState<CardInterface[]>([]); // All cards
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // User login state
  const [user, setUser] = useState<any>(null); // User details
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Admin status
  const [isBusiness, setIsBusiness] = useState<boolean>(false); // Business status
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // Delete modal visibility
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false); // Update modal visibility
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false); // Create modal visibility
  const [selectedCardId, setSelectedCardId] = useState<string>(""); // Selected card ID for modals

  const fetchCards = () => {
    // Fetch all cards on component
    setLoading(true);
    getAllCards()
      .then((res) => {
        // Normalize card data
        const normalized = (res.data || []).map((c: any) => ({
          ...c,
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
        // Parse user details from session storage
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
  // Refetch cards when login state changes
  const currentUserId = user?._id || user?.id || user?.userId || "";

  const favoritesStorageKey = currentUserId
    ? `favorites:${currentUserId}`
    : "favorites:anonymous";

  // Functions to get and set favorite card IDs in localStorage
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

  // Check if a card is liked by the current user
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
      // Toggle favorite status locally
      const liked = isCardLiked(card);
      const prevFavorites = getFavoriteIds();
      const nextFavorites = liked
        ? prevFavorites.filter((id) => id !== String(cardId))
        : [...prevFavorites, String(cardId)];
      setFavoriteIds(nextFavorites);
      // Update state to reflect changes
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
          // Create Card Button for Business/Admin/logged-In users
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
          // Loading spinner
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : cards.length ? (
          // Display cards
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
                    <button className="btn btn-link border-0 p-0 text-muted">
                      <i
                        className="fa-solid fa-phone"
                        style={{ fontSize: "1.3rem" }}
                      ></i>
                    </button>

                    <div className="d-flex gap-3">
                      {(isAdmin || isBusiness) && (
                        // Admin/Business card controls
                        <>
                          <button
                            // Delete card button
                            className="btn btn-link border-0 p-0 text-muted"
                            onClick={() => {
                              setSelectedCardId(card.id || "");
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            // Edit card button
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
                        // Toggle favorite status of a card
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
          <> NO_CARDS_IS_AVAILABLE</> // No cards available message
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
