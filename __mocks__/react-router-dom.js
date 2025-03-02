// __mocks__/react-router-dom.js
export const useLocation = () => ({
  pathname: "/",
  search: "",
  hash: "",
  state: null,
  key: "default",
});

export const useNavigate = () => jest.fn();

export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Link = ({ to, children }) => <a href={to}>{children}</a>;
export const Route = ({ children }) => <div>{children}</div>;
