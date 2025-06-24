// Checkbox Field Component

const CheckboxGroup = ({ 
  name, 
  label, 
  options = [], 
  register, 
  errors, 
  required = false 
}) => {
  return (
    <div>
      {label && (
        <label className="block font-semibold mb-2">
          {label} {required && <span className="text-red-500 text-xl">*</span>}
        </label>
      )}
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded-full text-purple-700 cursor-pointer transition"
          >
            <input
              type="checkbox"
              value={option}
              {...register(name)}
              className="accent-purple-600"
            />
            {option}
          </label>
        ))}
      </div>
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default CheckboxGroup;
