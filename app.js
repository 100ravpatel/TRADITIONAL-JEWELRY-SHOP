/**
 * ============================================================================
 * SHREE MAGADH ALANKAR MANDIR - 3D SCROLL ENGINE & GOOGLE SHEETS ERP (app.js)
 * ============================================================================
 */

// Paste your deployed Google Apps Script Web App URL here (or enter it in the Login Modal)
let GOOGLE_SCRIPT_URL = localStorage.getItem('BIHAR_JEWELRY_API_URL') || '';

// Session & Shop State
const state = {
  isAuthenticated: false,
  userId: '',
  passcode: '',
  rates: {
    silverPerGram: 98,
    gold22kPerGram: 7450
  },
  inventory: [],
  transactions: [],
  customOrders: [],
  activeCategoryFilter: 'ALL'
};

// Charts instances
let chart30DaysInstance = null;
let chartCategoryInstance = null;

/* ==========================================================================
   1. INITIALIZATION & REALISTIC BIHARI JEWELRY SEED DATA (OFFLINE / DEMO READY)
   ========================================================================== */
function initSeedData() {
  const today = new Date();
  const fmtDate = (daysAgo) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  state.inventory = [
    { SKU: 'BIH-PYL-01', ItemName: 'Heavy Dulhan Chandi Payal (64 Ghungroo)', Category: 'Payal', MetalType: 'Silver', WeightGrams: 165.0, Quantity: 6, BuyCostINR: 13800, SellPriceINR: 17200, PublicShowcase: 'YES' },
    { SKU: 'BIH-PYL-02', ItemName: 'Daily Wear Meenakari Chandi Payal Pair', Category: 'Payal', MetalType: 'Silver', WeightGrams: 52.5, Quantity: 14, BuyCostINR: 4400, SellPriceINR: 5650, PublicShowcase: 'YES' },
    { SKU: 'BIH-EAR-01', ItemName: 'Magadhi Suryamukhi Gold-Plated Jhumka', Category: 'Earring', MetalType: 'City Gold', WeightGrams: 14.0, Quantity: 25, BuyCostINR: 260, SellPriceINR: 650, PublicShowcase: 'YES' },
    { SKU: 'BIH-EAR-02', ItemName: 'Kaan-Chain Saharana Bridal Bali Pair', Category: 'Earring', MetalType: 'City Gold', WeightGrams: 18.5, Quantity: 15, BuyCostINR: 390, SellPriceINR: 890, PublicShowcase: 'YES' },
    { SKU: 'BIH-CGD-01', ItemName: 'Patna Bridal City Gold Rani Haar & Tikka Set', Category: 'City Gold', MetalType: 'City Gold', WeightGrams: 92.0, Quantity: 9, BuyCostINR: 1150, SellPriceINR: 2499, PublicShowcase: 'YES' },
    { SKU: 'BIH-BLA-01', ItemName: 'Pure Chandi Kids Bala & Nazariya Pair', Category: 'Kids Bala', MetalType: 'Silver', WeightGrams: 26.0, Quantity: 19, BuyCostINR: 2200, SellPriceINR: 2950, PublicShowcase: 'YES' },
    { SKU: 'BIH-BLA-02', ItemName: 'Adjustable Newborn Chandi Kada with Bell', Category: 'Kids Bala', MetalType: 'Silver', WeightGrams: 32.0, Quantity: 11, BuyCostINR: 2750, SellPriceINR: 3550, PublicShowcase: 'YES' },
    { SKU: 'BIH-SLV-01', ItemName: 'Dulhan Chandi Bichhiya (5-Piece Toe Ring Set)', Category: 'Silver Item', MetalType: 'Silver', WeightGrams: 15.0, Quantity: 28, BuyCostINR: 1200, SellPriceINR: 1680, PublicShowcase: 'YES' },
    { SKU: 'BIH-SLV-02', ItemName: '999 Pure Chandi Lakshmi-Ganesh Tak (20g)', Category: 'Silver Item', MetalType: 'Silver', WeightGrams: 20.0, Quantity: 20, BuyCostINR: 1850, SellPriceINR: 2250, PublicShowcase: 'YES' }
  ];

  state.transactions = [
    { TxID: 'TX-901201', Date: fmtDate(0), Type: 'SELL', CustomerName: 'Meena Devi', CustomerPhone: '9835011223', Category: 'Payal', ItemDescription: 'Heavy Dulhan Chandi Payal 165g', MetalType: 'Silver', WeightGrams: 165, RatePerGram: 98, MakingCharges: 1030, OldMetalDeduction: 2200, TotalBillAmount: 15000, AmountPaid: 12000, BalanceDue: 3000, PaymentMode: 'Partial Udhaar', Notes: 'Old payal 28g deducted' },
    { TxID: 'TX-901202', Date: fmtDate(0), Type: 'SELL', CustomerName: 'Pूनम कुमारी (Poonam)', CustomerPhone: '9431088776', Category: 'Kids Bala', ItemDescription: 'Pure Chandi Kids Bala Pair', MetalType: 'Silver', WeightGrams: 26, RatePerGram: 98, MakingCharges: 402, OldMetalDeduction: 0, TotalBillAmount: 2950, AmountPaid: 2950, PaymentMode: 'UPI / PhonePe', BalanceDue: 0, Notes: 'Mundan gift' },
    { TxID: 'TX-901203', Date: fmtDate(0), Type: 'BUY', CustomerName: 'Ramesh Bullion Patna', CustomerPhone: '9123456780', Category: 'Old Metal Exchange', ItemDescription: 'Purchased Old Chandi Scrap 95g', MetalType: 'Silver', WeightGrams: 95, RatePerGram: 78, MakingCharges: 0, OldMetalDeduction: 0, TotalBillAmount: 7410, AmountPaid: 7410, BalanceDue: 0, PaymentMode: 'Cash', Notes: 'Melting stock' },
    { TxID: 'TX-901188', Date: fmtDate(2), Type: 'SELL', CustomerName: 'Kavita Sharma', CustomerPhone: '9934512345', Category: 'City Gold', ItemDescription: 'Bridal City Gold Rani Haar + Jhumka', MetalType: 'City Gold', WeightGrams: 105, RatePerGram: 0, MakingCharges: 0, OldMetalDeduction: 0, TotalBillAmount: 3150, AmountPaid: 3150, BalanceDue: 0, PaymentMode: 'Cash', Notes: '6-month polish warranty' },
    { TxID: 'TX-901175', Date: fmtDate(5), Type: 'SELL', CustomerName: 'Santosh Prasad', CustomerPhone: '9771122334', Category: 'Silver Item', ItemDescription: 'Chandi Bichhiya + 20g Coin', MetalType: 'Silver', WeightGrams: 35, RatePerGram: 98, MakingCharges: 500, OldMetalDeduction: 0, TotalBillAmount: 3930, AmountPaid: 2500, BalanceDue: 1430, PaymentMode: 'Partial Udhaar', Notes: 'Promised next week' },
    { TxID: 'TX-901160', Date: fmtDate(9), Type: 'BUY', CustomerName: 'Kolkata City Gold Wholesale', CustomerPhone: '9830099881', Category: 'City Gold', ItemDescription: 'Wholesale City Gold Earrings & Haar Lot', MetalType: 'City Gold', WeightGrams: 450, RatePerGram: 0, MakingCharges: 0, OldMetalDeduction: 0, TotalBillAmount: 9800, AmountPaid: 9800, BalanceDue: 0, PaymentMode: 'UPI / PhonePe', Notes: 'Festive stock' },
    { TxID: 'TX-901142', Date: fmtDate(14), Type: 'SELL', CustomerName: 'Anita Verma', CustomerPhone: '9570011229', Category: 'Earring', ItemDescription: '3 Pairs Suryamukhi & Bali Earrings', MetalType: 'City Gold', WeightGrams: 42, RatePerGram: 0, MakingCharges: 0, OldMetalDeduction: 0, TotalBillAmount: 2190, AmountPaid: 2190, BalanceDue: 0, PaymentMode: 'Cash', Notes: '' },
    { TxID: 'TX-901119', Date: fmtDate(21), Type: 'SELL', CustomerName: 'Manoj Singh', CustomerPhone: '9334111222', Category: 'Payal', ItemDescription: 'Bridal Chandi Payal + Kids Bala', MetalType: 'Silver', WeightGrams: 190, RatePerGram: 97, MakingCharges: 1450, OldMetalDeduction: 0, TotalBillAmount: 19880, AmountPaid: 19880, BalanceDue: 0, PaymentMode: 'Cash', Notes: 'Tilak ceremony' }
  ];

  state.customOrders = [
    { OrderID: 'ORD-782101', DateCreated: fmtDate(1), CustomerName: 'Sudha Devi', CustomerPhone: '9835223344', Category: 'Payal', DesignDetails: '250g Heavy Dulhan Payal with peacock clasp & double ghungroo line', EstWeightGrams: 250, EstimatedPrice: 26500, AdvancePaid: 5000, DeliveryDate: fmtDate(-5), KarigarName: 'Ustaad Bhola Jee', Status: 'With Karigar' },
    { OrderID: 'ORD-782104', DateCreated: fmtDate(3), CustomerName: 'Vikash Kumar', CustomerPhone: '9122334455', Category: 'Kids Bala', DesignDetails: '40g Pure Chandi Baby Bala pair with engraved name "Aarav"', EstWeightGrams: 40, EstimatedPrice: 4400, AdvancePaid: 1000, DeliveryDate: fmtDate(-2), KarigarName: 'Shyam Sonar', Status: 'Ready' }
  ];
}

