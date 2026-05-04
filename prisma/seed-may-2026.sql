-- ─────────────────────────────────────────────────────────────────
-- NutriSport — Données virtuelles Mai 2026 (jours 1 → 31)
-- Mai 2026 : Jeu 1er → Sam 31
-- Cycle rugby : 2 matchs/semaine, séances Lun-Jeu, récup Ven
-- Nouveauté : desserts assignés selon intensité du jour
-- ─────────────────────────────────────────────────────────────────

-- ════════════════════════════════════════
-- 1. DayPlans
-- ════════════════════════════════════════
INSERT INTO "DayPlan" ("id","date","seasonId","createdById","createdAt","updatedAt") VALUES
('dp-2026-05-01','2026-05-01','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-02','2026-05-02','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-03','2026-05-03','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-04','2026-05-04','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-05','2026-05-05','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-06','2026-05-06','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-07','2026-05-07','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-08','2026-05-08','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-09','2026-05-09','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-10','2026-05-10','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-11','2026-05-11','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-12','2026-05-12','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-13','2026-05-13','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-14','2026-05-14','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-15','2026-05-15','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-16','2026-05-16','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-17','2026-05-17','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-18','2026-05-18','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-19','2026-05-19','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-20','2026-05-20','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-21','2026-05-21','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-22','2026-05-22','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-23','2026-05-23','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-24','2026-05-24','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-25','2026-05-25','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-26','2026-05-26','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-27','2026-05-27','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-28','2026-05-28','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-29','2026-05-29','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-30','2026-05-30','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-05-31','2026-05-31','season-2025-2026','user-nutri',NOW(),NOW())
ON CONFLICT ("id") DO NOTHING;

-- ════════════════════════════════════════
-- 2. Séances d'entraînement
-- 01/05 = Jeu, 02 = Ven, 03 = Sam, 04 = Dim
-- 05 = Lun, 06 = Mar, 07 = Mer, 08 = Jeu, 09 = Ven, 10 = Sam, 11 = Dim
-- etc.
-- ════════════════════════════════════════
INSERT INTO "TrainingSession" ("id","slot","type","intensity","durationMin","dayPlanId") VALUES
-- 01 mai (Jeu) — haute intensité pré-match
('ts-0501a','MORNING','Musculation','HIGH',75,'dp-2026-05-01'),
('ts-0501b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-05-01'),
-- 02 mai (Ven) — veille match
('ts-0502a','MORNING','Récupération active','LOW',35,'dp-2026-05-02'),
-- 03 mai (Sam) — MATCH
('ts-0503a','AFTERNOON','Match','HIGH',80,'dp-2026-05-03'),
-- 04 mai (Dim) — récup totale, pas de séance

-- 05 mai (Lun)
('ts-0505a','MORNING','Musculation','HIGH',80,'dp-2026-05-05'),
('ts-0505b','AFTERNOON','Rugby — séance collective','MODERATE',90,'dp-2026-05-05'),
-- 06 mai (Mar)
('ts-0506a','MORNING','Cardio','MODERATE',50,'dp-2026-05-06'),
('ts-0506b','AFTERNOON','Repos','LOW',NULL,'dp-2026-05-06'),
-- 07 mai (Mer)
('ts-0507a','MORNING','Mobilité','LOW',40,'dp-2026-05-07'),
('ts-0507b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-05-07'),
-- 08 mai (Jeu) — pré-match
('ts-0508a','MORNING','Musculation','HIGH',75,'dp-2026-05-08'),
('ts-0508b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-05-08'),
-- 09 mai (Ven)
('ts-0509a','MORNING','Récupération','LOW',30,'dp-2026-05-09'),
-- 10 mai (Sam) — MATCH
('ts-0510a','AFTERNOON','Match','HIGH',80,'dp-2026-05-10'),
-- 11 mai (Dim) — récup

