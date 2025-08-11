import React, { useState } from "react";

const TagsInput = ({ label, tags, setTags, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 border rounded p-2 focus-within:ring focus-within:border-blue-300">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700"
              onClick={() => removeTag(tag)}
            >
              ✕
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-1 outline-none min-w-[100px]"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagsInput;
     