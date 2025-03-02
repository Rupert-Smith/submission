import { ReactComponent as PigIcon } from "../../assets/icons/piggy-bank-solid.svg";
import { useGetInvestments } from "../../hooks/useGetInvestments/useGetInvestments";
import { Link } from "react-router-dom";

import "./Dashboard.scss";

export const Dashboard = () => {
  const { investments } = useGetInvestments();

  const investmentsFormatted = investments?.reduce((acc, investment) => {
    return acc + investment.amount;
  }, 0);

  return (
    <>
      <div className={"container"}>
        <div className={"retailComponent"}>
          <div className={"retailIcon"}>
            <PigIcon />
          </div>
          <p>Retail</p>
        </div>
        <div className={"header"}>
          <h5>Total Investments</h5>
          <h2>{`£${investmentsFormatted}`}</h2>
        </div>
        <div className={"actionButtons"}>
          <Link to="/invest">
            <button>Invest</button>
          </Link>
          <Link to="/review">
            <button>Review</button>
          </Link>
        </div>
      </div>
      <div className="curveContainer">
        <div className="curveSection"></div>
      </div>
      <section className="investmentSection">
        {/* <div>Hope you're enjoying my demo! Click to reset!</div> */}
      </section>
    </>
  );
};
