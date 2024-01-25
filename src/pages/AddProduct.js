import { useState, useEffect, useContext } from "react";
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from "../UserContext";
import Swal from 'sweetalert2';

export default function AddProduct() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // Input states
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(""); 

    // State for button disable
    const [isActive, setIsActive] = useState(false);

    // Check if all required fields are filled
    useEffect(() => {
        if (breed !== '' && description !== '' && price !== '' && image !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [breed, description, price, image]);

    function submit(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                breed: breed,
                description: description,
                price: price,
                image: image 
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data !== null) { 
                Swal.fire({
                    title: "Successful Product Creation",
                    icon: "success",
                    text: "Product Added"
                })
                navigate("/products");
            } else {
                Swal.fire({
                    title: "Unsuccessful Product Creation",
                    icon: "error",
                    text: "Product Not Added"
                })
            }

            // Clear input fields
            setBreed("");
            setDescription("");
            setPrice("");
            setImage("");
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "An error occurred while adding the product"
            });

            // Clear input fields
            setBreed("");
            setDescription("");
            setPrice("");
            setImage("");
        });
    }

    return (
        (user.isAdmin) ?
            <Form onSubmit={(e) => submit(e)}>
                <h1 className="my-3 text-center">Add Product</h1>
                
                <Form.Group>
                    <Form.Label>Breed:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Breed" 
                        required
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Description" 
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Image URL:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Image URL" 
                        required
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Price" 
                        required
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                </Form.Group>

                {
                    isActive ?
                        <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '20px'}}>Submit</Button>
                    :
                        <Button variant="danger" type="submit" disabled style={{ width: '100%', marginBottom: '20px'}}>Submit</Button>
                }
            </Form>
        :
            <Navigate to="/products" />
    )
}
