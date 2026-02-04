import { Search, X } from "lucide-react";
import { useState } from "react";

// import type { SearchBarProps } from "./SearchBar";
import "./SearchBar.css";

const SearchBar = () =>
  //     {
  //   placeholder,
  //   onSearch,
  //   debounceMs = 400,
  // }: SearchBarProps
  {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
    };

    const handleClear = () => {
      setValue("");
    };

    console.log(value);
    return (
      <div className="search-bar">
        <div className="search-wrapper">
          <span className="search-icon-wrapper">
            <Search className="search-icon" />
          </span>
          <input
            className="search-bar-input"
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={"Search here..."}
          />
        </div>
        {value && (
          <button className="clear-search-btn" onClick={handleClear}>
            <X className="clear-search-icon" />
          </button>
        )}
      </div>
    );
  };

export default SearchBar;
