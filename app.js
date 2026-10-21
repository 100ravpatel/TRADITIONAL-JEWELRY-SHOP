/**
 * ============================================================================
 * SHREE MAGADH ALANKAR MANDIR - 3D SCROLL ENGINE, 360° PRODUCT STUDIO & ERP
 * Pre-configured with your deployed Google Apps Script Web App URL
 * ============================================================================
 */

const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyX1XrZBA751KOCsmvlvGAPkJXCxo8uBeI7pPofBLAVLyd5wEXYYq5DH1ti1a0he8CL/exec';
let GOOGLE_SCRIPT_URL = localStorage.getItem('BIHAR_JEWELRY_API_URL') || DEFAULT_GOOGLE_SCRIPT_URL;

if (!localStorage.getItem('BIHAR_JEWELRY_API_URL')) {
  localStorage.setItem('BIHAR_JEWELRY_API_URL', DEFAULT_GOOGLE_SCRIPT_URL);
}

// Curated High-Definition Multi-Angle Jewelry Gallery per Category & SKU
const HD_JEWELRY_GALLERY = {
  'BIH-PYL-01': [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85'
  ],
  'BIH-PYL-02': [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85'
  ],
  'BIH-EAR-01': [
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1000&q=85'
  ],
  'BIH-EAR-02': [
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85'
  ],
  'BIH-CGD-01': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85'
  ],
  'BIH-BLA-01': [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85'
  ],
  'BIH-BLA-02': [
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85'
  ],
  'BIH-SLV-01': [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85'
  ],
  'BIH-SLV-02': [
    'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85'
  ]
};

const CATEGORY_FALLBACK_IMAGES = {
  'Payal': [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85'
  ],
  'Earring': [
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1000&q=85'
  ],
  'City Gold': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85'
  ],
  'Kids Bala': [
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85'
  ],
  'Silver Item': [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85'
  ]
};

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

let chart30DaysInstance = null;
let chartCategoryInstance = null;

// 360° Modal Turntable State
const viewer360 = {
  initialized: false,
  scene: null,
  camera: null,
  renderer: null,
  meshGroup: null,
  autoSpin: true,
  angleRad: 0,
  tiltRad: 0.25,
  isDragging: false,
  lastX: 0,
  lastY: 0,
  currentItem: null
};

