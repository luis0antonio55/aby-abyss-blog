"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-background/50 py-6 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="text-sm text-muted-foreground sm:text-base">Hecho con amor -A</p>
        <div className="mt-3 flex justify-center gap-4 sm:mt-4 sm:gap-6">
          <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors sm:text-sm">
            Inicio
          </Link>
          <Link
            href="/sobre-mi"
            className="text-xs text-muted-foreground hover:text-primary transition-colors sm:text-sm"
          >
            Sobre Mí
          </Link>
          <Link
            href="/contacto"
            className="text-xs text-muted-foreground hover:text-primary transition-colors sm:text-sm"
          >
            Contacto
          </Link>

         
        </div>
         <Link
            href="https://github.com/luis0antonio55" target="_blank"
            className="text-xs text-muted-foreground hover:text-primary transition-colors sm:text-sm"
          >
            Hecho por Luis0antonio55, para Aby.
          </Link>
      </div>
    </footer>
  )
}