/* ==========================================================================
   2. THREE.JS CENTER-STAGE METALLIC 3D SCROLL DISASSEMBLY & MORPH ENGINE
   ========================================================================== */
function init3DScrollJewelry() {
  const canvas = document.getElementById('jewelry-3d-canvas');
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.4, 8.5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  // Metallic Materials (22K Royal Gold, Sterling Chandi Silver, Faceted Ruby Core)
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffd166'),
    metalness: 0.94,
    roughness: 0.16
  });

  const silverMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e2eafc'),
    metalness: 0.97,
    roughness: 0.11
  });

  const coreGemMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ff4d6d'),
    emissive: new THREE.Color('#590d22'),
    emissiveIntensity: 0.5,
    metalness: 0.65,
    roughness: 0.08,
    flatShading: true
  });

  // Master Ornament Group
  const ornamentGroup = new THREE.Group();
  scene.add(ornamentGroup);

  // PART 1: Central Faceted Solitaire Core (Octahedron)
  const coreGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.68, 1), coreGemMaterial);
  ornamentGroup.add(coreGem);

  // PART 2: Traditional Kids Bala / Kada Heavy Torus Ring (Gold)
  const balaCoreRing = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.14, 32, 100), goldMaterial);
  ornamentGroup.add(balaCoreRing);

  // PART 3: Concentric Filigree Jhumka Gimbal Rings (Disassemble along Y & Tilt on Scroll)
  const gimbalRings = [];
  const ringConfigs = [
    { radius: 1.15, tube: 0.06, mat: silverMaterial, baseRotX: 0.35, baseRotY: 0.2, explodeY: 1.45 },
    { radius: 1.95, tube: 0.075, mat: goldMaterial, baseRotX: -0.45, baseRotY: -0.3, explodeY: -1.45 },
    { radius: 2.30, tube: 0.05, mat: silverMaterial, baseRotX: 0.85, baseRotY: 0.1, explodeY: 2.1 }
  ];

  ringConfigs.forEach((cfg) => {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(cfg.radius, cfg.tube, 24, 96), cfg.mat);
    mesh.rotation.set(cfg.baseRotX, cfg.baseRotY, 0);
    mesh.userData = cfg;
    ornamentGroup.add(mesh);
    gimbalRings.push(mesh);
  });

  // PART 4: 16 Orbital Chandi Payal Ghungroo Bells + Filigree Connector Caps
  const ghungrooNodes = [];
  const totalBells = 16;
  for (let i = 0; i < totalBells; i++) {
    const angle = (i / totalBells) * Math.PI * 2;
    const bellGroup = new THREE.Group();

    // Sterling Silver Ghungroo Sphere
    const bellSphere = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 24), silverMaterial);
    // Gold Kunda / Cap on each Ghungroo
    const kundaCap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.12, 12), goldMaterial);
    kundaCap.position.y = 0.15;

    bellGroup.add(bellSphere);
    bellGroup.add(kundaCap);

    // Base intact position along the Bala perimeter
    const baseRadius = 1.76;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const dirZ = (i % 2 === 0 ? 1 : -1) * 0.35;

    bellGroup.position.set(dirX * baseRadius, dirY * baseRadius, 0);
    bellGroup.rotation.z = angle - Math.PI / 2;

    bellGroup.userData = {
      angle,
      baseRadius,
      dirX,
      dirY,
      dirZ,
      index: i
    };

    ornamentGroup.add(bellGroup);
    ghungrooNodes.push(bellGroup);
  }

  // PART 5: 8 Crown Jhumka Lotus Petals (Morphing Cones/Octahedrons)
  const lotusPetals = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const petal = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.55, 6), goldMaterial);
    const r = 1.02;
    petal.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
    petal.rotation.z = angle - Math.PI / 2;
    petal.userData = { angle, baseR: r };
    ornamentGroup.add(petal);
    lotusPetals.push(petal);
  }

  // Dynamic Studio Lighting (Re-illuminates in sync with Scrollbar)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambientLight);

  const keyLight = new THREE.PointLight(0xffb703, 4.2, 25);
  keyLight.position.set(4, 4, 5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x90e0ef, 3.5, 25);
  rimLight.position.set(-4, -3, 4);
  scene.add(rimLight);

  const backLight = new THREE.DirectionalLight(0xffd166, 2.0);
  backLight.position.set(0, 5, -5);
  scene.add(backLight);

  // Scroll & Pointer Interaction State
  let targetScrollProgress = 0;
  let smoothScrollProgress = 0;
  let pointerX = 0;
  let pointerY = 0;

  window.addEventListener('scroll', () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  });

  window.addEventListener('pointermove', (e) => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Update Scroll HUD
  function updateScrollHUD(p) {
    const pct = Math.round(p * 100);
    const bar = document.getElementById('hud-progress-bar');
    const pctLabel = document.getElementById('hud-scroll-pct');
    const stageLabel = document.getElementById('hud-stage-label');
    if (bar) bar.style.height = `${Math.max(4, pct)}%`;
    if (pctLabel) pctLabel.textContent = `${pct}%`;
    if (stageLabel) {
      if (p < 0.25) stageLabel.textContent = 'Stage 01 · Intact Royal Ornament';
      else if (p < 0.55) stageLabel.textContent = 'Stage 02 · Exploded Payal & Bala Disassembly';
      else if (p < 0.80) stageLabel.textContent = 'Stage 03 · Morph & Chandi Re-Illumination';
      else stageLabel.textContent = 'Stage 04 · Sacred Karigar Mandala Lock';
    }
  }

  // Animation Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smoothly damp scroll progress
    smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * 0.07;
    const p = smoothScrollProgress;
    updateScrollHUD(p);

    // Compute Disassembly & Morph Curves:
    // explosionFactor peaks in the middle of the page (around 35%-65% scroll) and reassembles near bottom
    const explosionFactor = Math.sin(p * Math.PI); // 0 -> 1 -> 0
    // morphFactor rises during second half of scroll
    const morphFactor = Math.max(0, Math.min(1, (p - 0.35) / 0.5));

    // 1. Rotate Master Ornament in sync with scroll + subtle idle rotation + mouse parallax
    ornamentGroup.rotation.y = p * Math.PI * 3.2 + elapsed * 0.22 + pointerX * 0.35;
    ornamentGroup.rotation.x = Math.sin(p * Math.PI * 2) * 0.45 + pointerY * 0.25;

    // 2. Disassemble & Morph Central Gemstone Core
    const gemScale = 1 + explosionFactor * 0.55 + Math.sin(elapsed * 2.5) * 0.04;
    coreGem.scale.set(gemScale, gemScale * (1 + morphFactor * 0.4), gemScale);
    coreGem.rotation.y = -elapsed * 0.8 - p * 4;

    // 3. Expand & Tilt Heavy Bala Core Ring
    const balaScale = 1 + explosionFactor * 0.28;
    balaCoreRing.scale.set(balaScale, balaScale, 1 + morphFactor * 0.5);
    balaCoreRing.rotation.x = p * Math.PI * 1.5;

    // 4. Separate & Counter-Rotate Filigree Jhumka Gimbal Rings
    gimbalRings.forEach((ring, idx) => {
      const cfg = ring.userData;
      // Physical vertical disassembly along Z/Y axes
      ring.position.z = cfg.explodeY * explosionFactor * 1.15;
      ring.rotation.x = cfg.baseRotX + p * Math.PI * (idx + 1) * 1.2;
      ring.rotation.y = cfg.baseRotY - p * Math.PI * (idx + 1) * 0.9;
      const s = 1 + morphFactor * 0.18 * (idx % 2 === 0 ? 1 : -1);
      ring.scale.set(s, s, s);
    });

    // 5. Radially Disassemble the 16 Chandi Payal Ghungroo Bells
    ghungrooNodes.forEach((bell) => {
      const u = bell.userData;
      // Radial outward explosion + helical Z wave
      const radialDist = u.baseRadius + explosionFactor * 1.65 + morphFactor * 0.3 * Math.sin(u.index * 2 + p * 6);
      const zOffset = u.dirZ * explosionFactor * 3.2 * Math.cos(p * Math.PI * 2 + u.index);
      const orbitAngle = u.angle + p * Math.PI * 1.5;

      bell.position.set(
        Math.cos(orbitAngle) * radialDist,
        Math.sin(orbitAngle) * radialDist,
        zOffset
      );
      bell.rotation.x = p * 5 + u.index;
      bell.rotation.y = elapsed + u.index * 0.5;
    });

    // 6. Morph Crown Lotus Petals Outward
    lotusPetals.forEach((petal, idx) => {
      const u = petal.userData;
      const dist = u.baseR + explosionFactor * 0.95;
      petal.position.set(
        Math.cos(u.angle) * dist,
        Math.sin(u.angle) * dist,
        Math.sin(p * Math.PI * 2 + idx) * explosionFactor * 0.8
      );
      petal.rotation.x = morphFactor * Math.PI;
    });

    // 7. Re-Illuminate Studio Lights in Sync with Scrollbar
    // Cross-fade key light from Warm 22K Gold -> Moonlit Chandi Cyan -> Royal Rose Gold
    const goldColor = new THREE.Color('#ffb703');
    const silverCyan = new THREE.Color('#48cae4');
    const royalRose = new THREE.Color('#ff758f');

    if (p < 0.5) {
      keyLight.color.lerpColors(goldColor, silverCyan, p * 2);
    } else {
      keyLight.color.lerpColors(silverCyan, royalRose, (p - 0.5) * 2);
    }
    keyLight.position.x = Math.cos(p * Math.PI * 2) * 5;
    keyLight.position.z = Math.sin(p * Math.PI * 2) * 5 + 2;
    keyLight.intensity = 3.8 + explosionFactor * 2.2;

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   3. GOOGLE SHEETS API CLIENT & DATA SYNC
   ========================================================================== */
async function callGoogleScriptPOST(payload) {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('NO_API_URL');
  }
  // Using text/plain;charset=utf-8 prevents CORS preflight OPTIONS failure on Google Apps Script
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'follow'
  });
  return await response.json();
}

