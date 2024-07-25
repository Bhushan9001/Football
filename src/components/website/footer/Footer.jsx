import { Link } from "react-router-dom";
import Container from "../../../ui/Container";

function Footer() {
  return (
    <footer className="bg-secondary py-5 text-white">
      <Container>
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-xs">© 2024 Sports Trading Ai Predictions</p>
          <div className="flex items-center gap-1">
            <a href="https://edirect.uk/">
              <img src="/assets/img/website/edirect-white.png" />
            </a>
            <a href="https://thenetwork.uk/">
              <img src="/assets/img/website/thenetwork-white-1-5.svg" />
            </a>
          </div>

          <ul className="flex items-center gap-1 text-xs">
            <li className="flex items-center gap-1">
              <Link to="/terms-conditions/">Terms &amp; Conditions</Link>
              <span>|</span>
            </li>
            <li className="flex items-center gap-1">
              <Link to="/privacy-policy/">Privacy Policy</Link>
              <span>|</span>
            </li>
            <li>
              <Link to="/cookies-policy/">Cookies Policy</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
