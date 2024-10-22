"use client";

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Container } from './container';
import { CircleUser, User, Mail, MailOpen, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 100); 
  
      return () => clearTimeout(timer);
    }, []);
return (
    <header className={cn('border-b border-gray-100 bg-gray-900', className)}>
        <Container className="flex items-center justify-between py-6 bg-gray-900">
            <div className={`w-48 h-20 flex flex-col justify-center ps-4 group relative ${animate ? 'animate-slide-element' : ''}`}>
          <h1 className="text-3xl uppercase text-white font-bold">ЕГАИС</h1>
          <h3 className={`text-sm uppercase text-white font-medium ms-12 transition duration-300 -translate-x-2 opacity-0 ${animate ? 'opacity-100 translate-x-0' : ''}`}>
            МОНИТОРИНГ
          </h3>
        </div>
            <div className="flex items-center justify-between gap-16">
                <a className="text-sm uppercase text-white font-light hover:animate-spin-element">АСКП</a>
                <a className="text-sm uppercase text-white font-light hover:animate-spin-element">ЕГАИС</a>
                <a className="text-sm uppercase text-white font-light hover:animate-spin-element">РЕЖИМЫ</a>
                <a className="text-sm uppercase text-white font-light hover:animate-spin-element">СОБЫТИЯ</a>
            </div>
            <div className="flex items-center justify-between bg-primary gap-10 p-4 rounded-2xl">
                <div className="group relative h-6 w-6">
                <CircleUser className="absolute inset-0 flex items-center transition duration-150 group-hover:opacity-0" color="white" />
                <User className="absolute inset-0 flex transition-transform duration-150 translate-y-[-100%] opacity-0 group-hover:animate-spin-element group-hover:opacity-100" color="white" />
                </div>
                <div className="group relative h-6 w-6">
                <Mail className="absolute inset-0 flex items-center transition duration-150 group-hover:opacity-0" color="white" />
                <MailOpen className="absolute inset-0 flex transition-transform duration-150 translate-y-[-100%] opacity-0 group-hover:animate-spin-element group-hover:opacity-100" color="white" />
                </div>
                <Button className="group relative" variant="default">
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    ВЫХОД
                </div>
                <ArrowRight className="w-5 absolute transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </Button>
            </div>
        </Container>
    </header>
);
};