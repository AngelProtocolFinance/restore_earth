import { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";

const CustomToggle = ({ children, eventKey }) => {
  const { activeEventKey } = useContext(AccordionContext);
  const isCurrentEventKey = activeEventKey === eventKey;
  const decoratedOnClick = useAccordionButton(eventKey, () => {});
  let classNames = "btn btn-block px-12 w-100 btn-outline-dark border-top";
  if (isCurrentEventKey) {
    classNames = "btn btn-block px-12 w-100 btn-primary border-top bg-opacity";
  }
  return (
    <button type="button" className={classNames} onClick={decoratedOnClick}>
      {children}
    </button>
  );
};

export default CustomToggle;
