import { useState } from "react";
import { formatAmount } from "../../utilities/formatAmount";
import { ReactComponent as BankIcon } from "../../assets/icons/building-columns-solid.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/circle-info-solid.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";
import { ReactComponent as SackIcon } from "../../assets/icons/sack-dollar-solid.svg";
import { ReactComponent as PoundIcon } from "../../assets/icons/sterling-sign-regular.svg";

import { Loading } from "../../components/Loading";
import { useGetFunds } from "../../hooks//useGetFunds/useGetFunds";
import { ChangeEvent } from "react";
import { useGetSourceById } from "../../hooks/useGetSourceById/useGetSourceById";
import { Error } from "../../components/Error";
import cushon from "../../assets/logos/cushon.png";

import "./Invest.scss";

export const Invest = () => {
  const { loading: fundsLoading, funds, error: fundsError } = useGetFunds();
  const {
    loading: sourceLoading,
    source,
    error: sourceError,
  } = useGetSourceById("1");
  const [selectedFund, setSelectedFund] = useState<string | null>();
  const [amount, setAmount] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  if (sourceLoading || fundsLoading) {
    return (
      <Loading
        loadingText={"Bare with us while we fetch your account data..."}
      />
    );
  }

  if (sourceError || fundsError) {
    return (
      <Error errorText={"Something has gone wrong, please contact support"} />
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

    const dataToSend = {
      fundId: selectedFund,
      amount,
    };

    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    alert("Investment confirmed!");
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleFundSelect = (fundId: string) => {
    setSelectedFund(fundId);
    setError("");
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    setError("");
  };

  const newlyTransferredFunds = 5000;
  const sourceBalance = source?.sourceBalance;
  const totalAmount = sourceBalance && sourceBalance - newlyTransferredFunds;

  return (
    <div className={"investContainer"}>
      <section>
        <p className={"availableFunds"}> Total available funds to invest</p>
        <p className={"totalAmount"}>
          {totalAmount ? formatAmount(totalAmount) : "Loading..."}
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

      {showModal && (
        <div className="confirmationModal">
          <div className="modalContent">
            <p>
              Are you sure you want to invest <span>£{amount}</span> in this
              fund?
            </p>
            <div className="modalButtons">
              <button className="cancel" onClick={handleModalCancel}>
                Cancel
              </button>
              <button className="confirm" onClick={handleModalConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
