-- SG-SST Ingeniería Eléctrica — Esquema de base de datos
-- Ejecutar: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS sgsst_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sgsst_db;

-- ─── Perfil de la empresa ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS empresa (
  id              INT          PRIMARY KEY AUTO_INCREMENT,
  nombre          VARCHAR(255) DEFAULT '',
  nit             VARCHAR(50)  DEFAULT '',
  trabajadores    INT          DEFAULT 50,
  clase_riesgo    VARCHAR(3)   DEFAULT 'V',
  arl             VARCHAR(100) DEFAULT '',
  responsable_sst VARCHAR(255) DEFAULT '',
  configurado     TINYINT(1)   DEFAULT 0,
  created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Fila inicial (empresa única)
INSERT IGNORE INTO empresa (id) VALUES (1);

-- ─── Estándares completados ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS estandares_completados (
  id           INT         PRIMARY KEY AUTO_INCREMENT,
  empresa_id   INT         NOT NULL DEFAULT 1,
  estandar_id  VARCHAR(20) NOT NULL,
  completado_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_empresa_estandar (empresa_id, estandar_id),
  CONSTRAINT fk_ec_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(id) ON DELETE CASCADE
);

-- ─── Documentos ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documentos (
  id           INT         PRIMARY KEY AUTO_INCREMENT,
  empresa_id   INT         NOT NULL DEFAULT 1,
  documento_id VARCHAR(20) NOT NULL,
  fecha        DATE,
  responsable  VARCHAR(255) DEFAULT '',
  updated_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_empresa_documento (empresa_id, documento_id),
  CONSTRAINT fk_doc_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(id) ON DELETE CASCADE
);

-- ─── Notas por estándar ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notas (
  id           INT         PRIMARY KEY AUTO_INCREMENT,
  empresa_id   INT         NOT NULL DEFAULT 1,
  estandar_id  VARCHAR(20) NOT NULL,
  texto        TEXT,
  updated_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_empresa_nota (empresa_id, estandar_id),
  CONSTRAINT fk_nota_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(id) ON DELETE CASCADE
);

-- ─── Obligaciones de calendario completadas ──────────────────────────────────
CREATE TABLE IF NOT EXISTS calendario_completadas (
  id              INT          PRIMARY KEY AUTO_INCREMENT,
  empresa_id      INT          NOT NULL DEFAULT 1,
  obligacion_key  VARCHAR(255) NOT NULL,
  completada_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_empresa_obligacion (empresa_id, obligacion_key),
  CONSTRAINT fk_cal_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(id) ON DELETE CASCADE
);
