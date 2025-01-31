import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import './LandingPage.css';

function LandingPage() {
  const loadingsap = useRef();
  const gsapRef = useRef([]);
  const [isRoot, setIsRoot] = useState(false);


  gsapRef.current = [];

  const addToRefs = (el) => {
    if (el && !gsapRef.current.includes(el)) {
      gsapRef.current.push(el);
    }
  };


  useEffect(() => {
    if (window.location.pathname === '/') {
      setIsRoot(true); 
      setIsRoot(false); 
    }
  }, []);

  useEffect(() => {
    if (isRoot && gsapRef.current.length > 0) {
      
      // gsapeffects 
      let tl = gsap.timeline();

      tl.from(gsapRef.current, {
        x: 200, 
        opacity: 0,
        stagger: 0.2, 
        duration: 1,
      });

      tl.to(gsapRef.current, {
        x: -200, 
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      });

      tl.to(loadingsap.current, {
        opacity: 0,
        display: 'none',
        duration: 2,
      });
    }
  }, [isRoot]);

  if (!isRoot) {
    return null;
  }

  return (
    <>
      <div
        ref={loadingsap}
        className="w-screen h-screen bg-black z-40 landingpage flex items-center justify-center gap-4"
      >
        <h4 className="text-white font-extrabold text-2xl" ref={addToRefs}>Tomorrow's</h4>
        <h4 className="text-white font-extrabold text-2xl" ref={addToRefs}>Brand</h4>
        <h4 className="text-white font-extrabold text-2xl" ref={addToRefs}>Today.</h4>
      </div>
    </>
  );
}

export default LandingPage;
