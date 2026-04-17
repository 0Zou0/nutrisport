-- ─────────────────────────────────────────────────────────────────
-- NutriSport — Données virtuelles Avril 2026 (jours 6 → 30)
-- Les jours 1→5 sont déjà dans seed.sql
-- Cycle rugby réaliste : 2 matchs/semaine, séances Lun-Jeu, récup Ven
-- ─────────────────────────────────────────────────────────────────

-- ════════════════════════════════════════
-- 1. DayPlans
-- ════════════════════════════════════════
INSERT INTO "DayPlan" ("id","date","seasonId","createdById","createdAt","updatedAt") VALUES
('dp-2026-04-06','2026-04-06','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-07','2026-04-07','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-08','2026-04-08','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-09','2026-04-09','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-10','2026-04-10','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-11','2026-04-11','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-12','2026-04-12','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-13','2026-04-13','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-14','2026-04-14','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-15','2026-04-15','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-16','2026-04-16','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-17','2026-04-17','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-18','2026-04-18','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-19','2026-04-19','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-20','2026-04-20','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-21','2026-04-21','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-22','2026-04-22','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-23','2026-04-23','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-24','2026-04-24','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-25','2026-04-25','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-26','2026-04-26','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-27','2026-04-27','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-28','2026-04-28','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-29','2026-04-29','season-2025-2026','user-nutri',NOW(),NOW()),
('dp-2026-04-30','2026-04-30','season-2025-2026','user-nutri',NOW(),NOW())
ON CONFLICT ("id") DO NOTHING;

-- ════════════════════════════════════════
-- 2. Séances d'entraînement
-- Cycle hebdomadaire :
--   Lun : Muscu HIGH + Rugby MODERATE
--   Mar : Cardio MODERATE + Repos LOW
--   Mer : Mobilité LOW + Rugby HIGH
--   Jeu : Muscu HIGH + Rugby HIGH (veille match)
--   Ven : Récupération LOW
--   Sam : Match HIGH
--   Dim : pas de séance (récup totale)
-- ════════════════════════════════════════
INSERT INTO "TrainingSession" ("id","slot","type","intensity","durationMin","dayPlanId") VALUES
-- Semaine 6–12 avr
('ts-0406a','MORNING','Musculation','HIGH',80,'dp-2026-04-06'),
('ts-0406b','AFTERNOON','Rugby — séance collective','MODERATE',90,'dp-2026-04-06'),
('ts-0407a','MORNING','Cardio','MODERATE',50,'dp-2026-04-07'),
('ts-0407b','AFTERNOON','Repos','LOW',NULL,'dp-2026-04-07'),
('ts-0408a','MORNING','Mobilité','LOW',40,'dp-2026-04-08'),
('ts-0408b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-04-08'),
('ts-0409a','MORNING','Musculation','HIGH',75,'dp-2026-04-09'),
('ts-0409b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-04-09'),
('ts-0410a','MORNING','Récupération','LOW',30,'dp-2026-04-10'),
('ts-0411a','AFTERNOON','Match','HIGH',80,'dp-2026-04-11'),
-- Semaine 13–19 avr
('ts-0413a','MORNING','Musculation','HIGH',80,'dp-2026-04-13'),
('ts-0413b','AFTERNOON','Rugby — séance collective','MODERATE',85,'dp-2026-04-13'),
('ts-0414a','MORNING','Cardio','MODERATE',45,'dp-2026-04-14'),
('ts-0414b','AFTERNOON','Repos','LOW',NULL,'dp-2026-04-14'),
('ts-0415a','MORNING','Mobilité','LOW',40,'dp-2026-04-15'),
('ts-0415b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-04-15'),
('ts-0416a','MORNING','Musculation','HIGH',80,'dp-2026-04-16'),
('ts-0416b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-04-16'),
('ts-0417a','MORNING','Récupération active','LOW',35,'dp-2026-04-17'),
('ts-0418a','AFTERNOON','Match','HIGH',80,'dp-2026-04-18'),
-- Semaine 20–26 avr
('ts-0420a','MORNING','Musculation','MODERATE',70,'dp-2026-04-20'),
('ts-0420b','AFTERNOON','Rugby — séance collective','MODERATE',85,'dp-2026-04-20'),
('ts-0421a','MORNING','Cardio','MODERATE',50,'dp-2026-04-21'),
('ts-0422a','MORNING','Mobilité','LOW',40,'dp-2026-04-22'),
('ts-0422b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-04-22'),
('ts-0423a','MORNING','Musculation','HIGH',80,'dp-2026-04-23'),
('ts-0423b','AFTERNOON','Rugby — séance collective','HIGH',95,'dp-2026-04-23'),
('ts-0424a','MORNING','Récupération','LOW',30,'dp-2026-04-24'),
('ts-0425a','AFTERNOON','Match','HIGH',80,'dp-2026-04-25'),
-- Semaine 27–30 avr
('ts-0427a','MORNING','Musculation','HIGH',75,'dp-2026-04-27'),
('ts-0427b','AFTERNOON','Rugby — séance collective','MODERATE',90,'dp-2026-04-27'),
('ts-0428a','MORNING','Cardio','MODERATE',45,'dp-2026-04-28'),
('ts-0428b','AFTERNOON','Repos','LOW',NULL,'dp-2026-04-28'),
('ts-0429a','MORNING','Mobilité','LOW',40,'dp-2026-04-29'),
('ts-0429b','AFTERNOON','Rugby — séance collective','HIGH',90,'dp-2026-04-29'),
('ts-0430a','MORNING','Musculation','MODERATE',70,'dp-2026-04-30'),
('ts-0430b','AFTERNOON','Rugby — séance collective','MODERATE',80,'dp-2026-04-30')
ON CONFLICT ("id") DO NOTHING;

