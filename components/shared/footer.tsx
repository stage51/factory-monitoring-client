"use client";
import Link from "next/link"
import Container from "./container"
import { useEffect, useState } from "react";
import { getClientConfig } from "./services/config/config";

type Company = {
  companyName: string;
  companyAddress: string;
  companyMailAddress: string;
  companyPhone: string;
  companyEmail: string;
}

export default function Footer() {
  const [company, setCompany] = useState<Company>()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const setData = async() => {
      setCompany({
        companyName: await getClientConfig("config/next-app/company.company-name"),
        companyAddress: await getClientConfig("config/next-app/company.company-address"),
        companyMailAddress: await getClientConfig("config/next-app/company.company-mail-address"),
        companyPhone: await getClientConfig("config/next-app/company.company-phone"),
        companyEmail: await getClientConfig("config/next-app/company.company-email")
      })
    }
    setData()
  }, [])

  return (
    <footer className="border-t border-gray-600 bg-gray-900">
      <Container className="p-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-base text-gray-300">Решения</h3>
            <ul className="space-y-2 text-sm font-light">
              <li><Link href="https://centrikt.ru/Sections/Details/9" className="text-muted-foreground hover:text-gray-300">Комплексы измерительные автоматизированного учета алкогольной продукции  «ALCOSPOT» АСИиУ</Link></li>
              <li><Link href="https://centrikt.ru/Sections/Details/30" className="text-muted-foreground hover:text-gray-300">Система мониторинга сохранности перевозимых автотранспортом жидкостей</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-base text-gray-300">Оборудование</h3>
            <ul className="space-y-2 text-sm font-light">
              <li><Link href="https://centrikt.ru/Products/Categories/1" className="text-muted-foreground hover:text-gray-300">Оборудование для перевозки спирта</Link></li>
              <li><Link href="https://centrikt.ru/Products/Categories/4" className="text-muted-foreground hover:text-gray-300">Оборудование для производителей этилового спирта и алкогольной продукции</Link></li>
              <li><Link href="https://centrikt.ru/Products/Categories/11" className="text-muted-foreground hover:text-gray-300">Архивное оборудование</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-base text-gray-300">Контакты</h3>
            <ul className="space-y-2 text-sm font-light">
              <li><p className="text-muted-foreground hover:text-gray-300">Адрес для писем: {company?.companyMailAddress}</p></li>
              <li><p className="text-muted-foreground hover:text-gray-300">Адрес: {company?.companyAddress}</p></li>
              <li><p className="text-muted-foreground hover:text-gray-300">Почта: {company?.companyEmail}</p></li>
              <li><p className="text-muted-foreground hover:text-gray-300">Телефон: {company?.companyPhone}</p></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-8 text-center">
          <p className="text-sm text-muted-foreground font-light">
            © {currentYear} {company?.companyName}. Все права защищены.
          </p>
          <Link href="/privacy.pdf" className="text-sm text-muted-foreground hover:text-gray-300" target="_blank" rel="noopener noreferrer">
            Заявление о конфиденциальности
          </Link>
        </div>
      </Container>
    </footer>
  )
}