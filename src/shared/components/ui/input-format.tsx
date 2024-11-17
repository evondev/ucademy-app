import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from 'react-number-format';

export const InputFormatCurrency = (
  props: NumericFormatProps<InputAttributes>,
) => {
  return (
    <NumericFormat
      thousandSeparator
      className="focus-primary dark:border/10 flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-sm font-medium outline-none transition-all focus:!border-primary dark:bg-grayDarker"
      {...props}
    />
  );
};
