import { FunctionComponent, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";
import CardInterface from "../Interfaces/Card";
import { getAllCards } from "../Services/CardService";

interface FavoriteProps {}

const Favorite: FunctionComponent<FavoriteProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const fetchCards = () => {
    setLoading(true);
    getAllCards()
      .then((res) => {
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
    const userId = sessionStorage.getItem("userId");
    const userDetailsStr = sessionStorage.getItem("userDetails");

    if (userId && userDetailsStr) {
      setIsLoggedIn(true);
      try {
        const userDetails = JSON.parse(userDetailsStr);
        setUser(userDetails);
      } catch (error) {
        <> </>;
      }
    }

    fetchCards();
  }, []);

  // If user details load after initial render, re-fetch so filtering works
  useEffect(() => {
    if (isLoggedIn) {
      fetchCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

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
    if (!cardId || !currentUserId) return;

    const liked = isCardLiked(card);
    const prevFavorites = getFavoriteIds();
    const nextFavorites = liked
      ? prevFavorites.filter((id) => id !== String(cardId))
      : [...prevFavorites, String(cardId)];
    setFavoriteIds(nextFavorites);

    // Re-render
    setCards((prev) => [...prev]);
  };

  const favoriteIds = new Set(getFavoriteIds());
  const favoriteCards = currentUserId
    ? cards.filter((c) => favoriteIds.has(String(c.id || (c as any)._id)))
    : [];

  return (
    <>
      <NavBar />
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
