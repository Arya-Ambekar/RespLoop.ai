import type { DialogBoxProps } from "./DialogBox";
import "./DialogBox.css";

const DialogBox = ({
  isOpen,
  //   onClose,
  minHeight,
  minWidth,
  children,
}: DialogBoxProps) => {
  if (!isOpen) return null;
  return (
    <div className="overlay">
      <div className="dialog-box" style={{ minHeight, minWidth }}>
        {children}
      </div>
    </div>
  );
};

export default DialogBox;
