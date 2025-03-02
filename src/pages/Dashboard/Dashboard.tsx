import { ReactComponent as PigIcon } from "../../assets/icons/piggy-bank-solid.svg";
import { useGetInvestments } from "../../hooks/useGetInvestments/useGetInvestments";

import "./Dashboard.scss";

export const Dashboard = () => {
  const { investments, loading, error } = useGetInvestments();

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
          <a href="/invest">
            <button>Invest</button>
          </a>
          <a href="/withdraw">
            <button>Review</button>
          </a>
        </div>
      </div>
      <div className="curveContainer">
        <div className="curveSection"></div>
      </div>
      <section className="investmentSection">
        <div>Hope you're enjoying my demo! Click to reset!</div>
      </section>
    </>
  );
};
