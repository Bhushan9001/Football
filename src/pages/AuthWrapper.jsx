import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AuthWrapper({ children }) {
  const [isSignupPage, setIsSignupPage] = useState(false);

  useEffect(() => {
    const currentPage = location.pathname.split("/").pop();
    if (currentPage === "signup") setIsSignupPage(true);
    else setIsSignupPage(false);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/assets/img/website/auth/desktop-bgr.png')] bg-cover bg-no-repeat pt-12">
      <Link className="inline-block max-w-[200px]" to="/">
        <img src="/assets/img/logo.png" alt="logo" />
      </Link>
      <div
        className={`mt-10 w-full bg-authCardGradient p-12 ${
          isSignupPage ? "max-w-3xl" : "max-w-sm"
        }`}
      >
        {children}
      </div>
    </main>
  );
}

export default AuthWrapper;
