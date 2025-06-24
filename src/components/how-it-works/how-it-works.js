// How It Works Section Component

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Heading from "../heading";
import { steps } from "@/data/steps"; 

const HowItWorks = () => {
  // Reference to the section for scroll tracking
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Baed on scroll progress, scale the section and track current step
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepCount = steps.length;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const stepIndex = Math.min(Math.floor(v * (stepCount + 1)), stepCount);
      setCurrentStep(stepIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section className="px-6 py-10 bg-white" ref={ref}>
      <Heading 
        prefix="How" 
        focus="It Works" 
        suffix="in 3 Simple Steps" 
        subheading={true}
      />

      <motion.ol
        style={{ scale }}
        className="relative flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-0 sm:space-x-8 max-w-6xl mx-auto"
      >
        {steps.map((step, i) => (
          <li key={i} className="relative flex-1 flex flex-col items-center">
            {/* Step circle with number or check */}
            <div className="z-10 flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-600 rounded-full text-purple-600 font-bold">
              {i < currentStep ? (
                <CheckIcon className="text-purple-600 w-5 h-5" />
              ) : (
                i + 1
              )}
            </div>

            {/* Horizontal connector */}
            {i < steps.length - 1 && (
              <div className="hidden sm:block absolute top-5 left-1/2 w-full h-0.5 ml-2 bg-gray-200 z-0"></div>
            )}

            {/* Step content */}
            <div className="mt-6 text-center sm:text-left ml-20">
              <div className="text-4xl mb-2">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-gray-600 max-w-xs ">{step.desc}</p>
            </div>
          </li>
        ))}
      </motion.ol>
    </section>
  );
};

export default HowItWorks;
