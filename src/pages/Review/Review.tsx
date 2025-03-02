import { useGetInvestments } from "../../hooks/useGetInvestments/useGetInvestments";
import { useGetFunds } from "../../hooks/useGetFunds/useGetFunds";
import { ErrorComponent } from "../../components/Error";
import { Investment } from "../../types/Investments";
import { Fund } from "../../types/Fund";
import { Link } from "react-router-dom";
import cushon from "../../assets/logos/cushon.png";
import thinking from "../../assets/images/thinking.png";
import { ReactComponent as SackIcon } from "../../assets/icons/sack-dollar-solid.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/circle-info-solid.svg";
import { Loading } from "../../components/Loading";

import "./Review.scss";

export const Review = () => {
  const {
    investments,
    loading: investmentsLoading,
    error: investmentError,
  } = useGetInvestments();
  const { loading: fundsLoading, funds, error: fundsError } = useGetFunds();

  if (investmentsLoading || fundsLoading) {
    return (
      <Loading
        loadingText={"Bare with us while we fetch your account data..."}
      />
    );
  }

  if (investmentError || fundsError) {
    return (
      <ErrorComponent
        errorText={"Something has gone wrong, please contact support"}
      />
    );
  }

  const getFundImage = (fundId: string) => {
    switch (fundId) {
      case "1":
        return <img src={cushon} alt="cushon" />;
      default:
        return (
          <div className="fundIcon">
            <SackIcon />
          </div>
        );
    }
  };

  const investmentSummary: Record<string, { totalAmountInvested: number }> =
    investments.reduce(
      (
        acc: Record<string, { totalAmountInvested: number }>,
        investment: Investment
      ) => {
        const { fundId, amount } = investment;
        if (!acc[fundId]) {
          acc[fundId] = { totalAmountInvested: 0 };
        }
        acc[fundId].totalAmountInvested += amount;
        return acc;
      },
      {}
    );

  const formattedData = Object.keys(investmentSummary).map((fundId: string) => {
    const fund: Fund | undefined = funds.find((f: Fund) => f.id === fundId);
    if (!fund) {
      throw new Error(`Fund with id ${fundId} not found.`);
    }
    return {
      fundId,
      totalAmountInvested: investmentSummary[fundId].totalAmountInvested,
      fundName: fund.name,
      fundDescription: fund.description,
      category: fund.category,
      percent: fund.percent,
    };
  });

  return (
    <div className={"reviewContainer"}>
      <h4>
        Review my <span>investments</span>
      </h4>
      <p className={"reviewDescription"}>
        View the performance of your investments and track their growth over
        time.
      </p>
      <section>
        {formattedData &&
          formattedData.map((investment) => (
            <div className={`card fundCard`} key={investment.fundId}>
              <div className={"leftSection"}>
                <div className={"fundIcon"}>
                  {getFundImage(investment.fundId)}
                </div>
                <div className={"leftSectionText"}>
                  <h6>
                    {investment.fundName} <InfoIcon />
                  </h6>
                  <p>{investment.category}</p>
                </div>
              </div>
              <div className={"rightSection"}>
                <div className={"rightSectionText"}>
                  £{investment.totalAmountInvested} <br />
                </div>
              </div>
            </div>
          ))}
        {!formattedData && (
          <div className={"noInvestments"}>
            <img src={thinking} alt="Person thinking" />
            <p>
              Looks like you haven't placed any investments!
              <br />{" "}
              <span>
                <Link to="/invest">Click here to place a new investment.</Link>
              </span>
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
