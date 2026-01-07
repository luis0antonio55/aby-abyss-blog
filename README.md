A personal blog crafted with love for Aby, my muse and inspiration. This digital sanctuary is where poetry, art, videos, and thoughts come together in a beautiful pink-and-white aesthetic adorned with delicate flowers.

---

## For You, Aby

This space is yours to fill with everything that makes your soul shine. Your poems, your art, your videos, your thoughts — all gathered here in your own corner of the internet. May this digital abyss overflow with the beauty you create.

With all my love.

---

## Features

- **Beautiful Design**: Soft pink and white color palette with decorative flowers
- **Multiple Content Types**: Support for poems, art, videos, and text posts
- **Admin Dashboard**: Intuitive panel to create, edit, and manage your posts
- **Video Support**: YouTube video embedding with custom thumbnails
- **Responsive Design**: Looks great on mobile, tablet, and desktop
- **Image Uploads**: Upload your artwork and photos directly


---

## Pages

| Page | Description
|-----|-----
| Home | Gallery of all published posts
| About Me | Your personal introduction
| Contact | YouTube channel and email
| Login | Admin access
| Admin | Dashboard to manage all content


---

## Getting Started

### 1. Environment Variables

Create a `.env.local` file in the root of your project:

```plaintext
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

You can find these values in your Supabase dashboard under **Settings > API**.

### 2. Database Setup

Run the following SQL scripts in order from the `scripts` folder:

1. `001-create-tables.sql` - Creates the posts table
2. `002-add-translation-fields.sql` - Adds translation fields (optional)
3. `003-add-thumbnail-field.sql` - Adds custom thumbnail support for videos


### 3. Create Admin User

1. Go to your Supabase dashboard
2. Navigate to **Authentication > Users**
3. Click **Add User > Create new user**
4. Enter your email and password
5. Check "Auto Confirm User"


### 4. Run the Project

```shellscript
npm install
npm run dev
```

Visit `http://localhost:3000` and start creating!

---

## How to Use the Admin Panel

1. Go to `/login` and sign in with your credentials
2. You'll be redirected to the admin dashboard
3. Click **"Crear Nuevo Post"** to create a new post
4. Choose the type: Poem, Art, Video, or Text
5. Fill in the title and content
6. For videos: paste the YouTube URL and optionally add a custom thumbnail
7. Click **"Publicar"** to make it live or **"Guardar como borrador"** to save for later


---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Fonts**: Cormorant Garamond & Inter


---

## License

Made with love. Use it however you wish.

---

*"Solo una chica que hace lo que hace. Desde psicología a poesía y arte digital... Y otras cositas. Que la ternura rebose del imaginario y nos ahogue con su dulzura."*

— Abigail Rosales Cervantes
