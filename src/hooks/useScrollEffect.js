import { useState, useEffect } from "react";

function useScrollEffect(stylesBeforeScroll, stylesAfterScroll) {
  const [scrollEffect, setScrollEffect] = useState(stylesBeforeScroll);

  const onScroll = () => {
    if (window.scrollY >= 1) {
      console.log("scrolled");
      setScrollEffect(stylesAfterScroll);
    } else {
      console.log("not scrolled");
      setScrollEffect(stylesBeforeScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
  return scrollEffect;
}
export default useScrollEffect;
