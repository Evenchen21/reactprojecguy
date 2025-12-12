/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import User from "../Interfaces/User";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../Services/UserService";

interface NarBarProps {}

const NarBar: FunctionComponent<NarBarProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("isDarkMode");
    return stored === "true";
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      getUserById()
        .then((res) => setUser(res.data))
        .catch((err) => {
          // Error fetching user
        });
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("isDarkMode", String(isDarkMode));

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [isDarkMode]);

  const isLoggedIn = user !== null;

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/home">BCard</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <button style={{ margin: "0 8px" }}>About</button>

              {/* is user logged in and not a business user */}
              {isLoggedIn && !user?.isBusiness && !user?.isAdmin ? (
                <button style={{ margin: "0 8px" }}>Fav Cards</button>
              ) : (
                <> </>
              )}

              {/* user is business and logged in */}
              {user?.isBusiness && isLoggedIn ? (
                <>
                  <button style={{ margin: "0 8px" }}>My Cards</button>
                  <button style={{ margin: "0 8px" }}>Create Card</button>
                </>
              ) : (
                <> </>
              )}

              {/* user is admin and logged in */}
              {user?.isAdmin && isLoggedIn ? (
                <>
                  <button style={{ margin: "0 8px" }}>Fav Cards</button>
                  <button style={{ margin: "0 8px" }}>My Cards</button>
                  <button
                    style={{ margin: "0 8px" }}
                    onClick={() => navigate("/users")}
                  >
                    Admin Sandbox
                  </button>
                </>
              ) : (
                <> </>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success m-2">Search</Button>

              {/* Dark Mode Button */}
              <button
                className="DarkModeButtonSwitch"
                style={{ margin: "0 8px" }}
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <i className="fa-solid fa-sun"></i>
                ) : (
                  <i className="fa-solid fa-moon"></i>
                )}
              </button>
              {!isLoggedIn ? (
                <>
                  <button
                    style={{ margin: "0 8px" }}
                    onClick={() => navigate("/register")}
                  >
                    SIGNUP
                  </button>
                  <button
                    style={{ margin: "0 8px" }}
                    onClick={() => navigate("/login")}
                  >
                    LOGIN
                  </button>
                </>
              ) : (
                <> </>
              )}
              {isLoggedIn ? (
                // logout the user and remove the session storage //
                <>
                  <button
                    style={{ margin: "0 8px" }}
                    onClick={() => {
                      sessionStorage.removeItem("userId");
                      setUser(null);
                      navigate("/login");
                    }}
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> LOGOUT
                  </button>
                </>
              ) : (
                <> </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NarBar;
