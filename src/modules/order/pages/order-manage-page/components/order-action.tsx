export interface OrderActionProps {
  onClick: () => void;
  children: React.ReactNode;
}

function OrderAction({ children, onClick }: OrderActionProps) {
  return (
    <button
      className="borderDarkMode hover:border/80 dark:hover:border/20 flex size-8 items-center justify-center rounded-md border p-2 text-gray-500 dark:bg-transparent"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default OrderAction;
