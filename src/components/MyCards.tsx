import { FunctionComponent } from "react";
import Card from "./Card";
import Footer from "./Footer";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  // My Cards Page displaying user's cards and footer
  return (
    <>
      <Card />
      <Footer isLoggedIn={true} />
    </>
  );
};

export default MyCards;
