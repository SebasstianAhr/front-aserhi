import { useState, useEffect } from "react";
import { ModalProp } from "../../core/interface/modal-general.interface";
import "./modal-general.css";

const ModalGeneral = ({
  children,
  openModal,
  closeModal,
  title = "Alert no title",
  showHeader = true,
  showOverlay = true,
}: ModalProp): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (openModal) {
      const timer = setTimeout(() => setIsVisible(true), 10); // Delay para animación de entrada
      return () => clearTimeout(timer);
    } else if (isVisible) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsExiting(false);
        setIsVisible(false);
      }, 400); // Duración de la animación de salida
      return () => clearTimeout(timer);
    }
  }, [openModal, isVisible]);

  if (!isVisible && !openModal) return null;

  return (
    <div
      className={`modal__overlay ${showOverlay ? "modal__overlay--show" : "modal__overlay--no-show"} ${
        isVisible ? "modal__overlay--visible" : ""
      } ${isExiting ? "modal__overlay--exiting" : ""}`}
    >
      <div
        className={`modal__content ${
          isVisible ? "modal__content--visible" : ""
        } ${isExiting ? "modal__content--exiting" : ""}`}
      >
        {showHeader && (
          <div className="modal__head">
            <h3 className="modal__title">{title}</h3>
          </div>
        )}
        <button
          onClick={() => closeModal(false)}
          className="modal__close"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalGeneral;
