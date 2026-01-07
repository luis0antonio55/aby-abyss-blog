"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FlowersBackground } from "@/components/flowers-background"

export default function SobreMiPage() {
  return (
    <div className="relative min-h-screen">
      <FlowersBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <article className="rounded-2xl border border-primary/10 bg-card/80 p-6 backdrop-blur-sm sm:p-8 md:p-12">
          <h1 className="mb-6 text-center text-3xl font-semibold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
            Sobre Mí
          </h1>
          <div className="space-y-4 text-base leading-relaxed text-foreground/90 sm:space-y-6 sm:text-lg">
            <p>Solo una chica que hace lo que hace. Desde psicología a poesía y arte digital... Y otras cositas.</p>
            <p>Que la ternura rebose del imaginario y nos ahogue con su dulzura.</p>
            <p className="text-center text-primary italic">Gracias por estar aquí ♡</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
