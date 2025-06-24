// Slide Arrow Component

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

const SlideArrow = ({ direction, disabled, onClick }) => {
  if (disabled) return null;
  return (
    <div
      className={`absolute ${direction === "left" ? "md:left-4 left-0" : "md:right-4 right-0"} md:top-1/2 top-[15vh] transform -translate-y-1/2 z-50 cursor-pointer`}
      onClick={onClick}
    >
      {direction === "left" ? (
        <ArrowBackIosOutlinedIcon fontSize="large" className="text-white md:hover:scale-110 hover:scale-90 md:scale-100 scale-75 transition-transform duration-200 hover:text-primary" />
      ) : (
        <ArrowForwardIosOutlinedIcon fontSize="large" className="text-white md:hover:scale-110 hover:scale-90 md:scale-100 scale-75 transition-transform duration-200 hover:text-primary" />
      )}
    </div>
  );
};

export default SlideArrow;