-- ════════════════════════════════════════
-- 3. Orientations nutritionnelles
-- Lun (gros entraînement) : GLUC_HAUT + PROT_BON
-- Mar (récup légère)      : ANTI_INFLAM + PROT_MAIGRE
-- Mer (tech + intensif)   : GLUC_MOD + VIANDE_BLANCHE
-- Jeu (double haute inten): GLUC_HAUT + PROT_BON
-- Ven (veille match/récup): ANTI_INFLAM + ANTIOXYDANT
-- Sam (jour match)        : GROSSE_MAT + GLUC_HAUT
-- Dim (récup totale)      : ANTI_INFLAM
-- ════════════════════════════════════════
INSERT INTO "DayOrientation" ("id","orientation","priority","dayPlanId") VALUES
-- Semaine 6–12 avr
('do-0406a','GLUC_HAUT',0,'dp-2026-04-06'),('do-0406b','PROT_BON',1,'dp-2026-04-06'),
('do-0407a','ANTI_INFLAM',0,'dp-2026-04-07'),('do-0407b','PROT_MAIGRE',1,'dp-2026-04-07'),
('do-0408a','GLUC_MOD',0,'dp-2026-04-08'),('do-0408b','VIANDE_BLANCHE',1,'dp-2026-04-08'),
('do-0409a','GLUC_HAUT',0,'dp-2026-04-09'),('do-0409b','PROT_BON',1,'dp-2026-04-09'),
('do-0410a','ANTI_INFLAM',0,'dp-2026-04-10'),('do-0410b','ANTIOXYDANT',1,'dp-2026-04-10'),
('do-0411a','GROSSE_MAT',0,'dp-2026-04-11'),('do-0411b','GLUC_HAUT',1,'dp-2026-04-11'),
('do-0412a','ANTI_INFLAM',0,'dp-2026-04-12'),
-- Semaine 13–19 avr
('do-0413a','GLUC_HAUT',0,'dp-2026-04-13'),('do-0413b','PROT_BON',1,'dp-2026-04-13'),
('do-0414a','ANTI_INFLAM',0,'dp-2026-04-14'),('do-0414b','PROT_MAIGRE',1,'dp-2026-04-14'),
('do-0415a','GLUC_MOD',0,'dp-2026-04-15'),('do-0415b','VIANDE_BLANCHE',1,'dp-2026-04-15'),
('do-0416a','GLUC_HAUT',0,'dp-2026-04-16'),('do-0416b','PROT_BON',1,'dp-2026-04-16'),
('do-0417a','ANTI_INFLAM',0,'dp-2026-04-17'),('do-0417b','ANTIOXYDANT',1,'dp-2026-04-17'),
('do-0418a','GROSSE_MAT',0,'dp-2026-04-18'),('do-0418b','GLUC_HAUT',1,'dp-2026-04-18'),
('do-0419a','ANTI_INFLAM',0,'dp-2026-04-19'),
-- Semaine 20–26 avr
('do-0420a','GLUC_HAUT',0,'dp-2026-04-20'),('do-0420b','PROT_BON',1,'dp-2026-04-20'),
('do-0421a','ANTI_INFLAM',0,'dp-2026-04-21'),('do-0421b','PROT_MAIGRE',1,'dp-2026-04-21'),
('do-0422a','GLUC_MOD',0,'dp-2026-04-22'),('do-0422b','VIANDE_BLANCHE',1,'dp-2026-04-22'),
('do-0423a','GLUC_HAUT',0,'dp-2026-04-23'),('do-0423b','PROT_BON',1,'dp-2026-04-23'),
('do-0424a','ANTI_INFLAM',0,'dp-2026-04-24'),('do-0424b','ANTIOXYDANT',1,'dp-2026-04-24'),
('do-0425a','GROSSE_MAT',0,'dp-2026-04-25'),('do-0425b','GLUC_HAUT',1,'dp-2026-04-25'),
('do-0426a','ANTI_INFLAM',0,'dp-2026-04-26'),
-- Semaine 27–30 avr
('do-0427a','GLUC_HAUT',0,'dp-2026-04-27'),('do-0427b','PROT_BON',1,'dp-2026-04-27'),
('do-0428a','ANTI_INFLAM',0,'dp-2026-04-28'),('do-0428b','PROT_MAIGRE',1,'dp-2026-04-28'),
('do-0429a','GLUC_MOD',0,'dp-2026-04-29'),('do-0429b','VIANDE_BLANCHE',1,'dp-2026-04-29'),
('do-0430a','GLUC_MOD',0,'dp-2026-04-30'),('do-0430b','PROT_BON',1,'dp-2026-04-30')
ON CONFLICT ("id") DO NOTHING;

