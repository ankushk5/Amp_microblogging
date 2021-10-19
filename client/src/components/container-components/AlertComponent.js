import Alert from "react-bootstrap/Alert";
import React from "react";

const AlertComponent = ({ variant, children }) => {
  return (
    <>
      <Alert variant={variant}>{children}</Alert>
    </>
  );
};

export default AlertComponent;
