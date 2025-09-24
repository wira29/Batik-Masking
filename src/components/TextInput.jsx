const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  readOnly = false,
  error,
}) => {
  return (
    <div>
      <label className="block text-white font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        readOnly={readOnly}
      />

      {error && (
        <div className="my-2">
          <span className="text-red-500 text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default TextInput;
