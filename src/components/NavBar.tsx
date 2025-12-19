import { FunctionComponent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import User from "../Interfaces/User";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../Services/UserService";

const NarBar: FunctionComponent = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState<User | null>(null); // User details
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("isDarkMode");
    return stored === "true";
  });
  // Fetch user details on component
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      getUserById()
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  // Apply dark mode class to body and store preference
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
      {/* Navigation Bar with dynamic links based on user status */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand
            href="/home"
            className="fw-bold"
            style={{
              color: "black",
              letterSpacing: "0.5px",
              fontSize: "1.25rem",
            }}
          >
            BCard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <button
                // About page navigation button
                type="button"
                className="btn btn-outline-primary btn-sm mx-2"
                onClick={() => navigate("/about")}
              >
                About
              </button>

              {/* is user logged in and not a business user */}
              {isLoggedIn && !user?.isBusiness && !user?.isAdmin ? (
                // Favorite page navigation button
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  Fav Cards
                </button>
              ) : (
                <> </>
              )}

              {/* user is business and logged in */}
              {user?.isBusiness && isLoggedIn ? (
                // My Cards page navigation button for business users
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mx-2"
                    onClick={() => navigate("/myCards")}
                  >
                    My Cards
                  </button>
                </>
              ) : (
                <> </>
              )}

              {/* user is admin and logged in */}
              {user?.isAdmin && isLoggedIn ? (
                // Admin Sandbox page navigation button
                <>
                  <button
                    // Favorite Cards page navigation button
                    type="button"
                    className="btn btn-outline-primary btn-sm mx-2"
                    onClick={() => navigate("/favorites")}
                  >
                    Fav Cards
                  </button>
                  <button
                    // My Cards page navigation button
                    type="button"
                    className="btn btn-outline-primary btn-sm mx-2"
                    onClick={() => navigate("/myCards")}
                  >
                    My Cards
                  </button>
                  <button
                    // Admin Sandbox page navigation button
                    type="button"
                    className="btn btn-outline-info btn-sm mx-2"
                    onClick={() => navigate("/admin")}
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

              <button
                // Dark Mode Button
                type="button"
                className="btn btn-outline-dark btn-sm mx-2 DarkModeButtonSwitch"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  // Sun icon for light mode
                  <i className="fa-solid fa-sun"></i>
                ) : (
                  // Moon icon for dark mode
                  <i className="fa-solid fa-moon"></i>
                )}
              </button>
              {!isLoggedIn ? (
                // Show Signup/Login buttons when not logged in
                <>
                  <button
                    // Signup page navigation button
                    type="button"
                    className="btn btn-outline-primary btn-sm mx-2"
                    onClick={() => navigate("/register")}
                  >
                    SIGNUP
                  </button>
                  <button
                    // Login page navigation button
                    type="button"
                    className="btn btn-primary btn-sm mx-2"
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
                    // Logout button
                    type="button"
                    className="btn btn-outline-danger btn-sm mx-2"
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
