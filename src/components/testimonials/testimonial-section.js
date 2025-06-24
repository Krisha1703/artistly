// Testimonial Section Component

import testimonials from "@/data/testimonials";
import dynamic from "next/dynamic";
import Heading from "../heading";

const TestimonialCard = dynamic(() => import("./testimonial-card"), { ssr: false });

const TestimonialSection = () => {
  return (
    <section className="p-10 justify-items-center items-center justify-center -mt-10 overflow-hidden">
      <Heading 
        prefix="What Our" 
        focus="Clients Say" 
        suffix="About Us" 
        subheading={true}
    />
 
      <div className="md:flex block gap-6 md:space-y-0 space-y-10 mb-10">
        
        <TestimonialCard 
          userName={testimonials[0].userName}
          userImage={testimonials[0].userImage}
          rating={testimonials[0].rating}
          review={testimonials[0].review}
        />
      
        <TestimonialCard 
          userName={testimonials[1].userName}
          userImage={testimonials[1].userImage}
          rating={testimonials[1].rating}
          review={testimonials[1].review}
        />

        <TestimonialCard 
          userName={testimonials[2].userName}
          userImage={testimonials[2].userImage}
          rating={testimonials[2].rating}
          review={testimonials[2].review}
        />
      </div>

      <div className="md:flex block gap-6 md:space-y-0 space-y-10 mb-10">
        <TestimonialCard 
          userName={testimonials[3].userName}
          userImage={testimonials[3].userImage}
          rating={testimonials[3].rating}
          review={testimonials[3].review}
        />

        <TestimonialCard 
          userName={testimonials[4].userName}
          userImage={testimonials[4].userImage}
          rating={testimonials[4].rating}
          review={testimonials[4].review}
        />

        <TestimonialCard 
          userName={testimonials[5].userName}
          userImage={testimonials[5].userImage}
          rating={testimonials[5].rating}
          review={testimonials[5].review}
        />
      </div>
    </section>
  );
};

export default TestimonialSection;