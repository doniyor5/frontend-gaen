import React from "react";

const SelectInput = ({ state, setState, category }) => {

  const uniqueCategories = Array.from(
    new Set(category?.map((item) => item.category))
  );

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="categories"
      >
        Choose a category
      </label>
      <select
        id="categories"
        value={state}
        onChange={(e) => setState(e.target.value)} 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>
          Choose a category
        </option>
        {uniqueCategories?.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
