import { useState } from "react";

const QuantitySelector = ({ value = 1, min = 1, max = 99, onChange }) => {
  const [quantity, setQuantity] = useState(value);

  const updateQuantity = (newValue) => {
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;

    setQuantity(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Label (optional) */}
      <span className="text-gray-700 font-medium">Quantity</span>

      {/* Selector */}
      <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= min}
          className={`px-4 py-2 text-lg font-bold transition 
          ${
            quantity <= min
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          −
        </button>

        <input
          type="number"
          value={quantity}
          min={min}
          max={max}
          onChange={(e) => updateQuantity(parseInt(e.target.value) || min)}
          className="w-16 text-center outline-none font-semibold"
        />

        <button
          onClick={() => updateQuantity(quantity + 1)}
          disabled={quantity >= max}
          className={`px-4 py-2 text-lg font-bold transition 
          ${
            quantity >= max
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