-- 12 mai (Lun)
('ts-0512a','MORNING','Musculation','HIGH',80,'dp-2026-05-12'),
('ts-0512b','AFTERNOON','Rugby — séance collective','MODERATE',85,'dp-2026-05-12'),
-- 13 mai (Mar)
('ts-0513a','MORNING','Cardio','MODERATE',45,'dp-2026-05-13'),
('ts-0513b','AFTERNOON','Repos','LOW',NULL,'dp-2026-05-13'),
-- 14 mai (Mer)
('ts-0514a','MORNING','Mobilité','LOW',40,'dp-2026-05-14'),
('ts-0514b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-05-14'),
-- 15 mai (Jeu) — pré-match
('ts-0515a','MORNING','Musculation','HIGH',80,'dp-2026-05-15'),
('ts-0515b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-05-15'),
-- 16 mai (Ven)
('ts-0516a','MORNING','Récupération active','LOW',35,'dp-2026-05-16'),
-- 17 mai (Sam) — MATCH
('ts-0517a','AFTERNOON','Match','HIGH',80,'dp-2026-05-17'),
-- 18 mai (Dim) — récup

-- 19 mai (Lun)
('ts-0519a','MORNING','Musculation','MODERATE',70,'dp-2026-05-19'),
('ts-0519b','AFTERNOON','Rugby — séance collective','MODERATE',85,'dp-2026-05-19'),
-- 20 mai (Mar)
('ts-0520a','MORNING','Cardio','MODERATE',50,'dp-2026-05-20'),
-- 21 mai (Mer)
('ts-0521a','MORNING','Mobilité','LOW',40,'dp-2026-05-21'),
('ts-0521b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-05-21'),
-- 22 mai (Jeu) — pré-match
('ts-0522a','MORNING','Musculation','HIGH',80,'dp-2026-05-22'),
('ts-0522b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-05-22'),
-- 23 mai (Ven)
('ts-0523a','MORNING','Récupération','LOW',30,'dp-2026-05-23'),
-- 24 mai (Sam) — MATCH
('ts-0524a','AFTERNOON','Match','HIGH',80,'dp-2026-05-24'),
-- 25 mai (Dim) — récup

-- 26 mai (Lun)
('ts-0526a','MORNING','Musculation','HIGH',75,'dp-2026-05-26'),
('ts-0526b','AFTERNOON','Rugby — séance collective','MODERATE',90,'dp-2026-05-26'),
-- 27 mai (Mar)
('ts-0527a','MORNING','Cardio','MODERATE',45,'dp-2026-05-27'),
('ts-0527b','AFTERNOON','Repos','LOW',NULL,'dp-2026-05-27'),
-- 28 mai (Mer)
('ts-0528a','MORNING','Mobilité','LOW',40,'dp-2026-05-28'),
('ts-0528b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-05-28'),
-- 29 mai (Jeu) — pré-match
('ts-0529a','MORNING','Musculation','HIGH',80,'dp-2026-05-29'),
('ts-0529b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-05-29'),
-- 30 mai (Ven)
('ts-0530a','MORNING','Récupération active','LOW',35,'dp-2026-05-30'),
-- 31 mai (Sam) — MATCH
('ts-0531a','AFTERNOON','Match','HIGH',80,'dp-2026-05-31')
ON CONFLICT ("id") DO NOTHING;

