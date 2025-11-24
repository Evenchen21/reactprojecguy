import { FunctionComponent } from "react";
import { Nav, Navbar } from "react-bootstrap";
import NavBar from "./NavBar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <NavBar />
    </>
  );
};

export default Home;
