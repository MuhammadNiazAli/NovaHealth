"use client";

import { useEffect } from "react";

export default function SmoothScrollInit() {
  useEffect(() => {
    let scroll;

    import("smooth-scroll").then(({ default: SmoothScroll }) => {
      scroll = new SmoothScroll('a[href*="#"]', {
        speed: 2500,             
        speedAsDuration: true,
        offset: 0,
        easing: 'easeInOutQuart',  
        clip: true,
        updateURL: false,
      });
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return null;
}
