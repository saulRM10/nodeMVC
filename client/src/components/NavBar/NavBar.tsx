import React from "react";
import { NavbarProps, NavbarItemProps } from "./types";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC<NavbarProps> & {
  Item: React.FC<NavbarItemProps>;
} = ({ children, className = "" }) => {
  const navbarClassName = `${styles.navbar} ${className}`;

  return (
    <nav id="navbar">
      <ul className={navbarClassName}>{children}</ul>
    </nav>
  );
};

const NavbarItem: React.FC<NavbarItemProps> = ({
  children,
  className = "",
  href,
  ...delegated
}) => {
  const navbarItemClassName = `${styles.navbarLink} ${className}`;

  const activeClass = (isActive: boolean) => {
    [isActive ? `${styles.navbarLinkActive}` : ""].join(" ");
  };

  return (
    <li className={styles.navbarItem}>
      <NavLink
        className={`${navbarItemClassName} ${activeClass}`}
        to={href}
        {...delegated}>
        {children}
      </NavLink>
    </li>
  );
};

Navbar.Item = NavbarItem;

export default Navbar;
