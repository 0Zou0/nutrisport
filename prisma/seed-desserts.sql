-- ============================================================
-- Seed : 6 desserts pour le club Aurillac (tests)
-- ============================================================

-- ─── Recette 1 : Compote pomme-cannelle ───────────────────
INSERT INTO "Recipe" (id, title, description, category, difficulty, "prepTimeMin", "cookTimeMin", servings, "clubId", "createdAt", "updatedAt")
VALUES ('recipe-dessert-01', 'Compote pomme-cannelle', 'Compote maison légère, idéale en récupération pour l''apport en glucides simples.', 'DESSERT', 'EASY', 10, 20, 6, 'club-aurillac', NOW(), NOW());

INSERT INTO "Ingredient" (id, name, quantity, unit, "sortOrder", "recipeId")
VALUES
  (gen_random_uuid()::text, 'Pommes Golden', 6, 'unités', 0, 'recipe-dessert-01'),
  (gen_random_uuid()::text, 'Cannelle moulue', 1, 'c. à café', 1, 'recipe-dessert-01'),
  (gen_random_uuid()::text, 'Eau', 3, 'c. à soupe', 2, 'recipe-dessert-01'),
  (gen_random_uuid()::text, 'Sucre de canne', 1, 'c. à soupe', 3, 'recipe-dessert-01');

INSERT INTO "RecipeStep" (id, "stepNumber", instruction, "durationMin", "recipeId")
VALUES
  (gen_random_uuid()::text, 1, 'Éplucher et couper les pommes en dés.', 5, 'recipe-dessert-01'),
  (gen_random_uuid()::text, 2, 'Mettre les pommes dans une casserole avec l''eau et le sucre. Cuire à feu moyen 20 min en remuant régulièrement.', 20, 'recipe-dessert-01'),
  (gen_random_uuid()::text, 3, 'Mixer grossièrement, ajouter la cannelle et mélanger. Servir tiède ou froid.', 2, 'recipe-dessert-01');

-- ─── Recette 2 : Yaourt grec miel & fruits rouges ─────────
INSERT INTO "Recipe" (id, title, description, category, difficulty, "prepTimeMin", "cookTimeMin", servings, "clubId", "createdAt", "updatedAt")
VALUES ('recipe-dessert-02', 'Yaourt grec miel & fruits rouges', 'Riche en protéines et probiotiques, parfait après l''effort pour la récupération musculaire.', 'DESSERT', 'EASY', 5, 0, 4, 'club-aurillac', NOW(), NOW());

INSERT INTO "Ingredient" (id, name, quantity, unit, "sortOrder", "recipeId")
VALUES
  (gen_random_uuid()::text, 'Yaourt grec nature', 500, 'g', 0, 'recipe-dessert-02'),
  (gen_random_uuid()::text, 'Miel d''acacia', 4, 'c. à soupe', 1, 'recipe-dessert-02'),
  (gen_random_uuid()::text, 'Framboises fraîches', 150, 'g', 2, 'recipe-dessert-02'),
  (gen_random_uuid()::text, 'Myrtilles', 100, 'g', 3, 'recipe-dessert-02'),
  (gen_random_uuid()::text, 'Granola maison', 60, 'g', 4, 'recipe-dessert-02');

INSERT INTO "RecipeStep" (id, "stepNumber", instruction, "durationMin", "recipeId")
VALUES
  (gen_random_uuid()::text, 1, 'Répartir le yaourt grec dans 4 verrines ou bols.', 2, 'recipe-dessert-02'),
  (gen_random_uuid()::text, 2, 'Déposer les fruits rouges sur le yaourt.', 1, 'recipe-dessert-02'),
  (gen_random_uuid()::text, 3, 'Arroser de miel et saupoudrer de granola. Servir aussitôt.', 1, 'recipe-dessert-02');

