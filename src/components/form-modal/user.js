import React from 'react';
import { motion } from 'framer-motion';
import SubmitButton from './submit-button';

const User = ({ onClose, onLogout, onGoToDashboard, firstname, lastname, email }) => {
  return (
    <div className="fixed top-20 right-10 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal rounded-md shadow-lg p-6 w-80 flex flex-col items-center"
      >
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-semibold text-primary ">{firstname} {lastname}</h2>
        <p className="text-md font-semibold text-primary mb-4">{email}</p>

        <div className="flex flex-col gap-4 w-full">
          <SubmitButton 
            onClick={onGoToDashboard}
            type={"Go to Dashboard"}
          />

        <SubmitButton 
            onClick={onLogout}
            type={"Log Out"}
            outline={true}
          />
          
        </div>
      </motion.div>
    </div>
  );
};

export default User;
