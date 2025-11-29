-- CreateTable
CREATE TABLE "Hospital" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "administratorName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionsDaily" (
    "id" BIGSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "hospitalId" UUID NOT NULL,
    "totalAdmissions" INTEGER NOT NULL,
    "emergencyAdmissions" INTEGER NOT NULL,
    "scheduledAdmissions" INTEGER NOT NULL,
    "icuAdmissions" INTEGER NOT NULL,
    "generalWardAdmissions" INTEGER NOT NULL,
    "outpatientVisits" INTEGER NOT NULL,
    "avgLengthOfStayDays" DOUBLE PRECISION NOT NULL,
    "totalDischarges" INTEGER NOT NULL,
    "bedOccupancyPercent" DOUBLE PRECISION NOT NULL,
    "surgeFlag" BOOLEAN NOT NULL,

    CONSTRAINT "AdmissionsDaily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherDaily" (
    "id" BIGSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "city" TEXT NOT NULL,
    "temperatureMax" DOUBLE PRECISION NOT NULL,
    "temperatureMin" DOUBLE PRECISION NOT NULL,
    "temperatureAvg" DOUBLE PRECISION NOT NULL,
    "humidityPercent" DOUBLE PRECISION NOT NULL,
    "rainfallMm" DOUBLE PRECISION NOT NULL,
    "windSpeedKmph" DOUBLE PRECISION NOT NULL,
    "weatherCondition" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "heatIndex" DOUBLE PRECISION NOT NULL,
    "uvIndex" DOUBLE PRECISION NOT NULL,
    "visibilityKm" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeatherDaily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AqiDaily" (
    "id" BIGSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "aqi" INTEGER NOT NULL,
    "pm25" DOUBLE PRECISION NOT NULL,
    "pm10" DOUBLE PRECISION NOT NULL,
    "no2" DOUBLE PRECISION NOT NULL,
    "so2" DOUBLE PRECISION NOT NULL,
    "co" DOUBLE PRECISION NOT NULL,
    "o3" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "healthAdvisory" TEXT NOT NULL,

    CONSTRAINT "AqiDaily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Festival" (
    "id" BIGSERIAL NOT NULL,
    "festivalName" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "month" TEXT NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "expectedCrowdSize" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "affectedDepartments" TEXT NOT NULL,
    "primaryHealthRisks" TEXT NOT NULL,
    "historicalSurgePercentage" DOUBLE PRECISION NOT NULL,
    "mobilityIndex" TEXT NOT NULL,
    "weatherImpact" TEXT NOT NULL,

    CONSTRAINT "Festival_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentCapacity" (
    "id" BIGSERIAL NOT NULL,
    "hospitalId" UUID NOT NULL,
    "departmentName" TEXT NOT NULL,
    "totalBeds" INTEGER NOT NULL,
    "icuBeds" INTEGER NOT NULL,
    "generalBeds" INTEGER NOT NULL,
    "currentOccupancyCount" INTEGER NOT NULL,
    "occupancyPercent" DOUBLE PRECISION NOT NULL,
    "ventilatorsTotal" INTEGER NOT NULL,
    "ventilatorsAvailable" INTEGER NOT NULL,
    "oxygenPoints" INTEGER NOT NULL,
    "monitoringEquipmentCount" INTEGER NOT NULL,
    "staffCount" INTEGER NOT NULL,
    "doctorsCount" INTEGER NOT NULL,
    "nursesCount" INTEGER NOT NULL,
    "supportStaffCount" INTEGER NOT NULL,
    "equipmentStatus" TEXT NOT NULL,
    "expansionCapacityBeds" INTEGER NOT NULL,

    CONSTRAINT "DepartmentCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffDailyStatus" (
    "id" BIGSERIAL NOT NULL,
    "hospitalId" UUID NOT NULL,
    "date" DATE NOT NULL,
    "role" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "totalStaff" INTEGER NOT NULL,
    "availableStaff" INTEGER NOT NULL,
    "onCallStaff" INTEGER NOT NULL,
    "sickLeaveCount" INTEGER NOT NULL,
    "overtimeHours" DOUBLE PRECISION NOT NULL,
    "utilizationPercent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StaffDailyStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" UUID NOT NULL,
    "hospitalId" UUID,
    "patientId" TEXT NOT NULL,
    "admissionDate" DATE NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "admissionType" TEXT NOT NULL,
    "admissionReason" TEXT NOT NULL,
    "primaryDiagnosis" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "comorbidities" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "lengthOfStayDays" INTEGER NOT NULL,
    "outcome" TEXT NOT NULL,
    "insuranceStatus" TEXT NOT NULL,
    "treatmentCost" DOUBLE PRECISION NOT NULL,
    "seasonAdmitted" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionsDaily" (
    "id" BIGSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "hospitalId" UUID NOT NULL,
    "predictedTotalAdmissions" INTEGER NOT NULL,
    "predictedIcuLoad" INTEGER NOT NULL,
    "predictedEmergencyLoad" INTEGER NOT NULL,
    "predictedOccupancy" DOUBLE PRECISION NOT NULL,
    "surgeProbability" DOUBLE PRECISION NOT NULL,
    "modelVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PredictionsDaily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" UUID NOT NULL,
    "hospitalId" UUID NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alertType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "acknowledged" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgedBy" TEXT,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportGenerated" (
    "id" BIGSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "hospitalId" UUID NOT NULL,
    "reportType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportGenerated_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionsDaily_date_hospitalId_key" ON "AdmissionsDaily"("date", "hospitalId");

-- CreateIndex
CREATE INDEX "WeatherDaily_date_city_idx" ON "WeatherDaily"("date", "city");

-- CreateIndex
CREATE INDEX "AqiDaily_date_city_idx" ON "AqiDaily"("date", "city");

-- CreateIndex
CREATE INDEX "StaffDailyStatus_date_hospitalId_idx" ON "StaffDailyStatus"("date", "hospitalId");

-- CreateIndex
CREATE INDEX "Patient_admissionDate_hospitalId_idx" ON "Patient"("admissionDate", "hospitalId");

-- CreateIndex
CREATE UNIQUE INDEX "PredictionsDaily_date_hospitalId_modelVersion_key" ON "PredictionsDaily"("date", "hospitalId", "modelVersion");

-- CreateIndex
CREATE INDEX "ReportGenerated_date_hospitalId_idx" ON "ReportGenerated"("date", "hospitalId");

-- AddForeignKey
ALTER TABLE "AdmissionsDaily" ADD CONSTRAINT "AdmissionsDaily_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentCapacity" ADD CONSTRAINT "DepartmentCapacity_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffDailyStatus" ADD CONSTRAINT "StaffDailyStatus_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionsDaily" ADD CONSTRAINT "PredictionsDaily_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportGenerated" ADD CONSTRAINT "ReportGenerated_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
