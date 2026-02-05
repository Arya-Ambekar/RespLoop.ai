export interface FilterDropdownProps {
  dropdownList: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}
