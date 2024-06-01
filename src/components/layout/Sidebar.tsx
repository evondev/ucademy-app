import { menuItems } from "@/constants";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <a href="/" className="font-bold text-3xl inline-block mb-5">
        Ucademy
      </a>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
        ))}
      </ul>
    </div>
  );
};

function MenuItem({
  url = "/",
  title = "",
  icon,
}: {
  url: string;
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={url}
        className="p-3 rounded-md flex items-center gap-3 hover:text-primary hover:bg-primary hover:bg-opacity-10 transition-all"
      >
        {icon}
        {title}
      </a>
    </li>
  );
}

export default Sidebar;