-- ════════════════════════════════════════
-- 3. Orientations nutritionnelles
-- ════════════════════════════════════════
INSERT INTO "DayOrientation" ("id","orientation","priority","dayPlanId") VALUES
-- 01 mai (Jeu) pré-match
('do-0501a','GLUC_HAUT',0,'dp-2026-05-01'),('do-0501b','PROT_BON',1,'dp-2026-05-01'),
-- 02 mai (Ven) veille match
('do-0502a','ANTI_INFLAM',0,'dp-2026-05-02'),('do-0502b','ANTIOXYDANT',1,'dp-2026-05-02'),
-- 03 mai (Sam) MATCH
('do-0503a','GROSSE_MAT',0,'dp-2026-05-03'),('do-0503b','GLUC_HAUT',1,'dp-2026-05-03'),
-- 04 mai (Dim) récup
('do-0504a','ANTI_INFLAM',0,'dp-2026-05-04'),
-- 05 mai (Lun)
('do-0505a','GLUC_HAUT',0,'dp-2026-05-05'),('do-0505b','PROT_BON',1,'dp-2026-05-05'),
-- 06 mai (Mar)
('do-0506a','ANTI_INFLAM',0,'dp-2026-05-06'),('do-0506b','PROT_MAIGRE',1,'dp-2026-05-06'),
-- 07 mai (Mer)
('do-0507a','GLUC_MOD',0,'dp-2026-05-07'),('do-0507b','VIANDE_BLANCHE',1,'dp-2026-05-07'),
-- 08 mai (Jeu) pré-match
('do-0508a','GLUC_HAUT',0,'dp-2026-05-08'),('do-0508b','PROT_BON',1,'dp-2026-05-08'),
-- 09 mai (Ven)
('do-0509a','ANTI_INFLAM',0,'dp-2026-05-09'),('do-0509b','ANTIOXYDANT',1,'dp-2026-05-09'),
-- 10 mai (Sam) MATCH
('do-0510a','GROSSE_MAT',0,'dp-2026-05-10'),('do-0510b','GLUC_HAUT',1,'dp-2026-05-10'),
-- 11 mai (Dim)
('do-0511a','ANTI_INFLAM',0,'dp-2026-05-11'),
-- 12 mai (Lun)
('do-0512a','GLUC_HAUT',0,'dp-2026-05-12'),('do-0512b','PROT_BON',1,'dp-2026-05-12'),
-- 13 mai (Mar)
('do-0513a','ANTI_INFLAM',0,'dp-2026-05-13'),('do-0513b','PROT_MAIGRE',1,'dp-2026-05-13'),
-- 14 mai (Mer)
('do-0514a','GLUC_MOD',0,'dp-2026-05-14'),('do-0514b','VIANDE_BLANCHE',1,'dp-2026-05-14'),
-- 15 mai (Jeu) pré-match
('do-0515a','GLUC_HAUT',0,'dp-2026-05-15'),('do-0515b','PROT_BON',1,'dp-2026-05-15'),
-- 16 mai (Ven)
('do-0516a','ANTI_INFLAM',0,'dp-2026-05-16'),('do-0516b','ANTIOXYDANT',1,'dp-2026-05-16'),
-- 17 mai (Sam) MATCH
('do-0517a','GROSSE_MAT',0,'dp-2026-05-17'),('do-0517b','GLUC_HAUT',1,'dp-2026-05-17'),
-- 18 mai (Dim)
('do-0518a','ANTI_INFLAM',0,'dp-2026-05-18'),
-- 19 mai (Lun)
('do-0519a','GLUC_HAUT',0,'dp-2026-05-19'),('do-0519b','PROT_BON',1,'dp-2026-05-19'),
-- 20 mai (Mar)
('do-0520a','ANTI_INFLAM',0,'dp-2026-05-20'),('do-0520b','PROT_MAIGRE',1,'dp-2026-05-20'),
-- 21 mai (Mer)
('do-0521a','GLUC_MOD',0,'dp-2026-05-21'),('do-0521b','VIANDE_BLANCHE',1,'dp-2026-05-21'),
-- 22 mai (Jeu) pré-match
('do-0522a','GLUC_HAUT',0,'dp-2026-05-22'),('do-0522b','PROT_BON',1,'dp-2026-05-22'),
-- 23 mai (Ven)
('do-0523a','ANTI_INFLAM',0,'dp-2026-05-23'),('do-0523b','ANTIOXYDANT',1,'dp-2026-05-23'),
-- 24 mai (Sam) MATCH
('do-0524a','GROSSE_MAT',0,'dp-2026-05-24'),('do-0524b','GLUC_HAUT',1,'dp-2026-05-24'),
-- 25 mai (Dim)
('do-0525a','ANTI_INFLAM',0,'dp-2026-05-25'),
-- 26 mai (Lun)
('do-0526a','GLUC_HAUT',0,'dp-2026-05-26'),('do-0526b','PROT_BON',1,'dp-2026-05-26'),
-- 27 mai (Mar)
('do-0527a','ANTI_INFLAM',0,'dp-2026-05-27'),('do-0527b','PROT_MAIGRE',1,'dp-2026-05-27'),
-- 28 mai (Mer)
('do-0528a','GLUC_MOD',0,'dp-2026-05-28'),('do-0528b','VIANDE_BLANCHE',1,'dp-2026-05-28'),
-- 29 mai (Jeu) pré-match
('do-0529a','GLUC_HAUT',0,'dp-2026-05-29'),('do-0529b','PROT_BON',1,'dp-2026-05-29'),
-- 30 mai (Ven)
('do-0530a','ANTI_INFLAM',0,'dp-2026-05-30'),('do-0530b','ANTIOXYDANT',1,'dp-2026-05-30'),
-- 31 mai (Sam) MATCH
('do-0531a','GROSSE_MAT',0,'dp-2026-05-31'),('do-0531b','GLUC_HAUT',1,'dp-2026-05-31')
ON CONFLICT ("id") DO NOTHING;

