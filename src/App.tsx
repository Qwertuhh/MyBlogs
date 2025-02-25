import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Auth from "./appwrite/auth";
import { Outlet } from "react-router-dom";
import { Footer, Header} from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.getUser()
      .then((user) => {
        if (user) {
          dispatch({ type: "auth/login", payload: user }); //? Another syntax for dispatch
        } else {
          dispatch({ type: "auth/logout" });
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  });

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
