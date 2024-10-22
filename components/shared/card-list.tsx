import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { Card } from './card';

interface Props {
  className?: string;
}

export const CardList: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('', className)}>
            <Container className="flex items-start flex-col p-6 gap-6 animate-slide-element">
              <div className='grid grid-cols-3 gap-4'>
                <Card></Card>
                <Card></Card>
              </div>
            </Container>
         </div>
    );
};