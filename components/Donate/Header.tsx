import classNames from "classnames";

import { STEPS, STEP_TITLES } from "./variables";

const HeaderItem = ({ step, active }: { step: number; active: boolean }) => {
  const title = STEP_TITLES(step);
  const className = classNames("col col-md-3 donate__step", {
    donate__step__active: active,
  });
  return (
    <div className={className}>
      <span>{title}</span>
    </div>
  );
};

const Header = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="row justify-content-md-center donate__header">
      {Object.values(STEPS).map((step: number) => (
        <HeaderItem step={step} active={step == currentStep} key={step} />
      ))}
    </div>
  );
};

export default Header;
