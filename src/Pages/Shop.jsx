import React from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import TestFirewall from '../Components/TestFirewall/TestFirewall'; // ✅ import

export default function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
      <TestFirewall /> {/* ✅ triggers POST to http://127.0.0.1:8000/firewall/static */}
    </div>
  );
}
