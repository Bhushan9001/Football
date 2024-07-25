import { Outlet } from "react-router";
import Header from "../components/website/header/Header";
import Footer from "../components/website/footer/Footer";

function WebsiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default WebsiteLayout;