-- ════════════════════════════════════════
-- 4. Menus journaliers
-- ════════════════════════════════════════
INSERT INTO "DayMenu" ("id","dayPlanId","createdAt","updatedAt") VALUES
('dm-0501','dp-2026-05-01',NOW(),NOW()),
('dm-0502','dp-2026-05-02',NOW(),NOW()),
('dm-0503','dp-2026-05-03',NOW(),NOW()),
('dm-0504','dp-2026-05-04',NOW(),NOW()),
('dm-0505','dp-2026-05-05',NOW(),NOW()),
('dm-0506','dp-2026-05-06',NOW(),NOW()),
('dm-0507','dp-2026-05-07',NOW(),NOW()),
('dm-0508','dp-2026-05-08',NOW(),NOW()),
('dm-0509','dp-2026-05-09',NOW(),NOW()),
('dm-0510','dp-2026-05-10',NOW(),NOW()),
('dm-0511','dp-2026-05-11',NOW(),NOW()),
('dm-0512','dp-2026-05-12',NOW(),NOW()),
('dm-0513','dp-2026-05-13',NOW(),NOW()),
('dm-0514','dp-2026-05-14',NOW(),NOW()),
('dm-0515','dp-2026-05-15',NOW(),NOW()),
('dm-0516','dp-2026-05-16',NOW(),NOW()),
('dm-0517','dp-2026-05-17',NOW(),NOW()),
('dm-0518','dp-2026-05-18',NOW(),NOW()),
('dm-0519','dp-2026-05-19',NOW(),NOW()),
('dm-0520','dp-2026-05-20',NOW(),NOW()),
('dm-0521','dp-2026-05-21',NOW(),NOW()),
('dm-0522','dp-2026-05-22',NOW(),NOW()),
('dm-0523','dp-2026-05-23',NOW(),NOW()),
('dm-0524','dp-2026-05-24',NOW(),NOW()),
('dm-0525','dp-2026-05-25',NOW(),NOW()),
('dm-0526','dp-2026-05-26',NOW(),NOW()),
('dm-0527','dp-2026-05-27',NOW(),NOW()),
('dm-0528','dp-2026-05-28',NOW(),NOW()),
('dm-0529','dp-2026-05-29',NOW(),NOW()),
('dm-0530','dp-2026-05-30',NOW(),NOW()),
('dm-0531','dp-2026-05-31',NOW(),NOW())
ON CONFLICT ("id") DO NOTHING;