async function fetchPublicCatalogFromSheet() {
  if (!GOOGLE_SCRIPT_URL) return;
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL);
    const data = await res.json();
    if (data.status === 'success') {
      state.rates = data.rates;
      if (data.catalog && data.catalog.length > 0) {
        state.inventory = data.catalog.map(c => ({
          ...c,
          Quantity: c.InStock ? 10 : 0,
          PublicShowcase: 'YES'
        }));
      }
      updateSyncBadge('Live Google Sheet Connected', true);
      updateTickerUI();
      renderPublicCatalog();
    }
  } catch (err) {
    console.warn('Running in Local Demo Mode:', err.message);
  }
}

function updateSyncBadge(text, isCloud) {
  const badge = document.getElementById('sync-badge');
  if (!badge) return;
  badge.textContent = text;
  badge.className = isCloud
    ? 'text-[11px] px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
    : 'text-[11px] px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30';
}

function updateTickerUI() {
  document.getElementById('ticker-silver').textContent = `₹${state.rates.silverPerGram}/g`;
  document.getElementById('ticker-gold').textContent = `₹${state.rates.gold22kPerGram.toLocaleString('en-IN')}/g`;
  const sInput = document.getElementById('admin-rate-silver');
  const gInput = document.getElementById('admin-rate-gold');
  if (sInput) sInput.value = state.rates.silverPerGram;
  if (gInput) gInput.value = state.rates.gold22kPerGram;
}

