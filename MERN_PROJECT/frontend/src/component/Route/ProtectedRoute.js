import { Navigate } from "react-router-dom";

const ProtectedRoute = ({isAuthenticated, children, }) => {

    if(isAuthenticated){
      return children
    }
    if(!isAuthenticated){      
      return <Navigate replace/>
    }
    return children
  };
  export default ProtectedRoute;