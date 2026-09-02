import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-20 w-full items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <a className="block shrink-0 p-2" href="/">
            <img
              src="/favicon.png"
              alt="Ticket Tout"
              className="h-15 w-15"
            />
          </a>
          <nav
            aria-label="Global"
            className="ml-10 hidden md:block"
          >
            <ul className="flex items-center gap-10 text-xl">
              <li>
                <a
                  className="text-muted-foreground transition hover:text-primary"
                  href="/EmployeePages/balance"
                >
                  Wallet
                </a>
              </li>

              <li>
                <a
                  className="text-muted-foreground transition hover:text-primary"
                  href="/EmployeePages/payment"
                >
                  Payment
                </a>
              </li>

              <li>
                <a
                  className="text-muted-foreground transition hover:text-primary"
                  href="#"
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4">

          <div className="hidden items-center gap-4 sm:flex">
            <a
              className="block rounded-md border border-primary/40 px-5 py-2.5 text-xl font-medium text-primary transition hover:bg-primary/5 hover:border-primary/60"
              href="#"
            >
              Account
            </a>

            <span className="px-2 py-2.5 text-xl font-medium text-primary">
              User Name
            </span>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground transition hover:bg-muted/70 md:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full bg-background sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav className="ml-4 mt-8 flex flex-col gap-6 text-lg">
                <a href="/">Accueil</a>
                <a href="/services">Services</a>
                <a href="/tarifs">Tarifs</a>
                <a href="/contact">Contact</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
