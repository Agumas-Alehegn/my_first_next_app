"use client";
import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";

export default function DropDownMenu({ options, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape); //t
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative inline-block  " ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="p-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MoreVertical size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white  overflow-hidden rounded-md py-1 text-gray-900  shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
}
