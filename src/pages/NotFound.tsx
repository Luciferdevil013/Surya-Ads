import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="bg-hero flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-extrabold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="font-semibold text-primary-deep underline hover:text-[#9A3412]">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
