import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  isLoggedIn?: boolean;
}

const Footer: FunctionComponent<FooterProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <>
      {isLoggedIn && (
        <>
          {/* Footer navigation */}
          <footer className="footer-nav">
            <div className="footer-nav-inner">
              <button
                type="button"
                className="footer-nav-item"
                onClick={() => navigate("/about")}
              >
                <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
                <span>About</span>
              </button>
              <button
                type="button"
                className="footer-nav-item"
                onClick={() => navigate("/favorites")}
              >
                <i className="fa-solid fa-heart" aria-hidden="true"></i>
                <span>Favorites</span>
              </button>
              <button
                type="button"
                className="footer-nav-item"
                onClick={() => navigate("/myCards")}
              >
                <i className="fa-solid fa-id-card" aria-hidden="true"></i>
                <span>My Cards</span>
              </button>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default Footer;