-- ════════════════════════════════════════
-- 5. Options de menu (entrées + plats + desserts)
-- Desserts utilisés :
--   recipe-dessert-01 : Compote pomme-cannelle      (récup)
--   recipe-dessert-02 : Yaourt grec fruits rouges   (entraînement)
--   recipe-dessert-03 : Gâteau de riz vanillé       (pré-match / match)
--   recipe-dessert-04 : Brownies protéinés           (haute intensité)
--   recipe-dessert-05 : Mousse banane cacao          (récup légère)
--   recipe-dessert-06 : Tarte aux pommes             (match day)
-- ════════════════════════════════════════
INSERT INTO "MenuOption" ("id","category","available","sortOrder","dayMenuId","recipeId") VALUES

-- ─── 01 mai (Jeu) pré-match ───
('mo-0501-s1','STARTER',true,0,'dm-0501','md-s2'),
('mo-0501-s2','STARTER',true,1,'dm-0501','std-s1'),
('mo-0501-m1','MAIN',true,0,'dm-0501','md-m1'),
('mo-0501-m2','MAIN',true,1,'dm-0501','std-m3'),
('mo-0501-d1','DESSERT',true,0,'dm-0501','recipe-dessert-03'),

-- ─── 02 mai (Ven) veille match ───
('mo-0502-s1','STARTER',true,0,'dm-0502','ai-s2'),
('mo-0502-m1','MAIN',true,0,'dm-0502','ai-m1'),
('mo-0502-m2','MAIN',true,1,'dm-0502','ai-m3'),
('mo-0502-d1','DESSERT',true,0,'dm-0502','recipe-dessert-01'),

-- ─── 03 mai (Sam) MATCH ───
('mo-0503-s1','STARTER',true,0,'dm-0503','md-s1'),
('mo-0503-s2','STARTER',true,1,'dm-0503','md-s2'),
('mo-0503-m1','MAIN',true,0,'dm-0503','md-m1'),
('mo-0503-m2','MAIN',true,1,'dm-0503','md-m2'),
('mo-0503-d1','DESSERT',true,0,'dm-0503','recipe-dessert-06'),
('mo-0503-d2','DESSERT',true,1,'dm-0503','recipe-dessert-03'),

-- ─── 04 mai (Dim) récupération ───
('mo-0504-s1','STARTER',true,0,'dm-0504','ai-s3'),
('mo-0504-m1','MAIN',true,0,'dm-0504','ai-m2'),
('mo-0504-d1','DESSERT',true,0,'dm-0504','recipe-dessert-05'),

-- ─── 05 mai (Lun) entraînement standard ───
('mo-0505-s1','STARTER',true,0,'dm-0505','std-s1'),
('mo-0505-s2','STARTER',true,1,'dm-0505','std-s2'),
('mo-0505-m1','MAIN',true,0,'dm-0505','std-m1'),
('mo-0505-m2','MAIN',true,1,'dm-0505','std-m2'),
('mo-0505-d1','DESSERT',true,0,'dm-0505','recipe-dessert-02'),
('mo-0505-d2','DESSERT',true,1,'dm-0505','recipe-dessert-04'),

-- ─── 06 mai (Mar) récup légère ───
('mo-0506-s1','STARTER',true,0,'dm-0506','ai-s1'),
('mo-0506-s2','STARTER',true,1,'dm-0506','ai-s2'),
('mo-0506-m1','MAIN',true,0,'dm-0506','ai-m1'),
('mo-0506-m2','MAIN',true,1,'dm-0506','ai-m2'),
('mo-0506-d1','DESSERT',true,0,'dm-0506','recipe-dessert-01'),

-- ─── 07 mai (Mer) technique intensif ───
('mo-0507-s1','STARTER',true,0,'dm-0507','std-s2'),
('mo-0507-s2','STARTER',true,1,'dm-0507','std-s3'),
('mo-0507-m1','MAIN',true,0,'dm-0507','std-m2'),
('mo-0507-m2','MAIN',true,1,'dm-0507','std-m3'),
('mo-0507-d1','DESSERT',true,0,'dm-0507','recipe-dessert-04'),
('mo-0507-d2','DESSERT',true,1,'dm-0507','recipe-dessert-02'),

