import { Navigate } from "react-router-dom";

function PrivateRoute({ isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to="/" />;
  }
  return children;
}

export default PrivateRoute;
