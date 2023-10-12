import React from "react";

function Accordion({ title, icon, content, isOpen, onToggle }) {
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
      {isOpen && <div className={`content text-left p-1 overflow-y-scroll hide-scrollbar ${isOpen ? "flex-grow basis-0" : "" } `}>
        {content}
        </div>}
    </div>
  );
}

export default Accordion;
