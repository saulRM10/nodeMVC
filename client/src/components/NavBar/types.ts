interface NavbarProps {
  className?: string;
  children: React.ReactNode;
}

interface NavbarItemProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export type { NavbarProps, NavbarItemProps };