/* ==========================================================================
   4. PUBLIC SHOWCASE CATALOG & CUSTOM ORDER SUBMISSION
   ========================================================================== */
function filterCatalog(category) {
  state.activeCategoryFilter = category;
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === category);
  });
  renderPublicCatalog();
}

function renderPublicCatalog() {
  const grid = document.getElementById('public-catalog-grid');
  if (!grid) return;

  const filtered = state.inventory.filter(item => {
    const isPub = String(item.PublicShowcase || 'YES').toUpperCase() === 'YES';
    const matchesCat = state.activeCategoryFilter === 'ALL' || item.Category === state.activeCategoryFilter;
    return isPub && matchesCat;
  });

  grid.innerHTML = filtered.map(item => {
    const isSilver = item.MetalType === 'Silver';
    const badgeColor = isSilver
      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
      : 'bg-amber-500/20 text-amber-300 border-amber-500/30';

    return `
      <div class="group rounded-3xl bg-white/5 border border-amber-500/20 p-6 hover:border-amber-400/60 transition flex flex-col justify-between shadow-xl">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-3 py-1 rounded-full text-[11px] font-semibold border ${badgeColor}">
              ${item.Category} · ${item.MetalType}
            </span>
            <span class="text-xs font-mono text-slate-400">${item.SKU}</span>
          </div>
          <h4 class="font-cinzel text-lg font-bold text-white group-hover:text-amber-300 transition">
            ${item.ItemName}
          </h4>
          <p class="text-xs text-slate-400 mt-2">
            Net Weight: <strong class="text-slate-200">${item.WeightGrams} Grams</strong>
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span class="text-[10px] uppercase tracking-wider text-slate-400 block">Approx Showcase Price</span>
            <span class="text-xl font-bold text-amber-300">₹${Number(item.SellPriceINR).toLocaleString('en-IN')}</span>
          </div>
          <a href="#custom-order-section" onclick="prefillCustomOrder('${item.Category}', '${item.ItemName}', ${item.WeightGrams})"
             class="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500 hover:text-black transition">
            Order / Inquire
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function prefillCustomOrder(category, itemName, weight) {
  document.getElementById('pub-order-category').value = category;
  document.getElementById('pub-order-weight').value = weight;
  document.getElementById('pub-order-details').value = `Interested in ${itemName} (${weight}g). Please confirm making charges and availability.`;
}

async function submitPublicCustomOrder(e) {
  e.preventDefault();
  const msgEl = document.getElementById('pub-order-msg');
  const newOrder = {
    OrderID: 'ORD-' + Date.now().toString().slice(-6),
    DateCreated: new Date().toISOString().split('T')[0],
    CustomerName: document.getElementById('pub-order-name').value,
    CustomerPhone: document.getElementById('pub-order-phone').value,
    Category: document.getElementById('pub-order-category').value,
    EstWeightGrams: Number(document.getElementById('pub-order-weight').value) || 0,
    DeliveryDate: document.getElementById('pub-order-date').value || 'Flexible',
    DesignDetails: document.getElementById('pub-order-details').value,
    AdvancePaid: 0,
    KarigarName: 'Unassigned',
    Status: 'Pending'
  };

  state.customOrders.unshift(newOrder);

  if (GOOGLE_SCRIPT_URL) {
    try {
      await callGoogleScriptPOST({
        action: 'publicCustomOrder',
        customerName: newOrder.CustomerName,
        customerPhone: newOrder.CustomerPhone,
        category: newOrder.Category,
        estWeightGrams: newOrder.EstWeightGrams,
        deliveryDate: newOrder.DeliveryDate,
        designDetails: newOrder.DesignDetails
      });
    } catch (err) {
      console.warn('Saved locally:', err);
    }
  }

  msgEl.textContent = `✓ Order ${newOrder.OrderID} recorded in shop register!`;
  e.target.reset();
  if (state.isAuthenticated) renderAdminAll();
}

/* ==========================================================================
   5. SHOPKEEPER AUTHENTICATION & VIEW SWITCHING
   ========================================================================== */
function handleAuthButtonClick() {
  if (state.isAuthenticated) {
    switchView('admin');
  } else {
    document.getElementById('login-api-url').value = GOOGLE_SCRIPT_URL;
    document.getElementById('login-modal').classList.remove('hidden');
    document.getElementById('login-modal').classList.add('flex');
  }
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.add('hidden');
  document.getElementById('login-modal').classList.remove('flex');
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const userId = document.getElementById('login-userid').value.trim();
  const passcode = document.getElementById('login-passcode').value.trim();
  const apiUrlInput = document.getElementById('login-api-url').value.trim();
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('btn-login-submit');

  errEl.classList.add('hidden');
  btn.textContent = 'Verifying Credentials...';

  if (apiUrlInput) {
    GOOGLE_SCRIPT_URL = apiUrlInput;
    localStorage.setItem('BIHAR_JEWELRY_API_URL', GOOGLE_SCRIPT_URL);
  }

  // If connected to Google Apps Script, verify credentials on backend
  if (GOOGLE_SCRIPT_URL) {
    try {
      const res = await callGoogleScriptPOST({
        action: 'adminSync',
        userId,
        passcode
      });
      if (res.status === 'unauthorized') {
        errEl.textContent = 'Invalid User ID or Passcode on Google Sheet.';
        errEl.classList.remove('hidden');
        btn.textContent = 'Unlock Shop ERP & 30-Day Dashboard';
        return;
      }
      if (res.status === 'success') {
        state.rates = res.rates;
        state.inventory = res.inventory;
        state.transactions = res.transactions;
        state.customOrders = res.customOrders;
        updateSyncBadge('Live Google Sheet Synced', true);
      }
    } catch (err) {
      console.warn('Cloud sync unreachable, falling back to local verification:', err);
    }
  } else {
    // Local Demo Verification
    if (userId !== 'admin' || passcode !== 'bihar123') {
      errEl.textContent = 'Invalid Demo Credentials! Use admin / bihar123';
      errEl.classList.remove('hidden');
      btn.textContent = 'Unlock Shop ERP & 30-Day Dashboard';
      return;
    }
  }

  state.isAuthenticated = true;
  state.userId = userId;
  state.passcode = passcode;
  document.getElementById('auth-btn-label').textContent = 'Open Shop ERP Dashboard';
  btn.textContent = 'Unlock Shop ERP & 30-Day Dashboard';
  closeLoginModal();
  switchView('admin');
  renderAdminAll();
}

function logoutAdmin() {
  state.isAuthenticated = false;
  state.userId = '';
  state.passcode = '';
  document.getElementById('auth-btn-label').textContent = 'Shopkeeper Login (Bahi-Khata)';
  switchView('public');
}

function switchView(view) {
  const pub = document.getElementById('public-view');
  const adm = document.getElementById('admin-view');
  const hud = document.getElementById('scroll-hud');

  if (view === 'admin' && state.isAuthenticated) {
    pub.classList.add('hidden');
    adm.classList.remove('hidden');
    if (hud) hud.classList.add('!hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderAdminAll();
  } else {
    adm.classList.add('hidden');
    pub.classList.remove('hidden');
    if (hud) hud.classList.remove('!hidden');
  }
}

function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(`admin-tab-${tabName}`).classList.remove('hidden');
  document.getElementById(`tab-btn-${tabName}`).classList.add('active');

  if (tabName === 'dashboard30') {
    render30DayCharts();
  }
}

/* ==========================================================================
   6. ROZNAMCHA CALCULATOR, TODAY'S SELL/BUY & 30-DAY ANALYTICS
   ========================================================================== */
function autoFillRate() {
  const metal = document.getElementById('tx-metal').value;
  const rateInput = document.getElementById('tx-rate');
  if (metal === 'Silver') rateInput.value = state.rates.silverPerGram;
  else if (metal === 'Gold 22K') rateInput.value = state.rates.gold22kPerGram;
  else rateInput.value = 0;
  recalcParchi();
}

function recalcParchi() {
  const wt = Number(document.getElementById('tx-weight').value) || 0;
  const rate = Number(document.getElementById('tx-rate').value) || 0;
  const making = Number(document.getElementById('tx-making').value) || 0;
  const deduct = Number(document.getElementById('tx-old-deduct').value) || 0;

  if (rate > 0) {
    const total = Math.max(0, Math.round(wt * rate + making - deduct));
    document.getElementById('tx-total').value = total;
    document.getElementById('tx-paid').value = total;
    recalcBalance();
  }
}

function recalcBalance() {
  const total = Number(document.getElementById('tx-total').value) || 0;
  const paid = Number(document.getElementById('tx-paid').value) || 0;
  document.getElementById('tx-due').value = Math.max(0, total - paid);
}

async function handleSaveTransaction(e) {
  e.preventDefault();
  const totalBill = Number(document.getElementById('tx-total').value) || 0;
  const paid = Number(document.getElementById('tx-paid').value) || 0;

  const newTx = {
    TxID: 'TX-' + Date.now().toString().slice(-6),
    Date: document.getElementById('tx-date').value,
    Type: document.getElementById('tx-type').value,
    CustomerName: document.getElementById('tx-customer').value,
    CustomerPhone: document.getElementById('tx-phone').value,
    Category: document.getElementById('tx-category').value,
    MetalType: document.getElementById('tx-metal').value,
    ItemDescription: document.getElementById('tx-desc').value,
    WeightGrams: Number(document.getElementById('tx-weight').value) || 0,
    RatePerGram: Number(document.getElementById('tx-rate').value) || 0,
    MakingCharges: Number(document.getElementById('tx-making').value) || 0,
    OldMetalDeduction: Number(document.getElementById('tx-old-deduct').value) || 0,
    TotalBillAmount: totalBill,
    AmountPaid: paid,
    BalanceDue: Math.max(0, totalBill - paid),
    PaymentMode: document.getElementById('tx-mode').value,
    Notes: document.getElementById('tx-notes').value
  };

  state.transactions.unshift(newTx);

  if (GOOGLE_SCRIPT_URL) {
    try {
      await callGoogleScriptPOST({
        action: 'addTransaction',
        userId: state.userId,
        passcode: state.passcode,
        date: newTx.Date,
        type: newTx.Type,
        customerName: newTx.CustomerName,
        customerPhone: newTx.CustomerPhone,
        category: newTx.Category,
        metalType: newTx.MetalType,
        itemDescription: newTx.ItemDescription,
        weightGrams: newTx.WeightGrams,
        ratePerGram: newTx.RatePerGram,
        makingCharges: newTx.MakingCharges,
        oldMetalDeduction: newTx.OldMetalDeduction,
        totalBillAmount: newTx.TotalBillAmount,
        amountPaid: newTx.AmountPaid,
        paymentMode: newTx.PaymentMode,
        notes: newTx.Notes
      });
    } catch (err) {
      console.warn('Saved locally:', err);
    }
  }

  renderAdminAll();
  e.target.reset();
  document.getElementById('tx-date').value = new Date().toISOString().split('T')[0];
  autoFillRate();
}

function renderAdminAll() {
  updateTickerUI();
  computeAndRenderKPIs();
  renderTransactionsTable('ALL');
  renderInventoryTable();
  renderOrdersTable();
  renderUdhaarTable();
}

function computeAndRenderKPIs() {
  const todayStr = new Date().toISOString().split('T')[0];
  const cutoff30 = new Date();
  cutoff30.setDate(cutoff30.getDate() - 30);

  let todaySell = 0, todayBuy = 0, todaySellCount = 0, todaySilverGrams = 0;
  let sell30d = 0, buy30d = 0, totalUdhaar = 0, udhaarCustomers = 0;

  state.transactions.forEach(tx => {
    const bill = Number(tx.TotalBillAmount) || 0;
    const due = Number(tx.BalanceDue) || 0;
    const wt = Number(tx.WeightGrams) || 0;
    const txDate = new Date(tx.Date);

    if (String(tx.Date) === todayStr) {
      if (tx.Type === 'SELL') {
        todaySell += bill;
        todaySellCount++;
        if (tx.MetalType === 'Silver') todaySilverGrams += wt;
      } else {
        todayBuy += bill;
      }
    }

    if (txDate >= cutoff30) {
      if (tx.Type === 'SELL') sell30d += bill;
      else buy30d += bill;
    }

    if (due > 0) {
      totalUdhaar += due;
      udhaarCustomers++;
    }
  });

  document.getElementById('kpi-today-sell').textContent = `₹${todaySell.toLocaleString('en-IN')}`;
  document.getElementById('kpi-today-sell-sub').textContent = `${todaySellCount} bills today · ${todaySilverGrams.toFixed(1)}g Silver sold`;

  document.getElementById('kpi-today-buy').textContent = `₹${todayBuy.toLocaleString('en-IN')}`;
  document.getElementById('kpi-30d-sell').textContent = `₹${sell30d.toLocaleString('en-IN')}`;
  document.getElementById('kpi-30d-buy-sub').textContent = `30d Buy: ₹${buy30d.toLocaleString('en-IN')} | Net: ₹${(sell30d - buy30d).toLocaleString('en-IN')}`;

  document.getElementById('kpi-total-udhaar').textContent = `₹${totalUdhaar.toLocaleString('en-IN')}`;
  document.getElementById('kpi-udhaar-sub').textContent = `${udhaarCustomers} pending customer bills`;
}

function renderTransactionsTable(filterMode) {
  const tbody = document.getElementById('roznamcha-tbody');
  if (!tbody) return;
  const todayStr = new Date().toISOString().split('T')[0];

  const rows = state.transactions.filter(tx => {
    return filterMode === 'TODAY' ? String(tx.Date) === todayStr : true;
  });

  tbody.innerHTML = rows.map(tx => {
    const isSell = tx.Type === 'SELL';
    const badge = isSell
      ? '<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">SELL</span>'
      : '<span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">BUY</span>';
    const due = Number(tx.BalanceDue) || 0;

    return `
      <tr class="hover:bg-white/5">
        <td class="py-3 px-2">
          <div class="font-mono text-slate-300">${tx.Date}</div>
          <div class="mt-0.5">${badge}</div>
        </td>
        <td class="py-3 px-2">
          <div class="font-semibold text-white">${tx.CustomerName}</div>
          <div class="text-slate-400">${tx.Category} · ${tx.ItemDescription}</div>
        </td>
        <td class="py-3 px-2 font-mono text-slate-200">${tx.WeightGrams}g</td>
        <td class="py-3 px-2 font-bold text-amber-300">₹${Number(tx.TotalBillAmount).toLocaleString('en-IN')}</td>
        <td class="py-3 px-2">
          <div class="text-emerald-300">Paid: ₹${Number(tx.AmountPaid).toLocaleString('en-IN')}</div>
          ${due > 0 ? `<div class="text-rose-400 font-bold">Due: ₹${due.toLocaleString('en-IN')}</div>` : '<div class="text-slate-500">Settled</div>'}
        </td>
      </tr>
    `;
  }).join('');
}

function render30DayCharts() {
  const ctx30 = document.getElementById('chart-30days');
  const ctxCat = document.getElementById('chart-categories');
  if (!ctx30 || !ctxCat) return;

  // Build 30-day date buckets
  const labels = [];
  const sellMap = {};
  const buyMap = {};
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    labels.push(key.slice(5)); // MM-DD
    sellMap[key] = 0;
    buyMap[key] = 0;
  }

  const catTotals = { 'Payal': 0, 'Earring': 0, 'City Gold': 0, 'Kids Bala': 0, 'Silver Item': 0 };

  state.transactions.forEach(tx => {
    const dKey = String(tx.Date);
    const amt = Number(tx.TotalBillAmount) || 0;
    if (sellMap[dKey] !== undefined) {
      if (tx.Type === 'SELL') sellMap[dKey] += amt;
      else buyMap[dKey] += amt;
    }
    if (tx.Type === 'SELL' && catTotals[tx.Category] !== undefined) {
      catTotals[tx.Category] += amt;
    }
  });

  if (chart30DaysInstance) chart30DaysInstance.destroy();
  chart30DaysInstance = new Chart(ctx30, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Daily Sell (Bikri ₹)',
          data: Object.values(sellMap),
          backgroundColor: 'rgba(16, 185, 129, 0.75)',
          borderRadius: 6
        },
        {
          label: 'Daily Buy (Kharid ₹)',
          data: Object.values(buyMap),
          backgroundColor: 'rgba(245, 158, 11, 0.75)',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#e2e8f0' } } },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });

  if (chartCategoryInstance) chartCategoryInstance.destroy();
  chartCategoryInstance = new Chart(ctxCat, {
    type: 'doughnut',
    data: {
      labels: Object.keys(catTotals),
      datasets: [{
        data: Object.values(catTotals),
        backgroundColor: ['#38bdf8', '#f59e0b', '#eab308', '#a855f7', '#10b981'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0', boxWidth: 12 } } }
    }
  });
}

/* ==========================================================================
   7. INVENTORY, CUSTOM ORDERS & UDHAAR (BAKI KHATA) MANAGEMENT
   ========================================================================== */
async function handleSaveInventory(e) {
  e.preventDefault();
  const skuInput = document.getElementById('inv-sku').value.trim();
  const sku = skuInput || ('BIH-' + Date.now().toString().slice(-4));

  const itemObj = {
    SKU: sku,
    ItemName: document.getElementById('inv-name').value.trim(),
    Category: document.getElementById('inv-category').value,
    MetalType: document.getElementById('inv-metal').value,
    WeightGrams: Number(document.getElementById('inv-weight').value) || 0,
    Quantity: Number(document.getElementById('inv-qty').value) || 0,
    BuyCostINR: Number(document.getElementById('inv-buy').value) || 0,
    SellPriceINR: Number(document.getElementById('inv-sell').value) || 0,
    PublicShowcase: document.getElementById('inv-public').value
  };

  const existingIdx = state.inventory.findIndex(i => i.SKU === sku);
  if (existingIdx >= 0) state.inventory[existingIdx] = itemObj;
  else state.inventory.unshift(itemObj);

  if (GOOGLE_SCRIPT_URL) {
    try {
      await callGoogleScriptPOST({
        action: 'saveInventory',
        userId: state.userId,
        passcode: state.passcode,
        sku: itemObj.SKU,
        itemName: itemObj.ItemName,
        category: itemObj.Category,
        metalType: itemObj.MetalType,
        weightGrams: itemObj.WeightGrams,
        quantity: itemObj.Quantity,
        buyCostINR: itemObj.BuyCostINR,
        sellPriceINR: itemObj.SellPriceINR,
        publicShowcase: itemObj.PublicShowcase
      });
    } catch (err) {
      console.warn('Saved inventory locally:', err);
    }
  }

  renderInventoryTable();
  renderPublicCatalog();
  e.target.reset();
}

function renderInventoryTable() {
  const tbody = document.getElementById('inventory-tbody');
  if (!tbody) return;

  tbody.innerHTML = state.inventory.map(item => {
    const qty = Number(item.Quantity) || 0;
    const stockBadge = qty <= 3
      ? `<span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">${qty} (Low)</span>`
      : `<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">${qty} pcs</span>`;

    return `
      <tr class="hover:bg-white/5">
        <td class="py-3 px-2 font-mono text-amber-300">${item.SKU}</td>
        <td class="py-3 px-2">
          <div class="font-semibold text-white">${item.ItemName}</div>
          <div class="text-slate-400">${item.Category} · ${item.MetalType}</div>
        </td>
        <td class="py-3 px-2 font-mono">${item.WeightGrams}g</td>
        <td class="py-3 px-2">${stockBadge}</td>
        <td class="py-3 px-2">
          <div class="text-slate-400">Buy: ₹${Number(item.BuyCostINR || 0).toLocaleString('en-IN')}</div>
          <div class="text-amber-300 font-bold">Sell: ₹${Number(item.SellPriceINR || 0).toLocaleString('en-IN')}</div>
        </td>
        <td class="py-3 px-2">${item.PublicShowcase}</td>
      </tr>
    `;
  }).join('');
}

