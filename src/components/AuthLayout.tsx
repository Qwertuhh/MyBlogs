import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../types/globalTypes";

function AuthLayout({
  children,
  authenticated = true,
}: {
  children: React.ReactNode;
  authenticated: boolean;
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(
    (state: { auth: AuthState }) => state.auth.status
  );

  useEffect(() => {
    if (authenticated && authenticated !== authStatus) {
      navigate("/login");
    }else{
      navigate("/");
    }
    setLoader(false);
  },[authenticated, authStatus, navigate]);
  return loader ? <div>Loading...</div> : <>{children}</>;
}

export default AuthLayout;