-- ════════════════════════════════════════
-- 4. Menus journaliers
-- ════════════════════════════════════════
INSERT INTO "DayMenu" ("id","dayPlanId","createdAt","updatedAt") VALUES
('dm-0406','dp-2026-04-06',NOW(),NOW()),
('dm-0407','dp-2026-04-07',NOW(),NOW()),
('dm-0408','dp-2026-04-08',NOW(),NOW()),
('dm-0409','dp-2026-04-09',NOW(),NOW()),
('dm-0410','dp-2026-04-10',NOW(),NOW()),
('dm-0411','dp-2026-04-11',NOW(),NOW()),
('dm-0412','dp-2026-04-12',NOW(),NOW()),
('dm-0413','dp-2026-04-13',NOW(),NOW()),
('dm-0414','dp-2026-04-14',NOW(),NOW()),
('dm-0415','dp-2026-04-15',NOW(),NOW()),
('dm-0416','dp-2026-04-16',NOW(),NOW()),
('dm-0417','dp-2026-04-17',NOW(),NOW()),
('dm-0418','dp-2026-04-18',NOW(),NOW()),
('dm-0419','dp-2026-04-19',NOW(),NOW()),
('dm-0420','dp-2026-04-20',NOW(),NOW()),
('dm-0421','dp-2026-04-21',NOW(),NOW()),
('dm-0422','dp-2026-04-22',NOW(),NOW()),
('dm-0423','dp-2026-04-23',NOW(),NOW()),
('dm-0424','dp-2026-04-24',NOW(),NOW()),
('dm-0425','dp-2026-04-25',NOW(),NOW()),
('dm-0426','dp-2026-04-26',NOW(),NOW()),
('dm-0427','dp-2026-04-27',NOW(),NOW()),
('dm-0428','dp-2026-04-28',NOW(),NOW()),
('dm-0429','dp-2026-04-29',NOW(),NOW()),
('dm-0430','dp-2026-04-30',NOW(),NOW())
ON CONFLICT ("id") DO NOTHING;

-- ════════════════════════════════════════
-- 5. Options de menu
-- Jours entraînement standard (Lun/Mer) : recettes std
-- Jours anti-inflam (Mar/Ven/Dim)       : recettes ai
-- Jours match (Sam)                      : recettes md
-- Jours pré-match (Jeu)                  : recettes md + std
-- ════════════════════════════════════════
INSERT INTO "MenuOption" ("id","category","available","sortOrder","dayMenuId","recipeId") VALUES

-- ─── 6 avr (Lun) — entraînement standard ───
('mo-0406-s1','STARTER',true,0,'dm-0406','std-s1'),
('mo-0406-s2','STARTER',true,1,'dm-0406','std-s2'),
('mo-0406-m1','MAIN',true,0,'dm-0406','std-m1'),
('mo-0406-m2','MAIN',true,1,'dm-0406','std-m2'),

