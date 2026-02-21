import { useState } from "react";
import type { FilterDropdownProps } from "./FilterDropdown.ts";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./FilterDropdown.css";

const FilterDropdown = ({
  dropdownList,
  selectedValue,
  onSelect,
}: FilterDropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  console.log("dropdownList: ", dropdownList);

  const dropdownContent = (
    <div className="filter-dropdown-options-container">
      {dropdownList.map((option) => (
        <div
          key={option}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(option);
            setIsDropdownVisible(false);
          }}
          className={
            selectedValue === option
              ? "selected-dropdown-option"
              : "dropdown-option"
          }
        >
          {option}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="filter-dropdown-wrapper"
      onClick={() => setIsDropdownVisible((prev) => !prev)}
    >
      <div className="filter-header">
        <div className="filter-dropdown-title">{selectedValue || "Select"}</div>
        {isDropdownVisible ? (
          <ChevronUp className="chevron-icon" />
        ) : (
          <ChevronDown className="chevron-icon" />
        )}
      </div>
      <div>{isDropdownVisible && <div>{dropdownContent}</div>}</div>
    </div>
  );
};

export default FilterDropdown;
