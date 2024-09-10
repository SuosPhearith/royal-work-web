import Link from "next/link";
import React from "react";

const NotFoundComponent = () => {
  return (
    <div className="bg-gradient-to-r from-slate-200 to-gray-200 text-black">
      <div className="flex items-center justify-center min-h-screen px-2">
        <div className="text-center">
          <h1 className="text-[10rem] font-bold">404</h1>
          <p className="text-[2rem] font-medium">Oops! Page not found</p>
          <p className="mt-4 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-white font-semibold rounded-full hover:bg-purple-100 transition duration-300 ease-in-out "
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundComponent;