function renderOrdersTable() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;

  tbody.innerHTML = state.customOrders.map(ord => `
    <tr class="hover:bg-white/5">
      <td class="py-3 px-2">
        <div class="font-mono text-amber-300">${ord.OrderID}</div>
        <div class="text-slate-400">${ord.DateCreated}</div>
      </td>
      <td class="py-3 px-2">
        <div class="font-semibold text-white">${ord.CustomerName}</div>
        <div class="text-slate-400">${ord.CustomerPhone}</div>
      </td>
      <td class="py-3 px-2 max-w-xs">
        <span class="text-cyan-300 font-semibold">${ord.Category}:</span>
        <span class="text-slate-200">${ord.DesignDetails}</span>
      </td>
      <td class="py-3 px-2">
        <div>Est: ${ord.EstWeightGrams}g</div>
        <div class="text-slate-400">Due: ${ord.DeliveryDate}</div>
      </td>
      <td class="py-3 px-2">
        <select onchange="updateOrderStatus('${ord.OrderID}', this.value)" class="px-2.5 py-1 rounded-lg bg-black border border-amber-500/30 text-amber-300 text-xs">
          <option value="Pending" ${ord.Status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="With Karigar" ${ord.Status === 'With Karigar' ? 'selected' : ''}>With Karigar</option>
          <option value="Ready" ${ord.Status === 'Ready' ? 'selected' : ''}>Ready for Pickup</option>
          <option value="Delivered" ${ord.Status === 'Delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </td>
    </tr>
  `).join('');
}