-- ─── 7 avr (Mar) — récup / anti-inflam ───
('mo-0407-s1','STARTER',true,0,'dm-0407','ai-s1'),
('mo-0407-s2','STARTER',true,1,'dm-0407','ai-s3'),
('mo-0407-m1','MAIN',true,0,'dm-0407','ai-m1'),
('mo-0407-m2','MAIN',true,1,'dm-0407','ai-m2'),

-- ─── 8 avr (Mer) — technique / standard ───
('mo-0408-s1','STARTER',true,0,'dm-0408','std-s1'),
('mo-0408-s2','STARTER',true,1,'dm-0408','std-s3'),
('mo-0408-m1','MAIN',true,0,'dm-0408','std-m1'),
('mo-0408-m2','MAIN',true,1,'dm-0408','std-m3'),

-- ─── 9 avr (Jeu) — haute intensité pré-match ───
('mo-0409-s1','STARTER',true,0,'dm-0409','md-s2'),
('mo-0409-s2','STARTER',true,1,'dm-0409','std-s1'),
('mo-0409-m1','MAIN',true,0,'dm-0409','md-m1'),
('mo-0409-m2','MAIN',true,1,'dm-0409','std-m3'),

-- ─── 10 avr (Ven) — veille match / anti-inflam ───
('mo-0410-s1','STARTER',true,0,'dm-0410','ai-s2'),
('mo-0410-m1','MAIN',true,0,'dm-0410','ai-m1'),
('mo-0410-m2','MAIN',true,1,'dm-0410','ai-m3'),

-- ─── 11 avr (Sam) — MATCH ───
('mo-0411-s1','STARTER',true,0,'dm-0411','md-s1'),
('mo-0411-s2','STARTER',true,1,'dm-0411','md-s2'),
('mo-0411-m1','MAIN',true,0,'dm-0411','md-m1'),
('mo-0411-m2','MAIN',true,1,'dm-0411','md-m2'),

-- ─── 12 avr (Dim) — récupération ───
('mo-0412-s1','STARTER',true,0,'dm-0412','ai-s3'),
('mo-0412-m1','MAIN',true,0,'dm-0412','ai-m2'),

-- ─── 13 avr (Lun) — entraînement standard ───
('mo-0413-s1','STARTER',true,0,'dm-0413','std-s2'),
('mo-0413-s2','STARTER',true,1,'dm-0413','std-s3'),
('mo-0413-m1','MAIN',true,0,'dm-0413','std-m1'),
('mo-0413-m2','MAIN',true,1,'dm-0413','std-m2'),

-- ─── 14 avr (Mar) — récup / anti-inflam ───
('mo-0414-s1','STARTER',true,0,'dm-0414','ai-s1'),
('mo-0414-s2','STARTER',true,1,'dm-0414','ai-s2'),
('mo-0414-m1','MAIN',true,0,'dm-0414','ai-m2'),
('mo-0414-m2','MAIN',true,1,'dm-0414','ai-m3'),

-- ─── 15 avr (Mer) — technique ───
('mo-0415-s1','STARTER',true,0,'dm-0415','std-s1'),
('mo-0415-s2','STARTER',true,1,'dm-0415','md-s3'),
('mo-0415-m1','MAIN',true,0,'dm-0415','std-m2'),
('mo-0415-m2','MAIN',true,1,'dm-0415','md-m2'),

-- ─── 16 avr (Jeu) — haute intensité pré-match ───
('mo-0416-s1','STARTER',true,0,'dm-0416','md-s1'),
('mo-0416-s2','STARTER',true,1,'dm-0416','std-s2'),
('mo-0416-m1','MAIN',true,0,'dm-0416','md-m1'),
('mo-0416-m2','MAIN',true,1,'dm-0416','std-m3'),

-- ─── 17 avr (Ven) — veille match ───
('mo-0417-s1','STARTER',true,0,'dm-0417','ai-s1'),
('mo-0417-m1','MAIN',true,0,'dm-0417','ai-m1'),
('mo-0417-m2','MAIN',true,1,'dm-0417','ai-m2'),

-- ─── 18 avr (Sam) — MATCH ───
('mo-0418-s1','STARTER',true,0,'dm-0418','md-s1'),
('mo-0418-s2','STARTER',true,1,'dm-0418','md-s3'),
('mo-0418-m1','MAIN',true,0,'dm-0418','md-m1'),
('mo-0418-m2','MAIN',true,1,'dm-0418','md-m3'),

