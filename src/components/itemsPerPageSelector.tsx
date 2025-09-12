'use client';

import { useFilter } from '@/contexts/FilterContext';

export default function ItemsPerPageSelector() {
  const { itemsPerPage, setItemsPerPage, setCurrentPage } = useFilter();
  
  const options = [12, 24, 48];
  
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <label htmlFor="items-per-page" className="font-medium">
        Items per page:
      </label>
      <select
        id="items-per-page"
        value={itemsPerPage}
        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
