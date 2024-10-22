import Link from "next/link"
import { Container } from "./container"

interface Props {
  companyName?: string
}

export default function Footer({ companyName = "ООО «Центр ИКТ»" }: Props) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-600 bg-gray-900">
      <Container className="p-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg text-gray-300">Решения</h3>
            <ul className="space-y-2 text-sm font-light">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Комплексы измерительные автоматизированного учета алкогольной продукции  «ALCOSPOT» АСИиУ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Система мониторинга сохранности перевозимых автотранспортом жидкостей</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg text-gray-300">Оборудование</h3>
            <ul className="space-y-2 text-sm font-light">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Оборудование для перевозки спирта</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Оборудование для производителей этилового спирта и алкогольной продукции</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Архивное оборудование</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg text-gray-300">Контакты</h3>
            <ul className="space-y-2 text-sm font-light">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Адрес для писем: 115280, Москва, ул.Ленинская Слобода, дом 19, этаж 1, комн. 41x1д, офис 23</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Адрес: Москва, 2-я Синичкина, 9А, строение 10, 1 этаж, комната 7</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Почта: info@centrikt.ru</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Телефон: +7 (499) 653-61-43</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-8 text-center">
          <p className="text-sm text-muted-foreground font-light">
            © {currentYear} {companyName}. Все права защищены.
          </p>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Заявление о конфиденциальности
          </Link>
        </div>
      </Container>
    </footer>
  )
}