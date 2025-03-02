import "./Header.scss";
import { ReactComponent as GearIcon } from "../../assets/icons/gear-solid.svg";
import { ReactComponent as QuestionLight } from "../../assets/icons/circle-question-light.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/angle-left-light.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/house-solid.svg";

import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <nav className="navigation">
      {location.pathname !== "/" && (
        <>
          <BackIcon data-testid="back-icon" onClick={handleBackClick} />
          <HomeIcon data-testid="home-icon" onClick={handleBackClick} />
        </>
      )}
      {location.pathname === "/" && (
        <>
          <GearIcon data-testid="settings-icon" />
          <QuestionLight data-testid="support-icon" />
        </>
      )}
    </nav>
  );
};
