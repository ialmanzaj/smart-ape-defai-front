import React, { useEffect } from "react";
import { Spinner } from "reactstrap";
import "./PairDashboard.css";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactNode;
  loading?: boolean;
  loadedContent?: React.ReactNode;
  error?: string | null;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  title,
  content,
  loading,
  loadedContent,
  error,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="menu-content">
          <button className="close-button" onClick={onClose}>
            ×
          </button>
          {title && <h3>{title}</h3>}
          <div>
            {content}
            {loading ? (
              <div className="text-center">
                <Spinner />
                <p>Loading...</p>
              </div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : (
              loadedContent
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
