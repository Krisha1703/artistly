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
    <section className="px-6 py-10 " ref={ref}>
      <Heading 
        prefix="How" 
        focus="It Works" 
        suffix="in 3 Simple Steps" 
        subheading={true}
      />

     <motion.ol
        style={{ scale }}
        className="relative flex flex-col sm:flex-row gap-10 sm:gap-0 md:max-w-6xl max-w-full mx-auto"
      >
        {steps.map((step, i) => (
          <li key={i} className="relative flex items-start sm:flex-1">
            {/* Step number */}
            <div className="flex flex-col items-center z-10">
              <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-600 rounded-full text-purple-600 font-bold shrink-0">
                {i < currentStep ? (
                  <CheckIcon className="text-purple-600 w-5 h-5" />
                ) : (
                  i + 1
                )}
              </div>

              {/* Vertical line (mobile) */}
              <div className="block sm:hidden w-px h-[15vh] step-line mt-1"></div>

              {/* Horizontal line (desktop) */}
              <div className="hidden sm:block absolute top-5 left-10 w-10/12 h-0.5 step-line z-0"></div>

            </div>

            {/* Step content */}
            <div className="ml-6 sm:ml-0 mt-2 sm:mt-6 text-left sm:text-left">
              <div className="text-4xl mb-2 mt-5">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>

            </div>
          </li>
        ))}
      </motion.ol>

    </section>
  );
};

export default HowItWorks;
