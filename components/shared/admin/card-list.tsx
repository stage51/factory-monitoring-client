"use client";

import { cn } from '@/lib/utils';
import Container from '../container';
import Card from '../card';
import { LaptopMinimal, CloudDownload, CloudUpload, Settings, Joystick, Calculator, Users, File, Cpu, Folder, Wrench } from 'lucide-react';
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
            <Container className="items-center flex-col p-6 gap-6 animate-slide-element">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    <Card 
                        icon={
                            <div className='h-32'>
                                <Calculator size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Измерения"
                        subtitle='Навигация, сессии, события, суточные файлы'
                        className="content-center"
                        onClick={() => {handleCardClick("admin/measurements")}}
                    />
                    <Card 
                        icon={
                            <div className='h-32'>
                                <Users size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Пользователи"
                        subtitle='Список, роли, онлайн'
                        className="content-center"
                        onClick={() => {handleCardClick("admin/users")}}
                    />
                    <Card
                        icon={
                            <div className='h-32'>
                                <Wrench size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Конфигурация"
                        subtitle="Настройки, страны, организации, продукты"
                        className="content-center"
                        onClick={() => {handleCardClick("admin/config")}}
                     />
                    <Card
                        icon={
                            <div className='h-32'>
                                <Cpu size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Система"
                        subtitle="Логи ошибок, очередь сообщений, задачник"
                        className="content-center"
                        onClick={() => {handleCardClick("admin/system")}}
                     />
                </div>
            </Container>
        </div>
    );
}
