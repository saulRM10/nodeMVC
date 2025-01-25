import styles from "./NavItem.module.css";
import { NavButtonProps } from "./types";
import { Button } from "@radix-ui/themes";

const NavItem: React.FC<NavButtonProps> = ({
  icon,
  label,
  labelType,
  selected,
  onItemClick,
}) => {
  const handleClick = () => {
    onItemClick(labelType);
  };

  return (
    <li className={styles.li}>
      <Button
        onClick={handleClick}
        variant="soft"
        className={selected ? styles["button-selected"] : styles.button}
      >
        <span className={selected ? styles["icon-selected"] : styles.icon}>
          {icon}
        </span>
        <span className={selected ? styles["label-selected"] : styles.label}>
          {label}
        </span>
      </Button>
    </li>
  );
};

export default NavItem;
