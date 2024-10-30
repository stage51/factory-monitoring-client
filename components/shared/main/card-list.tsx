"use client";

import { cn } from '@/lib/utils';
import Container from '../container';
import Card from '../card';
import { LaptopMinimal, CloudDownload, CloudUpload, Settings, Joystick } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

interface Props {
    className?: string;
}

export default function CardList({ className }: Props) {
    const [router] = useState(useRouter())
    function handleCardClick(href : string) {
        router.push(href)
    }

    return (
        <div className={cn('', className)}>
            <Container className="flex items-start flex-col p-6 gap-6 animate-slide-element">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    <Card 
                        icon={
                            <div className='h-32'>
                                <LaptopMinimal size={96} className="relative -inset-x-2 text-primary" />
                                <CloudDownload size={96} className="relative inset-x-6 -inset-y-16 text-primary transition-all fill-white group-hover:fill-slate-200" />
                            </div>
                        }
                        title="Контроль отправки АСКП отчетности"
                        subtitle='Осуществляйте перманентный контроль отправки отчетности АСКП в РАР, наблюдайте за её статусами.'
                        onClick={() => {handleCardClick("askp")}}
                    />
                    <Card 
                        icon={
                            <div className='h-32'>
                                <LaptopMinimal size={96} className="relative -inset-x-2 text-primary" />
                                <CloudUpload size={96} className="relative inset-x-6 -inset-y-16 text-primary transition-all fill-white group-hover:fill-slate-200" />
                            </div>
                        }
                        title="Контроль отправки ЕГАИС отчетности"
                        subtitle='Отслеживайте своевременность отправки «суточной отчетности» в РАР по всем точкам учёта, контроллируйте ответные сообщения.'
                        onClick={() => {handleCardClick("egais")}}
                    />
                    <Card
                        icon={
                            <div className='h-32'>
                                <LaptopMinimal size={96} className="relative -inset-x-2 text-primary" />
                                <Joystick size={96} className="relative inset-x-6 -inset-y-20 text-primary transition-all fill-white group-hover:fill-slate-200" />
                            </div>
                        }
                        title="Контроль отправки отчетности режимов"
                        subtitle='Отслеживайте отправку «отчетности по режимам» в РАР по всем точкам учёта, контроллируйте ответные сообщения.'
                        onClick={() => {handleCardClick("modes")}}
                     />
                     <Card
                        icon={
                            <div className='h-32'>
                                <LaptopMinimal size={96} className="relative -inset-x-2 text-primary" />
                                <Settings size={96} className="relative inset-x-6 -inset-y-16 text-primary transition-all fill-white group-hover:fill-slate-200" />
                            </div>
                        }
                        title="Панель администратора"
                        subtitle='Управляйте содержимым сервиса, изменяйте настройки и получайте данные для анализа'
                        onClick={() => {handleCardClick("admin")}}
                     />
                </div>
            </Container>
        </div>
    );
}
