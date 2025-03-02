import "./ErrorComponent.scss";
import ErrorImage from "../../assets/images/error.png";

interface ErrorProps {
  errorText?: string;
  errorImage?: string;
}

export const ErrorComponent = ({ errorText, errorImage }: ErrorProps) => {
  return (
    <div className="errorContainer">
      <img src={errorImage || ErrorImage} alt="loading" />
      <p>{errorText || "Something went wrong"}</p>
    </div>
  );
};
