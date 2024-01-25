import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights() {
  return (
    <Row className="mt-3 mb-3" id="Highlights">
      <Col xs={12} md={4} className="mb-3">
        <Card className="cardHighlight card-green p-3 border-5 rounded-top rounded-bottom">
          <Card.Body>
            <Card.Title>
              <h2>🐾 Your One-Stop Pet Shop!</h2>
            </Card.Title>
            <Card.Text className="text-light" style={{ fontFamily: 'Single Day, sans-serif', fontSize: '20px' }}>
              Discover the perfect canine companion at PetBili, your premier online destination for top-quality dogs! From loyal companions to playful pals, find the ideal furry friend to enrich your life. 🛍️ Your Dream Dog is Just a Click Away! Tap "Find Your Companion" and Find Your Perfect Match. 🐕
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4} className="mb-3">
        <Card className="cardHighlight card-white p-3 border-5 rounded-top rounded-bottom">
          <Card.Body>
            <Card.Title>
              <h2>🐶 PetBili - Where Dreams of Puppy Love Come True!</h2>
            </Card.Title>
            <Card.Text className="text-danger" style={{ fontFamily: 'Single Day, sans-serif', fontSize: '20px' }}>
              At PetBili, we believe in the joy of having a loyal companion. Meet our adorable furry friends, each ready to fill your home with love.
              Explore our exclusive collection of purebred puppies. Your new best friend 🐕 is just a click away!
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4} className="mb-3">
        <Card className="cardHighlight card-blue p-3 border-5 rounded-top rounded-bottom">
          <Card.Body>
            <Card.Title>
              <h2>❤️ Join the PetBili Family - Where Every Dog Has a Home! 🏡</h2>
            </Card.Title>
            <Card.Text className="text-dark" style={{ fontFamily: 'Single Day, sans-serif', fontSize: '20px' }}>
              At Petbili, we're excited to offer you exclusive deals on all your pet needs! 🎁 Limited Time Offer: Get 10% off on Your First Furry Friend! Use Code: PETLOVE10 🐶. Explore our store and pamper your pets today!
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}