-- ─── Recette 3 : Gâteau de riz au lait vanillé ────────────
INSERT INTO "Recipe" (id, title, description, category, difficulty, "prepTimeMin", "cookTimeMin", servings, "clubId", "createdAt", "updatedAt")
VALUES ('recipe-dessert-03', 'Gâteau de riz au lait vanillé', 'Classique réconfortant, riche en glucides complexes pour reconstituer les réserves de glycogène.', 'DESSERT', 'MEDIUM', 10, 45, 6, 'club-aurillac', NOW(), NOW());

INSERT INTO "Ingredient" (id, name, quantity, unit, "sortOrder", "recipeId")
VALUES
  (gen_random_uuid()::text, 'Riz rond', 200, 'g', 0, 'recipe-dessert-03'),
  (gen_random_uuid()::text, 'Lait entier', 1000, 'ml', 1, 'recipe-dessert-03'),
  (gen_random_uuid()::text, 'Sucre', 80, 'g', 2, 'recipe-dessert-03'),
  (gen_random_uuid()::text, 'Gousse de vanille', 1, 'unité', 3, 'recipe-dessert-03'),
  (gen_random_uuid()::text, 'Beurre', 20, 'g', 4, 'recipe-dessert-03');

INSERT INTO "RecipeStep" (id, "stepNumber", instruction, "durationMin", "recipeId")
VALUES
  (gen_random_uuid()::text, 1, 'Fendre la gousse de vanille et gratter les grains. Porter le lait à ébullition avec la vanille.', 5, 'recipe-dessert-03'),
  (gen_random_uuid()::text, 2, 'Verser le riz dans le lait chaud, baisser le feu. Cuire 40 min à feu doux en remuant toutes les 5 min.', 40, 'recipe-dessert-03'),
  (gen_random_uuid()::text, 3, 'En fin de cuisson, incorporer le sucre et le beurre. Laisser tiédir avant de servir.', 5, 'recipe-dessert-03');

-- ─── Recette 4 : Brownies protéinés cacao-amande ──────────
INSERT INTO "Recipe" (id, title, description, category, difficulty, "prepTimeMin", "cookTimeMin", servings, "clubId", "createdAt", "updatedAt")
VALUES ('recipe-dessert-04', 'Brownies protéinés cacao-amande', 'Version sport du brownie : riche en protéines grâce à la poudre d''amande et aux oeufs, faible en sucre.', 'DESSERT', 'MEDIUM', 15, 25, 8, 'club-aurillac', NOW(), NOW());

INSERT INTO "Ingredient" (id, name, quantity, unit, "sortOrder", "recipeId")
VALUES
  (gen_random_uuid()::text, 'Poudre d''amande', 150, 'g', 0, 'recipe-dessert-04'),
  (gen_random_uuid()::text, 'Cacao non sucré', 40, 'g', 1, 'recipe-dessert-04'),
  (gen_random_uuid()::text, 'Oeufs', 3, 'unités', 2, 'recipe-dessert-04'),
  (gen_random_uuid()::text, 'Miel', 60, 'g', 3, 'recipe-dessert-04'),
  (gen_random_uuid()::text, 'Huile de coco', 50, 'ml', 4, 'recipe-dessert-04'),
  (gen_random_uuid()::text, 'Levure chimique', 1, 'c. à café', 5, 'recipe-dessert-04');

INSERT INTO "RecipeStep" (id, "stepNumber", instruction, "durationMin", "recipeId")
VALUES
  (gen_random_uuid()::text, 1, 'Préchauffer le four à 175°C. Mélanger la poudre d''amande, le cacao et la levure dans un saladier.', 3, 'recipe-dessert-04'),
  (gen_random_uuid()::text, 2, 'Dans un autre bol, fouetter les oeufs avec le miel et l''huile de coco fondue.', 3, 'recipe-dessert-04'),
  (gen_random_uuid()::text, 3, 'Incorporer le mélange liquide aux ingrédients secs. Verser dans un moule beurré et cuire 20-25 min.', 25, 'recipe-dessert-04'),
  (gen_random_uuid()::text, 4, 'Laisser refroidir 10 min avant de démouler et couper en carrés.', 10, 'recipe-dessert-04');