-- ─── 19 avr (Dim) — récupération ───
('mo-0419-s1','STARTER',true,0,'dm-0419','ai-s3'),
('mo-0419-m1','MAIN',true,0,'dm-0419','ai-m3'),

-- ─── 20 avr (Lun) — entraînement modéré ───
('mo-0420-s1','STARTER',true,0,'dm-0420','std-s3'),
('mo-0420-s2','STARTER',true,1,'dm-0420','std-s1'),
('mo-0420-m1','MAIN',true,0,'dm-0420','std-m2'),
('mo-0420-m2','MAIN',true,1,'dm-0420','std-m1'),

-- ─── 21 avr (Mar) — cardio / anti-inflam ───
('mo-0421-s1','STARTER',true,0,'dm-0421','ai-s2'),
('mo-0421-m1','MAIN',true,0,'dm-0421','ai-m1'),

-- ─── 22 avr (Mer) — technique intensif ───
('mo-0422-s1','STARTER',true,0,'dm-0422','std-s1'),
('mo-0422-s2','STARTER',true,1,'dm-0422','std-s2'),
('mo-0422-m1','MAIN',true,0,'dm-0422','std-m1'),
('mo-0422-m2','MAIN',true,1,'dm-0422','std-m3'),

-- ─── 23 avr (Jeu) — haute intensité pré-match ───
('mo-0423-s1','STARTER',true,0,'dm-0423','md-s2'),
('mo-0423-s2','STARTER',true,1,'dm-0423','md-s3'),
('mo-0423-m1','MAIN',true,0,'dm-0423','md-m1'),
('mo-0423-m2','MAIN',true,1,'dm-0423','md-m2'),

-- ─── 24 avr (Ven) — veille match ───
('mo-0424-s1','STARTER',true,0,'dm-0424','ai-s1'),
('mo-0424-s2','STARTER',true,1,'dm-0424','ai-s3'),
('mo-0424-m1','MAIN',true,0,'dm-0424','ai-m2'),
('mo-0424-m2','MAIN',true,1,'dm-0424','ai-m3'),

-- ─── 25 avr (Sam) — MATCH ───
('mo-0425-s1','STARTER',true,0,'dm-0425','md-s1'),
('mo-0425-s2','STARTER',true,1,'dm-0425','md-s2'),
('mo-0425-m1','MAIN',true,0,'dm-0425','md-m1'),
('mo-0425-m2','MAIN',true,1,'dm-0425','md-m3'),

-- ─── 26 avr (Dim) — récupération ───
('mo-0426-s1','STARTER',true,0,'dm-0426','ai-s1'),
('mo-0426-m1','MAIN',true,0,'dm-0426','ai-m2'),

-- ─── 27 avr (Lun) — reprise standard ───
('mo-0427-s1','STARTER',true,0,'dm-0427','std-s1'),
('mo-0427-s2','STARTER',true,1,'dm-0427','std-s3'),
('mo-0427-m1','MAIN',true,0,'dm-0427','std-m1'),
('mo-0427-m2','MAIN',true,1,'dm-0427','std-m2'),

-- ─── 28 avr (Mar) — récup légère ───
('mo-0428-s1','STARTER',true,0,'dm-0428','ai-s2'),
('mo-0428-s2','STARTER',true,1,'dm-0428','ai-s3'),
('mo-0428-m1','MAIN',true,0,'dm-0428','ai-m1'),
('mo-0428-m2','MAIN',true,1,'dm-0428','ai-m3'),

-- ─── 29 avr (Mer) — technique ───
('mo-0429-s1','STARTER',true,0,'dm-0429','std-s2'),
('mo-0429-s2','STARTER',true,1,'dm-0429','md-s3'),
('mo-0429-m1','MAIN',true,0,'dm-0429','std-m2'),
('mo-0429-m2','MAIN',true,1,'dm-0429','md-m2'),

-- ─── 30 avr (Jeu) — fin de mois / modéré ───
('mo-0430-s1','STARTER',true,0,'dm-0430','std-s1'),
('mo-0430-s2','STARTER',true,1,'dm-0430','std-s3'),
('mo-0430-m1','MAIN',true,0,'dm-0430','std-m1'),
('mo-0430-m2','MAIN',true,1,'dm-0430','std-m3')

ON CONFLICT ("id") DO NOTHING;
