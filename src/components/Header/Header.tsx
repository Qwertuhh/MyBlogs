import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../../types/globalTypes";
import Container from "../Container/Container";
import Logo from "../Logo";

function Header() {
  const authStatus = useSelector(
    (state: { auth: AuthState }) => state.auth.status
  );
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Container>
        <>
          <nav>
            <div>
              <Logo width="100px" />
            </div>
            <ul className="flex space-x-4">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.slug}>
                    <button
                      onClick={() => navigate(item.slug)}
                      key={item.slug}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </>
      </Container>
    </header>
  );
}

export default Header;
