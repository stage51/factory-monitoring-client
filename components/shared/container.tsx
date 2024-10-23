import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Container({ className, children }: Props) {
    return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
}
