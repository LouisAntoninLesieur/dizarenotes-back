BEGIN;

-- Insertion des auteurs
INSERT INTO "author" ("userName", "email", "password")
VALUES 
('JohnDoe', 'john.doe@example.com', 'password123'),
('JaneSmith', 'jane.smith@example.com', 'password456');

-- Insertion des notes
INSERT INTO "notes" ("author_id", "title", "content")
VALUES 
(1, 'Première Note', 'Ceci est le contenu de la première note.'),
(2, 'Deuxième Note', 'Ceci est le contenu de la deuxième note.');

-- Insertion des commentaires
INSERT INTO "comments" ("author_id", "note_id", "content")
VALUES 
(1, 2, 'Ceci est un commentaire sur la deuxième note.'),
(2, 1, 'Ceci est un commentaire sur la première note.');

-- Insertion des tags
INSERT INTO "tags" ("name")
VALUES 
('Important'),
('Personnel');

-- Insertion des associations note-tags
INSERT INTO "note_tags" ("note_id", "tag_id")
VALUES 
(1, 1),
(2, 2);

COMMIT;