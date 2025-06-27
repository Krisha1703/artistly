// Modal Component

const Modal = ({error, success, title, onClose, children}) => {
  return (
    <div className="fixed inset-0 md:top-[50vh] md:left-1/3 left-[0vw] top-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        
            <button className="absolute top-2 right-2 text-gray-500 hover:text-purple-600" onClick={onClose}>&times;</button>

            <h2 className="text-xl font-bold mb-4 text-center ">{title}</h2>

            {error && <h3 className="text-red-500">{error}</h3>}  {/* Display error message */}
            {success && <h3 className="text-green-500">{success}</h3>}  {/* Display success message */}
            {children}
        </div>
    </div>
  )
}

export default Modal;