"use client";

const Loader = () => {
  return (
    <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-monarch-void">
      <div className="three-body">
        <div className="three-body__dot" />
        <div className="three-body__dot" />
        <div className="three-body__dot" />
      </div>
    </div>
  );
};

export default Loader;
