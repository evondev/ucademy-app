export interface SectionItemProps {
  title: string;
  children: React.ReactNode;
}

function SectionItem({ children, title }: SectionItemProps) {
  return (
    <>
      <h2 className="mb-5 text-xl font-bold">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default SectionItem;
