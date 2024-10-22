import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';

interface Props {
  className?: string;
}

export const Title: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('', className)}>
            <Container className="flex items-start flex-col p-6 gap-6 mt-4 animate-slide-element">
                <h1 className='text-3xl'>Здравствуйте, Иван Иванов</h1>
                <h2 className='text-xl text-gray-800 font-light'>Добро пожаловать в ЕГАИС Мониторинг. Вы авторизованы как клиент. Выберите действие.</h2>
            </Container>
         </div>
    );
};