import { FunctionComponent, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";
import CardInterface from "../Interfaces/Card";
import { getAllCards } from "../Services/CardService";

interface FavoriteProps {}

const Favorite: FunctionComponent<FavoriteProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]); // All cards
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // User login state
  const [user, setUser] = useState<any>(null); // User details

  // Fetch all cards on component
  const fetchCards = () => {
    setLoading(true);
    getAllCards()
      .then((res) => {
        // Normalize card data
        const normalized = (res.data || []).map((c: any) => ({
          ...c,
          id: c.id || c._id,
          likes: c.likes || [],
        }));
        // Update state with normalized cards
        setCards(normalized);
      })
      .catch(() => setCards([]))
      .finally(() => setLoading(false));
  };
  // Fetch user details and cards on component
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const userDetails = sessionStorage.getItem("userDetails");
    // Check if user is logged in and set user details
    if (userId && userDetails) {
      setIsLoggedIn(true);
      try {
        // Parse user details from session storage
        const userDetailsParsed = JSON.parse(userDetails);
        setUser(userDetailsParsed);
      } catch (error) {
        <></>;
      }
    }
    fetchCards();
  }, []);
  // Refetch cards when login state changes
  useEffect(() => {
    if (isLoggedIn) fetchCards();
  }, [isLoggedIn]);

  // Get current user ID
  const currentUserId = user?._id || user?.id || user?.userId || "";
  // Key for storing favorites in localStorage
  const storageKey = `favorites:${currentUserId || "anonymous"}`;

  // Functions to get and set favorite card IDs in localStorage
  const getFavoriteIds = (): string[] => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  };

  // Functions to get and set favorite card IDs in localStorage
  const setFavoriteIds = (ids: string[]) => {
    localStorage.setItem(storageKey, JSON.stringify(ids));
  };

  // Check if a card is liked by the current user
  const isCardLiked = (card: CardInterface): boolean => {
    const cardId = String(card.id || (card as any)._id);
    return getFavoriteIds().includes(cardId);
  };

  // Toggle favorite status of a card
  const toggleFavorite = (card: CardInterface) => {
    const cardId = String(card.id || (card as any)._id);
    const favorites = getFavoriteIds();
    const isLiked = favorites.includes(cardId);

    if (isLiked) {
      setFavoriteIds(favorites.filter((id) => id !== cardId));
    } else {
      setFavoriteIds([...favorites, cardId]);
    }

    setCards([...cards]);
  };

  // Filter favorite cards for display
  const favoriteIds = getFavoriteIds();
  const favoriteCards = cards.filter((card) => {
    const cardId = String(card.id || (card as any)._id);
    return favoriteIds.includes(cardId);
  });

  return (
    <>
      <NavBar />
      {/* Favorite Cards Display */}
      <div className="container my-4">
        <h1 className="mb-4 text-center">Favorite Cards</h1>

        {!isLoggedIn ? (
          <div className="alert alert-info text-center">
            Please log in to view your favorite cards.
          </div>
        ) : loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : favoriteCards.length === 0 ? (
          <div className="alert alert-secondary text-center">
            You have no favorite cards yet.
          </div>
        ) : (
          <div className="row">
            {favoriteCards.map((card: CardInterface) => (
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
                      <button
                        // Toggle favorite status of a card
                        className="btn btn-link border-0 p-0 text-muted"
                        onClick={() => toggleFavorite(card)}
                      >
                        <i className="fa-solid fa-heart text-danger"></i>
                      </button>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Favorite;
