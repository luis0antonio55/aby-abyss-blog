-- Agregar campos para traducciones en inglés
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT;

-- Comentario: estos campos son opcionales
-- Si están vacíos, se mostrará el contenido original en español
