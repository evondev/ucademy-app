import { ComponentProps } from 'react';

const IconDefault = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  );
};

export default IconDefault;
