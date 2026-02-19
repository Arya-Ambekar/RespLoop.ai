export interface DialogBoxProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  minWidth?: string;
  minHeight?: string;
}