/* ==========================================================================
   1. INITIALIZATION & FALLBACK SEED DATA
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
    { TxID: 'TX-901202', Date: fmtDate(0), Type: 'SELL', CustomerName: 'Poonam Kumari', CustomerPhone: '9431088776', Category: 'Kids Bala', ItemDescription: 'Pure Chandi Kids Bala Pair', MetalType: 'Silver', WeightGrams: 26, RatePerGram: 98, MakingCharges: 402, OldMetalDeduction: 0, TotalBillAmount: 2950, AmountPaid: 2950, PaymentMode: 'UPI / PhonePe', BalanceDue: 0, Notes: 'Mundan gift' },
    { TxID: 'TX-901203', Date: fmtDate(0), Type: 'BUY', CustomerName: 'Ramesh Bullion Patna', CustomerPhone: '9123456780', Category: 'Old Metal Exchange', ItemDescription: 'Purchased Old Chandi Scrap 95g', MetalType: 'Silver', WeightGrams: 95, RatePerGram: 78, MakingCharges: 0, OldMetalDeduction: 0, TotalBillAmount: 7410, AmountPaid: 7410, BalanceDue: 0, PaymentMode: 'Cash', Notes: 'Melting stock' }
  ];

  state.customOrders = [
    { OrderID: 'ORD-782101', DateCreated: fmtDate(1), CustomerName: 'Sudha Devi', CustomerPhone: '9835223344', Category: 'Payal', DesignDetails: '250g Heavy Dulhan Payal with peacock clasp & double ghungroo line', EstWeightGrams: 250, EstimatedPrice: 26500, AdvancePaid: 5000, DeliveryDate: fmtDate(-5), KarigarName: 'Ustaad Bhola Jee', Status: 'With Karigar' }
  ];
}

function getItemGallery(item) {
  if (item.ImageURL && String(item.ImageURL).startsWith('http')) {
    const fallback = CATEGORY_FALLBACK_IMAGES[item.Category] || CATEGORY_FALLBACK_IMAGES['Payal'];
    return [item.ImageURL, fallback[1], fallback[2]];
  }
  if (HD_JEWELRY_GALLERY[item.SKU]) {
    return HD_JEWELRY_GALLERY[item.SKU];
  }
  return CATEGORY_FALLBACK_IMAGES[item.Category] || CATEGORY_FALLBACK_IMAGES['Payal'];
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

  const ornamentGroup = new THREE.Group();
  scene.add(ornamentGroup);

  const coreGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.68, 1), coreGemMaterial);
  ornamentGroup.add(coreGem);

  const balaCoreRing = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.14, 32, 100), goldMaterial);
  ornamentGroup.add(balaCoreRing);

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

  const ghungrooNodes = [];
  const totalBells = 16;
  for (let i = 0; i < totalBells; i++) {
    const angle = (i / totalBells) * Math.PI * 2;
    const bellGroup = new THREE.Group();

    const bellSphere = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 24), silverMaterial);
    const kundaCap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.12, 12), goldMaterial);
    kundaCap.position.y = 0.15;

    bellGroup.add(bellSphere);
    bellGroup.add(kundaCap);

    const baseRadius = 1.76;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const dirZ = (i % 2 === 0 ? 1 : -1) * 0.35;

    bellGroup.position.set(dirX * baseRadius, dirY * baseRadius, 0);
    bellGroup.rotation.z = angle - Math.PI / 2;

    bellGroup.userData = { angle, baseRadius, dirX, dirY, dirZ, index: i };
    ornamentGroup.add(bellGroup);
    ghungrooNodes.push(bellGroup);
  }

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

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * 0.07;
    const p = smoothScrollProgress;
    updateScrollHUD(p);

    const explosionFactor = Math.sin(p * Math.PI);
    const morphFactor = Math.max(0, Math.min(1, (p - 0.35) / 0.5));

    ornamentGroup.rotation.y = p * Math.PI * 3.2 + elapsed * 0.22 + pointerX * 0.35;
    ornamentGroup.rotation.x = Math.sin(p * Math.PI * 2) * 0.45 + pointerY * 0.25;

    const gemScale = 1 + explosionFactor * 0.55 + Math.sin(elapsed * 2.5) * 0.04;
    coreGem.scale.set(gemScale, gemScale * (1 + morphFactor * 0.4), gemScale);
    coreGem.rotation.y = -elapsed * 0.8 - p * 4;

    const balaScale = 1 + explosionFactor * 0.28;
    balaCoreRing.scale.set(balaScale, balaScale, 1 + morphFactor * 0.5);
    balaCoreRing.rotation.x = p * Math.PI * 1.5;

    gimbalRings.forEach((ring, idx) => {
      const cfg = ring.userData;
      ring.position.z = cfg.explodeY * explosionFactor * 1.15;
      ring.rotation.x = cfg.baseRotX + p * Math.PI * (idx + 1) * 1.2;
      ring.rotation.y = cfg.baseRotY - p * Math.PI * (idx + 1) * 0.9;
      const s = 1 + morphFactor * 0.18 * (idx % 2 === 0 ? 1 : -1);
      ring.scale.set(s, s, s);
    });

    ghungrooNodes.forEach((bell) => {
      const u = bell.userData;
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
   3. 360° PRODUCT INSPECTION STUDIO (CATEGORY-ACCURATE 3D + HD PHOTO LOUPE)
   ========================================================================== */
