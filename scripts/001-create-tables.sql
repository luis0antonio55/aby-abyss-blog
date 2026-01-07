-- Crear tabla de posts para el blog
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL CHECK (type IN ('poem', 'art', 'video', 'text')),
  media_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT false,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Habilitar RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Política para que cualquiera pueda ver posts publicados
CREATE POLICY "Anyone can view published posts" ON posts 
  FOR SELECT USING (published = true);

-- Política para que el admin pueda ver todos sus posts
CREATE POLICY "Admin can view own posts" ON posts 
  FOR SELECT USING (auth.uid() = user_id);

-- Política para que el admin pueda insertar posts
CREATE POLICY "Admin can insert posts" ON posts 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para que el admin pueda actualizar sus posts
CREATE POLICY "Admin can update own posts" ON posts 
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para que el admin pueda eliminar sus posts
CREATE POLICY "Admin can delete own posts" ON posts 
  FOR DELETE USING (auth.uid() = user_id);

-- Crear índice para mejorar rendimiento
CREATE INDEX posts_published_idx ON posts (published, created_at DESC);
CREATE INDEX posts_user_id_idx ON posts (user_id);
