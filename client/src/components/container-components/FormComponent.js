import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FormComponent = ({ postData, setPostData, onChange, submitForm }) => {
  return (
    <div>
      <Form onSubmit={submitForm}>
        {/* Title input */}

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={postData.title}
            onChange={onChange}
            placeholder="Add your title here..."
          />
        </Form.Group>

        {/* Content input */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            onChange={onChange}
            value={postData.content}
          />
        </Form.Group>

        {/* Buttons */}

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
        <span className="mx-2"></span>

        {/* Cancel Button */}
        <Button
          type="submit"
          variant="danger"
          onClick={() => {
            setPostData({
              title: "",
              content: "",
            });
          }}>
          Clear
        </Button>
      </Form>
    </div>
  );
};

export default FormComponent;