function initProduct360Viewer() {
  if (viewer360.initialized) return;
  const canvas = document.getElementById('product-360-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0.3, 6.2);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth || 500, canvas.clientHeight || 340);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);

  const keyLight = new THREE.PointLight(0xffd166, 4.5, 25);
  keyLight.position.set(4, 4, 5);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x90e0ef, 3.2, 25);
  fillLight.position.set(-4, -2, 4);
  scene.add(fillLight);

  const meshGroup = new THREE.Group();
  scene.add(meshGroup);

  viewer360.scene = scene;
  viewer360.camera = camera;
  viewer360.renderer = renderer;
  viewer360.meshGroup = meshGroup;
  viewer360.initialized = true;

  // Interactive Drag-to-Rotate 360°
  canvas.addEventListener('pointerdown', (e) => {
    viewer360.isDragging = true;
    viewer360.autoSpin = false;
    updateAutoSpinButtonUI();
    viewer360.lastX = e.clientX;
    viewer360.lastY = e.clientY;
  });

  window.addEventListener('pointermove', (e) => {
    if (!viewer360.isDragging) return;
    const dx = e.clientX - viewer360.lastX;
    const dy = e.clientY - viewer360.lastY;
    viewer360.lastX = e.clientX;
    viewer360.lastY = e.clientY;

    viewer360.angleRad += dx * 0.012;
    viewer360.tiltRad = Math.max(-0.8, Math.min(0.8, viewer360.tiltRad + dy * 0.008));

    // Sync slider degree display
    let deg = Math.round(((viewer360.angleRad * 180) / Math.PI) % 360);
    if (deg < 0) deg += 360;
    const slider = document.getElementById('slider-360-angle');
    const label = document.getElementById('label-360-degree');
    if (slider) slider.value = deg;
    if (label) label.textContent = `${deg}°`;
  });

  window.addEventListener('pointerup', () => {
    viewer360.isDragging = false;
  });

  function animate360() {
    requestAnimationFrame(animate360);
    const modal = document.getElementById('modal-360');
    if (!modal || modal.classList.contains('hidden')) return;

    if (viewer360.autoSpin && !viewer360.isDragging) {
      viewer360.angleRad += 0.012;
      let deg = Math.round(((viewer360.angleRad * 180) / Math.PI) % 360);
      if (deg < 0) deg += 360;
      const slider = document.getElementById('slider-360-angle');
      const label = document.getElementById('label-360-degree');
      if (slider) slider.value = deg;
      if (label) label.textContent = `${deg}°`;
    }

    viewer360.meshGroup.rotation.y = viewer360.angleRad;
    viewer360.meshGroup.rotation.x = viewer360.tiltRad;
    viewer360.renderer.render(viewer360.scene, viewer360.camera);
  }
  animate360();
}

/**
 * Builds a category-authentic 3D Jewelry Model inside the 360° Turntable
 */
