import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function CountrySelect({ selectedCountry, onChange }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://api.gaen.uz/api/v1/article/user/countries/');
                const countryArray = Object.entries(response.data).map(([name, code]) => ({
                    name,
                    code,
                }));
                setCountries(countryArray);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (country) => {
        if (onChange) {
            onChange(country);
        }
    };

    return (
        <Listbox value={selectedCountry} onChange={handleChange}>
            <Label className="block text-sm font-medium text-gray-500 dark:text-white">Davlatni tanlang</Label>
            <div className="relative h-12 mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">
                            {selectedCountry ? selectedCountry.name : 'Davlat tanlanmagan'}
                        </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 h-72 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {countries.length > 0 ? (
                        countries.map((country) => (
                            <ListboxOption
                                key={country.code}
                                value={country}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                            >
                                <div className="flex items-center">
                                    <span className="ml-3 block truncate font-normal group-hover:font-semibold">
                                        {country.name}
                                    </span>
                                </div>
                                {selectedCountry && selectedCountry.code === country.code && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                    </span>
                                )}
                            </ListboxOption>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Loading countries...</p>
                    )}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}
