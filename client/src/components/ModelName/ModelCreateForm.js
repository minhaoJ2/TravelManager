import React,{ useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const ModelCreateForm = ({ onCreate }) => {
    const [ModelName, setModel] = useState({});
    const makeHandleChange = (field, type) => (e) => {
        let value = e.targe.value;
        if (type === "integer") {
            value = parseInt(value);
        }

        setModel({
            ...ModelName,
            [field]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(ModelName);
    }

    return (
        <Card className="mt-5">
            <Card.Body>
                <Card.Title>Create a Model</Card.Title>
                <Form>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Model Name</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("Name", "string")}
                            type='text'
                            placeholder="Enter the name of the flight model"
                        />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Service year</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("EstablishYear", "string")}
                            type='text'
                            placeholder="Enter the establish year of the model"
                        />
                    </Form.Group>

                    <Button onClick={handleSubmit} variant='primary' type='button'>
                        Create Model
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ModelCreateForm;