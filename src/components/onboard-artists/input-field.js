// Input Text Field Component

const InputField = ({ name, label, register, placeholder, errors, type, required = false }) => {
  return (
    <div>
      {label && (
        <label className="block font-semibold mb-1">
          {label} {required && <span className="text-red-500 text-xl">*</span>}
        </label>
      )}
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={` ${type == "textarea" ? "h-28" : " " } w-full border border-purple-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
    </div>
  );
};

export default InputField;
