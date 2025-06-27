
const SubmitButton = ({type, disabled, profile, outline, onClick}) => {
  return (
    <button 
      type="submit" 
      disabled={disabled}
      onClick={onClick} 
      className={`${profile ? "md:w-1/5 w-1/2" : "w-full" } ${outline ? "border-purple-500 border-2 border-solid text-purple-500 hover:text-white hover:border-none hover:bg-purple-600" : "bg-purple-500 text-white hover:bg-purple-600"} cursor-pointer  py-2 rounded `}>
     {type}
    </button>
  )
}

export default SubmitButton