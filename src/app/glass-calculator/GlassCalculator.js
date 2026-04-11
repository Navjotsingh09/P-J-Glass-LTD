'use client';

import { useState, useMemo } from 'react';

// ─── Pricing Data ────────────────────────────────────────────

const GLASS_TYPES = [
  { id: 'clear-toughened', name: 'Clear Toughened Glass', pricePerSqm: 65, desc: 'Standard clear safety glass — most popular' },
  { id: 'low-iron-toughened', name: 'Low-Iron Toughened Glass', pricePerSqm: 85, desc: 'Ultra-clear with no green tint' },
  { id: 'frosted-toughened', name: 'Frosted / Satin Glass', pricePerSqm: 80, desc: 'Obscured glass for privacy' },
  { id: 'tinted-grey', name: 'Grey Tinted Glass', pricePerSqm: 90, desc: 'Smoked grey finish' },
  { id: 'tinted-bronze', name: 'Bronze Tinted Glass', pricePerSqm: 90, desc: 'Warm bronze finish' },
  { id: 'painted-splashback', name: 'Painted Splashback Glass', pricePerSqm: 110, desc: 'RAL/BS colour painted on rear' },
  { id: 'mirror', name: 'Silver Mirror', pricePerSqm: 55, desc: 'Standard silver mirror panel' },
  { id: 'laminated', name: 'Toughened Laminated Glass', pricePerSqm: 120, desc: 'For balustrades & overhead glazing' },
];

const THICKNESSES = [
  { id: '4mm', label: '4mm', multiplier: 0.7, available: ['clear-toughened', 'frosted-toughened', 'mirror'] },
  { id: '6mm', label: '6mm', multiplier: 0.85, available: ['clear-toughened', 'low-iron-toughened', 'frosted-toughened', 'tinted-grey', 'tinted-bronze', 'mirror', 'painted-splashback'] },
  { id: '8mm', label: '8mm', multiplier: 1.0, available: ['clear-toughened', 'low-iron-toughened', 'frosted-toughened', 'tinted-grey', 'tinted-bronze', 'painted-splashback'] },
  { id: '10mm', label: '10mm', multiplier: 1.25, available: ['clear-toughened', 'low-iron-toughened', 'frosted-toughened', 'tinted-grey', 'tinted-bronze', 'painted-splashback', 'laminated'] },
  { id: '12mm', label: '12mm', multiplier: 1.55, available: ['clear-toughened', 'low-iron-toughened', 'laminated'] },
  { id: '15mm', label: '15mm', multiplier: 1.9, available: ['clear-toughened', 'laminated'] },
  { id: '19mm', label: '19mm', multiplier: 2.4, available: ['clear-toughened'] },
];

const SHAPES = [
  { id: 'rectangle', name: 'Rectangle / Square' },
  { id: 'circle', name: 'Circle' },
  { id: 'quarter-circle', name: 'Quarter Circle' },
  { id: 'triangle', name: 'Triangle' },
  { id: 'custom', name: 'Custom Shape' },
];

const EDGE_FINISHES = [
  { id: 'flat-polished', name: 'Flat Polished', pricePerM: 12, desc: 'Standard polished edge — smooth and safe' },
  { id: 'pencil-polished', name: 'Pencil Polished (Round)', pricePerM: 15, desc: 'Rounded pencil-edge finish' },
  { id: 'bevelled', name: 'Bevelled Edge (25mm)', pricePerM: 28, desc: 'Decorative angled bevel — 25mm wide' },
  { id: 'raw', name: 'Raw / Seamed Edge', pricePerM: 0, desc: 'Unpolished — for hidden edges only' },
];

const EXTRAS = [
  { id: 'holes', name: 'Drill Holes', priceEach: 8, desc: 'Standard round cutouts for fixings', unitLabel: 'holes' },
  { id: 'cutouts', name: 'Rectangular Cutouts', priceEach: 25, desc: 'For sockets, switches, pipes', unitLabel: 'cutouts' },
  { id: 'radius-corners', name: 'Radius Corners', priceEach: 6, desc: 'Rounded corners (per corner)', unitLabel: 'corners' },
  { id: 'easy-clean', name: 'Easy-Clean Coating', priceEach: 15, desc: 'Hydrophobic nano-coating (per sq m)', unitLabel: 'per sq m' },
];

// ─── Shape Multipliers ──────────────────────────────────────

function getAreaSqm(shape, widthMm, heightMm) {
  const w = widthMm / 1000;
  const h = heightMm / 1000;
  switch (shape) {
    case 'circle': return Math.PI * (w / 2) * (w / 2);
    case 'quarter-circle': return (Math.PI * w * w) / 4;
    case 'triangle': return (w * h) / 2;
    default: return w * h; // rectangle, custom
  }
}

