import { Link } from "react-router-dom";
import Container from "../../../ui/Container";
import { useState } from "react";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <header className="absolute left-0 right-0 z-30 bg-gradient-to-b from-[#000000B3] to-transparent pt-5">
      <Container>
        <nav className="flex justify-between">
          <Link to="/" className="inline-block max-w-[150px] ">
            <img
              className=""
              src="/assets/img/logo.png"
              alt="Logo for Sports Trading Ai Predictions"
            />
          </Link>
          {/* Desktop */}
          <div className="hidden items-start gap-6 md:flex">
            <ul className="relative flex items-start gap-10 pt-4">
              <li>
                <Link to="/home" className="text-lg uppercase text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/memberships"
                  className="text-lg uppercase text-white"
                >
                  Memberships
                </Link>
              </li>
              <li>
                <Link to="/home#whyUs" className="text-lg uppercase text-white">
                  Why us
                </Link>
              </li>
              <li>
                <Link
                  to="/memberships/#contact"
                  className="text-lg uppercase text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <p className="hidden max-w-32 lg:block">
              <img src="/assets/img/website/1st-Circle-Text-hyphen.png" />
            </p>
          </div>
          {/* Mobile Menu Trigger */}
          <button
            className="-mt-8 md:hidden"
            onClick={() => setShowMobileMenu(true)}
          >
            <svg
              className="fill-white"
              fill="currentColor"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
            </svg>
          </button>
          {/* Mobile Menu */}
          <div
            className="fixed inset-0 z-30 w-full transition-all duration-500 md:hidden"
            style={{
              left: showMobileMenu ? "0" : "120%",
            }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-[rgba(0,0,0,0.4)] duration-500"
              style={{
                opacity: showMobileMenu ? "1" : "0",
              }}
            ></div>
            <nav className="absolute right-0 h-full w-full max-w-[90%] bg-secondary p-5 pt-20">
              <button
                className="absolute right-5 top-8"
                onClick={() => setShowMobileMenu(false)}
              >
                <svg
                  className="fill-white"
                  fill="currentColor"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                </svg>
              </button>
              <Link>
                <img src="/assets/img/logo.png" className="max-w-[100px]" />
              </Link>
              <ul className="relative mt-4 flex flex-col items-start gap-7 pt-4">
                <li>
                  <Link
                    onClick={closeMobileMenu}
                    to="/home"
                    className="text-lg uppercase text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeMobileMenu}
                    to="/memberships"
                    className="text-lg uppercase text-white"
                  >
                    Memberships
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeMobileMenu}
                    to="/home#whyUs"
                    className="text-lg uppercase text-white"
                  >
                    Why us
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeMobileMenu}
                    to="/memberships/#contact"
                    className="text-lg uppercase text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
