import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const SearchComponent = ({ onSearch, searchText, setSearchText, onClear }) => {
  const onChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div>
      <Form className="d-flex" onSubmit={onSearch}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchText}
          onChange={onChange}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
        <Button
          style={{ marginLeft: "8px" }}
          variant="outline-danger"
          disabled={searchText === ""}
          onClick={onClear}>
          Clear
        </Button>
      </Form>
    </div>
  );
};

export default SearchComponent;
