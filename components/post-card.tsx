"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"
import { BookOpen, ImageIcon, Video, FileText, Play, Heart } from "lucide-react"

const typeIcons = {
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

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const Icon = typeIcons[post.type]

  const formattedDate = new Date(post.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/)
    return match ? match[1] : null
  }

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeId(url)
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    }
    return null
  }

  const getDisplayImage = () => {
    if (post.thumbnail_url) return post.thumbnail_url
    if (post.type === "video" && post.media_url) {
      const ytThumb = getYouTubeThumbnail(post.media_url)
      if (ytThumb) return ytThumb
    }
    if (post.media_url && post.type === "art") return post.media_url
    return null
  }

  const displayImage = getDisplayImage()

  return (
    <Link href={`/post/${post.id}`}>
      <Card className="group h-full overflow-hidden border-primary/10 bg-card/80 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {post.type === "art" && displayImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={displayImage || "/placeholder.svg"}
              alt={post.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        {post.type === "video" && (
          <div className="aspect-video overflow-hidden bg-muted relative">
            {displayImage ? (
              <img
                src={displayImage || "/placeholder.svg"}
                alt={post.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : post.media_url && !getYouTubeId(post.media_url) ? (
              <video
                src={post.media_url}
                className="h-full w-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/5">
                <Video className="h-10 w-10 text-primary/30 sm:h-12 sm:w-12" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/50 p-2 transition-transform group-hover:scale-110 sm:p-3">
                <Play className="h-5 w-5 text-white fill-white sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        )}
        <CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="gap-1 bg-primary/10 text-primary hover:bg-primary/20 text-xs sm:text-sm"
            >
              <Icon className="h-3 w-3" />
              {typeLabels[post.type]}
            </Badge>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
          <CardTitle className="line-clamp-2 text-lg font-medium leading-tight group-hover:text-primary transition-colors sm:text-xl">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
          {post.content && (
            <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line sm:text-base">
              {post.content}
            </p>
          )}
          <div className="flex justify-end mt-2 sm:mt-4">
             <div className="flex items-center gap-1 text-primary/80">
                <Heart className="h-4 w-4" />
                <span className="text-xs font-medium sm:text-sm">{post.likes || 0}</span>
             </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
