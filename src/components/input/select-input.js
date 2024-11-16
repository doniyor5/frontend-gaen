import React from "react";

const SelectInput = ({ state, setState, category }) => {
    return (
        <div>
            <label
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                htmlFor="categories"
            >
                 Category
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
                {category && category.length > 0 ? (
                    category.map((cat) => (
                        <option
                            key={cat.slug}
                            value={cat.slug}
                        >
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option>No categories available</option>
                )}
            </select>
        </div>
    );
};

export default SelectInput;