-- ─── 08 mai (Jeu) pré-match ───
('mo-0508-s1','STARTER',true,0,'dm-0508','md-s1'),
('mo-0508-s2','STARTER',true,1,'dm-0508','md-s3'),
('mo-0508-m1','MAIN',true,0,'dm-0508','md-m1'),
('mo-0508-m2','MAIN',true,1,'dm-0508','md-m3'),
('mo-0508-d1','DESSERT',true,0,'dm-0508','recipe-dessert-03'),

-- ─── 09 mai (Ven) veille match ───
('mo-0509-s1','STARTER',true,0,'dm-0509','ai-s1'),
('mo-0509-m1','MAIN',true,0,'dm-0509','ai-m3'),
('mo-0509-d1','DESSERT',true,0,'dm-0509','recipe-dessert-05'),

-- ─── 10 mai (Sam) MATCH ───
('mo-0510-s1','STARTER',true,0,'dm-0510','md-s2'),
('mo-0510-s2','STARTER',true,1,'dm-0510','md-s3'),
('mo-0510-m1','MAIN',true,0,'dm-0510','md-m2'),
('mo-0510-m2','MAIN',true,1,'dm-0510','md-m3'),
('mo-0510-d1','DESSERT',true,0,'dm-0510','recipe-dessert-06'),
('mo-0510-d2','DESSERT',true,1,'dm-0510','recipe-dessert-03'),

-- ─── 11 mai (Dim) récupération ───
('mo-0511-s1','STARTER',true,0,'dm-0511','ai-s2'),
('mo-0511-m1','MAIN',true,0,'dm-0511','ai-m1'),
('mo-0511-d1','DESSERT',true,0,'dm-0511','recipe-dessert-01'),

-- ─── 12 mai (Lun) entraînement standard ───
('mo-0512-s1','STARTER',true,0,'dm-0512','std-s3'),
('mo-0512-s2','STARTER',true,1,'dm-0512','std-s1'),
('mo-0512-m1','MAIN',true,0,'dm-0512','std-m1'),
('mo-0512-m2','MAIN',true,1,'dm-0512','std-m3'),
('mo-0512-d1','DESSERT',true,0,'dm-0512','recipe-dessert-04'),
('mo-0512-d2','DESSERT',true,1,'dm-0512','recipe-dessert-02'),

-- ─── 13 mai (Mar) récup ───
('mo-0513-s1','STARTER',true,0,'dm-0513','ai-s3'),
('mo-0513-s2','STARTER',true,1,'dm-0513','ai-s1'),
('mo-0513-m1','MAIN',true,0,'dm-0513','ai-m2'),
('mo-0513-m2','MAIN',true,1,'dm-0513','ai-m3'),
('mo-0513-d1','DESSERT',true,0,'dm-0513','recipe-dessert-05'),

-- ─── 14 mai (Mer) technique ───
('mo-0514-s1','STARTER',true,0,'dm-0514','std-s1'),
('mo-0514-s2','STARTER',true,1,'dm-0514','md-s3'),
('mo-0514-m1','MAIN',true,0,'dm-0514','std-m2'),
('mo-0514-m2','MAIN',true,1,'dm-0514','md-m2'),
('mo-0514-d1','DESSERT',true,0,'dm-0514','recipe-dessert-02'),
('mo-0514-d2','DESSERT',true,1,'dm-0514','recipe-dessert-04'),

-- ─── 15 mai (Jeu) pré-match ───
('mo-0515-s1','STARTER',true,0,'dm-0515','md-s2'),
('mo-0515-s2','STARTER',true,1,'dm-0515','std-s2'),
('mo-0515-m1','MAIN',true,0,'dm-0515','md-m1'),
('mo-0515-m2','MAIN',true,1,'dm-0515','std-m1'),
('mo-0515-d1','DESSERT',true,0,'dm-0515','recipe-dessert-03'),