async function updateOrderStatus(orderId, newStatus) {
  const ord = state.customOrders.find(o => o.OrderID === orderId);
  if (ord) ord.Status = newStatus;
  if (GOOGLE_SCRIPT_URL) {
    try {
      await callGoogleScriptPOST({
        action: 'updateOrderStatus',
        userId: state.userId,
        passcode: state.passcode,
        orderId,
        status: newStatus
      });
    } catch (err) {
      console.warn('Order status updated locally:', err);
    }
  }
}

function renderUdhaarTable() {
  const tbody = document.getElementById('udhaar-tbody');
  if (!tbody) return;

  const dueList = state.transactions.filter(tx => (Number(tx.BalanceDue) || 0) > 0);
  if (dueList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-emerald-400">🎉 Zero pending Udhaar! All customer accounts are settled.</td></tr>`;
    return;
  }

  tbody.innerHTML = dueList.map(tx => `
    <tr class="hover:bg-white/5">
      <td class="py-3 px-2 font-mono text-slate-300">${tx.TxID}<br/><span class="text-slate-500">${tx.Date}</span></td>
      <td class="py-3 px-2">
        <div class="font-bold text-white">${tx.CustomerName}</div>
        <div class="text-slate-400">${tx.CustomerPhone}</div>
      </td>
      <td class="py-3 px-2 text-slate-200">${tx.ItemDescription}</td>
      <td class="py-3 px-2 font-mono">₹${Number(tx.TotalBillAmount).toLocaleString('en-IN')}</td>
      <td class="py-3 px-2 font-mono text-emerald-300">₹${Number(tx.AmountPaid).toLocaleString('en-IN')}</td>
      <td class="py-3 px-2 font-bold text-rose-400">₹${Number(tx.BalanceDue).toLocaleString('en-IN')}</td>
      <td class="py-3 px-2">
        <button onclick="settleCustomerUdhaar('${tx.TxID}')" class="px-3 py-1 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition">
          Mark Paid
        </button>
      </td>
    </tr>
  `).join('');
}

