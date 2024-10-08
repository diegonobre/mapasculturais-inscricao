import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Users, Calendar, MapPin, FileText, Scissors, Menu } from 'lucide-react';

export default function Header() {
  const currentRoute = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Mapa da Cultura Logo" width={100} height={40} />
          </Link>

          <nav className="hidden md:flex space-x-4">
            <NavItem href="#" icon={<Home className="w-4 h-4" />} label="Home" />
            <NavItem
              href="#"
              icon={<FileText className="w-4 h-4" />}
              label="Oportunidades"
              isActive={currentRoute === '/oportunidades'}
            />
            <NavItem
              href="#"
              icon={<Users className="w-4 h-4" />}
              label="Agentes"
              isActive={currentRoute === '/agentes'}
            />
            <NavItem
              href="#"
              icon={<Calendar className="w-4 h-4" />}
              label="Eventos"
              isActive={currentRoute === '/eventos'}
            />
            <NavItem
              href="#"
              icon={<MapPin className="w-4 h-4" />}
              label="Espaços"
              isActive={currentRoute === '/espacos'}
            />
            <NavItem
              href="#"
              icon={<FileText className="w-4 h-4" />}
              label="Projetos"
              isActive={currentRoute === '/projetos'}
            />
            <NavItem
              href="https://www.gov.br/culturaviva/pt-br"
              icon={<Scissors className="w-4 h-4" />}
              label="Cultura Viva"
            />
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  href,
  icon,
  label,
  isActive = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
        isActive ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