function buildCategory3DModel(item) {
  if (!viewer360.meshGroup) return;

  // Clear previous model
  while (viewer360.meshGroup.children.length > 0) {
    viewer360.meshGroup.remove(viewer360.meshGroup.children[0]);
  }

  const isSilver = item.MetalType === 'Silver';
  const primaryMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isSilver ? '#e2eafc' : '#ffd166'),
    metalness: 0.96,
    roughness: 0.12
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(isSilver ? '#ffd166' : '#ff4d6d'),
    metalness: 0.85,
    roughness: 0.18
  });

  const cat = item.Category;

  if (cat === 'Payal') {
    // Curved Chandi Payal Anklet + 24 Hanging Ghungroo Bells
    const mainChain = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.09, 28, 100), primaryMat);
    const innerFiligree = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.04, 20, 90), primaryMat);
    viewer360.meshGroup.add(mainChain, innerFiligree);

    const bells = 24;
    for (let i = 0; i < bells; i++) {
      const a = (i / bells) * Math.PI * 2;
      const bell = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 20), primaryMat);
      bell.position.set(Math.cos(a) * 1.72, Math.sin(a) * 1.72, (i % 2 === 0 ? 0.06 : -0.06));
      viewer360.meshGroup.add(bell);
    }
  } else if (cat === 'Earring') {
    // Traditional Suryamukhi Jhumka Dome + Hanging Golden Drops
    const studTop = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), primaryMat);
    studTop.position.y = 1.35;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 16), primaryMat);
    stem.position.y = 0.9;
    const jhumkaDome = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.58),
      primaryMat
    );
    jhumkaDome.position.y = 0.1;
    viewer360.meshGroup.add(studTop, stem, jhumkaDome);

    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), accentMat);
      drop.position.set(Math.cos(a) * 0.98, -0.42, Math.sin(a) * 0.98);
      viewer360.meshGroup.add(drop);
    }
  } else if (cat === 'City Gold') {
    // Multi-Layer Patna Bridal Rani Haar Necklace + Pendant
    const outerHaar = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.08, 24, 100), primaryMat);
    const innerHaar = new THREE.Mesh(new THREE.TorusGeometry(1.30, 0.06, 24, 90), primaryMat);
    const pendant = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 1), accentMat);
    pendant.position.set(0, -1.75, 0.12);
    viewer360.meshGroup.add(outerHaar, innerHaar, pendant);

    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), primaryMat);
      bead.position.set(Math.cos(a) * 1.65, Math.sin(a) * 1.65, 0.09);
      viewer360.meshGroup.add(bead);
    }
  } else if (cat === 'Kids Bala') {
    // Pair of Smooth Kids Chandi Bala Bangles with Nazariya Beads
    const leftBala = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.13, 28, 90), primaryMat);
    leftBala.position.x = -0.65;
    leftBala.rotation.y = 0.35;

    const rightBala = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.13, 28, 90), primaryMat);
    rightBala.position.x = 0.65;
    rightBala.rotation.y = -0.35;

    viewer360.meshGroup.add(leftBala, rightBala);
  } else {
    // Silver Coin / Bichhiya Floral Ornament
    const coinDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 0.16, 48), primaryMat);
    coinDisc.rotation.x = Math.PI / 2;
    const rimTorus = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.09, 24, 90), primaryMat);
    const emblem = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 1), accentMat);
    viewer360.meshGroup.add(coinDisc, rimTorus, emblem);
  }
}

