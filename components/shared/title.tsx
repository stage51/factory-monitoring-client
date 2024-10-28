import { cn } from '@/lib/utils';
import Container from './container';

interface Props {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function Title({ className, title = "", subtitle = "" }: Props) {
    return (
        <div className={cn('', className)}>
            <Container className="flex items-start flex-col p-6 gap-6 mt-4 animate-slide-element">
                <h1 className='text-3xl'>{title}</h1>
                {subtitle && <h2 className='text-xl text-gray-800 font-light'>{subtitle}</h2>}
            </Container>
        </div>
    );
}
