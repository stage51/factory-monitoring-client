import { cn } from '@/lib/utils';
import React from 'react';
import { CloudDownload, LaptopMinimal } from 'lucide-react';

interface Props {
  className?: string;
}

export const Card: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('w-auto h-80 flex flex-col items-center justify-center group duration-100 rounded-lg hover:bg-slate-400 p-6 gap-4', className)}>
            <div className='h-32'>
                <LaptopMinimal size={96} className="relative -inset-x-2 text-primary duration-100 group-hover:text-white" />
                <CloudDownload size={96} className="relative inset-x-6 -inset-y-16 text-primary fill-white duration-100 group-hover:text-white group-hover:fill-slate-400" />
            </div>
            <p className='text-xl font-light duration-100 group-hover:text-white'>Контроль отправки АСКП отчетности</p>
            <p className='text-lg font-extralight duration-100 group-hover:text-white'>Осуществляйте перманентный контроль отправки отчетности АСКП в РАР, наблюдайте за её статусами.</p>
        </div>
    );
};