import { animate, useMotionValue, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatValue } from "@/lib/KPIFormat";
import type { KPIFormat } from "@/types/MisDashboard";
import "./KPIValue.css";

type Props = {
  value: string;
  format: KPIFormat;
};

export default function KPIValue({ value, format }: Props) {
  const motionValue = useMotionValue(0);

  const [displayValue, setDisplay] = useState("0");

  // Extract only the number
  const numericValue = Number(
    value
      .replace(/,/g, "")
      .replace(/[^\d.]/g, "")
  );

  useEffect(() => {
    const controls = animate(
      motionValue,
      numericValue,
      {
        duration: 14.6,
        ease: "easeOut",
        onUpdate(latest) {
          setDisplay(formatValue(latest, format));
        },
      }
    );

    return () => controls.stop();
  }, [motionValue, numericValue, value]);

   let prefix = "";
   let suffix = "";

    if (value.includes("₹")) {
      prefix = "₹ ";
    }

    if (value.includes("Cr")) {
      suffix = " Cr";
    }

    else if (value.includes("L")) {
     suffix = " L";
    }

    else if (value.includes("%")) {
      suffix = "%";
    }

    else if (value.includes("Days")) {
     suffix = " Days";
    }

    else if (value.includes("/5")) {
     suffix = " / 5";
    }

  return (
  <motion.h2 initial={{
    opacity: 0,
    y: 10,
   }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 2,
  }}
  className="value mt-2 font-bold tracking-tight">
  {prefix}
  {displayValue}
  {suffix}
  </motion.h2>
  );
}