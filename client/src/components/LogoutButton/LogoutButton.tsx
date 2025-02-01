import { Button } from "@radix-ui/themes";
import { LogoutButtonProps } from "./types";
import styles from "./LogoutButton.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";

const LogoutButton: React.FC<LogoutButtonProps> = ({ icon, label }) => {
  const { logout } = useAuth0();
  return (
    <Button
      onClick={() => {
        logout();
        Cookies.remove("email");
      }}
      variant="soft"
      className={styles.button}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </Button>
  );
};
export default LogoutButton;