-- ─── Recette 5 : Mousse banane & cacao ────────────────────
INSERT INTO "Recipe" (id, title, description, category, difficulty, "prepTimeMin", "cookTimeMin", servings, "clubId", "createdAt", "updatedAt")
VALUES ('recipe-dessert-05', 'Mousse banane & cacao', 'Dessert rapide sans cuisson, naturellement sucré à la banane, riche en potassium et magnésium.', 'DESSERT', 'EASY', 10, 0, 4, 'club-aurillac', NOW(), NOW());

INSERT INTO "Ingredient" (id, name, quantity, unit, "sortOrder", "recipeId")
VALUES
  (gen_random_uuid()::text, 'Bananes mûres', 3, 'unités', 0, 'recipe-dessert-05'),
  (gen_random_uuid()::text, 'Cacao en poudre', 2, 'c. à soupe', 1, 'recipe-dessert-05'),
  (gen_random_uuid()::text, 'Crème de coco', 100, 'ml', 2, 'recipe-dessert-05'),
  (gen_random_uuid()::text, 'Extrait de vanille', 1, 'c. à café', 3, 'recipe-dessert-05');

INSERT INTO "RecipeStep" (id, "stepNumber", instruction, "durationMin", "recipeId")
VALUES
  (gen_random_uuid()::text, 1, 'Mixer les bananes en purée lisse.', 2, 'recipe-dessert-05'),
  (gen_random_uuid()::text, 2, 'Ajouter le cacao, la crème de coco et la vanille. Mixer à nouveau jusqu''à obtenir une mousse homogène.', 3, 'recipe-dessert-05'),
  (gen_random_uuid()::text, 3, 'Répartir dans 4 verrines et réfrigérer au moins 30 min avant de servir.', 2, 'recipe-dessert-05');

-- ─── Recette 6 : Tarte aux pommes légère ──────────────────
INSERT INTO "Recipe" (id, title, description, category, difficulty, "prepTimeMin", "cookTimeMin", servings, "clubId", "createdAt", "updatedAt")
VALUES ('recipe-dessert-06', 'Tarte aux pommes légère', 'Tarte fine sans crème, pâte brisée maison, idéale comme dessert post-entrainement pour les glucides.', 'DESSERT', 'HARD', 30, 35, 8, 'club-aurillac', NOW(), NOW());

INSERT INTO "Ingredient" (id, name, quantity, unit, "sortOrder", "recipeId")
VALUES
  (gen_random_uuid()::text, 'Farine de blé T65', 200, 'g', 0, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 'Beurre froid', 90, 'g', 1, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 'Eau froide', 4, 'c. à soupe', 2, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 'Pommes Granny Smith', 4, 'unités', 3, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 'Sucre glace', 2, 'c. à soupe', 4, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 'Gelée d''abricot', 2, 'c. à soupe', 5, 'recipe-dessert-06');

INSERT INTO "RecipeStep" (id, "stepNumber", instruction, "durationMin", "recipeId")
VALUES
  (gen_random_uuid()::text, 1, 'Préparer la pâte : sabler la farine avec le beurre froid coupé en dés, ajouter l''eau, former une boule et réfrigérer 20 min.', 25, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 2, 'Préchauffer le four à 190°C. Étaler la pâte et foncer un moule de 28 cm.', 5, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 3, 'Éplucher les pommes et les couper en fines lamelles. Les disposer en rosace sur la pâte.', 10, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 4, 'Saupoudrer de sucre glace et cuire 35 min jusqu''à ce que la pâte soit dorée.', 35, 'recipe-dessert-06'),
  (gen_random_uuid()::text, 5, 'A la sortie du four, badigeonner de gelée d''abricot tiédie pour faire briller. Laisser refroidir.', 5, 'recipe-dessert-06');
