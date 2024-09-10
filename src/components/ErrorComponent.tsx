import React from "react";

const ErrorComponent = () => {
  return (
    <div className="bg-gradient-to-r from-slate-200 to-gray-200 text-black">
      <div className="flex items-center justify-center min-h-screen px-2">
        <div className="text-center">
          <h1 className="text-[10rem] font-bold">500</h1>
          <p className="text-[2rem] font-medium">Oops! Internal Server Error</p>
          <p className="mt-4 mb-8">
            We apologize for the inconvenience. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
