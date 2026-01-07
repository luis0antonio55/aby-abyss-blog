"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FlowersBackground } from "@/components/flowers-background"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, ImageIcon, Video, FileText, Heart } from "lucide-react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import type { Post, PostType } from "@/lib/types"

const typeIcons: Record<PostType, React.ComponentType<{ className?: string }>> = {
  poem: BookOpen,
  art: ImageIcon,
  video: Video,
  text: FileText,
}

const typeLabels = {
  poem: "Poema",
  art: "Arte",
  video: "Video",
  text: "Texto",
}

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  return null
}

function getDriveEmbedUrl(url: string): string | null {
  const match = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|drive\.google\.com\/drive\/folders\/)([a-zA-Z0-9_-]+)/)
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`
  }
  return null
}

export default function PostPage() {
  const params = useParams()
  const id = params.id as string
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient()
      const { data } = await supabase.from("posts").select("*").eq("id", id).eq("published", true).single()

      setPost(data as Post | null)
      if (data) {
        setLikes(data.likes || 0)
        const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]")
        setHasLiked(likedPosts.includes(data.id))
      }
      setLoading(false)
    }
    fetchPost()
  }, [id])

  const handleLike = async () => {
    if (!post) return

    const newHasLiked = !hasLiked
    setHasLiked(newHasLiked)
    setLikes((prev) => prev + (newHasLiked ? 1 : -1))

    const supabase = createClient()
    const { error } = await supabase.rpc(newHasLiked ? "increment_likes" : "decrement_likes", { post_id: post.id })

    if (error) {
      console.error("Error updating likes:", error)
      setHasLiked(!newHasLiked)
      setLikes((prev) => prev + (newHasLiked ? -1 : 1))
      return
    }

    const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]")
    if (newHasLiked) {
      localStorage.setItem("liked_posts", JSON.stringify([...likedPosts, post.id]))
    } else {
      localStorage.setItem("liked_posts", JSON.stringify(likedPosts.filter((id: string) => id !== post.id)))
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <FlowersBackground />
        <Navbar />
        <main className="relative z-10 mx-auto max-w-3xl px-4 py-12 text-center">
          <p className="text-muted-foreground">Cargando...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  const Icon = typeIcons[post.type]
  const formattedDate = new Date(post.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const youtubeEmbedUrl = post.media_url ? getYouTubeEmbedUrl(post.media_url) : null
  const driveEmbedUrl = post.media_url ? getDriveEmbedUrl(post.media_url) : null

  return (
    <div className="relative min-h-screen">
      <FlowersBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-primary sm:mb-8">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>

        <article className="rounded-2xl border border-primary/10 bg-card/80 p-4 backdrop-blur-sm sm:p-8 md:p-12">
          <header className="mb-6 text-center sm:mb-8">
            <Badge variant="secondary" className="mb-3 gap-1 bg-primary/10 text-primary sm:mb-4">
              <Icon className="h-3 w-3" />
              {typeLabels[post.type]}
            </Badge>
            <h1 className="mb-3 text-2xl font-semibold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl text-balance">
              {post.title}
            </h1>
            <time className="text-sm text-muted-foreground sm:text-base">{formattedDate}</time>
          </header>

          {post.media_url && post.type === "art" && (
            <div className="mb-6 overflow-hidden rounded-xl sm:mb-8">
              <img src={post.media_url || "/placeholder.svg"} alt={post.title} className="w-full object-contain" />
            </div>
          )}

          {post.media_url && post.type === "video" && (
            <div className="mb-6 overflow-hidden rounded-xl sm:mb-8">
              {youtubeEmbedUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-xl"
                  />
                </div>
              ) : driveEmbedUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={driveEmbedUrl}
                    title={post.title}
                    className="h-full w-full rounded-xl"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video src={post.media_url} controls className="w-full" />
              )}
            </div>
          )}

          {post.content && (
            <div className="prose prose-lg mx-auto max-w-none">
              <p className="whitespace-pre-line leading-relaxed text-foreground/90 text-base sm:text-lg">
                {post.content}
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className={`gap-2 rounded-full border-2 transition-all duration-300 ${
                hasLiked
                  ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                  : "border-muted-foreground/30 hover:border-primary hover:text-primary"
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-6 w-6 transition-all ${hasLiked ? "fill-primary scale-110" : "scale-100"}`} />
              <span className="text-lg font-medium">{likes}</span>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
