interface DropdownMenuButtonProps {
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

interface DropdownMenuItemProps {
  asChild: React.ReactNode;
}

export type { DropdownMenuButtonProps, DropdownMenuItemProps };
