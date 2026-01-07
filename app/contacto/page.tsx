"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FlowersBackground } from "@/components/flowers-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Mail, Youtube } from "lucide-react"

const contactEmail = "babigailrc02@gmail.com"

const socialLinks = [
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@bereniceabigail1083",
    username: "@bereniceabigail1083",
  },
  {
    name: "Email",
    icon: Mail,
    href: `mailto:${contactEmail}`,
    username: contactEmail,
  },
]



export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al enviar el mensaje.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      <FlowersBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-2 sm:text-4xl">Contacto</h1>
          <p className="text-muted-foreground text-sm sm:text-base">¡Me encantaría saber de ti!</p>
        </div>

        <Card className="mb-4 border-primary/10 bg-card/80 backdrop-blur-sm sm:mb-6">
          <CardHeader className="text-center pb-2 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Mis Redes</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1 rounded-xl border border-primary/10 bg-background/50 px-4 py-3 transition-all hover:border-primary/30 hover:bg-primary/5 sm:gap-2 sm:px-6 sm:py-4"
                >
                  <social.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110 sm:h-8 sm:w-8" />
                  <span className="text-xs font-medium text-foreground sm:text-sm">{social.name}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block">{social.username}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        
    

        
        <Card className="border-primary/10 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">Envíame un mensaje</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Siempre es un placer conectar con nuevas personas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            {submitted ? (
              <div className="py-6 text-center sm:py-8">
                <p className="text-base text-primary sm:text-lg">¡Gracias por tu mensaje!</p>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">Te responderé pronto</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                    rows={4}
                    className="border-primary/20 focus:border-primary resize-none sm:rows-5"
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar"}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
