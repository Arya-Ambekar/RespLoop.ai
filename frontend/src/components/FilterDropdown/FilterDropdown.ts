export interface FilterDropdownProps {
  dropdownList: string[] | number[];
  selectedValue: string | number;
  onSelect: (value: string | number) => void;
  maxWidth?: string;
  maxHeight?: string;
}
