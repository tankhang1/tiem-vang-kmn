import React from "react";

const Input = ({ label, placeholder, type, initialValue, onChangeText }) => {
  // Format number with dots as thousand separators
  const formatNumber = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle input change
  const handleChange = (e) => {
    let value = e.target.value;
    
    if (type === "number") {
      // Remove dots and ensure it's a valid number
      value = value.replace(/\./g, "");
      if (!isNaN(value)) {
        onChangeText(value);
      }
    } else {
      onChangeText(value);
    }
  };

  return (
    <div className="w-full">
      <p>{label}</p>
      <input
        className="w-full p-2 border border-gray-300 rounded"
        placeholder={placeholder}
        onChange={handleChange}
        value={type === "number" ? formatNumber(initialValue) : initialValue}
      />
    </div>
  );
};

export default Input;
