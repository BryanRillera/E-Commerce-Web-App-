import React from 'react';
import Highlights from '../components/Highlights';
import Banner from '../components/Banner';
import Footer from '../components/Footer';


export default function Home() {
  const data = {
    title: [
      "Pet",
      <span key="bili" style={{ color: 'orangered' }}>
        Bili
      </span>,
    ],
    content: `"Explore a World of Wagging Tails and Furry Friends!"`,
    destination: "/products",
    label: "Find Your Companion",
  };

  return (
    <>
      
      <Banner data={data} />
      <Highlights />
      <Footer />
    </>
  );
}
