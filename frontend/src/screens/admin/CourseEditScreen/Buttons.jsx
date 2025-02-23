import { useContext } from 'react';
import { AccordionContext, useAccordionButton } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';

const RemoveButton = ({ children, lessonId, className, handler }) => {
  return (
    <button
      type="button"
      className={`border-0 bg-transparent text-secondary ${className}`}
      onClick={() => handler({ lessonId })}
    >
      {children}
    </button>
  );
};

const EditButton = ({ children, lessonId, className, handler }) => {
  return (
    <button
      type="button"
      className={`border-0 bg-transparent text-secondary ${className}`}
      onClick={() => handler({ lessonId })}
    >
      {children}
    </button>
  );
};

const CustomToggle = ({ eventKey, callback, setActiveKey }) => {
  const { activeEventKey, alwaysOpen } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  let isCurrentEventKey = false;
  if (alwaysOpen) {
    if (Array.isArray(activeEventKey)) {
      if (activeEventKey.includes(eventKey)) {
        isCurrentEventKey = true;
      }
    }
  } else {
    setActiveKey(activeEventKey);
    if (activeEventKey === eventKey) {
      isCurrentEventKey = true;
    }
  }

  return (
    <button
      type="button"
      className="border-0 bg-transparent text-secondary"
      onClick={decoratedOnClick}
    >
      {isCurrentEventKey ? <FaMinus /> : <FaPlus />}
    </button>
  );
};

export { RemoveButton, CustomToggle, EditButton };
