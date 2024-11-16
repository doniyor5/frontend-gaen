import React from "react";

const FileInput = ({ setState }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        setState(file); // Pass the file to the parent component state
    };


  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        accept="image/jpeg,image/png,image/gif"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      />
    </div>
  );
};

export default FileInput;
