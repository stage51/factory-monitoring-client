"use client";

import { cn } from '@/lib/utils';
import Container from '../../container';
import Card from '../../card';
import { LaptopMinimal, CloudDownload, CloudUpload, Settings, Joystick, Calculator, Users, File, Cpu, Binoculars, Eye, Flashlight, CalendarSearch, Files, SquareArrowLeft, Flag, Building2, Boxes, CircuitBoard, Globe, Mails, ScanEye } from 'lucide-react';
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
                                <Settings size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Настройки"
                        className="content-center"
                        onClick={() => {handleCardClick("config/settings")}}
                    />
                    {/*
                    <Card 
                        icon={
                            <div className='h-32'>
                                <Flag size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Страны"
                        className="content-center"
                        onClick={() => {handleCardClick("config/states")}}
                    />
                    */}
                    <Card 
                        icon={
                            <div className='h-32'>
                                <Building2 size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Организации"
                        className="content-center"
                        onClick={() => {handleCardClick("config/organizations")}}
                    />
                    {/*
                    <Card 
                        icon={
                            <div className='h-32'>
                                <Boxes size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Продукты"
                        className="content-center"
                        onClick={() => {handleCardClick("config/products")}}
                    />
                    <Card 
                        icon={
                            <div className='h-32'>
                                <CircuitBoard size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Контроллеры"
                        className="content-center"
                        onClick={() => {handleCardClick("config/controllers")}}
                    />
                    <Card 
                        icon={
                            <div className='h-32'>
                                <Mails size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Список email"
                        className="content-center"
                        onClick={() => {handleCardClick("config/emails")}}
                    />
                    */}
                    <Card
                        icon={
                            <div className='h-32'>
                                <SquareArrowLeft size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Назад"
                        className="content-center"
                        onClick={() => {handleCardClick("../admin")}}
                     />
                </div>
            </Container>
        </div>
    );
}