-- ─── 16 mai (Ven) veille match ───
('mo-0516-s1','STARTER',true,0,'dm-0516','ai-s2'),
('mo-0516-s2','STARTER',true,1,'dm-0516','ai-s3'),
('mo-0516-m1','MAIN',true,0,'dm-0516','ai-m1'),
('mo-0516-d1','DESSERT',true,0,'dm-0516','recipe-dessert-01'),

-- ─── 17 mai (Sam) MATCH ───
('mo-0517-s1','STARTER',true,0,'dm-0517','md-s1'),
('mo-0517-s2','STARTER',true,1,'dm-0517','md-s2'),
('mo-0517-m1','MAIN',true,0,'dm-0517','md-m1'),
('mo-0517-m2','MAIN',true,1,'dm-0517','md-m3'),
('mo-0517-d1','DESSERT',true,0,'dm-0517','recipe-dessert-06'),
('mo-0517-d2','DESSERT',true,1,'dm-0517','recipe-dessert-03'),

-- ─── 18 mai (Dim) récupération ───
('mo-0518-s1','STARTER',true,0,'dm-0518','ai-s1'),
('mo-0518-m1','MAIN',true,0,'dm-0518','ai-m2'),
('mo-0518-d1','DESSERT',true,0,'dm-0518','recipe-dessert-05'),

-- ─── 19 mai (Lun) entraînement modéré ───
('mo-0519-s1','STARTER',true,0,'dm-0519','std-s2'),
('mo-0519-s2','STARTER',true,1,'dm-0519','std-s3'),
('mo-0519-m1','MAIN',true,0,'dm-0519','std-m2'),
('mo-0519-m2','MAIN',true,1,'dm-0519','std-m1'),
('mo-0519-d1','DESSERT',true,0,'dm-0519','recipe-dessert-02'),
('mo-0519-d2','DESSERT',true,1,'dm-0519','recipe-dessert-04'),

-- ─── 20 mai (Mar) cardio anti-inflam ───
('mo-0520-s1','STARTER',true,0,'dm-0520','ai-s2'),
('mo-0520-m1','MAIN',true,0,'dm-0520','ai-m3'),
('mo-0520-d1','DESSERT',true,0,'dm-0520','recipe-dessert-01'),

-- ─── 21 mai (Mer) technique intensif ───
('mo-0521-s1','STARTER',true,0,'dm-0521','std-s1'),
('mo-0521-s2','STARTER',true,1,'dm-0521','std-s2'),
('mo-0521-m1','MAIN',true,0,'dm-0521','std-m3'),
('mo-0521-m2','MAIN',true,1,'dm-0521','std-m1'),
('mo-0521-d1','DESSERT',true,0,'dm-0521','recipe-dessert-04'),
('mo-0521-d2','DESSERT',true,1,'dm-0521','recipe-dessert-02'),

-- ─── 22 mai (Jeu) pré-match ───
('mo-0522-s1','STARTER',true,0,'dm-0522','md-s3'),
('mo-0522-s2','STARTER',true,1,'dm-0522','md-s1'),
('mo-0522-m1','MAIN',true,0,'dm-0522','md-m2'),
('mo-0522-m2','MAIN',true,1,'dm-0522','md-m1'),
('mo-0522-d1','DESSERT',true,0,'dm-0522','recipe-dessert-03'),

-- ─── 23 mai (Ven) veille match ───
('mo-0523-s1','STARTER',true,0,'dm-0523','ai-s1'),
('mo-0523-s2','STARTER',true,1,'dm-0523','ai-s3'),
('mo-0523-m1','MAIN',true,0,'dm-0523','ai-m1'),
('mo-0523-m2','MAIN',true,1,'dm-0523','ai-m2'),
('mo-0523-d1','DESSERT',true,0,'dm-0523','recipe-dessert-05'),

