export interface SectionInfoItemProps {
  title: string;
  children: React.ReactNode;
}

function SectionInfoItem({ children, title }: SectionInfoItemProps) {
  return (
    <div className="bgDarkMode borderDarkMode rounded-lg border p-5">
      <h4 className="text-sm font-normal text-slate-400">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

export default SectionInfoItem;
