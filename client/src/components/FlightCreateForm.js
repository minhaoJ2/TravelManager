import React,{ useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const FlightCreateForm = ({ onCreate }) => {
    const [Flight, setFlight] = useState({});
    const makeHandleChange = (field, type) => (e) => {
        let value = e.targe.value;
        if (type === "integer") {
            value = parseInt(value);
        }

        setFlight({
            ...Flight,
            [field]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(Flight);
    }

    return (
        <Card className="mt-5">
            <Card.Body>
                <Card.Title>Create a Flight</Card.Title>
                <Form>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Flight Number</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("FlightNum", "string")}
                            type='text'
                            placeholder="Enter the flight number of this flight"
                        />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Departure</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("Departure", "string")}
                            type='text'
                            placeholder="Enter the Departure City of this flight"
                        />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Arrival</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("Arrival", "string")}
                            type='text'
                            placeholder="Enter the Arrival City of this flight"
                        />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Airline</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("Airline", "string")}
                            type='text'
                            placeholder="Enter the Airline company this flight belongs to"
                        />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Model Name</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("ModelName", "string")}
                            type='text'
                            placeholder="Enter the model name of this flight"
                        />
                    </Form.Group>

                    <Button onClick={handleSubmit} variant='primary' type='button'>
                        Create Airline
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FlightCreateForm;