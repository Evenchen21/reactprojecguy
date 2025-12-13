import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";
import CardInterface from "../Interfaces/Card";
import { getAllCards, updateCard } from "../Services/CardService";

interface FavoriteProps {}

const Favorite: FunctionComponent<FavoriteProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const fetchCards = () => {
    getAllCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch(() => setCards([]));
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

  const currentUserId = user?._id || user?.id || user?.userId || "";

  const isCardLiked = (card: CardInterface) => {
    if (!currentUserId) return false;
    return (card.likes || []).includes(currentUserId);
  };

  const toggleFavorite = async (card: CardInterface) => {
    if (!card.id || !currentUserId) return;

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
  };

  const favoriteCards = currentUserId
    ? cards.filter((c) => (c.likes || []).includes(currentUserId))
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
