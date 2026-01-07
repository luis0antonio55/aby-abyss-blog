"use client"

import type React from "react"

import { useState, useRef } from "react"
import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Post, PostType } from "@/lib/types"
import { ArrowLeft, Upload, X, Loader2, BookOpen, ImageIcon, Video, FileText, ImagePlus } from "lucide-react"

interface PostEditorProps {
  post: Post | null
  userId: string
  onSave: (post: Post) => void
  onCancel: () => void
}

const postTypes: { value: PostType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "poem", label: "Poema", icon: BookOpen },
  { value: "art", label: "Arte / Imagen", icon: ImageIcon },
  { value: "video", label: "Video", icon: Video },
  { value: "text", label: "Texto / Blog", icon: FileText },
]

export function PostEditor({ post, userId, onSave, onCancel }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [type, setType] = useState<PostType>(post?.type || "poem")
  const [mediaUrl, setMediaUrl] = useState(post?.media_url || "")
  const [thumbnailUrl, setThumbnailUrl] = useState(post?.thumbnail_url || "")
  const [published, setPublished] = useState(post?.published || false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const supabase = createClient()
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("media").upload(fileName, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(fileName)

      setMediaUrl(publicUrl)
    } catch {
      setError("Error al subir el archivo. Intenta de nuevo.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingThumbnail(true)
    setError(null)

    try {
      const supabase = createClient()
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/thumbnails/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("media").upload(fileName, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(fileName)

      setThumbnailUrl(publicUrl)
    } catch {
      setError("Error al subir la imagen de portada. Intenta de nuevo.")
    } finally {
      setIsUploadingThumbnail(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("El título es requerido")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const postData = {
        title: title.trim(),
        content: content.trim() || null,
        type,
        media_url: mediaUrl || null,
        thumbnail_url: thumbnailUrl || null,
        published,
        user_id: userId,
        updated_at: new Date().toISOString(),
      }

      if (post) {
        const { data, error } = await supabase.from("posts").update(postData).eq("id", post.id).select().single()

        if (error) throw error
        onSave(data as Post)
      } else {
        const { data, error } = await supabase.from("posts").insert(postData).select().single()

        if (error) throw error
        onSave(data as Post)
      }
    } catch {
      setError("Error al guardar. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:h-16">
          <Button variant="ghost" onClick={onCancel} className="gap-1 text-sm sm:gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Volver</span>
          </Button>
          <h1 className="text-sm font-semibold sm:text-lg">{post ? "Editar Publicación" : "Nueva Publicación"}</h1>
          <div className="w-16 sm:w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-4 sm:py-8">
        <form onSubmit={handleSubmit}>
          <Card className="border-primary/10 bg-card/80">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">{post ? "Editar" : "Crear"} Publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6 sm:pt-0">
              
              <div className="space-y-2">
                <Label className="text-sm sm:text-base">Tipo de publicación</Label>
                <Select value={type} onValueChange={(value: PostType) => setType(value)}>
                  <SelectTrigger className="border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {postTypes.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>
                        <span className="flex items-center gap-2">
                          <pt.icon className="h-4 w-4" />
                          {pt.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

          
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm sm:text-base">
                  Título
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título"
                  className="border-primary/20 text-base sm:text-lg"
                  required
                />
              </div>

              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm sm:text-base">
                  {type === "poem" ? "Tu poema" : type === "text" ? "Contenido" : "Descripción (opcional)"}
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    type === "poem"
                      ? "Escribe tu poema aquí..."
                      : "Escribe aquí..."
                  }
                  className="min-h-[150px] border-primary/20 resize-none font-serif leading-relaxed sm:min-h-[200px]"
                  rows={type === "poem" ? 12 : 6}
                />
              </div>

              {/* Media upload para arte y video */}
              {(type === "art" || type === "video") && (
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">{type === "art" ? "Imagen" : "Video"}</Label>
                  <div className="space-y-3 sm:space-y-4">
                    {mediaUrl ? (
                      <div className="relative">
                        {type === "art" ? (
                          <img
                            src={mediaUrl || "/placeholder.svg"}
                            alt="Preview"
                            className="max-h-48 rounded-lg border border-primary/10 object-contain sm:max-h-64"
                          />
                        ) : (
                          <video
                            src={mediaUrl}
                            controls
                            className="max-h-48 rounded-lg border border-primary/10 sm:max-h-64"
                          />
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                          onClick={() => setMediaUrl("")}
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/20 p-6 transition-colors hover:border-primary/40 sm:p-8"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {isUploading ? (
                          <Loader2 className="h-6 w-6 animate-spin text-primary sm:h-8 sm:w-8" />
                        ) : (
                          <>
                            <Upload className="mb-2 h-6 w-6 text-muted-foreground sm:h-8 sm:w-8" />
                            <p className="text-xs text-muted-foreground sm:text-sm">
                              Haz clic para subir {type === "art" ? "una imagen" : "un video"}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={type === "art" ? "image/*" : "video/*"}
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    
                    <div className="space-y-2">
                      <Label htmlFor="media-url" className="text-xs text-muted-foreground sm:text-sm">
                        O pega una URL directamente
                      </Label>
                      <Input
                        id="media-url"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        placeholder={
                          type === "art" ? "https://ejemplo.com/imagen.jpg" : "https://youtube.com/watch?v=..."
                        }
                        className="border-primary/20 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              
              {type === "video" && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm sm:text-base">
                    <ImagePlus className="h-4 w-4" />
                    Imagen de portada (opcional)
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Sube una imagen personalizada para mostrar en las tarjetas.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    {thumbnailUrl ? (
                      <div className="relative inline-block">
                        <img
                          src={thumbnailUrl || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          className="max-h-32 rounded-lg border border-primary/10 object-contain sm:max-h-40"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-5 w-5 sm:h-6 sm:w-6"
                          onClick={() => setThumbnailUrl("")}
                        >
                          <X className="h-2 w-2 sm:h-3 sm:w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/20 p-4 transition-colors hover:border-primary/40 sm:p-6"
                        onClick={() => thumbnailInputRef.current?.click()}
                      >
                        {isUploadingThumbnail ? (
                          <Loader2 className="h-5 w-5 animate-spin text-primary sm:h-6 sm:w-6" />
                        ) : (
                          <>
                            <ImagePlus className="mb-2 h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
                            <p className="text-xs text-muted-foreground sm:text-sm">Subir imagen de portada</p>
                          </>
                        )}
                      </div>
                    )}
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <Label htmlFor="thumbnail-url" className="text-xs text-muted-foreground sm:text-sm">
                        O pega una URL de imagen
                      </Label>
                      <Input
                        id="thumbnail-url"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                        placeholder="https://ejemplo.com/portada.jpg"
                        className="border-primary/20 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

             
              <div className="flex items-center justify-between rounded-lg border border-primary/10 p-3 sm:p-4">
                <div>
                  <Label htmlFor="published" className="font-medium text-sm sm:text-base">
                    Publicar
                  </Label>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {published ? "Visible para todos" : "Solo tú puedes verlo"}
                  </p>
                </div>
                <Switch id="published" checked={published} onCheckedChange={setPublished} />
              </div>

              {error && <p className="text-xs text-destructive sm:text-sm">{error}</p>}

             
              <div className="flex gap-3 pt-2 sm:gap-4 sm:pt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent text-sm">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 text-sm">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : post ? (
                    "Guardar"
                  ) : (
                    "Crear"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
