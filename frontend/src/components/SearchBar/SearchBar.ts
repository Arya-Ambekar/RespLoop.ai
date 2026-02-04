export interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}