function open360Modal(sku) {
  const item = state.inventory.find(i => i.SKU === sku) || state.inventory[0];
  if (!item) return;
  viewer360.currentItem = item;

  const modal = document.getElementById('modal-360');
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // Populate details
  document.getElementById('modal-360-badge').textContent = `${item.Category} · ${item.MetalType}`;
  document.getElementById('modal-360-title').textContent = item.ItemName;
  document.getElementById('modal-360-sku').textContent = `SKU: ${item.SKU}`;
  document.getElementById('modal-360-price').textContent = `₹${Number(item.SellPriceINR).toLocaleString('en-IN')}`;
  document.getElementById('modal-360-weight').textContent = `${item.WeightGrams}g`;

  // Populate HD Gallery & Thumbnails
  const gallery = getItemGallery(item);
  const mainImg = document.getElementById('modal-360-main-img');
  mainImg.src = gallery[0];

  const thumbsContainer = document.getElementById('modal-360-thumbs');
  const angleLabels = ['Front Karigari', 'Side Filigree', 'Clasp & Polish'];
  thumbsContainer.innerHTML = gallery.map((imgUrl, idx) => `
    <button onclick="select360PhotoAngle('${imgUrl}', this)"
            class="thumb-btn ${idx === 0 ? 'thumb-360-active' : ''} flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-black/80 border border-white/15 hover:border-amber-400 transition">
      <img src="${imgUrl}" class="w-10 h-10 rounded-lg object-cover" />
      <span class="text-[11px] text-amber-100 font-medium pr-1">${angleLabels[idx] || 'Angle ' + (idx + 1)}</span>
    </button>
  `).join('');

  // Book Order Button inside Modal
  const bookBtn = document.getElementById('btn-modal-book-order');
  bookBtn.onclick = () => {
    close360Modal();
    prefillCustomOrder(item.Category, item.ItemName, item.WeightGrams);
    document.getElementById('custom-order-section').scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize & Resize 360° 3D Turntable
  setTimeout(() => {
    initProduct360Viewer();
    const canvas = document.getElementById('product-360-canvas');
    if (canvas && viewer360.renderer && viewer360.camera) {
      const w = canvas.clientWidth || 500;
      const h = canvas.clientHeight || 340;
      viewer360.camera.aspect = w / h;
      viewer360.camera.updateProjectionMatrix();
      viewer360.renderer.setSize(w, h);
    }
    viewer360.angleRad = 0;
    viewer360.tiltRad = 0.25;
    viewer360.autoSpin = true;
    updateAutoSpinButtonUI();
    buildCategory3DModel(item);
  }, 50);
}

function close360Modal() {
  const modal = document.getElementById('modal-360');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function switch360Mode(mode) {
  const stage3d = document.getElementById('stage-360-3d');
  const stagePhoto = document.getElementById('stage-360-photo');
  const btn3d = document.getElementById('btn-mode-3d');
  const btnPhoto = document.getElementById('btn-mode-photo');

  if (mode === '3d') {
    stage3d.classList.remove('hidden');
    stagePhoto.classList.add('hidden');
    btn3d.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-black transition';
    btnPhoto.className = 'px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200 hover:bg-white/10 transition';
  } else {
    stage3d.classList.add('hidden');
    stagePhoto.classList.remove('hidden');
    btnPhoto.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-black transition';
    btn3d.className = 'px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200 hover:bg-white/10 transition';
  }
}

function select360PhotoAngle(imgUrl, btnEl) {
  const mainImg = document.getElementById('modal-360-main-img');
  mainImg.src = imgUrl;
  document.querySelectorAll('#modal-360-thumbs .thumb-btn').forEach(b => b.classList.remove('thumb-360-active'));
  if (btnEl) btnEl.classList.add('thumb-360-active');
}

function handleHDPhotoZoom(e) {
  const container = document.getElementById('hd-zoom-container');
  const img = document.getElementById('modal-360-main-img');
  if (!container || !img) return;
  const rect = container.getBoundingClientRect();
  const xPct = ((e.clientX - rect.left) / rect.width) * 100;
  const yPct = ((e.clientY - rect.top) / rect.height) * 100;
  img.style.transformOrigin = `${xPct}% ${yPct}%`;
  img.style.transform = 'scale(2.4)';
}

function resetHDPhotoZoom() {
  const img = document.getElementById('modal-360-main-img');
  if (!img) return;
  img.style.transformOrigin = 'center center';
  img.style.transform = 'scale(1)';
}

function handle360SliderInput(degVal) {
  viewer360.autoSpin = false;
  updateAutoSpinButtonUI();
  const deg = Number(degVal) || 0;
  viewer360.angleRad = (deg * Math.PI) / 180;
  document.getElementById('label-360-degree').textContent = `${deg}°`;

  // Also rotate HD photo perspective slightly if in photo mode
  const img = document.getElementById('modal-360-main-img');
  if (img) {
    const tiltY = Math.sin(viewer360.angleRad) * 14;
    img.style.transform = `perspective(800px) rotateY(${tiltY}deg) scale(1.04)`;
  }
}

function toggle360AutoSpin() {
  viewer360.autoSpin = !viewer360.autoSpin;
  updateAutoSpinButtonUI();
}

function updateAutoSpinButtonUI() {
  const btn = document.getElementById('btn-autospin');
  if (!btn) return;
  if (viewer360.autoSpin) {
    btn.textContent = '⟳ Auto-Spin: ON';
    btn.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
  } else {
    btn.textContent = '⟳ Auto-Spin: PAUSED';
    btn.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 text-slate-300 border border-white/20';
  }
}

/* ==========================================================================
   4. GOOGLE SHEETS API CLIENT & DATA SYNC
   ========================================================================== */
async function callGoogleScriptPOST(payload) {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('NO_API_URL');
  }
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
    const res = await fetch(GOOGLE_SCRIPT_URL, { redirect: 'follow' });
    const data = await res.json();
    if (data.status === 'success') {
      if (data.shopName) {
        const titleEl = document.getElementById('nav-shop-title');
        if (titleEl) titleEl.textContent = data.shopName;
      }
      if (data.rates) state.rates = data.rates;
      if (data.catalog && data.catalog.length > 0) {
        state.inventory = data.catalog.map(c => ({
          ...c,
          Quantity: c.InStock ? 10 : 0,
          PublicShowcase: 'YES'
        }));
      }
      updateSyncBadge('✓ Live Google Sheet Connected', true);
      updateTickerUI();
      renderPublicCatalog();
    } else {
      updateSyncBadge('Run setupDatabase() in Apps Script', false);
    }
  } catch (err) {
    console.warn('Cloud fetch notice:', err.message);
    updateSyncBadge('Offline / Demo Fallback Active', false);
  }
}

