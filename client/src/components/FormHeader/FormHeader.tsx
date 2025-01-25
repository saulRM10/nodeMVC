import { HomePageLogoIcon } from "../../assets/Icons";
import styles from "./FormHeader.module.css";
import { Text } from "@radix-ui/themes";

function FormHeader() {
  return (
    <header className={styles.container}>
      <div className={styles.logoCon}>
        <span className={styles.logo}>
          <HomePageLogoIcon />
        </span>
        <span className={styles.logoText}>
          <Text>cascarita</Text>
        </span>
      </div>
    </header>
  );
}

export default FormHeader;
