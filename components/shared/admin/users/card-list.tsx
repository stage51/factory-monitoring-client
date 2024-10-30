"use client";

import { cn } from '@/lib/utils';
import Container from '../../container';
import Card from '../../card';
import { LaptopMinimal, CloudDownload, CloudUpload, Settings, Joystick, Calculator, Users, File, Cpu, Binoculars, Eye, Flashlight, CalendarSearch, Files, SquareArrowLeft, List, SquareUser, UserRound, UserRoundSearch } from 'lucide-react';
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
                                <List size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Список"
                        className="content-center"
                        onClick={() => {handleCardClick("users/list")}}
                    />
                    <Card 
                        icon={
                            <div className='h-32'>
                                <SquareUser size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Роли"
                        className="content-center"
                        onClick={() => {handleCardClick("users/roles")}}
                    />
                    <Card
                        icon={
                            <div className='h-32'>
                                <UserRoundSearch size={96} className="relative text-primary" />
                            </div>
                        }
                        title="Онлайн"
                        className="content-center"
                        onClick={() => {handleCardClick("users/online")}}
                     />
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
