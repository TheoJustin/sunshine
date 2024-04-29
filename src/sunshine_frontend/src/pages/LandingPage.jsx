import React from 'react';
import PhotoTilt from "../components/PhotoTilt";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <h2 className="">Landing Page</h2>
      <p className="text-blue-600">The quick brown fox...</p>
      <p style={{ fontFamily: 'Product Sans', fontSize: '18px' }}>
        This is a test paragraph using Product Sans Regular.
      </p>
      <div className="flex flex-row">
        <div className="m-5">
          <PhotoTilt />
        </div>
        <div className="flex flex-col">
          <div className="animate-slide-in-left p-4 text-3xl">Feature 1</div>
          <div className="animate-slide-in-left p-4 pl-6 text-3xl">Feature 2</div>
          <div className="animate-slide-in-left p-4 pl-8 text-3xl">Feature 3</div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
