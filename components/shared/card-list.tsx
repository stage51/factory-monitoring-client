"use client";

import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import Card from './card';
import { LaptopMinimal, CloudDownload, CloudUpload } from 'lucide-react';

interface Props {
  className?: string;
}

function handleCardClick() {
  console.log("Card clicked");
}

export const CardList: React.FC<Props> = ({ className }) => {
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
                onClick={() => {handleCardClick}}>
                </Card>
                <Card 
                icon={
                  <div className='h-32'>
                    <LaptopMinimal size={96} className="relative -inset-x-2 text-primary" />
                    <CloudUpload size={96} className="relative inset-x-6 -inset-y-16 text-primary transition-all fill-white group-hover:fill-slate-200" />
                  </div>
                } 
                title="Контроль отправки ЕГАИС отчетности"
                subtitle='Отслеживайте своевременность отправки «суточной отчетности» в РАР по всем Точкам учёта, контроллируйте Ответные сообщения.'
                onClick={() => {handleCardClick}}>
                </Card>
              </div>
            </Container>
         </div>
    );
};