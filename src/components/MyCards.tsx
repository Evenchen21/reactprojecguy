import { FunctionComponent } from "react";
import Card from "./Card";
import Footer from "./Footer";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  return (
    <>
      <Card />
      <Footer isLoggedIn={true} />
    </>
  );
};

export default MyCards;
