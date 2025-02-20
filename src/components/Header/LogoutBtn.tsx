import { useDispatch } from "react-redux";
import Auth from "../../appwrite/auth";
import { logout } from "../../features/auth/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Auth.logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((e) => console.error(e));
  };
  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutBtn;
