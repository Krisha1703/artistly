// Testimonial Card Component

import Image from 'next/image'; 
import { motion } from 'framer-motion'; 
import { RenderStars } from './render-star';

const TestimonialCard = ({ userImage, userName, review, rating }) => {
  return (
    <motion.div
      className="shadow-lg rounded-lg p-6 md:w-1/3 w-full h-full mx-auto bg-white text-gray-800"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
      whileHover={{
        backgroundColor: 'rgb(147, 51, 234)', 
        color: 'white',
        borderTopRightRadius: '2vw',
        borderBottomLeftRadius: '2vw',
      }}
      whileTap={{
        backgroundColor: 'rgb(147, 51, 234)',
        color: 'white',
        borderTopRightRadius: '2vw',
        borderBottomLeftRadius: '2vw',
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex items-center space-x-4">
        {/* User profile image */}
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={userImage}
            alt={`${userName}'s profile`}
            width={64}
            height={64}
            loading="lazy"
            aria-label='User Profile Image'
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{userName}</h3>
          <div className="flex space-x-0.5 scale-150 mx-6">{RenderStars({ rating })}</div>
        </div>
      </div>

      {/* Review text */}
      <p className="mt-4 italic">&ldquo;{review}&rdquo;</p>
    </motion.div>
  );
};

export default TestimonialCard;
