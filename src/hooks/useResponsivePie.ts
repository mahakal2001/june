import { useEffect, useState } from "react";

export function useResponsivePie() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  if (width <= 992) {
    return {
      innerRadius: 50,
      outerRadius: 82,
    };
  }

  if (width <= 1200) {
    return {
      innerRadius: 58,
      outerRadius: 95,
    };
  }

  if (width <= 1445) {
    return {
      innerRadius: 64,
      outerRadius: 102,
    };
  }

  return {
    innerRadius: 68,
    outerRadius: 112,
  };
}