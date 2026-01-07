"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FlowersBackground } from "@/components/flowers-background"
import { PostCard } from "@/components/post-card"
import type { Post } from "@/lib/types"

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient()
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
      if (data) setPosts(data as Post[])
    }
    fetchPosts()
  }, [])

  return (
    <div className="relative min-h-screen">
      <FlowersBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Hero Section - responsive text sizes */}
        <section className="mb-10 text-center sm:mb-16">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-foreground sm:mb-4 sm:text-5xl md:text-6xl text-balance">
            Aby&apos;s Abyss
          </h1>
          
          <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-xl px-2">
            Una compilación de mi trabajo, pensamientos, arte y lo más recóndito de mi mente en este abismo digital.
          </p>
        </section>

        {/* Posts Grid - responsive columns */}
        <section>
          {posts && posts.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center sm:py-20">
              <p className="text-lg text-muted-foreground sm:text-xl">Aún no hay publicaciones...</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
