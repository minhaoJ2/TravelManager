import React,{ useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const AirlineCreateForm = ({ onCreate }) => {
    const [Airline, setAirline] = useState({});
    const makeHandleChange = (field, type) => (e) => {
        let value = e.targe.value;
        if (type === "integer") {
            value = parseInt(value);
        }

        setAirline({
            ...Airline,
            [field]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(Airline);
    }

    return (
        <Card className="mt-5">
            <Card.Body>
                <Card.Title>Create an Airline</Card.Title>
                <Form>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Airline Name</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("Name", "string")}
                            type='text'
                            placeholder="Enter the name of the Airline"
                        />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Establish year</Form.Label>
                        <Form.Control
                            onChange={makeHandleChange("EstablishYear", "string")}
                            type='text'
                            placeholder="Enter the establish year of the Airline"
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

export default AirlineCreateForm;