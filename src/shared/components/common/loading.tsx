import { cn } from '@/shared/utils';

export interface LoadingProps {
  className?: string;
}

function Loading({ className }: LoadingProps) {
  return (
    <div
      className={cn('flex size-full items-center justify-center', className)}
    >
      <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export default Loading;
