import "./ErrorComponent.scss";
import ErrorImage from "../../assets/images/error.png";

interface ErrorProps {
  errorText?: string;
}

export const ErrorComponent = ({ errorText }: ErrorProps) => {
  return (
    <div className="errorContainer">
      <img src={ErrorImage} alt="loading" />
      <p>{errorText}</p>
    </div>
  );
};
