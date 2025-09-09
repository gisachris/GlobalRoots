import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { INDUSTRIES } from '../../data/industries';

interface IndustryComboBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const IndustryComboBox: React.FC<IndustryComboBoxProps> = ({
  value,
  onChange,
  placeholder = "Select or type industry",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredIndustries, setFilteredIndustries] = useState(INDUSTRIES);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    // Filter industries based on input
    const filtered = INDUSTRIES.filter(industry =>
      industry.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredIndustries(filtered);
    setIsOpen(true);
  };

  const handleSelectIndustry = (industry: string) => {
    onChange(industry);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setFilteredIndustries(INDUSTRIES);
    setIsOpen(true);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredIndustries.length > 0 ? (
            filteredIndustries.map((industry, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectIndustry(industry)}
                className="w-full px-3 py-2 text-left hover:bg-[#B45309]/10 focus:bg-[#B45309]/10 focus:outline-none"
              >
                {industry}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No industries found. You can still type your custom industry.
            </div>
          )}
        </div>
      )}
    </div>
  );
};