import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import { withRouter, useHistory } from "react-router";

const NavbarComp = () => {
  const history = useHistory();
  return (
    <div>
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto mx-auto">
              <Button
                style={{ margin: "0 12px" }}
                onClick={() => {
                  history.push("/");
                }}>
                Posts
              </Button>
              <Button
                onClick={() => {
                  history.push("/create");
                }}>
                Create Post
              </Button>
            </Nav>
          </Container>
        </Navbar>
      </>
    </div>
  );
};

export default withRouter(NavbarComp);
