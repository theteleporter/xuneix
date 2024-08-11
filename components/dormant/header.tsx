import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import {
  PanelLeft,
  Package2,
  AppWindowMac,
  Users2,
} from "lucide-react";
import { ThemeToggle } from "../sub-components/theme-toggle";
import Logo from "./logo";

export default function Header() {
  return (
      <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background/50 backdrop-blur-md px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:gap-4 sm:py-4 sm:pl-14">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Xuneix Inc</span>
                </Link>
                <Link
                  href="https://www.crept.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <AppWindowMac className="h-5 w-5" />
                  Crept Studio
                </Link>
                <Link
                  href="https://www.support.crept.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Support Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/theteleporter_invert_icon.png"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>The Teleporter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
              <Link
                  href="https://www.theteleporter.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  Website
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link
                  href="https://www.crept.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  Crept Studio
                </Link>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  );
}
