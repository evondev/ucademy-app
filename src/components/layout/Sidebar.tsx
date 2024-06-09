import { menuItems } from "@/constants";
import { TMenuItem } from "@/types";
import { UserButton } from "@clerk/nextjs";
import { ActiveLink } from "../common";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200 bg-white flex flex-col">
      <a href="/" className="font-bold text-3xl inline-block mb-5">
        <span className="text-primary">U</span>
        cademy
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
      <div className="mt-auto flex items-center justify-end">
        <UserButton />
      </div>
    </div>
  );
};

function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
