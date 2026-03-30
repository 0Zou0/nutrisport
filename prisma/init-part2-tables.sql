-- PARTIE 2 : Tables

CREATE TABLE IF NOT EXISTS "Club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sport" TEXT NOT NULL DEFAULT 'rugby',
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clubId" TEXT NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Season" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clubId" TEXT NOT NULL,
    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DayPlan" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seasonId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,
    CONSTRAINT "DayPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "TrainingSession" (
    "id" TEXT NOT NULL,
    "slot" "TrainingSlot" NOT NULL,
    "type" TEXT NOT NULL,
    "intensity" "TrainingIntensity" NOT NULL,
    "durationMin" INTEGER,
    "location" TEXT,
    "notes" TEXT,
    "dayPlanId" TEXT NOT NULL,
    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DayOrientation" (
    "id" TEXT NOT NULL,
    "orientation" "NutritionalOrientation" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "dayPlanId" TEXT NOT NULL,
    CONSTRAINT "DayOrientation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DayMenu" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dayPlanId" TEXT NOT NULL,
    CONSTRAINT "DayMenu_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "MenuCategory" NOT NULL,
    "difficulty" "RecipeDifficulty" NOT NULL,
    "prepTimeMin" INTEGER NOT NULL,
    "cookTimeMin" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clubId" TEXT NOT NULL,
    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "MenuOption" (
    "id" TEXT NOT NULL,
    "category" "MenuCategory" NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayMenuId" TEXT NOT NULL,
    "recipeId" TEXT,
    "createdById" TEXT,
    CONSTRAINT "MenuOption_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "notes" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RecipeStep" (
    "id" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "instruction" TEXT NOT NULL,
    "durationMin" INTEGER,
    "imageUrl" TEXT,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "NutritionFacts" (
    "id" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "fiber" DOUBLE PRECISION,
    "sugar" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "NutritionFacts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RecipeTag" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "RecipeTag_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RecipeOrientation" (
    "id" TEXT NOT NULL,
    "orientation" "NutritionalOrientation" NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "RecipeOrientation_pkey" PRIMARY KEY ("id")
);

-- Index
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_clubId_idx" ON "User"("clubId");
CREATE INDEX IF NOT EXISTS "Season_clubId_idx" ON "Season"("clubId");
CREATE INDEX IF NOT EXISTS "DayPlan_seasonId_idx" ON "DayPlan"("seasonId");
CREATE INDEX IF NOT EXISTS "DayPlan_date_idx" ON "DayPlan"("date");
CREATE UNIQUE INDEX IF NOT EXISTS "DayPlan_seasonId_date_key" ON "DayPlan"("seasonId", "date");
CREATE INDEX IF NOT EXISTS "TrainingSession_dayPlanId_idx" ON "TrainingSession"("dayPlanId");
CREATE INDEX IF NOT EXISTS "DayOrientation_dayPlanId_idx" ON "DayOrientation"("dayPlanId");
CREATE UNIQUE INDEX IF NOT EXISTS "DayMenu_dayPlanId_key" ON "DayMenu"("dayPlanId");
CREATE INDEX IF NOT EXISTS "MenuOption_dayMenuId_idx" ON "MenuOption"("dayMenuId");
CREATE INDEX IF NOT EXISTS "Recipe_clubId_idx" ON "Recipe"("clubId");
CREATE INDEX IF NOT EXISTS "Ingredient_recipeId_idx" ON "Ingredient"("recipeId");
CREATE INDEX IF NOT EXISTS "RecipeStep_recipeId_idx" ON "RecipeStep"("recipeId");
CREATE UNIQUE INDEX IF NOT EXISTS "NutritionFacts_recipeId_key" ON "NutritionFacts"("recipeId");
CREATE INDEX IF NOT EXISTS "RecipeTag_recipeId_idx" ON "RecipeTag"("recipeId");
CREATE INDEX IF NOT EXISTS "RecipeOrientation_recipeId_idx" ON "RecipeOrientation"("recipeId");

-- Foreign Keys
ALTER TABLE "User" ADD CONSTRAINT "User_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Season" ADD CONSTRAINT "Season_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DayPlan" ADD CONSTRAINT "DayPlan_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DayPlan" ADD CONSTRAINT "DayPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DayPlan" ADD CONSTRAINT "DayPlan_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_dayPlanId_fkey" FOREIGN KEY ("dayPlanId") REFERENCES "DayPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DayOrientation" ADD CONSTRAINT "DayOrientation_dayPlanId_fkey" FOREIGN KEY ("dayPlanId") REFERENCES "DayPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DayMenu" ADD CONSTRAINT "DayMenu_dayPlanId_fkey" FOREIGN KEY ("dayPlanId") REFERENCES "DayPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MenuOption" ADD CONSTRAINT "MenuOption_dayMenuId_fkey" FOREIGN KEY ("dayMenuId") REFERENCES "DayMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MenuOption" ADD CONSTRAINT "MenuOption_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MenuOption" ADD CONSTRAINT "MenuOption_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NutritionFacts" ADD CONSTRAINT "NutritionFacts_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecipeTag" ADD CONSTRAINT "RecipeTag_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RecipeOrientation" ADD CONSTRAINT "RecipeOrientation_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
