import { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ productsData, fetchData }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.breed}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td><EditProduct product={product._id} fetchData={fetchData} /></td>
                    <td>
                        <ArchiveProduct
                            product={product}
                            isActive={product.isActive}
                            fetchData={fetchData}
                        />
                    </td>
                </tr>
            );
        });

        setProducts(productsArr)

    }, [productsData, fetchData]);


    return (
        <>
            <Container className="mt-5" style={{
                background: 'linear-gradient(45deg, #333333, #1a1a1a)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.2)',
            }}>
                <h1 className="text-center text-white">Admin Dashboard</h1>

                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="table-black-border text-white"
                >
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Breed</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