function getPerimeterM(shape, widthMm, heightMm) {
  const w = widthMm / 1000;
  const h = heightMm / 1000;
  switch (shape) {
    case 'circle': return Math.PI * w;
    case 'quarter-circle': return (Math.PI * w / 2) + w + w;
    case 'triangle': return w + h + Math.sqrt(w * w + h * h);
    default: return 2 * (w + h);
  }
}

// ─── Component ──────────────────────────────────────────────

export default function GlassCalculator() {
  const [glassType, setGlassType] = useState('clear-toughened');
  const [thickness, setThickness] = useState('8mm');
  const [shape, setShape] = useState('rectangle');
  const [widthMm, setWidthMm] = useState('');
  const [heightMm, setHeightMm] = useState('');
  const [edgeFinish, setEdgeFinish] = useState('flat-polished');
  const [edgeCount, setEdgeCount] = useState(4);
  const [extras, setExtras] = useState({});
  const [qty, setQty] = useState(1);

  const selectedGlass = GLASS_TYPES.find(g => g.id === glassType);
  const selectedThickness = THICKNESSES.find(t => t.id === thickness);
  const selectedEdge = EDGE_FINISHES.find(e => e.id === edgeFinish);

  const availableThicknesses = THICKNESSES.filter(t => t.available.includes(glassType));

  // Reset thickness if not available for the selected glass type
  const validThickness = availableThicknesses.find(t => t.id === thickness)
    ? thickness
    : availableThicknesses[0]?.id || '8mm';

  const needsHeight = shape !== 'circle';

  // ─── Price Calculation ─────────────────────────────────────

  const calculation = useMemo(() => {
    const w = parseFloat(widthMm) || 0;
    const h = parseFloat(heightMm) || 0;

    if (w <= 0 || (needsHeight && h <= 0)) return null;

    const area = getAreaSqm(shape, w, needsHeight ? h : w);
    const perimeter = getPerimeterM(shape, w, needsHeight ? h : w);
    const thicknessObj = THICKNESSES.find(t => t.id === validThickness) || selectedThickness;

    // Glass cost
    const glassCost = area * selectedGlass.pricePerSqm * (thicknessObj?.multiplier || 1);

    // Edge cost (per meter of finished edge)
    const edgesPerimeter = shape === 'rectangle'
      ? (edgeCount === 4
          ? perimeter
          : edgeCount === 2
            ? (w / 1000 + w / 1000) // 2 long edges
            : edgeCount === 1
              ? w / 1000
              : 0)
      : perimeter; // full perimeter for non-rectangles
    const edgeCost = edgesPerimeter * selectedEdge.pricePerM;

    // Extras cost
    let extrasCost = 0;
    for (const extra of EXTRAS) {
      const count = extras[extra.id] || 0;
      if (extra.id === 'easy-clean') {
        extrasCost += count > 0 ? area * extra.priceEach : 0;
      } else {
        extrasCost += count * extra.priceEach;
      }
    }

    // Minimum order value
    const subtotal = Math.max(glassCost + edgeCost + extrasCost, 25);
    const total = subtotal * qty;

    return {
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2),
      glassCost: glassCost.toFixed(2),
      edgeCost: edgeCost.toFixed(2),
      extrasCost: extrasCost.toFixed(2),
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      qty,
    };
  }, [widthMm, heightMm, shape, glassType, validThickness, edgeFinish, edgeCount, extras, qty, needsHeight, selectedGlass, selectedThickness, selectedEdge]);

  function toggleExtra(id) {
    setExtras(prev => {
      const current = prev[id] || 0;
      if (id === 'easy-clean') return { ...prev, [id]: current > 0 ? 0 : 1 };
      return { ...prev, [id]: current > 0 ? 0 : 1 };
    });
  }

  function setExtraCount(id, val) {
    const num = Math.max(0, Math.min(20, parseInt(val) || 0));
    setExtras(prev => ({ ...prev, [id]: num }));
  }

  // ─── Render ────────────────────────────────────────────────

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left: Form */}
      <div className="lg:col-span-2 space-y-8">

        {/* Step 1: Glass Type */}
        <div>
          <StepLabel number="01" title="Glass Type" />
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {GLASS_TYPES.map(g => (
              <button
                key={g.id}
                onClick={() => setGlassType(g.id)}
                className={`text-left p-4 border rounded-lg transition-all ${
                  glassType === g.id
                    ? 'border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent'
                    : 'border-brand-silver hover:border-brand-grey'
                }`}
              >
                <span className="text-brand-navy text-sm font-medium block">{g.name}</span>
                <span className="text-brand-grey text-xs mt-1 block">{g.desc}</span>
                <span className="text-brand-accent text-xs font-semibold mt-2 block">
                  from £{g.pricePerSqm}/m²
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Thickness */}
        <div>
          <StepLabel number="02" title="Thickness" />
          <div className="flex flex-wrap gap-3 mt-4">
            {availableThicknesses.map(t => (
              <button
                key={t.id}
                onClick={() => setThickness(t.id)}
                className={`px-5 py-3 border rounded-lg text-sm font-medium transition-all ${
                  validThickness === t.id
                    ? 'border-brand-accent bg-brand-accent/5 text-brand-navy ring-1 ring-brand-accent'
                    : 'border-brand-silver text-brand-grey hover:border-brand-grey'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Shape & Dimensions */}
        <div>
          <StepLabel number="03" title="Shape & Dimensions" />
          <div className="flex flex-wrap gap-3 mt-4 mb-6">
            {SHAPES.map(s => (
              <button
                key={s.id}
                onClick={() => setShape(s.id)}
                className={`px-4 py-2.5 border rounded-lg text-sm transition-all ${
                  shape === s.id
                    ? 'border-brand-accent bg-brand-accent/5 text-brand-navy ring-1 ring-brand-accent font-medium'
                    : 'border-brand-silver text-brand-grey hover:border-brand-grey'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-brand-grey text-xs uppercase tracking-wider mb-2 block">
                {shape === 'circle' ? 'Diameter (mm)' : 'Width (mm)'}
              </label>
              <input
                type="number"
                value={widthMm}
                onChange={e => setWidthMm(e.target.value)}
                placeholder="e.g. 1200"
                min="50"
                max="6000"
                className="w-full px-4 py-3 border border-brand-silver rounded-lg text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all"
              />
            </div>
            {needsHeight && (
              <div>
                <label className="text-brand-grey text-xs uppercase tracking-wider mb-2 block">
                  Height (mm)
                </label>
                <input
                  type="number"
                  value={heightMm}
                  onChange={e => setHeightMm(e.target.value)}
                  placeholder="e.g. 800"
                  min="50"
                  max="6000"
                  className="w-full px-4 py-3 border border-brand-silver rounded-lg text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all"
                />
              </div>
            )}
          </div>
          <p className="text-brand-grey text-xs mt-2 font-light">
            Min 50mm · Max 6000mm · Toughened glass is cut to size with ±1mm tolerance
          </p>
        </div>

        {/* Step 4: Edge Finish */}
        <div>
          <StepLabel number="04" title="Edge Finish" />
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {EDGE_FINISHES.map(e => (
              <button
                key={e.id}
                onClick={() => setEdgeFinish(e.id)}
                className={`text-left p-4 border rounded-lg transition-all ${
                  edgeFinish === e.id
                    ? 'border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent'
                    : 'border-brand-silver hover:border-brand-grey'
                }`}
              >
                <span className="text-brand-navy text-sm font-medium block">{e.name}</span>
                <span className="text-brand-grey text-xs mt-1 block">{e.desc}</span>
                {e.pricePerM > 0 && (
                  <span className="text-brand-accent text-xs font-semibold mt-2 block">
                    +£{e.pricePerM}/m
                  </span>
                )}
              </button>
            ))}
          </div>
          {shape === 'rectangle' && edgeFinish !== 'raw' && (
            <div className="mt-4">
              <label className="text-brand-grey text-xs uppercase tracking-wider mb-2 block">
                Number of Finished Edges
              </label>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => setEdgeCount(n)}
                    className={`w-12 h-12 border rounded-lg text-sm font-medium transition-all ${
                      edgeCount === n
                        ? 'border-brand-accent bg-brand-accent/5 text-brand-navy ring-1 ring-brand-accent'
                        : 'border-brand-silver text-brand-grey hover:border-brand-grey'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 5: Extras */}
        <div>
          <StepLabel number="05" title="Extras" />
          <div className="space-y-3 mt-4">
            {EXTRAS.map(extra => {
              const count = extras[extra.id] || 0;
              const isActive = count > 0;
              return (
                <div
                  key={extra.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                    isActive ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-silver'
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-brand-navy text-sm font-medium block">{extra.name}</span>
                    <span className="text-brand-grey text-xs">{extra.desc}</span>
                    <span className="text-brand-accent text-xs font-semibold block mt-1">
                      +£{extra.priceEach}/{extra.id === 'easy-clean' ? 'sq m' : 'each'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {extra.id === 'easy-clean' ? (
                      <button
                        onClick={() => toggleExtra(extra.id)}
                        className={`w-10 h-6 rounded-full transition-all relative ${
                          isActive ? 'bg-brand-accent' : 'bg-brand-silver'
                        }`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                          isActive ? 'left-[18px]' : 'left-0.5'
                        }`} />
                      </button>
                    ) : (
                      <div className="flex items-center border border-brand-silver rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExtraCount(extra.id, count - 1)}
                          className="px-3 py-2 text-brand-grey hover:bg-brand-offwhite transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="px-3 py-2 text-brand-navy text-sm font-medium min-w-[2.5rem] text-center">
                          {count}
                        </span>
                        <button
                          onClick={() => setExtraCount(extra.id, count + 1)}
                          className="px-3 py-2 text-brand-grey hover:bg-brand-offwhite transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 6: Quantity */}
        <div>
          <StepLabel number="06" title="Quantity" />
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border border-brand-silver rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-4 py-3 text-brand-grey hover:bg-brand-offwhite transition-colors"
              >
                −
              </button>
              <span className="px-6 py-3 text-brand-navy font-medium min-w-[3rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(q => Math.min(100, q + 1))}
                className="px-4 py-3 text-brand-grey hover:bg-brand-offwhite transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-brand-grey text-sm font-light">panels</span>
          </div>
        </div>
      </div>

      {/* Right: Price Summary (Sticky) */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 bg-brand-offwhite rounded-xl p-6 border border-brand-silver">
          <h3 className="text-brand-navy text-lg font-medium mb-6">Your Quote</h3>

          {/* Spec Summary */}
          <div className="space-y-3 mb-6 text-sm">
            <SummaryRow label="Glass" value={selectedGlass.name} />
            <SummaryRow label="Thickness" value={validThickness} />
            <SummaryRow label="Shape" value={SHAPES.find(s => s.id === shape)?.name} />
            {widthMm && (
              <SummaryRow
                label="Size"
                value={
                  shape === 'circle'
                    ? `Ø${widthMm}mm`
                    : `${widthMm}${heightMm ? ` × ${heightMm}` : ''}mm`
                }
              />
            )}
            <SummaryRow label="Edge" value={selectedEdge.name} />
            {shape === 'rectangle' && edgeFinish !== 'raw' && (
              <SummaryRow label="Finished Edges" value={`${edgeCount} of 4`} />
            )}
            {qty > 1 && <SummaryRow label="Quantity" value={`× ${qty}`} />}
          </div>

          <div className="border-t border-brand-silver pt-4 mb-4">
            {calculation ? (
              <div className="space-y-2">
                <PriceRow label="Glass" value={`£${calculation.glassCost}`} />
                <PriceRow label="Edge Finish" value={`£${calculation.edgeCost}`} />
                {parseFloat(calculation.extrasCost) > 0 && (
                  <PriceRow label="Extras" value={`£${calculation.extrasCost}`} />
                )}
                {qty > 1 && (
                  <PriceRow label={`Per Panel`} value={`£${calculation.subtotal}`} subtle />
                )}
                <div className="border-t border-brand-silver pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-brand-navy font-semibold">Total (ex VAT)</span>
                    <span className="text-brand-navy text-2xl font-semibold">
                      £{calculation.total}
                    </span>
                  </div>
                  <p className="text-brand-grey text-xs mt-1 font-light">
                    inc. VAT: £{(parseFloat(calculation.total) * 1.2).toFixed(2)}
                  </p>
                </div>
                <p className="text-brand-grey text-xs mt-2 font-light">
                  Area: {calculation.area} m² · Perimeter: {calculation.perimeter} m
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-brand-grey text-sm font-light">
                  Enter dimensions to see your price
                </p>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 mt-6">
            <a
              href={`https://wa.me/442085991622?text=${encodeURIComponent(
                calculation
                  ? `Hi, I'd like a quote for:\n${selectedGlass.name} (${validThickness})\n${widthMm}${needsHeight ? ` × ${heightMm}` : ''}mm ${SHAPES.find(s => s.id === shape)?.name}\n${selectedEdge.name} edge\nQty: ${qty}\nEstimated: £${calculation.total} ex VAT`
                  : `Hi, I'd like a glass quote please.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled w-full text-center justify-center text-xs"
            >
              Get Quote on WhatsApp
            </a>
            <a
              href="tel:02085991622"
              className="btn-outline-fluid w-full text-center justify-center text-xs"
            >
              Call 020 8599 1622
            </a>
          </div>

          <p className="text-brand-grey text-[10px] mt-4 font-light text-center leading-relaxed">
            Prices are estimates for guidance only. Final price confirmed after
            survey or technical review. Delivery charges may apply.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────

function StepLabel({ number, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-brand-accent text-xs font-semibold tracking-wider">{number}</span>
      <h3 className="text-brand-navy text-base font-medium">{title}</h3>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-brand-grey font-light">{label}</span>
      <span className="text-brand-navy font-medium text-right">{value}</span>
    </div>
  );
}

function PriceRow({ label, value, subtle }) {
  return (
    <div className="flex justify-between text-sm">
      <span className={subtle ? 'text-brand-grey/60' : 'text-brand-grey'}>{label}</span>
      <span className={subtle ? 'text-brand-grey/60' : 'text-brand-navy font-medium'}>{value}</span>
    </div>
  );
}
