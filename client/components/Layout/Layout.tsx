import styles from "./Layout.module.css";
import { LayoutProps, blackListExceptions } from "./types";
import TopNav from "../TopNav/TopNav";
import SideNav from "../SideNav/SideNav";
import { useState } from "react";
import { blackListRoutes } from "./blacklist";
import { useAuth } from "../AuthContext/AuthContext";
import { matchPath } from "../../util/matchPath";
import { Outlet } from "react-router-dom";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [selectedItem, setSelectedItem] = useState("home");

  const isBlacklisted = blackListRoutes.some((pattern) =>
    matchPath(window.location.pathname, pattern, blackListExceptions),
  );

  return (
    <div>
      {!isBlacklisted && currentUser ? (
        <div>
          <TopNav />
          <SideNav
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default Layout;
