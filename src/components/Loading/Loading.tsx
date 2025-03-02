import "./Loading.scss";
import LoadingImage from "../../assets/images/loading.png";

interface LoadingProps {
  loadingText?: string;
}

export const Loading = ({ loadingText }: LoadingProps) => {
  return (
    <div className="loadingPage">
      <div className="loadingContainer">
        <img src={LoadingImage} alt="loading" />
        <p>{loadingText || "Loading..."}</p>
      </div>
    </div>
  );
};