-- ─── 24 mai (Sam) MATCH ───
('mo-0524-s1','STARTER',true,0,'dm-0524','md-s1'),
('mo-0524-s2','STARTER',true,1,'dm-0524','md-s3'),
('mo-0524-m1','MAIN',true,0,'dm-0524','md-m1'),
('mo-0524-m2','MAIN',true,1,'dm-0524','md-m2'),
('mo-0524-d1','DESSERT',true,0,'dm-0524','recipe-dessert-06'),
('mo-0524-d2','DESSERT',true,1,'dm-0524','recipe-dessert-03'),

-- ─── 25 mai (Dim) récupération ───
('mo-0525-s1','STARTER',true,0,'dm-0525','ai-s2'),
('mo-0525-m1','MAIN',true,0,'dm-0525','ai-m3'),
('mo-0525-d1','DESSERT',true,0,'dm-0525','recipe-dessert-01'),

-- ─── 26 mai (Lun) reprise standard ───
('mo-0526-s1','STARTER',true,0,'dm-0526','std-s1'),
('mo-0526-s2','STARTER',true,1,'dm-0526','std-s3'),
('mo-0526-m1','MAIN',true,0,'dm-0526','std-m1'),
('mo-0526-m2','MAIN',true,1,'dm-0526','std-m2'),
('mo-0526-d1','DESSERT',true,0,'dm-0526','recipe-dessert-02'),
('mo-0526-d2','DESSERT',true,1,'dm-0526','recipe-dessert-04'),

-- ─── 27 mai (Mar) récup légère ───
('mo-0527-s1','STARTER',true,0,'dm-0527','ai-s3'),
('mo-0527-s2','STARTER',true,1,'dm-0527','ai-s1'),
('mo-0527-m1','MAIN',true,0,'dm-0527','ai-m1'),
('mo-0527-m2','MAIN',true,1,'dm-0527','ai-m3'),
('mo-0527-d1','DESSERT',true,0,'dm-0527','recipe-dessert-05'),

-- ─── 28 mai (Mer) technique ───
('mo-0528-s1','STARTER',true,0,'dm-0528','std-s2'),
('mo-0528-s2','STARTER',true,1,'dm-0528','md-s3'),
('mo-0528-m1','MAIN',true,0,'dm-0528','std-m2'),
('mo-0528-m2','MAIN',true,1,'dm-0528','md-m2'),
('mo-0528-d1','DESSERT',true,0,'dm-0528','recipe-dessert-04'),
('mo-0528-d2','DESSERT',true,1,'dm-0528','recipe-dessert-02'),

-- ─── 29 mai (Jeu) pré-match ───
('mo-0529-s1','STARTER',true,0,'dm-0529','md-s2'),
('mo-0529-s2','STARTER',true,1,'dm-0529','std-s1'),
('mo-0529-m1','MAIN',true,0,'dm-0529','md-m1'),
('mo-0529-m2','MAIN',true,1,'dm-0529','std-m3'),
('mo-0529-d1','DESSERT',true,0,'dm-0529','recipe-dessert-03'),

-- ─── 30 mai (Ven) veille match ───
('mo-0530-s1','STARTER',true,0,'dm-0530','ai-s1'),
('mo-0530-s2','STARTER',true,1,'dm-0530','ai-s2'),
('mo-0530-m1','MAIN',true,0,'dm-0530','ai-m2'),
('mo-0530-d1','DESSERT',true,0,'dm-0530','recipe-dessert-01'),

-- ─── 31 mai (Sam) MATCH ───
('mo-0531-s1','STARTER',true,0,'dm-0531','md-s1'),
('mo-0531-s2','STARTER',true,1,'dm-0531','md-s2'),
('mo-0531-m1','MAIN',true,0,'dm-0531','md-m1'),
('mo-0531-m2','MAIN',true,1,'dm-0531','md-m3'),
('mo-0531-d1','DESSERT',true,0,'dm-0531','recipe-dessert-06'),
('mo-0531-d2','DESSERT',true,1,'dm-0531','recipe-dessert-03')

ON CONFLICT ("id") DO NOTHING;
