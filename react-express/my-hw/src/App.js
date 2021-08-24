import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import './App.css'

function App() {
    const [product, setProduct] = useState([])
    // useEffect(async () => {
    //   const result = await axios.get('http://localhost:3500/stock');

    //   setData(result.data);
    // },[]);
    useEffect(() => {
        axios.get('http://localhost:5000/product').then((response) => {
            setProduct(response.data)
        })
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    {product.map((products, i) => {
                        return (
                            <>
                                <Card className="col-4" key={products.id}>
                                    <Card.Img variant="top" src="{products.pic}.jpg" />
                                    <Card.Body>
                                        <Card.Title>{products.name}</Card.Title>
                                        {/* <Card.Text>{products.introduction}</Card.Text> */}
                                        <Card.Footer>NT ${products.price}</Card.Footer>
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })}
                    {/* <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form> */}
                </div>
            </div>
        </>
    )
}
export default App
