import { useState } from "react";
import { formatAmount } from "../../utilities/formatAmount";
import { ReactComponent as BankIcon } from "../../assets/icons/building-columns-solid.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/circle-info-solid.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";
import { ReactComponent as SackIcon } from "../../assets/icons/sack-dollar-solid.svg";
import { ReactComponent as PoundIcon } from "../../assets/icons/sterling-sign-regular.svg";
import cushon from "../../assets/logos/cushon.png";
import noFunds from "../../assets/images/empty.png";
import ReactLoading from "react-loading";

import { Loading } from "../../components/Loading";
import { usePostInvestment } from "../../hooks/usePostInvestment/usePostInvestment";
import { Link, useNavigate } from "react-router-dom";
import { useGetFunds } from "../../hooks//useGetFunds/useGetFunds";
import { ChangeEvent } from "react";
import { useGetSourceById } from "../../hooks/useGetSourceById/useGetSourceById";
import { ErrorComponent } from "../../components/Error";
import { useUser } from "../..//store/UserContext";
import { usePatchSource } from "../../hooks/usePatchSource/usePatchSource";

import "./Invest.scss";

export const Invest = () => {
  const { loading: fundsLoading, funds, error: fundsError } = useGetFunds();
  const { loading: investmentLoading, submitInvestment } = usePostInvestment();
  const {
    loading: sourceLoading,
    source,
    error: sourceError,
  } = useGetSourceById("1");
  const [selectedFund, setSelectedFund] = useState<string | null>();
  const [amount, setAmount] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const { patchSource } = usePatchSource();

  if (sourceLoading || fundsLoading) {
    return (
      <Loading
        loadingText={"Bare with us while we fetch your account data..."}
      />
    );
  }

  if (sourceError || fundsError) {
    return (
      <ErrorComponent
        errorText={"Something has gone wrong, please contact support"}
      />
    );
  }

  if (source && source?.sourceBalance <= 0) {
    return (
      <ErrorComponent
        errorImage={noFunds}
        errorText={"Looks like there are no funds available to invest."}
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

  const handleInvest = () => {
    if (!selectedFund || !amount || parseInt(amount) <= 0) {
      setError("Please select a fund and enter a valid amount.");
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleModalConfirm = async () => {
    try {
      if (!selectedFund || !amount || !user || !source)
        throw new Error("Something went wrong, please contact support");

      const investment = {
        fundId: selectedFund,
        amount: parseInt(amount),
        investmentDate: new Date().toISOString(),
        customerId: user.id,
      };

      const submitInvestmentResult = await submitInvestment(investment);

      if (submitInvestmentResult !== "Success") throw new Error();

      const submitPatchSourceResult = await patchSource(source?.id, {
        sourceBalance: source.sourceBalance - parseInt(amount),
        sourceTransactions: [
          ...source?.sourceTransactions,
          {
            id: `${source?.sourceTransactions.length + 1}`,
            amount: parseInt(amount),
            transactionDate: new Date().toISOString(),
          },
        ],
      });

      if (submitPatchSourceResult !== "Success") throw new Error();

      setShowConfirmationModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      setShowConfirmationModal(false);
      setShowErrorModal(true);
    }
  };

  const handleModalCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleFundSelect = (fundId: string) => {
    setSelectedFund(fundId);
    setError("");
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    setError("");
  };

  const handleErrorModalConfirm = () => {
    setShowErrorModal(false);
    navigate("/");
  };

  const handleErrorModalCancel = () => {
    setShowErrorModal(false);
  };

  const handleInvestAgain = () => {
    setShowSuccessModal(false);
    navigate(0);
  };

  const sourceBalance = source?.sourceBalance;

  return (
    <div className={"investContainer"}>
      <section>
        <p className={"availableFunds"}> Total available funds to invest</p>
        <p className={"totalAmount"}>
          {sourceBalance ? formatAmount(sourceBalance) : "Loading..."}
        </p>
      </section>

      <section className={"sourceSection"}>
        <div className={"headingSection"}>
          <h4>Source</h4>
          <button>
            <PlusIcon />
          </button>
        </div>
        <div className={"sectionContent"}>
          {source && (
            <div className={`sourceCard card`}>
              <div className={"bankIcon"}>
                <BankIcon />
              </div>
              <div>
                <h6>{source.sourceName}</h6>
                <span>
                  Current balance:
                  <span className={"bold"}>{` ${
                    sourceBalance ? formatAmount(sourceBalance) : "Loading..."
                  }`}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className={"headingSection"}>
          <h4>Funds</h4>
        </div>
        <div className={"sectionContent"}>
          {funds.map((fund) => {
            const positive = fund.percent > 0;
            const symbol = positive ? "+" : "";

            return (
              <div
                className={`card fundCard`}
                key={fund.id}
                onClick={() => handleFundSelect(fund.id)}
              >
                <div className={"leftSection"}>
                  <div className={"fundIcon"}>{getFundImage(fund.id)}</div>
                  <div className={"leftSectionText"}>
                    <h6>
                      {fund.name} <InfoIcon />
                    </h6>
                    <p>{fund.category}</p>
                  </div>
                </div>
                <div className={"rightSection"}>
                  <div className={"rightSectionText"}>
                    £{fund.price} <br />
                    <span className={`${positive ? "positive" : "negative"}`}>
                      {`${symbol}${fund.percent}`}%
                    </span>
                  </div>
                  <input
                    onChange={() => {}}
                    type="radio"
                    name="fund"
                    value={fund.id}
                    checked={selectedFund === fund.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {funds.length === 1 && (
          <p className={"helperText"}>Currently one fund available.</p>
        )}
      </section>

      <section>
        <div className={"headingSection"}>
          <h4>Amount</h4>
        </div>
        <div className="sectionDescription">
          How much would you like to invest?
        </div>
        <div className={"sectionContent"}>
          <div className="amountInput">
            <PoundIcon />
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </section>

      <section>
        <div className="actionButtons">
          <button onClick={handleInvest}>Invest</button>
        </div>
      </section>

      {showConfirmationModal && (
        <div className="modalContainer">
          <div className="modalContent">
            <h4>Confirm your investment</h4>
            <p>
              Are you sure you want to invest <span>£{amount}</span> in{" "}
              <span>
                {funds.filter((fund) => selectedFund === fund.id)[0].name}
              </span>
              ?
            </p>
            <div className="modalButtons">
              <button
                disabled={investmentLoading}
                className="cancel"
                onClick={handleModalCancel}
              >
                Cancel
              </button>
              <button
                disabled={investmentLoading}
                className="confirm"
                onClick={handleModalConfirm}
              >
                {investmentLoading ? (
                  <ReactLoading type={"spin"} height={18} width={18} />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="modalContainer">
          <div className="modalContent">
            <h4>Error</h4>
            <p>Error submitting investment</p>
            <div className="modalButtons">
              <Link to="/">
                <button className="cancel" onClick={handleErrorModalConfirm}>
                  To dashboard
                </button>
              </Link>
              <button className="confirm" onClick={handleErrorModalCancel}>
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div className="modalContainer">
          <div className="modalContent">
            <h4>Congratulations!</h4>
            <p>Your investment has been placed successfully.</p>
            <div className="modalButtons">
              <Link to="/">
                <button className="cancel" onClick={() => navigate("/")}>
                  To dashboard
                </button>
              </Link>
              <button className="confirm" onClick={handleInvestAgain}>
                Invest again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
