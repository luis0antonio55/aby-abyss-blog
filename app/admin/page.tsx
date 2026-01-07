import { redirect } from "next/navigation"
import { createClient } from "@/lib/server"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/login")
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false })

  return <AdminDashboard user={userData.user} initialPosts={posts || []} />
}
