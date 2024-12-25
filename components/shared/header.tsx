"use client";
import { cn } from '@/lib/utils';
import Container from './container';
import { CircleUser, Mail, MailOpen, DoorClosed, DoorOpen, List } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MailDialog from './mail/mail-dialog';
import { logout } from './services/auth/auth-serivce';
import { useToast } from "@/components/hooks/use-toast"
import { observer } from 'mobx-react-lite';
import { userStore } from './stores/user-store';

interface Props {
  className?: string;
}

const Header = observer(({ className }: Props) => {
    const {profile, fetchProfile} = userStore;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const { toast } = useToast()

    useEffect(() => {
        if (profile === null) {
            fetchProfile()
        }
        setIsAuthorized(!!profile)
    }, [profile]);
    
    const handleLogout = async () => {
        try {
            await logout()
            toast({
              title: "Выход из аккаунт",
              description: "Выход был успешно выполнен",
            })
        } catch (error) {
            console.error("Ошибка выхода из аккаунта:", error);
            toast({
              title: "Ошибка выхода из аккаунта",
              variant: "destructive",
              description: "Вы не авторизованы",
            })
        }
    }

    return (
        <header className={cn('sticky top-0 z-50 border-gray-100 bg-gray-900', className)}>
            <div className="absolute inset-y-0 right-0 w-1/2 bg-primary z-0 hidden md:flex" />

            <Container className="relative flex h-20 items-center justify-between py-6 bg-gray-900 z-10">
                {/* Main Logo Section (hidden on md and below) */}
                <Link href="/" className="hidden md:flex">
                    <div className={"cursor-pointer w-48 h-20 flex flex-col justify-center ps-4 group relative animate-slide-element"}>
                        <h1 className="text-3xl uppercase text-white font-bold">ЕГАИС</h1>
                        <h3 className={"text-sm uppercase text-white font-medium ms-12"}>
                            МОНИТОРИНГ
                        </h3>
                    </div>
                </Link>

                {/* Navigation Links (hidden on md and below) */}
                <div className="hidden md:flex lg:ms-40 ms-0 w-full items-center lg:justify-start justify-center gap-16">
                    <Link href="/askp" className="text-sm uppercase cursor-pointer text-white font-light hover:animate-spin-element">АСКП</Link>
                    <Link href="/egais" className="text-sm uppercase cursor-pointer text-white font-light hover:animate-spin-element">ЕГАИС</Link>
                    <Link href="/modes" className="text-sm uppercase cursor-pointer text-white font-light hover:animate-spin-element">РЕЖИМЫ</Link>
                    {/*<Link href="/events" className="text-sm uppercase cursor-pointer text-white font-light hover:animate-spin-element">СОБЫТИЯ</Link>*/}
                </div>

                {/* Icon Section (visible on all screen sizes) */}
                {isAuthorized ? (
                    <div className="flex h-20 items-center justify-between bg-primary gap-10 md:p-4 p-8 w-full md:w-auto rounded-none md:rounded-3xl md:rounded-r-none">
                        <div className="absolute inset-y-0 right-0 w-[1px] bg-primary" />
                            {/* Menu Icon for mobile (md and below) */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-white focus:outline-none"
                                >
                                    <List className="cursor-pointer inset-0 flex items-center transition duration-150 hover:animate-spin-element" size={24} />
                                </button>
                            </div>
                            <Link href="/profile" className="group relative h-6 w-6">
                                <CircleUser className="absolute cursor-pointer inset-0 flex items-center transition duration-150 group-hover:animate-spin-element" color="white" />
                            </Link>
                            <MailDialog>
                                <div className="group relative h-6 w-6">
                                    <Mail className="absolute inset-0 flex items-center transition duration-150 group-hover:opacity-0" color="white" />
                                    <MailOpen className="absolute cursor-pointer inset-0 flex transition-transform duration-150 translate-y-[-100%] opacity-0 group-hover:animate-spin-element group-hover:opacity-100" color="white" />
                                </div>
                            </MailDialog>
                            <Link href="/sign-in" onClick={() => handleLogout()} className="group relative h-6 w-6">
                                <DoorClosed className="absolute inset-0 flex items-center transition duration-150 group-hover:opacity-0" color="white" />
                                <DoorOpen className="absolute cursor-pointer inset-0 flex transition-transform duration-150 translate-y-[-100%] opacity-0 group-hover:animate-spin-element group-hover:opacity-100" color="white" />
                            </Link>

                    </div>
                ) :
                (
                    <div className="flex h-20 items-center justify-between bg-primary gap-10 md:p-4 p-8 w-full md:w-auto rounded-none md:rounded-3xl md:rounded-r-none">
                        <div className="absolute inset-y-0 right-0 w-[1px] bg-primary" />
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white focus:outline-none"
                            >
                                <List className="cursor-pointer inset-0 flex items-center transition duration-150 hover:animate-spin-element" size={24} />
                            </button>
                        </div>
                        <Link href="/sign-in" className="text-sm uppercase cursor-pointer text-white font-bold hover:animate-spin-element px-4">ВОЙТИ</Link>
                    </div>
                )}
            </Container>


            {/* Dropdown menu (visible only on mobile when menu icon is clicked) */}
            {isMenuOpen && (
                <div className="bg-gray-900 text-white w-full p-4 md:hidden animate-slide-element">
                    <nav className="flex flex-col gap-4">
                        <Link href="/askp" className="text-sm uppercase cursor-pointer font-light hover:underline">АСКП</Link>
                        <Link href="/egais" className="text-sm uppercase cursor-pointer font-light hover:underline">ЕГАИС</Link>
                        <Link href="/modes" className="text-sm uppercase cursor-pointer font-light hover:underline">РЕЖИМЫ</Link>
                        {/*<Link href="/events" className="text-sm uppercase cursor-pointer font-light hover:underline">СОБЫТИЯ</Link>*/}
                    </nav>
                </div>
            )}
        </header>
    );
})

export default Header