
const TextareaInput = ({ label, value, onChange, placeholder, rows = 3, required = false }) => {
  return (
    <div>
        <label className="block text-white font-semibold mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        required={required}
      />
    </div>
  );
};

export default TextareaInput;
