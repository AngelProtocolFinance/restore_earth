import * as React from "react";

const Page = ({children}) => {
  return (
    <>
      <div className="Page">
          {children}
      </div>
    </>
  );
};

export default Page;
