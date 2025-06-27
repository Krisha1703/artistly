
const SwitchForm = ({text, onClick, main}) => {
  return (
    <>
        <p className="text-sm text-gray-500 cursor-pointer hover:text-purple-500">{text}</p>

        <button
            className="text-purple-500 hover:text-purple-600 text-sm"
            onClick={onClick}
        >
            {main}
        </button>
    </>
  )
}

export default SwitchForm