async function syncAdminWithSheet() {
  if (!GOOGLE_SCRIPT_URL || !state.isAuthenticated) return;
  updateSyncBadge('Syncing with Google Sheet...', true);
  try {
    const res = await callGoogleScriptPOST({
      action: 'adminSync',
      userId: state.userId,
      passcode: state.passcode
    });
    if (res.status === 'success') {
      state.rates = res.rates || state.rates;
      state.inventory = res.inventory || [];
      state.transactions = res.transactions || [];
      state.customOrders = res.customOrders || [];
      updateSyncBadge('✓ Live Google Sheet Synced', true);
      renderAdminAll();
      renderPublicCatalog();
    }
  } catch (err) {
    console.warn('Sync error:', err);
    updateSyncBadge('Sync Error - Check Deployment Access', false);
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
  document.getElementById('ticker-gold').textContent = `₹${Number(state.rates.gold22kPerGram).toLocaleString('en-IN')}/g`;
  const sInput = document.getElementById('admin-rate-silver');
  const gInput = document.getElementById('admin-rate-gold');
  if (sInput) sInput.value = state.rates.silverPerGram;
  if (gInput) gInput.value = state.rates.gold22kPerGram;
}

/* ==========================================================================
   5. PUBLIC SHOWCASE CATALOG (WITH HD IMAGES & 360° VIEW LAUNCHER)
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

    const gallery = getItemGallery(item);
    const primaryImg = gallery[0];

    return `
      <div class="group rounded-3xl bg-white/5 border border-amber-500/20 overflow-hidden hover:border-amber-400/70 transition flex flex-col justify-between shadow-2xl">
        <div>
          <!-- HD Image Container with 360° Interactive Trigger -->
          <div onclick="open360Modal('${item.SKU}')" class="relative h-56 w-full overflow-hidden bg-black cursor-pointer">
            <img src="${primaryImg}" alt="${item.ItemName}" loading="lazy" class="catalog-card-img w-full h-full object-cover opacity-90 group-hover:opacity-100" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#09080d] via-transparent to-black/40"></div>

            <!-- Top Overlay Badges -->
            <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <span class="px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${badgeColor}">
                ${item.Category} · ${item.MetalType}
              </span>
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/75 text-amber-300 border border-amber-400/50 backdrop-blur-md flex items-center gap-1 shadow-lg">
                🔄 360° HD View
              </span>
            </div>

            <!-- Bottom Overlay Weight & Multi-Angle Indicator -->
            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span class="text-xs font-semibold text-white bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                ⚖️ ${item.WeightGrams} Grams
              </span>
              <span class="text-[11px] text-amber-300 font-medium bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-black transition">
                Click to Spin 360° →
              </span>
            </div>
          </div>

          <!-- Item Title & SKU -->
          <div class="p-5 pb-2">
            <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>SKU: ${item.SKU}</span>
              <span class="text-emerald-400">● Ready / Custom Order</span>
            </div>
            <h4 onclick="open360Modal('${item.SKU}')" class="font-cinzel text-lg font-bold text-white group-hover:text-amber-300 transition cursor-pointer">
              ${item.ItemName}
            </h4>
          </div>
        </div>

        <!-- Card Footer: Price + 360° Button + Order Button -->
        <div class="p-5 pt-3 mt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <span class="text-[10px] uppercase tracking-wider text-slate-400 block">Approx Showcase Price</span>
            <span class="text-xl font-bold text-amber-300">₹${Number(item.SellPriceINR).toLocaleString('en-IN')}</span>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="open360Modal('${item.SKU}')"
                    class="px-3 py-2 rounded-xl bg-white/10 border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-amber-500/20 transition">
              360° View
            </button>
            <a href="#custom-order-section" onclick="prefillCustomOrder('${item.Category}', '${item.ItemName.replace(/'/g, "\\'")}', ${item.WeightGrams})"
               class="px-3.5 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition">
              Order
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function prefillCustomOrder(category, itemName, weight) {
  document.getElementById('pub-order-category').value = category;
  document.getElementById('pub-order-weight').value = weight;
  document.getElementById('pub-order-details').value = `Interested in ${itemName} (${weight}g). Inspected in 360° HD view—please confirm making charges and availability.`;
}

async function submitPublicCustomOrder(e) {
  e.preventDefault();
  const msgEl = document.getElementById('pub-order-msg');
  msgEl.textContent = 'Saving order to Google Sheet...';

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
      const res = await callGoogleScriptPOST({
        action: 'publicCustomOrder',
        customerName: newOrder.CustomerName,
        customerPhone: newOrder.CustomerPhone,
        category: newOrder.Category,
        estWeightGrams: newOrder.EstWeightGrams,
        deliveryDate: newOrder.DeliveryDate,
        designDetails: newOrder.DesignDetails
      });
      if (res && res.orderId) newOrder.OrderID = res.orderId;
    } catch (err) {
      console.warn('Saved locally:', err);
    }
  }

  msgEl.textContent = `✓ Order ${newOrder.OrderID} saved to Shop Google Sheet!`;
  e.target.reset();
  if (state.isAuthenticated) renderAdminAll();
}

/* ==========================================================================
   6. SHOPKEEPER AUTHENTICATION & VIEW SWITCHING
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
  btn.textContent = 'Verifying with Google Sheet...';

  if (apiUrlInput) {
    GOOGLE_SCRIPT_URL = apiUrlInput;
    localStorage.setItem('BIHAR_JEWELRY_API_URL', GOOGLE_SCRIPT_URL);
  }

  if (GOOGLE_SCRIPT_URL) {
    try {
      const res = await callGoogleScriptPOST({
        action: 'adminSync',
        userId,
        passcode
      });
      if (res.status === 'unauthorized') {
        errEl.textContent = 'Invalid User ID or Passcode in RatesAndConfig sheet.';
        errEl.classList.remove('hidden');
        btn.textContent = 'Unlock Shop ERP & 30-Day Dashboard';
        return;
      }
      if (res.status === 'success') {
        state.rates = res.rates || state.rates;
        state.inventory = res.inventory || [];
        state.transactions = res.transactions || [];
        state.customOrders = res.customOrders || [];
        updateSyncBadge('✓ Live Google Sheet Synced', true);
      }
    } catch (err) {
      console.warn('Cloud sync unreachable, falling back to local verification:', err);
      if (userId !== 'admin' || passcode !== 'bihar123') {
        errEl.textContent = 'Could not reach Google Sheet & local credentials did not match.';
        errEl.classList.remove('hidden');
        btn.textContent = 'Unlock Shop ERP & 30-Day Dashboard';
        return;
      }
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
   7. ROZNAMCHA CALCULATOR, TODAY'S SELL/BUY & 30-DAY ANALYTICS
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
  renderAdminAll();

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
      updateSyncBadge('✓ Saved to Google Sheet', true);
    } catch (err) {
      console.warn('Saved locally:', err);
    }
  }

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

    if (String(tx.Date).slice(0, 10) === todayStr) {
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
