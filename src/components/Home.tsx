import { FunctionComponent, useEffect, useState } from "react";
import NavBar from "./NavBar";
import User from "../Interfaces/User";
import { getUserById } from "../Services/UserService";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserById()
      .then((res) => setUser(res.data))
      .catch((err) => <></>);
  }, []);
  return (
    <>
      <NavBar />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {" "}
        <h1> Home</h1>
        <h5>{user ? `Welcome, ${user.firstName} ` : ""}</h5>
      </div>
    </>
  );
};

export default Home;