async function settleCustomerUdhaar(txId) {
  const tx = state.transactions.find(t => t.TxID === txId);
  if (tx) {
    tx.AmountPaid = tx.TotalBillAmount;
    tx.BalanceDue = 0;
  }
  if (GOOGLE_SCRIPT_URL) {
    try {
      await callGoogleScriptPOST({
        action: 'settleUdhaar',
        userId: state.userId,
        passcode: state.passcode,
        txId
      });
    } catch (err) {
      console.warn('Udhaar settled locally:', err);
    }
  }
  renderAdminAll();
}

async function saveLiveRates() {
  const s = Number(document.getElementById('admin-rate-silver').value) || 98;
  const g = Number(document.getElementById('admin-rate-gold').value) || 7450;
  state.rates.silverPerGram = s;
  state.rates.gold22kPerGram = g;
  updateTickerUI();

  if (GOOGLE_SCRIPT_URL) {
    try {
      await callGoogleScriptPOST({
        action: 'updateRates',
        userId: state.userId,
        passcode: state.passcode,
        silverPerGram: s,
        gold22kPerGram: g
      });
    } catch (err) {
      console.warn('Rates updated locally:', err);
    }
  }
}

/* ==========================================================================
   8. BOOTSTRAP APPLICATION ON DOM LOAD
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  initSeedData();
  init3DScrollJewelry();
  updateTickerUI();
  renderPublicCatalog();

  const dateInput = document.getElementById('tx-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
  recalcParchi();

  // Attempt live cloud fetch if Google Script URL is configured
  fetchPublicCatalogFromSheet();
});
