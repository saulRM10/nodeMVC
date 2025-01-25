interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

interface ModalContentProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export type { ModalProps, ModalContentProps };
