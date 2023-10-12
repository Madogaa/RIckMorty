import React from "react";
import PropTypes from "prop-types";

function Accordion({ title, icon, content, isOpen, onToggle }) {
  // Función para alternar el estado del acordeón al hacer clic en el encabezado
  const toggleAccordion = () => {
    onToggle(!isOpen);
  };

  return (
    <div
      className={`flex flex-col locations ${isOpen ? "border-2 flex-grow" : "" } p-1 border-brigthblue cursor-pointer ${
        isOpen ? "open" : ""
      }`}
    >
      <div
        className={`flex justify-between items-center`}
        onClick={toggleAccordion}
      >
        <div className="flex justify-start items-center gap-4">
          <img className="w-8" src={icon} alt="Location Icon" />
          <p className="text-blue font-semibold">{title}</p>
        </div>
        <img src="/ArrowDown.svg" alt="ArrowDown Icon" />
      </div>
      {isOpen && (
        <div className={`content text-left p-1 overflow-y-scroll hide-scrollbar ${isOpen ? "flex-grow basis-0" : "" } `}>
          {content}
        </div>
      )}
    </div>
  );
}

// Definicion de las PropTypes de Accordion
Accordion.propTypes = {
  title: PropTypes.string.isRequired, // Título del acordeón
  icon: PropTypes.string.isRequired, // Ruta de la imagen del ícono
  content: PropTypes.node.isRequired, // Contenido del acordeón (puede ser cualquier tipo de nodo React)
  isOpen: PropTypes.bool.isRequired, // Estado de apertura/cierre del acordeón
  onToggle: PropTypes.func.isRequired, // Función de manejo para alternar el acordeón
};

export default Accordion;
