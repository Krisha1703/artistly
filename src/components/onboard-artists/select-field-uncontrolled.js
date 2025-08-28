// SelectFieldUncontrolled.jsx

export default function SelectFieldUncontrolled({
  name,
  label,
  options = [],
  placeholder = "Select an option",
  register,
  required = false,
  errors,
  className = "",
}) {
  return (
    <div>
      {label && (
        <label className="block font-semibold mb-1">
          {label} {required && <span className="text-red-500 text-xl">*</span>}
        </label>
      )}

      <select
        {...(register && name ? register(name) : {})}
        name={name}
        defaultValue=""
        className={`w-full border border-purple-400 px-4 py-2 rounded 
          bg-white dark:bg-gray-800 
          text-gray-800 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
}
