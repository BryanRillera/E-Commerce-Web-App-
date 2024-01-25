import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import '../App.css';

export default function Banner({ data }) {
  const { title, content, destination, label } = data;

  return (
    <Row>
      <Col className="banner">
        <h1 className="title">{title}</h1>
        <p className="content">{content}</p>
        <Link className="btn btn-info" to={destination}>
          {label}
        </Link>
      </Col>
    </Row>
  );
}
