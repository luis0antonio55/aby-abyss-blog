-- Agregar campo para imagen de portada/thumbnail personalizada
ALTER TABLE posts ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Comentario: Este campo permite subir una imagen personalizada 
-- para mostrar en las tarjetas, útil para videos de YouTube con restricción de edad
