import React from "react";

const Loader = () => {
  return (
    <div className="container w-96 m-auto mt-64">
      <div className="flex flex-col items-center justify-center dark">
        {" "}
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
