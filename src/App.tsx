import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Auth from "./appwrite/auth";

// import { Client, Account } from "appwrite";
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
  // {
  //   const client = new Client();

  //   client
  //     .setEndpoint("https://cloud.appwrite.io/v1")
  //     .setProject("67b5e5d2003811522dfd"); // Replace with your project ID

  //   const account = new Account(client);

  //   console.log(account);
  //   (async function () {
  //     try {
  //       console.log(await account.get());
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }

  return loading && <div>Loading...</div>;
}

export default App;
