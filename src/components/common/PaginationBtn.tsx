import { commonClassNames } from "@/constants";
import { IconLeftArrow, IconRightArrow } from "../icons";

const PaginationBtn = () => {
  return (
    <div className="flex justify-end gap-3 mt-5">
      <button className={commonClassNames.paginationButton}>
        <IconLeftArrow />
      </button>
      <button className={commonClassNames.paginationButton}>
        <IconRightArrow />
      </button>
    </div>
  );
};

export default PaginationBtn;
