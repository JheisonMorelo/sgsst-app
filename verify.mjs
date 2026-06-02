// Playwright smoke test — verifica todas las rutas principales de la app
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const BASE = 'http://localhost:5173';
const OUT  = './verify-screenshots';
mkdirSync(OUT, { recursive: true });

const RUTAS = [
  { path: '/',               name: '01-dashboard'      },
  { path: '/perfil',         name: '02-perfil'         },
  { path: '/phva',           name: '03-phva'           },
  { path: '/checklist',      name: '04-checklist'      },
  { path: '/electrico',      name: '05-electrico'      },
  { path: '/documentos',     name: '06-documentos'     },
  { path: '/calendario',     name: '07-calendario'     },
  { path: '/autoevaluacion', name: '08-autoevaluacion' },
  { path: '/ayuda',          name: '09-ayuda'          },
];

const results = [];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx     = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page    = await ctx.newPage();

  // Capturar errores de consola
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push(`[pageerror] ${e.message}`));

  // ── 1. Bienvenida: modal aparece en primera visita ────────────────────────
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const modalVisible = await page.locator('text=Bienvenido al SG-SST').isVisible().catch(() => false);
  results.push({ check: 'Modal bienvenida visible en primera visita', pass: modalVisible });
  await page.screenshot({ path: `${OUT}/00-welcome-modal.png` });

  // Suprimir modal en el resto de la sesión via localStorage
  await page.evaluate(() => localStorage.setItem('sgsst_welcome_done', '1'));

  // ── 2. Screenshots de todas las rutas ─────────────────────────────────────
  for (const { path, name } of RUTAS) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const title = await page.locator('h1').first().textContent().catch(() => '(sin h1)');
    const hasError = await page.locator('text=Error, text=error 500, text=Cannot').count();

    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });

    results.push({
      check: `Ruta ${path} — "${title.trim()}"`,
      pass:  hasError === 0,
    });
  }

  // ── 3. Flujo: marcar estándar en checklist ────────────────────────────────
  await page.goto(`${BASE}/checklist`, { waitUntil: 'networkidle' });
  const checkbox = page.locator('button.w-6.h-6.rounded-full').first();
  const before   = await checkbox.evaluate(el => el.classList.contains('bg-emerald-500'));
  await checkbox.click();
  await page.waitForTimeout(1500); // optimistic update es sync; 1.5s cubre API round-trip
  const after    = await checkbox.evaluate(el => el.classList.contains('bg-emerald-500'));
  results.push({ check: 'Toggle estándar en checklist cambia estado', pass: before !== after });
  await page.screenshot({ path: `${OUT}/10-checklist-toggle.png` });

  // ── 4. Panel de ayuda ─────────────────────────────────────────────────────
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const helpBtn = page.locator('button[aria-label="Ayuda"]').last();
  await helpBtn.click();
  await page.waitForTimeout(400);
  const drawerVisible = await page.locator('text=Dashboard — Panel Principal').isVisible().catch(() => false);
  results.push({ check: 'Help drawer abre con contenido contextual', pass: drawerVisible });
  await page.screenshot({ path: `${OUT}/11-help-drawer.png` });

  // ── 5. Tooltip ────────────────────────────────────────────────────────────
  await page.goto(`${BASE}/checklist`, { waitUntil: 'networkidle' });
  // Trigger ahora es span[role=button] con aria-label="Ayuda"
  const tooltipBtn = page.locator('[role="button"][aria-label="Ayuda"]').first();
  await tooltipBtn.click();
  await page.waitForTimeout(400);
  const tooltipVisible = await page.locator('text=Filtra solo los estándares').isVisible().catch(() => false);
  results.push({ check: 'Tooltip abre al clic en icono ?', pass: tooltipVisible });
  await page.screenshot({ path: `${OUT}/12-tooltip.png` });

  // ── 6. CORS: frontend se comunica con backend ─────────────────────────────
  const apiOk = await page.evaluate(async () => {
    try {
      const r = await fetch('http://localhost:3001/api/health');
      const d = await r.json();
      return d.status === 'ok';
    } catch { return false; }
  });
  results.push({ check: 'Frontend alcanza backend (CORS OK)', pass: apiOk });

  // ── 7. Sin errores de consola ─────────────────────────────────────────────
  results.push({
    check: `Sin errores de consola (${consoleErrors.length} encontrados)`,
    pass:  consoleErrors.length === 0,
    detail: consoleErrors.slice(0, 3).join(' | '),
  });

  await browser.close();

  // ── Reporte ───────────────────────────────────────────────────────────────
  console.log('\n═══ VERIFICATION REPORT ═══\n');
  let passed = 0, failed = 0;
  for (const r of results) {
    const icon = r.pass ? '✅' : '❌';
    console.log(`${icon}  ${r.check}${r.detail ? '\n   ↳ ' + r.detail : ''}`);
    r.pass ? passed++ : failed++;
  }
  console.log(`\nTotal: ${passed} passed, ${failed} failed`);
  console.log(`Screenshots: ${OUT}/\n`);

  writeFileSync(`${OUT}/report.json`, JSON.stringify({ passed, failed, results }, null, 2));
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(e => { console.error(e); process.exit(1); });
