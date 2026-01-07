"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post, PostType } from "@/lib/types"
import type { User } from "@supabase/supabase-js"
import { PostEditor } from "./post-editor"
import { Plus, LogOut, BookOpen, ImageIcon, Video, FileText, Eye, EyeOff, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const typeLabels: Record<PostType, string> = {
  poem: "Poema",
  art: "Arte",
  video: "Video",
  text: "Texto",
}

const typeIcons: Record<PostType, React.ComponentType<{ className?: string }>> = {
  poem: BookOpen,
  art: ImageIcon,
  video: Video,
  text: FileText,
}

interface AdminDashboardProps {
  user: User
  initialPosts: Post[]
}

export function AdminDashboard({ user, initialPosts }: AdminDashboardProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const handleCreateNew = () => {
    setEditingPost(null)
    setIsEditorOpen(true)
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setIsEditorOpen(true)
  }

  const handleDelete = async (postId: string) => {
    if (!confirm("¿Estás segura de que quieres eliminar este post?")) return

    const supabase = createClient()
    const { error } = await supabase.from("posts").delete().eq("id", postId)

    if (!error) {
      setPosts(posts.filter((p) => p.id !== postId))
    }
  }

  const handleTogglePublish = async (post: Post) => {
    const supabase = createClient()
    const { error } = await supabase.from("posts").update({ published: !post.published }).eq("id", post.id)

    if (!error) {
      setPosts(posts.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)))
    }
  }

  const handleSavePost = (savedPost: Post) => {
    if (editingPost) {
      setPosts(posts.map((p) => (p.id === savedPost.id ? savedPost : p)))
    } else {
      setPosts([savedPost, ...posts])
    }
    setIsEditorOpen(false)
    setEditingPost(null)
  }

  if (isEditorOpen) {
    return (
      <PostEditor
        post={editingPost}
        userId={user.id}
        onSave={handleSavePost}
        onCancel={() => {
          setIsEditorOpen(false)
          setEditingPost(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="text-lg font-semibold text-primary sm:text-2xl">Panel Admin</h1>
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary sm:text-sm">
              Ver blog
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden text-sm text-muted-foreground sm:block">{user.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1 bg-transparent text-xs sm:gap-2 sm:text-sm"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4 sm:py-8">
        {/* Stats - responsive grid */}
        <div className="mb-6 grid gap-3 grid-cols-3 sm:mb-8 sm:gap-4">
          <Card className="border-primary/10 bg-card/80">
            <CardHeader className="p-3 pb-1 sm:p-6 sm:pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm">Total</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <p className="text-xl font-semibold text-primary sm:text-3xl">{posts.length}</p>
            </CardContent>
          </Card>
          <Card className="border-primary/10 bg-card/80">
            <CardHeader className="p-3 pb-1 sm:p-6 sm:pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm">Publicados</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <p className="text-xl font-semibold text-primary sm:text-3xl">
                {posts.filter((p) => p.published).length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/10 bg-card/80">
            <CardHeader className="p-3 pb-1 sm:p-6 sm:pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm">Borradores</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <p className="text-xl font-semibold text-primary sm:text-3xl">
                {posts.filter((p) => !p.published).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <h2 className="text-lg font-semibold sm:text-xl">Mis Publicaciones</h2>
          <Button onClick={handleCreateNew} className="gap-1 text-xs sm:gap-2 sm:text-sm" size="sm">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Nueva Publicación</span>
            <span className="sm:hidden">Nueva</span>
          </Button>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <Card className="border-primary/10 bg-card/80 py-8 text-center sm:py-12">
            <CardContent>
              <p className="text-sm text-muted-foreground sm:text-base">No tienes publicaciones aún.</p>
              <Button onClick={handleCreateNew} className="mt-4 gap-2 text-sm">
                <Plus className="h-4 w-4" />
                Crear tu primera publicación
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {posts.map((post) => {
              const Icon = typeIcons[post.type]
              const formattedDate = new Date(post.created_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })

              const isYouTube = (url: string) => {
                return url.includes("youtube.com") || url.includes("youtu.be")
              }

              const getYouTubeId = (url: string) => {
                const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/)
                return match ? match[1] : null
              }

              let thumbnailImage = post.thumbnail_url

              if (!thumbnailImage && post.type === "video" && post.media_url && isYouTube(post.media_url)) {
                 const videoId = getYouTubeId(post.media_url)
                 if (videoId) thumbnailImage = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              } else if (!thumbnailImage && post.type === "art") {
                thumbnailImage = post.media_url
              }
              // Si es video mp4 y no tiene thumbnail, thumbnailImage seguirá siendo null y mostrará el icono por defecto

              return (
                <Card key={post.id} className="border-primary/10 bg-card/80">
                  <CardContent className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                    {thumbnailImage ? (
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-16 sm:w-16">
                        <img src={thumbnailImage || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-16 sm:w-16">
                        <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                      </div>
                    )}

                    {/* Info - responsive */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-medium truncate text-sm sm:text-base">{post.title}</h3>
                        <Badge variant={post.published ? "default" : "secondary"} className="flex-shrink-0 text-xs">
                          {post.published ? "Publicado" : "Borrador"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground sm:gap-3 sm:text-sm">
                        <span className="flex items-center gap-1">
                          <Icon className="h-3 w-3" />
                          <span className="hidden sm:inline">{typeLabels[post.type]}</span>
                        </span>
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Actions - responsive */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleTogglePublish(post)}
                        title={post.published ? "Despublicar" : "Publicar"}
                        className="h-8 w-8 sm:h-10 sm:w-10"
                      >
                        {post.published ? (
                          <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(post)}
                        title="Editar"
                        className="h-8 w-8 sm:h-10 sm:w-10"
                      >
                        <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
                        title="Eliminar"
                        className="text-destructive hover:text-destructive h-8 w-8 sm:h-10 sm:w-10"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
