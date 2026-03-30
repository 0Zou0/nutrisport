-- ─────────────────────────────────────────
-- NutriSport — Seed initial
-- ─────────────────────────────────────────

-- Club
INSERT INTO "Club" ("id", "name", "sport", "createdAt", "updatedAt")
VALUES ('club-aurillac', 'Stade Aurillacois', 'rugby', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- Utilisateurs
INSERT INTO "User" ("id", "email", "name", "role", "active", "clubId", "createdAt", "updatedAt") VALUES
('user-cook',   'cook@nutrisport.fr',  'Marie Dupont',   'COOK',         true, 'club-aurillac', NOW(), NOW()),
('user-coach',  'coach@nutrisport.fr', 'Pierre Martin',  'COACH',        true, 'club-aurillac', NOW(), NOW()),
('user-player', 'player@nutrisport.fr','Lucas Bernard',  'PLAYER',       true, 'club-aurillac', NOW(), NOW()),
('user-nutri',  'nutri@nutrisport.fr', 'Sophie Leroy',   'NUTRITIONIST', true, 'club-aurillac', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- Saison
INSERT INTO "Season" ("id", "name", "startDate", "endDate", "active", "clubId", "createdAt") VALUES
('season-2025-2026', 'Saison 2025-2026', '2025-09-01', '2026-06-30', true, 'club-aurillac', NOW())
ON CONFLICT ("id") DO NOTHING;

-- ─── Recettes ───────────────────────────────────────────

INSERT INTO "Recipe" ("id","title","description","category","difficulty","prepTimeMin","cookTimeMin","servings","isPublic","clubId","createdAt","updatedAt") VALUES
('std-s1','Salade de quinoa','Quinoa, légumes grillés, vinaigrette citron','STARTER','EASY',15,20,4,false,'club-aurillac',NOW(),NOW()),
('std-s2','Velouté de potiron','Courge butternut, noix de muscade, crème légère','STARTER','EASY',10,25,4,false,'club-aurillac',NOW(),NOW()),
('std-s3','Carpaccio de betterave','Betterave rôtie, chèvre frais, graines de tournesol','STARTER','EASY',15,0,4,false,'club-aurillac',NOW(),NOW()),
('std-m1','Poulet rôti patates douces','Filet de poulet fermier, patates douces rôties, haricots verts','MAIN','EASY',10,35,4,false,'club-aurillac',NOW(),NOW()),
('std-m2','Saumon grillé riz complet','Pavé de saumon, riz complet, brocolis vapeur','MAIN','EASY',10,25,4,false,'club-aurillac',NOW(),NOW()),
('std-m3','Pâtes bolognaise sport','Pâtes semi-complètes, bœuf haché maigre, tomates fraîches','MAIN','EASY',10,20,4,false,'club-aurillac',NOW(),NOW()),
('ai-s1','Smoothie vert anti-inflammatoire','Épinards, concombre, gingembre, citron vert','STARTER','EASY',5,0,4,false,'club-aurillac',NOW(),NOW()),
('ai-s2','Tartare de thon','Thon frais, avocat, sésame, sauce soja légère','STARTER','MEDIUM',20,0,4,false,'club-aurillac',NOW(),NOW()),
('ai-s3','Salade de mâche grenade','Mâche, grenade, noix, vinaigrette tumérique','STARTER','EASY',10,0,4,false,'club-aurillac',NOW(),NOW()),
('ai-m1','Saumon avocat quinoa','Saumon sauvage, quinoa noir, avocat, épinards','MAIN','MEDIUM',15,20,4,false,'club-aurillac',NOW(),NOW()),
('ai-m2','Poulet curcuma légumes colorés','Poulet mariné curcuma-gingembre, légumes colorés','MAIN','EASY',15,25,4,false,'club-aurillac',NOW(),NOW()),
('ai-m3','Bowl végétarien complet','Pois chiches rôtis, patate douce, chou rouge, tahini','MAIN','EASY',20,30,4,false,'club-aurillac',NOW(),NOW()),
('md-s1','Riz au lait protéiné','Riz complet, lait d''amande, cannelle, miel','STARTER','EASY',5,20,4,false,'club-aurillac',NOW(),NOW()),
('md-s2','Soupe de légumineuses','Lentilles corail, tomates, épices douces','STARTER','EASY',10,25,4,false,'club-aurillac',NOW(),NOW()),
('md-s3','Tartines complètes œufs pochés avocat','Pain complet, œufs pochés, avocat, graines chia','STARTER','MEDIUM',15,5,4,false,'club-aurillac',NOW(),NOW()),
('md-m1','Pâtes poulet sauce tomate','Pâtes complètes, blanc de poulet, sauce tomate maison','MAIN','EASY',10,20,4,false,'club-aurillac',NOW(),NOW()),
('md-m2','Risotto jambon herbes','Riz arborio, jambon blanc, parmesan léger, herbes','MAIN','MEDIUM',10,25,4,false,'club-aurillac',NOW(),NOW()),
('md-m3','Burger sport maison','Pain complet, steak haché 5% MG, légumes, sauce yaourt','MAIN','MEDIUM',15,10,4,false,'club-aurillac',NOW(),NOW())
ON CONFLICT ("id") DO NOTHING;

-- Valeurs nutritionnelles
INSERT INTO "NutritionFacts" ("id","calories","protein","carbs","fat","fiber","recipeId") VALUES
('nf-std-s1',280,12,42,8,5,'std-s1'),('nf-std-s2',180,5,28,6,3,'std-s2'),('nf-std-s3',150,6,18,7,4,'std-s3'),
('nf-std-m1',420,42,38,10,6,'std-m1'),('nf-std-m2',480,45,40,14,4,'std-m2'),('nf-std-m3',520,38,65,12,7,'std-m3'),
('nf-ai-s1',90,3,18,2,3,'ai-s1'),('nf-ai-s2',210,22,6,12,2,'ai-s2'),('nf-ai-s3',180,5,20,10,4,'ai-s3'),
('nf-ai-m1',520,46,38,18,7,'ai-m1'),('nf-ai-m2',380,40,22,14,5,'ai-m2'),('nf-ai-m3',440,18,52,16,10,'ai-m3'),
('nf-md-s1',220,8,40,4,2,'md-s1'),('nf-md-s2',240,14,38,4,8,'md-s2'),('nf-md-s3',320,18,38,12,6,'md-s3'),
('nf-md-m1',560,48,68,8,8,'md-m1'),('nf-md-m2',480,32,62,10,2,'md-m2'),('nf-md-m3',540,42,52,14,4,'md-m3')
ON CONFLICT ("id") DO NOTHING;

-- Tags recettes
INSERT INTO "RecipeTag" ("id","label","recipeId") VALUES
('t1','végétarien','std-s1'),('t2','sans gluten','std-s1'),('t3','riche en protéines','std-s1'),
('t4','sans gluten','std-m1'),('t5','riche en protéines','std-m1'),
('t6','oméga-3','std-m2'),('t7','anti-inflammatoire','std-m2'),
('t8','anti-inflammatoire','ai-m1'),('t9','sans gluten','ai-m1'),('t10','oméga-3','ai-m1'),
('t11','glucides','md-m1'),('t12','jour de match','md-m1')
ON CONFLICT ("id") DO NOTHING;

-- Orientations recettes
INSERT INTO "RecipeOrientation" ("id","orientation","recipeId") VALUES
('ro1','GLUC_MOD','std-s1'),('ro2','PROT_BON','std-s1'),
('ro3','GLUC_MOD','std-m1'),('ro4','PROT_BON','std-m1'),('ro5','VIANDE_BLANCHE','std-m1'),
('ro6','ANTI_INFLAM','std-m2'),('ro7','PROT_BON','std-m2'),('ro8','GROSSE_MAT','std-m2'),
('ro9','ANTI_INFLAM','ai-m1'),('ro10','PROT_BON','ai-m1'),('ro11','GROSSE_MAT','ai-m1'),
('ro12','GLUC_HAUT','md-m1'),('ro13','PROT_BON','md-m1')
ON CONFLICT ("id") DO NOTHING;

-- ─── DayPlans ───────────────────────────────────────────

INSERT INTO "DayPlan" ("id","date","seasonId","createdById","createdAt","updatedAt") VALUES
('dp-2026-03-16','2026-03-16','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-17','2026-03-17','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-18','2026-03-18','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-19','2026-03-19','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-20','2026-03-20','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-21','2026-03-21','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-22','2026-03-22','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-23','2026-03-23','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-24','2026-03-24','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-25','2026-03-25','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-26','2026-03-26','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-27','2026-03-27','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-28','2026-03-28','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-29','2026-03-29','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-30','2026-03-30','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-03-31','2026-03-31','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-01','2026-04-01','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-02','2026-04-02','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-03','2026-04-03','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-04','2026-04-04','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-05','2026-04-05','season-2025-2026','user-nutri',NOW(),NOW())
ON CONFLICT ("id") DO NOTHING;

-- Séances d'entraînement
INSERT INTO "TrainingSession" ("id","slot","type","intensity","durationMin","dayPlanId") VALUES
('ts-1a','MORNING','Musculation','HIGH',75,'dp-2026-03-16'),
('ts-1b','AFTERNOON','Rugby — séance collective','MODERATE',90,'dp-2026-03-16'),
('ts-2a','MORNING','Cardio','MODERATE',45,'dp-2026-03-17'),
('ts-2b','AFTERNOON','Repos','LOW',NULL,'dp-2026-03-17'),
('ts-3a','MORNING','Mobilité','LOW',40,'dp-2026-03-18'),
('ts-3b','AFTERNOON','Musculation','HIGH',75,'dp-2026-03-18'),
('ts-4a','MORNING','Musculation','HIGH',75,'dp-2026-03-19'),
('ts-4b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-03-19'),
('ts-5a','MORNING','Récupération','LOW',30,'dp-2026-03-20'),
('ts-6a','AFTERNOON','Match','HIGH',80,'dp-2026-03-21'),
('ts-8a','MORNING','Musculation','HIGH',75,'dp-2026-03-23'),
('ts-8b','AFTERNOON','Rugby — séance collective','MODERATE',90,'dp-2026-03-23'),
('ts-9a','MORNING','Cardio','MODERATE',50,'dp-2026-03-24'),
('ts-9b','AFTERNOON','Repos','LOW',NULL,'dp-2026-03-24'),
('ts-10a','MORNING','Mobilité','LOW',40,'dp-2026-03-25'),
('ts-10b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-03-25'),
('ts-11a','MORNING','Musculation','HIGH',80,'dp-2026-03-26'),
('ts-11b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-03-26'),
('ts-12a','MORNING','Récupération','LOW',30,'dp-2026-03-27'),
('ts-13a','AFTERNOON','Match','HIGH',80,'dp-2026-03-28'),
('ts-15a','MORNING','Musculation','MODERATE',70,'dp-2026-03-30'),
('ts-15b','AFTERNOON','Rugby — séance collective','MODERATE',85,'dp-2026-03-30'),
('ts-16a','MORNING','Cardio','MODERATE',45,'dp-2026-03-31'),
('ts-17a','MORNING','Mobilité','LOW',35,'dp-2026-04-01'),
('ts-17b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-04-01'),
('ts-18a','MORNING','Musculation','HIGH',80,'dp-2026-04-02'),
('ts-18b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-04-02'),
('ts-19a','MORNING','Récupération active','LOW',30,'dp-2026-04-03'),
('ts-20a','AFTERNOON','Match','HIGH',80,'dp-2026-04-04')
ON CONFLICT ("id") DO NOTHING;

-- Orientations journalières
INSERT INTO "DayOrientation" ("id","orientation","priority","dayPlanId") VALUES
('do-1a','GLUC_HAUT',0,'dp-2026-03-16'),('do-1b','PROT_BON',1,'dp-2026-03-16'),
('do-2a','ANTI_INFLAM',0,'dp-2026-03-17'),('do-2b','PROT_MAIGRE',1,'dp-2026-03-17'),
('do-3a','GLUC_MOD',0,'dp-2026-03-18'),('do-3b','VIANDE_BLANCHE',1,'dp-2026-03-18'),
('do-4a','GLUC_HAUT',0,'dp-2026-03-19'),('do-4b','PROT_BON',1,'dp-2026-03-19'),
('do-5a','ANTI_INFLAM',0,'dp-2026-03-20'),('do-5b','ANTIOXYDANT',1,'dp-2026-03-20'),
('do-6a','GROSSE_MAT',0,'dp-2026-03-21'),('do-6b','GLUC_HAUT',1,'dp-2026-03-21'),
('do-7a','ANTI_INFLAM',0,'dp-2026-03-22'),
('do-8a','GLUC_HAUT',0,'dp-2026-03-23'),('do-8b','PROT_BON',1,'dp-2026-03-23'),
('do-9a','ANTI_INFLAM',0,'dp-2026-03-24'),('do-9b','PROT_MAIGRE',1,'dp-2026-03-24'),
('do-10a','GLUC_MOD',0,'dp-2026-03-25'),('do-10b','VIANDE_BLANCHE',1,'dp-2026-03-25'),
('do-11a','GLUC_HAUT',0,'dp-2026-03-26'),('do-11b','PROT_BON',1,'dp-2026-03-26'),
('do-12a','ANTI_INFLAM',0,'dp-2026-03-27'),('do-12b','ANTIOXYDANT',1,'dp-2026-03-27'),
('do-13a','GROSSE_MAT',0,'dp-2026-03-28'),('do-13b','GLUC_HAUT',1,'dp-2026-03-28'),
('do-14a','ANTI_INFLAM',0,'dp-2026-03-29'),
('do-15a','GLUC_MOD',0,'dp-2026-03-30'),('do-15b','PROT_BON',1,'dp-2026-03-30'),
('do-16a','ANTI_INFLAM',0,'dp-2026-03-31'),('do-16b','PROT_MAIGRE',1,'dp-2026-03-31'),
('do-17a','GLUC_MOD',0,'dp-2026-04-01'),('do-17b','VIANDE_BLANCHE',1,'dp-2026-04-01'),
('do-18a','GLUC_HAUT',0,'dp-2026-04-02'),('do-18b','PROT_BON',1,'dp-2026-04-02'),
('do-19a','ANTI_INFLAM',0,'dp-2026-04-03'),('do-19b','ANTIOXYDANT',1,'dp-2026-04-03'),
('do-20a','GROSSE_MAT',0,'dp-2026-04-04'),('do-20b','GLUC_HAUT',1,'dp-2026-04-04'),
('do-21a','ANTI_INFLAM',0,'dp-2026-04-05')
ON CONFLICT ("id") DO NOTHING;

-- Menus journaliers
INSERT INTO "DayMenu" ("id","dayPlanId","createdAt","updatedAt") VALUES
('dm-03-16','dp-2026-03-16',NOW(),NOW()),('dm-03-17','dp-2026-03-17',NOW(),NOW()),
('dm-03-18','dp-2026-03-18',NOW(),NOW()),('dm-03-19','dp-2026-03-19',NOW(),NOW()),
('dm-03-20','dp-2026-03-20',NOW(),NOW()),('dm-03-21','dp-2026-03-21',NOW(),NOW()),
('dm-03-22','dp-2026-03-22',NOW(),NOW()),('dm-03-23','dp-2026-03-23',NOW(),NOW()),
('dm-03-24','dp-2026-03-24',NOW(),NOW()),('dm-03-25','dp-2026-03-25',NOW(),NOW()),
('dm-03-26','dp-2026-03-26',NOW(),NOW()),('dm-03-27','dp-2026-03-27',NOW(),NOW()),
('dm-03-28','dp-2026-03-28',NOW(),NOW()),('dm-03-29','dp-2026-03-29',NOW(),NOW()),
('dm-03-30','dp-2026-03-30',NOW(),NOW()),('dm-03-31','dp-2026-03-31',NOW(),NOW()),
('dm-04-01','dp-2026-04-01',NOW(),NOW()),('dm-04-02','dp-2026-04-02',NOW(),NOW()),
('dm-04-03','dp-2026-04-03',NOW(),NOW()),('dm-04-04','dp-2026-04-04',NOW(),NOW()),
('dm-04-05','dp-2026-04-05',NOW(),NOW())
ON CONFLICT ("id") DO NOTHING;

-- Options de menu (starters + mains)
INSERT INTO "MenuOption" ("id","category","available","sortOrder","dayMenuId","recipeId") VALUES
-- Jours standard
('mo-16-s1','STARTER',true,0,'dm-03-16','std-s1'),('mo-16-s2','STARTER',true,1,'dm-03-16','std-s2'),
('mo-16-m1','MAIN',true,0,'dm-03-16','std-m1'),('mo-16-m2','MAIN',true,1,'dm-03-16','std-m2'),
('mo-18-s1','STARTER',true,0,'dm-03-18','std-s1'),('mo-18-s2','STARTER',true,1,'dm-03-18','std-s3'),
('mo-18-m1','MAIN',true,0,'dm-03-18','std-m1'),('mo-18-m2','MAIN',true,1,'dm-03-18','std-m2'),
('mo-19-s1','STARTER',true,0,'dm-03-19','std-s1'),('mo-19-m1','MAIN',true,0,'dm-03-19','std-m1'),('mo-19-m2','MAIN',true,1,'dm-03-19','std-m3'),
('mo-23-s1','STARTER',true,0,'dm-03-23','std-s1'),('mo-23-m1','MAIN',true,0,'dm-03-23','std-m1'),('mo-23-m2','MAIN',true,1,'dm-03-23','std-m2'),
('mo-25-s1','STARTER',true,0,'dm-03-25','std-s1'),('mo-25-s2','STARTER',true,1,'dm-03-25','std-s2'),
('mo-25-m1','MAIN',true,0,'dm-03-25','std-m1'),('mo-25-m2','MAIN',true,1,'dm-03-25','std-m2'),
('mo-26-s1','STARTER',true,0,'dm-03-26','std-s1'),('mo-26-m1','MAIN',true,0,'dm-03-26','std-m1'),('mo-26-m2','MAIN',true,1,'dm-03-26','std-m2'),
('mo-30-s1','STARTER',true,0,'dm-03-30','std-s1'),('mo-30-m1','MAIN',true,0,'dm-03-30','std-m1'),('mo-30-m2','MAIN',true,1,'dm-03-30','std-m2'),
('mo-01-s1','STARTER',true,0,'dm-04-01','std-s1'),('mo-01-m1','MAIN',true,0,'dm-04-01','std-m1'),('mo-01-m2','MAIN',true,1,'dm-04-01','std-m2'),
('mo-02-s1','STARTER',true,0,'dm-04-02','std-s1'),('mo-02-m1','MAIN',true,0,'dm-04-02','std-m1'),('mo-02-m2','MAIN',true,1,'dm-04-02','std-m2'),
-- Jours anti-inflam
('mo-17-s1','STARTER',true,0,'dm-03-17','ai-s1'),('mo-17-s2','STARTER',true,1,'dm-03-17','ai-s2'),
('mo-17-m1','MAIN',true,0,'dm-03-17','ai-m1'),('mo-17-m2','MAIN',true,1,'dm-03-17','ai-m2'),
('mo-20-s1','STARTER',true,0,'dm-03-20','ai-s1'),('mo-20-m1','MAIN',true,0,'dm-03-20','ai-m1'),
('mo-22-s1','STARTER',true,0,'dm-03-22','ai-s1'),('mo-22-m1','MAIN',true,0,'dm-03-22','ai-m1'),
('mo-24-s1','STARTER',true,0,'dm-03-24','ai-s1'),('mo-24-m1','MAIN',true,0,'dm-03-24','ai-m1'),
('mo-27-s1','STARTER',true,0,'dm-03-27','ai-s1'),('mo-27-m1','MAIN',true,0,'dm-03-27','ai-m1'),
('mo-29-s1','STARTER',true,0,'dm-03-29','ai-s1'),('mo-29-m1','MAIN',true,0,'dm-03-29','ai-m1'),
('mo-31-s1','STARTER',true,0,'dm-03-31','ai-s1'),('mo-31-m1','MAIN',true,0,'dm-03-31','ai-m1'),
('mo-03-s1','STARTER',true,0,'dm-04-03','ai-s1'),('mo-03-m1','MAIN',true,0,'dm-04-03','ai-m1'),
('mo-05-s1','STARTER',true,0,'dm-04-05','ai-s1'),('mo-05-m1','MAIN',true,0,'dm-04-05','ai-m1'),
-- Jours match
('mo-21-s1','STARTER',true,0,'dm-03-21','md-s1'),('mo-21-s2','STARTER',true,1,'dm-03-21','md-s2'),
('mo-21-m1','MAIN',true,0,'dm-03-21','md-m1'),('mo-21-m2','MAIN',true,1,'dm-03-21','md-m2'),
('mo-28-s1','STARTER',true,0,'dm-03-28','md-s1'),('mo-28-m1','MAIN',true,0,'dm-03-28','md-m1'),
('mo-04-s1','STARTER',true,0,'dm-04-04','md-s1'),('mo-04-m1','MAIN',true,0,'dm-04-04','md-m1')
ON CONFLICT ("id") DO NOTHING;
