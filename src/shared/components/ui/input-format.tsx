import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

const InputFormatCurrency = (props: NumericFormatProps<InputAttributes>) => {
  return (
    <NumericFormat
      className="flex outline-none h-12 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary transition-all dark:border-opacity-10 bg-white dark:bg-grayDarker  focus-primary"
      thousandSeparator
      {...props}
    />
  );
};

export default InputFormatCurrency;
