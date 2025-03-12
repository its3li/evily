
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/Button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <p className="subtle-text animate-fade-in">Page Not Found</p>
        <h1 className="heading-xl mt-4 animate-delayed-fade-in opacity-0">404</h1>
        <p className="paragraph mx-auto mt-6 animate-delayed-slide-up opacity-0">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        
        <Link to="/" className="block mt-8 animate-delayed-slide-up-2 opacity-0">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
