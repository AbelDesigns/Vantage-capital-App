(function () {
  'use strict';

  // ===========================================================================
  // 1. APPLICATION STATE
  // ===========================================================================
  const state = {
    activeView: 'overview',
    timeframe: '1M',
    analyticsPeriod: '6M',
    privacyMode: false,
    mobilePreview: false,
    txFilter: 'all',
    txQuery: '',
    rebalanceApplied: false,
    activeCardIdx: 0,
    transfer: {
      sendCurrency: 'USD',
      receiveCurrency: 'EUR',
      amount: 25000,
      rail: 'instant',
      recipientId: 'rec-1',
      swapCount: 0,
    },
    cards: [
      {
        id: 'card-metal',
        name: 'Vantage Infinite',
        badge: 'Metal · Física',
        numberFull: '4532  8910  2241  4092',
        numberMasked: '••••  ••••  ••••  4092',
        holder: 'ALEJANDRO MORALES',
        exp: '09/29',
        cvv: '842',
        spent: 4820.80,
        monthlyLimit: 50000,
        frozen: false,
        showDetails: false,
        onlinePayments: true,
        intlSpending: true,
        applePay: true,
        theme: 'metal',
      },
      {
        id: 'card-virtual',
        name: 'Vantage Cloud SaaS',
        badge: 'Virtual · Desechable',
        numberFull: '4532  7741  0089  9104',
        numberMasked: '••••  ••••  ••••  9104',
        holder: 'TREASURY OPS',
        exp: '11/28',
        cvv: '319',
        spent: 3840.00,
        monthlyLimit: 20000,
        frozen: false,
        showDetails: false,
        onlinePayments: true,
        intlSpending: true,
        applePay: true,
        theme: 'gold',
      },
    ],
    settings: {
      baseCurrency: 'USD',
      passkeyEnabled: true,
      instantAlerts: true,
      copilotInsights: true,
      erpNetSuite: true,
      erpXero: false,
      erpSlack: true,
    },
    accounts: [
      { id: 'acc-usd', currency: 'USD', label: 'Treasury Account', mask: '••8841', balance: 324500.00, apy: '4.85% APY', spark: [14, 16, 15, 19, 22, 25, 28] },
      { id: 'acc-eur', currency: 'EUR', label: 'SEPA Liquidity', mask: '••2094', balance: 148200.00, apy: '3.40% APY', spark: [18, 17, 19, 20, 21, 22, 24] },
      { id: 'acc-gbp', currency: 'GBP', label: 'UK Reserve', mask: '••5112', balance: 62400.00, apy: '4.60% APY', spark: [12, 13, 14, 14, 16, 17, 19] },
      { id: 'acc-usdc', currency: 'USDC', label: 'Digital Settlement', mask: '0x94…e2', balance: 54120.45, apy: '5.10% APY', spark: [10, 14, 15, 18, 21, 24, 27] },
    ],
    holdings: [
      { symbol: 'SGOV', name: 'iShares 0-3M Treasury Bond', category: 'Bonos del Tesoro', value: 245000, weight: 29.1, change: 0.41, apy: '4.92%', color: '#F2CE16' },
      { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', category: 'Renta Variable', value: 218400, weight: 25.9, change: 1.84, apy: '—', color: '#E4E4E7' },
      { symbol: 'CASH', name: 'Liquidez Multi-Divisa', category: 'Liquidez', value: 210890.45, weight: 25.0, change: 0.12, apy: '4.35%', color: '#71717A' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', category: 'Renta Variable', value: 94500, weight: 11.2, change: 2.31, apy: '—', color: '#A1A1AA' },
      { symbol: 'USDC', name: 'On-Chain Yield Vault', category: 'Activos Digitales', value: 74120, weight: 8.8, change: 0.08, apy: '5.10%', color: '#30D158' },
    ],
    recipients: [
      { id: 'rec-1', name: 'Zurich Holdings AG', shortName: 'Zurich AG', bank: 'UBS Switzerland · SEPA', iban: 'CH93 0076 2011 6238 5295 7', currency: 'EUR', initials: 'ZH' },
      { id: 'rec-2', name: 'Meridian Studio SL', shortName: 'Meridian', bank: 'BBVA España · SEPA', iban: 'ES91 2100 0418 4502 0005 1332', currency: 'EUR', initials: 'MS' },
      { id: 'rec-3', name: 'Kensington Capital', shortName: 'Kensington', bank: 'Barclays UK · FPS', iban: 'GB29 NWBK 6016 1331 9268 19', currency: 'GBP', initials: 'KC' },
    ],
    transactions: [
      { id: 'tx-1', title: 'Zurich Holdings AG', subtitle: 'Instant Rail · SEPA', date: 'Hoy, 14:22', amount: -25000.00, currency: 'USD', type: 'transfer', status: 'Liquidado', fee: '$0.00', rate: '1 USD = 0.92592 EUR', ref: 'VNT-8841-9021' },
      { id: 'tx-2', title: 'Rendimiento Treasury (SGOV)', subtitle: 'Dividendo mensual', date: 'Ayer, 09:00', amount: 1842.50, currency: 'USD', type: 'yield', status: 'Acreditado', fee: '$0.00', rate: '4.92% APY', ref: 'VNT-YLD-4410' },
      { id: 'tx-3', title: 'Depósito Institucional Wire', subtitle: 'JPMorgan Chase ••3019', date: '18 Nov, 16:45', amount: 75000.00, currency: 'USD', type: 'deposit', status: 'Liquidado', fee: '$0.00', rate: '—', ref: 'VNT-DEP-3108' },
      { id: 'tx-4', title: 'Cambio FX · USD → EUR', subtitle: 'Mid-Market Spot', date: '15 Nov, 11:10', amount: -12000.00, currency: 'USD', type: 'exchange', status: 'Ejecutado', fee: '$0.00', rate: '1 USD = 0.92540 EUR', ref: 'VNT-FX-2091' },
      { id: 'tx-5', title: 'AWS Cloud Services', subtitle: 'Vantage Infinite ••4092', date: '12 Nov, 08:30', amount: -1420.80, currency: 'USD', type: 'card', status: 'Confirmado', fee: '$0.00', rate: '0% FX', ref: 'VNT-CRD-1192' },
    ],
    copilotMessages: [
      {
        role: 'assistant',
        text: 'Detecté una oportunidad en tu tesorería: tienes 25.0% en liquidez operativa. Rebalancear 5% ($42,145 USD) hacia Bonos del Tesoro 0-3M (SGOV) añade +0.85% APY neto manteniendo liquidez T+1.',
        action: { label: 'Aplicar rebalanceo (+0.85% APY)', type: 'apply-rebalance' },
      },
    ],
    copilotTyping: false,
  };

  const fxRates = {
    USD: { USD: 1, EUR: 0.92592, GBP: 0.78840, USDC: 1.0 },
    EUR: { USD: 1.08001, EUR: 1, GBP: 0.85148, USDC: 1.08001 },
    GBP: { USD: 1.26839, EUR: 1.17443, GBP: 1, USDC: 1.26839 },
    USDC: { USD: 1.0, EUR: 0.92592, GBP: 0.78840, USDC: 1 },
  };

  const chartSeries = {
    '1D': {
      deltaPct: '+0.48%',
      deltaAbs: '+$4,025.10',
      periodLabel: 'hoy',
      peak: '$844,120',
      labels: ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', 'Ahora'],
      values: [838885, 839600, 839100, 840900, 841750, 844120, 842200, 842910.45],
    },
    '1W': {
      deltaPct: '+2.14%',
      deltaAbs: '+$17,650.20',
      periodLabel: 'últimos 7d',
      peak: '$846,300',
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      values: [825260, 828900, 827400, 835100, 846300, 841800, 842910.45],
    },
    '1M': {
      deltaPct: '+14.2%',
      deltaAbs: '+$104,820.00',
      periodLabel: 'últimos 30d',
      peak: '$847,361',
      labels: ['24 Oct', '29 Oct', '03 Nov', '08 Nov', '13 Nov', '17 Nov', '20 Nov', 'Hoy'],
      values: [738090, 756400, 774200, 789500, 786100, 814900, 847361, 842910.45],
    },
    '1Y': {
      deltaPct: '+28.6%',
      deltaAbs: '+$187,450.00',
      periodLabel: 'último año',
      peak: '$847,361',
      labels: ['Dic', 'Feb', 'Abr', 'Jun', 'Ago', 'Oct', 'Nov'],
      values: [655460, 684200, 712800, 749100, 768400, 809200, 842910.45],
    },
    ALL: {
      deltaPct: '+64.8%',
      deltaAbs: '+$331,410.45',
      periodLabel: 'histórico',
      peak: '$847,361',
      labels: ['2023', 'Q3 23', '2024', 'Q3 24', '2025', 'Q2 26', 'Hoy'],
      values: [511500, 562000, 618400, 675900, 728000, 792400, 842910.45],
    },
  };

  // ===========================================================================
  // 2. HELPERS & UTILITIES
  // ===========================================================================
  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function isMobileLayout() {
    return state.mobilePreview || window.innerWidth < 1024;
  }

  function getTotalNetBalance() {
    const usdBalance = state.accounts.find((a) => a.currency === 'USD').balance;
    return 842910.45 + (usdBalance - 324500.0);
  }

  function fmtMoney(val, currency = 'USD', showSign = false) {
    if (state.privacyMode) return '••••••••';
    const symbols = { USD: '$', EUR: '€', GBP: '£', USDC: '$' };
    const sym = symbols[currency] || '$';
    const absVal = Math.abs(val);
    const formatted = absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (val < 0) return `-${sym}${formatted}`;
    if (showSign && val > 0) return `+${sym}${formatted}`;
    return `${sym}${formatted}`;
  }

  function showToast(title, detail = '') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast-item pointer-events-auto bg-elevated hairline-strong rounded-xl px-4 py-3 shadow-2xl flex items-start gap-3';
    el.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-vantage mt-1.5 shrink-0 shadow-[0_0_10px_rgba(242,206,22,0.8)]"></span>
      <div class="flex flex-col min-w-0">
        <span class="text-[13px] font-bold text-ink leading-snug">${title}</span>
        ${detail ? `<span class="text-[12px] text-muted mt-0.5 leading-snug">${detail}</span>` : ''}
      </div>
    `;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px) scale(0.97)';
      el.style.transition = 'opacity 180ms ease, transform 180ms ease';
      setTimeout(() => el.remove(), 200);
    }, 3200);
  }

  function copyText(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast('Copiado al portapapeles', label)).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Copiado al portapapeles', label);
    } catch (e) {
      showToast('No se pudo copiar', text);
    }
    ta.remove();
  }

  function buildMiniSparkline(points) {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const coords = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * 68;
        const y = 20 - ((p - min) / range) * 16;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
    return `
      <svg width="68" height="22" viewBox="0 0 68 22" fill="none" class="shrink-0 opacity-85">
        <polyline points="${coords}" fill="none" stroke="#F2CE16" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
  }

  // ===========================================================================
  // 3. NAVIGATION & HEADER
  // ===========================================================================
  const viewTitles = {
    overview: 'Resumen',
    transfer: 'Transferencias Globales',
    portfolio: 'Portafolio y Rendimiento',
    analytics: 'Analítica Financiera',
    cards: 'Tarjetas y Control',
    settings: 'Ajustes de Cuenta',
  };

  const mobileTitles = {
    overview: 'Vantage',
    transfer: 'Transferir',
    portfolio: 'Portafolio',
    analytics: 'Analítica',
    cards: 'Tarjetas',
    settings: 'Ajustes',
  };

  function setView(viewName) {
    state.activeView = viewName;
    document.getElementById('header-page-title').textContent = viewTitles[viewName] || 'Vantage Capital';
    document.getElementById('mobile-page-title').textContent = mobileTitles[viewName] || 'Vantage';
    updateNavStyles();
    renderActiveView(true);
    const col = document.getElementById('main-column');
    if (state.mobilePreview && col) col.scrollTo({ top: 0, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavStyles() {
    document.querySelectorAll('.nav-item').forEach((btn) => {
      const active = btn.dataset.nav === state.activeView;
      btn.className = active
        ? 'nav-item tactile flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[14px] font-bold text-left bg-elevated text-ink hairline-gold shadow-[0_0_24px_-12px_rgba(242,206,22,0.45)]'
        : 'nav-item tactile flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-left text-muted hover:text-ink hover:bg-white/[0.03]';
      const dot = btn.querySelector('.nav-active-dot');
      if (dot) dot.style.opacity = active ? '1' : '0';
    });
    document.querySelectorAll('.mobile-nav-item').forEach((btn) => {
      const active = btn.dataset.nav === state.activeView;
      btn.className = active
        ? 'mobile-nav-item tactile flex flex-col items-center gap-1 min-w-[56px] py-1 rounded-xl text-[10px] font-bold text-vantage'
        : 'mobile-nav-item tactile flex flex-col items-center gap-1 min-w-[56px] py-1 rounded-xl text-[10px] font-medium text-muted hover:text-ink';
    });
  }

  // ===========================================================================
  // 4. INTERACTIVE PORTFOLIO CHART SVG (WITH GSAP DRAW-IN)
  // ===========================================================================
  function buildPortfolioChartSVG(tfKey, compact = false) {
    const series = chartSeries[tfKey];
    const vals = series.values;
    const W = 1000;
    const H = 200;
    const padTop = 18;
    const padBottom = 10;
    const minV = Math.min(...vals) * 0.992;
    const maxV = Math.max(...vals) * 1.004;
    const range = maxV - minV || 1;

    const pts = vals.map((v, i) => {
      const xPct = (i / (vals.length - 1)) * 100;
      const x = (xPct / 100) * W;
      const y = padTop + (1 - (v - minV) / range) * (H - padTop - padBottom);
      const yPct = (y / H) * 100;
      return { x, y, xPct, yPct, v, label: series.labels[i] };
    });

    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = ((p0.x + p1.x) / 2).toFixed(1);
      d += ` C ${cx} ${p0.y.toFixed(1)}, ${cx} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
    const areaD = `${d} L ${W} ${H} L 0 ${H} Z`;
    const last = pts[pts.length - 1];

    const hitTargets = pts.map((_, idx) => `<div data-pt-idx="${idx}" class="chart-hit flex-1 h-full cursor-crosshair"></div>`).join('');
    const labelsToShow = compact
      ? [series.labels[0], series.labels[Math.floor(series.labels.length / 2)], series.labels[series.labels.length - 1]]
      : series.labels;

    return `
      <div id="hero-chart-wrap" data-compact="${compact ? '1' : '0'}" class="w-full flex flex-col gap-2 select-none">
        <div class="relative w-full ${compact ? 'h-[150px]' : 'h-[212px]'}">
          <div class="absolute inset-0 pointer-events-none flex flex-col justify-between py-2">
            <div class="w-full border-t border-dashed border-white/[0.05]"></div>
            <div class="w-full border-t border-dashed border-white/[0.05]"></div>
            <div class="w-full border-t border-dashed border-white/[0.08]"></div>
          </div>

          <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" width="100%" height="100%" class="w-full h-full block overflow-visible">
            <defs>
              <linearGradient id="vantageAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#F2CE16" stop-opacity="0.22" />
                <stop offset="100%" stop-color="#F2CE16" stop-opacity="0.0" />
              </linearGradient>
            </defs>
            <path id="chart-area-path" d="${areaD}" fill="url(#vantageAreaGrad)" />
            <path id="chart-line-path" d="${d}" fill="none" stroke="#F2CE16" stroke-width="2.4" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <!-- Vertical Crosshair -->
          <div id="chart-crosshair-line" style="left: ${last.xPct.toFixed(2)}%;" class="pointer-events-none absolute top-0 bottom-0 w-px border-l border-dashed border-vantage/45 opacity-0 transition-opacity duration-150"></div>

          <!-- Active Glowing Dot -->
          <div id="chart-active-dot" style="left: ${last.xPct.toFixed(2)}%; top: ${last.yPct.toFixed(2)}%;" class="chart-dot-live pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-vantage transition-all duration-100"></div>

          <!-- Interactive Scrubbing Overlay -->
          <div id="hero-chart-hitlayer" class="absolute inset-0 flex z-10">${hitTargets}</div>
        </div>

        <div class="w-full flex items-center justify-between text-[11px] font-medium text-faint tabular-nums">
          ${labelsToShow.map((lbl) => `<span>${lbl}</span>`).join('')}
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // 5. SCREEN 1: OVERVIEW (ENRICHED WITH KPI STRIP, SPARKLINES & SEARCH)
  // ===========================================================================
  function renderOverview() {
    const mobile = isMobileLayout();
    const tf = chartSeries[state.timeframe];
    const totalBalance = getTotalNetBalance();
    const whole = Math.floor(totalBalance).toLocaleString('en-US');
    const cents = (totalBalance % 1).toFixed(2).substring(1);

    const q = state.txQuery.trim().toLowerCase();
    const filteredTxs = state.transactions.filter((t) => {
      const matchType = state.txFilter === 'all' || t.type === state.txFilter;
      const matchQuery = !q || t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q);
      return matchType && matchQuery;
    });

    if (mobile) {
      return `
        <div class="flex flex-col gap-5">
          <!-- Mobile Hero Balance -->
          <section class="anim-card hero-balance-surface hairline rounded-2xl p-4 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold uppercase tracking-wider text-muted">Balance Neto Total</span>
                <span id="chart-hover-date" class="text-[11px] text-vantage font-bold"></span>
              </div>
              <div class="flex items-baseline gap-1.5">
                <div id="hero-balance-readout" data-target-val="${totalBalance.toFixed(2)}" class="text-[34px] font-bold tracking-tight leading-none tabular-nums text-ink">
                  ${state.privacyMode ? '••••••••' : `$${whole}<span class="text-muted text-[22px] font-medium">${cents}</span>`}
                </div>
                <span class="text-[12px] font-medium text-muted">USD</span>
              </div>
              <div class="flex items-center gap-2 mt-1 text-[12px] tabular-nums">
                <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-gain/15 text-gain font-bold">${tf.deltaPct}</span>
                <span class="text-muted">${state.privacyMode ? '••••' : tf.deltaAbs} <span class="text-faint">${tf.periodLabel}</span></span>
              </div>
            </div>

            <div class="w-full pt-1">${buildPortfolioChartSVG(state.timeframe, true)}</div>

            <div class="grid grid-cols-5 bg-obsidian/90 p-1 rounded-xl hairline">
              ${['1D', '1W', '1M', '1Y', 'ALL'].map((k) => `
                <button data-tf="${k}" class="tf-btn tactile py-1.5 rounded-lg text-[12px] font-bold tabular-nums text-center ${state.timeframe === k ? 'bg-elevated text-vantage hairline-gold' : 'text-muted'}">${k}</button>
              `).join('')}
            </div>
          </section>

          <!-- Mobile 4-Up Quick Actions -->
          <section class="anim-card grid grid-cols-4 gap-2 py-0.5">
            <button data-quick="deposit" class="quick-action-btn tactile flex flex-col items-center gap-1.5">
              <div class="w-12 h-12 rounded-2xl bg-vantage text-obsidian flex items-center justify-center shadow-[0_0_24px_-4px_rgba(242,206,22,0.6)]">
                <i data-lucide="plus" class="w-5 h-5 stroke-[2.5]"></i>
              </div>
              <span class="text-[11px] font-bold text-ink">Depositar</span>
            </button>
            <button data-quick="transfer" class="quick-action-btn tactile flex flex-col items-center gap-1.5">
              <div class="w-12 h-12 rounded-2xl bg-surface hairline text-ink flex items-center justify-center">
                <i data-lucide="arrow-up-right" class="w-5 h-5 text-vantage"></i>
              </div>
              <span class="text-[11px] font-medium text-muted">Enviar</span>
            </button>
            <button data-quick="exchange" class="quick-action-btn tactile flex flex-col items-center gap-1.5">
              <div class="w-12 h-12 rounded-2xl bg-surface hairline text-ink flex items-center justify-center">
                <i data-lucide="refresh-cw" class="w-[18px] h-[18px] text-ink"></i>
              </div>
              <span class="text-[11px] font-medium text-muted">Cambiar</span>
            </button>
            <button data-quick="copilot" class="quick-action-btn tactile flex flex-col items-center gap-1.5">
              <div class="w-12 h-12 rounded-2xl bg-surface hairline-gold text-ink flex items-center justify-center">
                <i data-lucide="sparkles" class="w-[18px] h-[18px] text-vantage"></i>
              </div>
              <span class="text-[11px] font-medium text-muted">Copilot</span>
            </button>
          </section>

          <!-- Multi-Currency Horizontal Carousel with Sparklines -->
          <section class="anim-card flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <h2 class="text-[13px] font-bold text-ink tracking-tight">Cuentas Multi-Divisa</h2>
              <button data-goto="transfer" class="goto-btn text-[12px] font-medium text-vantage">Mover →</button>
            </div>
            <div class="flex gap-2.5 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-1">
              ${state.accounts.map((acc) => `
                <button data-goto="transfer" class="goto-btn card-hover snap-start shrink-0 w-[168px] bg-surface hairline rounded-2xl p-3.5 flex flex-col gap-2.5 text-left">
                  <div class="flex items-center justify-between w-full">
                    <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-elevated hairline text-ink">${acc.currency}</span>
                    <span class="text-[10px] font-bold text-gain tabular-nums">${acc.apy.replace(' APY', '')}</span>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[17px] font-bold text-ink tabular-nums tracking-tight">${fmtMoney(acc.balance, acc.currency)}</span>
                    <span class="text-[11px] text-muted truncate">${acc.label}</span>
                  </div>
                  <div class="pt-1">${buildMiniSparkline(acc.spark)}</div>
                </button>
              `).join('')}
            </div>
          </section>

          ${state.settings.copilotInsights ? `
          <button id="insight-open-copilot" class="anim-card tactile w-full bg-surface hairline-gold rounded-2xl px-3.5 py-3 flex items-center justify-between gap-3 text-left">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-2 h-2 rounded-full ${state.rebalanceApplied ? 'bg-gain' : 'bg-vantage animate-pulse'} shrink-0"></span>
              <div class="flex flex-col min-w-0">
                <span class="text-[12px] font-bold text-ink truncate">${state.rebalanceApplied ? 'Rebalanceo SGOV activo' : 'Optimiza tu liquidez (+0.85% APY)'}</span>
                <span class="text-[11px] text-muted truncate">${state.rebalanceApplied ? '5% asignado a Bonos del Tesoro T+1' : 'Toca para revisar con Vantage Copilot'}</span>
              </div>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-vantage shrink-0"></i>
          </button>
          ` : ''}

          <!-- Compact Mobile Activity -->
          <section class="anim-card flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <h2 class="text-[13px] font-bold text-ink tracking-tight">Actividad</h2>
              <div class="flex items-center gap-1">
                ${[
                  { id: 'all', label: 'Todo' },
                  { id: 'transfer', label: 'Envíos' },
                  { id: 'deposit', label: 'Depósitos' },
                ].map((f) => `
                  <button data-tx-filter="${f.id}" class="tx-filter-btn tactile px-2.5 py-1 rounded-lg text-[11px] font-medium ${state.txFilter === f.id ? 'bg-elevated text-ink hairline-gold' : 'text-muted'}">${f.label}</button>
                `).join('')}
              </div>
            </div>
            <div class="bg-surface hairline rounded-2xl px-3.5 divide-y divide-white/[0.06]">
              ${filteredTxs.map((tx) => `
                <button data-tx-id="${tx.id}" class="tx-row-btn anim-row tactile w-full py-3.5 flex items-center justify-between gap-3 text-left">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-9 h-9 rounded-xl bg-elevated hairline flex items-center justify-center shrink-0 text-muted">
                      <i data-lucide="${tx.amount > 0 ? 'arrow-down-left' : tx.type === 'exchange' ? 'refresh-cw' : tx.type === 'card' ? 'credit-card' : 'arrow-up-right'}" class="w-4 h-4 ${tx.amount > 0 ? 'text-gain' : 'text-vantage'}"></i>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-[13px] font-bold text-ink truncate">${tx.title}</span>
                      <span class="text-[11px] text-muted truncate">${tx.date}</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end shrink-0 tabular-nums">
                    <span class="text-[13px] font-bold ${tx.amount > 0 ? 'text-gain' : 'text-ink'}">${fmtMoney(tx.amount, tx.currency, true)}</span>
                    <span class="text-[10px] text-faint">${tx.status}</span>
                  </div>
                </button>
              `).join('')}
            </div>
          </section>
        </div>
      `;
    }

    // --- DESKTOP OVERVIEW ---
    return `
      <div class="flex flex-col gap-6">
        <!-- Contextual Copilot Banner -->
        ${state.settings.copilotInsights ? `
        <div class="anim-card bg-gradient-to-r from-vantage/[0.08] via-surface to-surface hairline-gold rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-2 h-2 rounded-full ${state.rebalanceApplied ? 'bg-gain' : 'bg-vantage animate-pulse'} shrink-0"></span>
            <p class="text-[13px] text-ink/90 truncate">
              ${state.rebalanceApplied
                ? '<span class="font-bold text-ink">Rebalanceo activo:</span> 5% asignado a Bonos del Tesoro (SGOV) con +0.85% APY proyectado.'
                : '<span class="font-bold text-ink">Vantage Copilot:</span> Rebalancear 5% de liquidez a Bonos del Tesoro añade <span class="text-vantage font-bold tabular-nums">+0.85% APY</span> manteniendo liquidez T+1.'
              }
            </p>
          </div>
          <button id="insight-open-copilot" class="btn-glow px-3.5 py-1.5 rounded-xl text-[12px] font-bold shrink-0">
            <span>${state.rebalanceApplied ? 'Ver detalle' : 'Revisar con Copilot'}</span>
          </button>
        </div>
        ` : ''}

        <!-- Quick KPI Summary Row -->
        <section class="grid grid-cols-4 gap-3.5 tabular-nums">
          <div class="anim-card card-hover bg-surface hairline rounded-2xl p-4 flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-muted">
              <span class="text-[11px] font-medium uppercase tracking-wider">Rendimiento / Mes</span>
              <i data-lucide="trending-up" class="w-3.5 h-3.5 text-gain"></i>
            </div>
            <span class="kpi-num text-[22px] font-bold text-ink" data-kpi="3412" data-prefix="+$" data-suffix="">${state.privacyMode ? '••••' : '+$3,412'}</span>
            <span class="text-[11px] text-gain font-medium">Acreditado en T-Bills</span>
          </div>
          <div class="anim-card card-hover bg-surface hairline rounded-2xl p-4 flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-muted">
              <span class="text-[11px] font-medium uppercase tracking-wider">APY Ponderado</span>
              <i data-lucide="percent" class="w-3.5 h-3.5 text-vantage"></i>
            </div>
            <span class="text-[22px] font-bold text-vantage">${state.rebalanceApplied ? '4.82%' : '4.35%'}</span>
            <span class="text-[11px] text-muted">Liquidez inmediata T+1</span>
          </div>
          <div class="anim-card card-hover bg-surface hairline rounded-2xl p-4 flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-muted">
              <span class="text-[11px] font-medium uppercase tracking-wider">Ahorro FX (YTD)</span>
              <i data-lucide="globe" class="w-3.5 h-3.5 text-vantage"></i>
            </div>
            <span class="kpi-num text-[22px] font-bold text-ink" data-kpi="6410" data-prefix="+$" data-suffix="">${state.privacyMode ? '••••' : '+$6,410'}</span>
            <span class="text-[11px] text-muted">0.00% spread institucional</span>
          </div>
          <div class="anim-card card-hover bg-surface hairline rounded-2xl p-4 flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-muted">
              <span class="text-[11px] font-medium uppercase tracking-wider">Rieles Activos</span>
              <i data-lucide="zap" class="w-3.5 h-3.5 text-gain"></i>
            </div>
            <span class="text-[22px] font-bold text-ink">~15 seg</span>
            <span class="text-[11px] text-muted">FedNow · SEPA · USDC</span>
          </div>
        </section>

        <!-- Hero Balance & Interactive Chart Surface -->
        <section class="anim-card hero-balance-surface hairline rounded-3xl p-6 flex flex-col gap-6">
          <div class="flex items-end justify-between gap-4">
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2">
                <span class="text-[12px] font-bold uppercase tracking-wider text-muted">Balance Neto Total</span>
                <span id="chart-hover-date" class="text-[12px] text-vantage font-bold"></span>
              </div>
              <div class="flex items-baseline gap-2">
                <div id="hero-balance-readout" data-target-val="${totalBalance.toFixed(2)}" class="text-[46px] font-bold tracking-[-0.03em] leading-none tabular-nums text-ink">
                  ${state.privacyMode ? '••••••••' : `$${whole}<span class="text-muted text-[30px] font-medium">${cents}</span>`}
                </div>
                <span class="text-[13px] font-medium text-muted">USD</span>
              </div>
              <div class="flex items-center gap-2.5 mt-1 text-[13px] tabular-nums">
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gain/12 text-gain font-bold">${tf.deltaPct}</span>
                <span class="text-muted">${state.privacyMode ? '••••' : tf.deltaAbs} <span class="text-faint">${tf.periodLabel}</span></span>
                <span class="text-faint">·</span>
                <span class="text-muted">Máx. <span class="text-ink font-medium">${state.privacyMode ? '••••' : tf.peak}</span></span>
              </div>
            </div>

            <div class="inline-flex items-center bg-obsidian/90 p-1 rounded-xl hairline">
              ${['1D', '1W', '1M', '1Y', 'ALL'].map((k) => `
                <button data-tf="${k}" class="tf-btn tactile px-3.5 py-1.5 rounded-lg text-[12px] font-bold tabular-nums ${state.timeframe === k ? 'bg-elevated text-vantage hairline-gold' : 'text-muted hover:text-ink'}">${k}</button>
              `).join('')}
            </div>
          </div>

          <div class="w-full pt-1">${buildPortfolioChartSVG(state.timeframe, false)}</div>

          <div class="grid grid-cols-4 gap-3 pt-4 border-t border-white/[0.06]">
            <button data-quick="deposit" class="quick-action-btn tactile flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-vantage text-obsidian font-bold text-[13px] hover:bg-[#f7d83b] shadow-[0_0_24px_-6px_rgba(242,206,22,0.55)]">
              <i data-lucide="arrow-down-left" class="w-4 h-4 stroke-[2.25]"></i>
              <span>Depositar</span>
            </button>
            <button data-quick="transfer" class="quick-action-btn tactile flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-elevated hairline hover:border-vantage/45 text-ink font-bold text-[13px]">
              <i data-lucide="arrow-up-right" class="w-4 h-4 text-vantage"></i>
              <span>Enviar</span>
            </button>
            <button data-quick="exchange" class="quick-action-btn tactile flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-elevated hairline hover:border-vantage/45 text-ink font-bold text-[13px]">
              <i data-lucide="refresh-cw" class="w-4 h-4 text-muted"></i>
              <span>Cambiar FX</span>
            </button>
            <button data-quick="analytics" class="quick-action-btn tactile flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-elevated hairline hover:border-vantage/45 text-ink font-bold text-[13px]">
              <i data-lucide="bar-chart-2" class="w-4 h-4 text-muted"></i>
              <span>Analítica</span>
            </button>
          </div>
        </section>

        <!-- Multi-Currency Account Cards with Sparklines -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h2 class="text-[14px] font-bold text-ink tracking-tight">Cuentas Multi-Divisa</h2>
            <button data-goto="transfer" class="goto-btn text-[12px] font-bold text-vantage hover:underline">Mover fondos →</button>
          </div>
          <div class="grid grid-cols-4 gap-3.5">
            ${state.accounts.map((acc) => `
              <button data-goto="transfer" class="goto-btn anim-card card-hover bg-surface hairline rounded-2xl p-4 flex flex-col gap-3 text-left">
                <div class="flex items-center justify-between w-full">
                  <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-elevated hairline text-ink">${acc.currency}</span>
                  <span class="text-[11px] font-bold text-gain tabular-nums">${acc.apy}</span>
                </div>
                <div class="flex items-end justify-between gap-2 w-full">
                  <div class="flex flex-col gap-0.5 min-w-0">
                    <span class="text-[20px] font-bold text-ink tabular-nums tracking-tight truncate">${fmtMoney(acc.balance, acc.currency)}</span>
                    <span class="text-[11px] text-muted truncate">${acc.label} <span class="text-faint">${acc.mask}</span></span>
                  </div>
                  ${buildMiniSparkline(acc.spark)}
                </div>
              </button>
            `).join('')}
          </div>
        </section>

        <!-- Recent Activity with Search & Filters -->
        <section class="anim-card bg-surface hairline rounded-3xl p-6 flex flex-col gap-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-[15px] font-bold text-ink tracking-tight">Actividad Reciente</h2>
            <div class="flex items-center gap-2.5 flex-wrap">
              <div class="relative">
                <i data-lucide="search" class="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <input id="tx-search-input" type="text" value="${state.txQuery}" placeholder="Buscar movimiento..." class="bg-obsidian hairline rounded-xl pl-8 pr-3 py-1.5 text-[12px] text-ink placeholder:text-faint focus:outline-none focus:border-vantage/50 w-44" />
              </div>
              <div class="flex items-center gap-1 bg-obsidian p-1 rounded-xl hairline">
                ${[
                  { id: 'all', label: 'Todo' },
                  { id: 'transfer', label: 'Envíos' },
                  { id: 'deposit', label: 'Depósitos' },
                  { id: 'yield', label: 'Rendimiento' },
                  { id: 'card', label: 'Tarjetas' },
                ].map((f) => `
                  <button data-tx-filter="${f.id}" class="tx-filter-btn tactile px-2.5 py-1 rounded-lg text-[12px] font-medium ${state.txFilter === f.id ? 'bg-elevated text-ink hairline-gold font-bold' : 'text-muted hover:text-ink'}">${f.label}</button>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="flex flex-col divide-y divide-white/[0.06]">
            ${filteredTxs.length ? filteredTxs.map((tx) => `
              <button data-tx-id="${tx.id}" class="tx-row-btn anim-row tactile w-full py-3.5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.025] -mx-2 px-2 rounded-xl">
                <div class="flex items-center gap-3.5 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-elevated hairline flex items-center justify-center shrink-0 text-muted">
                    <i data-lucide="${tx.amount > 0 ? 'arrow-down-left' : tx.type === 'exchange' ? 'refresh-cw' : tx.type === 'card' ? 'credit-card' : 'arrow-up-right'}" class="w-4 h-4 ${tx.amount > 0 ? 'text-gain' : 'text-vantage'}"></i>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-[14px] font-bold text-ink truncate">${tx.title}</span>
                    <span class="text-[12px] text-muted truncate">${tx.subtitle} · ${tx.date}</span>
                  </div>
                </div>
                <div class="flex flex-col items-end shrink-0 tabular-nums">
                  <span class="text-[14px] font-bold ${tx.amount > 0 ? 'text-gain' : 'text-ink'}">${fmtMoney(tx.amount, tx.currency, true)}</span>
                  <span class="text-[11px] text-muted">${tx.status}</span>
                </div>
              </button>
            `).join('') : '<p class="py-8 text-center text-[13px] text-muted">No se encontraron movimientos con ese filtro.</p>'}
          </div>
        </section>
      </div>
    `;
  }

  // ===========================================================================
  // 6. SCREEN 2: GLOBAL TRANSFER (PRESETS, LIVE SAVINGS, ADD RECIPIENT)
  // ===========================================================================
  function renderTransfer() {
    const mobile = isMobileLayout();
    const t = state.transfer;
    const rate = fxRates[t.sendCurrency][t.receiveCurrency];
    const sendAcc = state.accounts.find((a) => a.currency === t.sendCurrency) || state.accounts[0];
    const fee = t.rail === 'swift' ? 12.0 : 0.0;
    const netReceive = Math.max(0, t.amount) * rate;
    const bankSavings = Math.round(Math.max(0, t.amount) * 0.028);
    const activeRecipient = state.recipients.find((r) => r.id === t.recipientId) || state.recipients[0];

    const rails = [
      { id: 'instant', name: 'Instant Rail (FedNow / SEPA)', desc: 'Directo en ~15 segundos', feeLabel: '$0.00', badge: 'Recomendado' },
      { id: 'swift', name: 'SWIFT Priority', desc: 'Liquidación el mismo día', feeLabel: '$12.00', badge: '' },
      { id: 'usdc', name: 'Digital Settlement (USDC)', desc: 'Escrow on-chain 24/7', feeLabel: 'Sin gas', badge: '' },
    ];

    const presetAmounts = [5000, 10000, 25000, 50000];

    if (mobile) {
      return `
        <div class="flex flex-col gap-4">
          <section class="anim-card flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold uppercase tracking-wider text-muted">Enviar a</span>
              <button id="add-recipient-btn" class="text-[11px] font-bold text-vantage">+ Nuevo</button>
            </div>
            <div class="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-0.5">
              ${state.recipients.map((r) => {
                const active = r.id === t.recipientId;
                return `
                  <button data-recipient="${r.id}" class="recipient-btn tactile shrink-0 flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full ${active ? 'bg-elevated hairline-gold text-ink' : 'bg-surface hairline text-muted'}">
                    <span class="w-6 h-6 rounded-full ${active ? 'bg-vantage text-obsidian' : 'bg-subtle text-ink'} flex items-center justify-center text-[10px] font-bold">${r.initials}</span>
                    <span class="text-[12px] font-bold">${r.shortName}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <section class="anim-card flex flex-col relative">
            <div class="bg-surface hairline rounded-t-2xl p-4 flex flex-col gap-2">
              <div class="flex items-center justify-between text-[11px]">
                <span class="font-medium text-muted">Tú envías</span>
                <div class="flex items-center gap-2 tabular-nums">
                  <span class="text-muted">Disp. <span class="text-ink font-medium">${fmtMoney(sendAcc.balance, sendAcc.currency)}</span></span>
                  <button id="transfer-max-btn" class="tactile font-bold text-vantage">MAX</button>
                </div>
              </div>
              <div class="flex items-center justify-between gap-2">
                <input id="transfer-amount-input" type="number" min="0" step="100" value="${t.amount}" class="w-full bg-transparent text-[28px] font-bold text-ink tabular-nums focus:outline-none" />
                <select id="transfer-send-currency" class="bg-elevated hairline rounded-xl px-3 py-2 text-[13px] font-bold text-ink focus:outline-none shrink-0">
                  ${['USD', 'EUR', 'GBP', 'USDC'].map((c) => `<option value="${c}" ${t.sendCurrency === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="flex gap-1.5 pt-1">
                ${presetAmounts.map((a) => `<button data-preset-amt="${a}" class="preset-amt-btn tactile px-2.5 py-1 rounded-lg bg-obsidian hairline hover:border-vantage/45 text-[11px] font-bold text-muted hover:text-ink tabular-nums">$${(a / 1000)}k</button>`).join('')}
              </div>
            </div>

            <div class="relative h-0 flex items-center justify-center z-10">
              <button id="transfer-swap-btn" aria-label="Invertir divisas" style="transform: rotate(${t.swapCount * 180}deg)" class="swap-spin w-9 h-9 rounded-full bg-elevated hairline-gold flex items-center justify-center text-vantage shadow-lg">
                <i data-lucide="arrow-up-down" class="w-4 h-4"></i>
              </button>
            </div>

            <div class="bg-surface hairline border-t-0 rounded-b-2xl p-4 pt-5 flex flex-col gap-2">
              <div class="flex items-center justify-between text-[11px]">
                <span class="font-medium text-muted">${activeRecipient.shortName} recibe</span>
                <span class="text-gain font-bold">${fee === 0 ? '$0.00 Comisión' : `$${fee.toFixed(2)}`}</span>
              </div>
              <div class="flex items-center justify-between gap-2">
                <div id="transfer-receive-readout" class="text-[28px] font-bold text-vantage tabular-nums truncate">
                  ${netReceive.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <select id="transfer-receive-currency" class="bg-elevated hairline rounded-xl px-3 py-2 text-[13px] font-bold text-ink focus:outline-none shrink-0">
                  ${['EUR', 'USD', 'GBP', 'USDC'].map((c) => `<option value="${c}" ${t.receiveCurrency === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="flex items-center justify-between text-[11px] pt-1.5 border-t border-white/[0.06] tabular-nums text-muted">
                <span>1 ${t.sendCurrency} = ${rate.toFixed(5)} ${t.receiveCurrency}</span>
                <span id="transfer-savings-readout" class="text-gain font-bold">Ahorras +$${bankSavings.toLocaleString('en-US')}</span>
              </div>
            </div>
          </section>

          <section class="anim-card flex flex-col gap-2">
            <span class="text-[11px] font-bold uppercase tracking-wider text-muted">Riel de Liquidación</span>
            <div class="flex flex-col gap-2">
              ${rails.map((r) => {
                const selected = t.rail === r.id;
                return `
                  <button data-rail="${r.id}" class="rail-btn tactile w-full p-3.5 rounded-2xl text-left flex items-center justify-between gap-3 ${selected ? 'bg-elevated hairline-gold' : 'bg-surface hairline'}">
                    <div class="flex items-center gap-3 min-w-0">
                      <span class="w-4 h-4 rounded-full shrink-0 ${selected ? 'border-[5px] border-vantage bg-obsidian' : 'border border-white/30'}"></span>
                      <div class="flex flex-col min-w-0">
                        <span class="text-[13px] font-bold text-ink truncate">${r.name}</span>
                        <span class="text-[11px] text-muted truncate">${r.desc}</span>
                      </div>
                    </div>
                    <span class="text-[12px] font-bold tabular-nums shrink-0 ${r.feeLabel === '$0.00' || r.feeLabel === 'Sin gas' ? 'text-gain' : 'text-muted'}">${r.feeLabel}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <button id="transfer-review-btn" class="anim-card tactile w-full py-3.5 rounded-2xl bg-vantage text-obsidian font-bold text-[14px] flex items-center justify-center gap-2 mt-1 shadow-[0_0_28px_-6px_rgba(242,206,22,0.55)]">
            <span>Revisar y enviar ${fmtMoney(t.amount, t.sendCurrency)}</span>
            <i data-lucide="arrow-right" class="w-4 h-4 stroke-[2.25]"></i>
          </button>
        </div>
      `;
    }

    // --- DESKTOP TRANSFER ---
    return `
      <div class="grid grid-cols-12 gap-6 items-start">
        <section class="anim-card col-span-7 bg-surface hairline rounded-3xl p-6 flex flex-col gap-5">
          <div class="flex items-center justify-between gap-2">
            <div class="flex flex-col gap-0.5">
              <span class="text-[11px] font-bold uppercase tracking-widest text-vantage">Global Transfer</span>
              <h2 class="text-[22px] font-bold text-ink tracking-tight">Transferir Fondos</h2>
            </div>
            <span class="text-[12px] font-bold text-gain bg-gain/10 border border-gain/25 px-3 py-1 rounded-full">Tasa Mid-Market · 0% Spread</span>
          </div>

          <div class="flex flex-col relative">
            <div class="bg-obsidian hairline rounded-t-2xl p-4 flex flex-col gap-2.5">
              <div class="flex items-center justify-between text-[12px]">
                <span class="font-medium text-muted">Tú envías</span>
                <div class="flex items-center gap-2 tabular-nums">
                  <span class="text-muted">Disponible: <span class="text-ink font-medium">${fmtMoney(sendAcc.balance, sendAcc.currency)}</span></span>
                  <button id="transfer-max-btn" class="tactile text-[11px] font-bold text-vantage hover:underline">MAX</button>
                </div>
              </div>
              <div class="flex items-center justify-between gap-3">
                <input id="transfer-amount-input" type="number" min="0" step="100" value="${t.amount}" class="w-full bg-transparent text-[34px] font-bold text-ink tabular-nums focus:outline-none" />
                <select id="transfer-send-currency" class="bg-elevated hairline rounded-xl px-3.5 py-2 text-[13px] font-bold text-ink focus:outline-none focus:border-vantage/50 shrink-0 cursor-pointer">
                  ${['USD', 'EUR', 'GBP', 'USDC'].map((c) => `<option value="${c}" ${t.sendCurrency === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[12px] text-faint">${sendAcc.label} (${sendAcc.mask})</span>
                <div class="flex gap-1.5">
                  ${presetAmounts.map((a) => `<button data-preset-amt="${a}" class="preset-amt-btn tactile px-2.5 py-1 rounded-lg bg-surface hairline hover:border-vantage/45 text-[11px] font-bold text-muted hover:text-ink tabular-nums">$${a / 1000}k</button>`).join('')}
                </div>
              </div>
            </div>

            <div class="relative h-0 flex items-center justify-center z-10">
              <button id="transfer-swap-btn" title="Invertir divisas" style="transform: rotate(${t.swapCount * 180}deg)" class="swap-spin w-10 h-10 rounded-full bg-elevated hairline-gold hover:bg-vantage hover:text-obsidian flex items-center justify-center text-vantage shadow-xl">
                <i data-lucide="arrow-up-down" class="w-4 h-4"></i>
              </button>
            </div>

            <div class="bg-obsidian hairline border-t-0 rounded-b-2xl p-4 pt-5 flex flex-col gap-2">
              <div class="flex items-center justify-between text-[12px]">
                <span class="font-medium text-muted">El destinatario recibe</span>
                <span class="text-muted">${t.rail === 'instant' ? 'SEPA / FedNow Instant' : t.rail === 'swift' ? 'SWIFT Wire' : 'On-chain USDC'}</span>
              </div>
              <div class="flex items-center justify-between gap-3">
                <div id="transfer-receive-readout" class="text-[34px] font-bold text-vantage tabular-nums truncate">
                  ${netReceive.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <select id="transfer-receive-currency" class="bg-elevated hairline rounded-xl px-3.5 py-2 text-[13px] font-bold text-ink focus:outline-none focus:border-vantage/50 shrink-0 cursor-pointer">
                  ${['EUR', 'USD', 'GBP', 'USDC'].map((c) => `<option value="${c}" ${t.receiveCurrency === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="flex items-center justify-between text-[12px] pt-2 border-t border-white/[0.06] tabular-nums">
                <span class="text-muted">1 ${t.sendCurrency} = <span class="text-ink font-medium">${rate.toFixed(5)} ${t.receiveCurrency}</span></span>
                <span class="text-gain font-bold">${fee === 0 ? '$0.00 Comisión' : `$${fee.toFixed(2)} Comisión`}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <span class="text-[12px] font-bold uppercase tracking-wider text-muted">Riel de Liquidación</span>
              <span class="text-[12px] text-faint">Velocidad y red</span>
            </div>
            <div class="flex flex-col gap-2">
              ${rails.map((r) => {
                const selected = t.rail === r.id;
                return `
                  <button data-rail="${r.id}" class="rail-btn tactile w-full p-3.5 rounded-xl text-left flex items-center justify-between gap-3 ${selected ? 'bg-elevated hairline-gold' : 'bg-obsidian/60 hairline hover:border-white/20'}">
                    <div class="flex items-center gap-3 min-w-0">
                      <span class="w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${selected ? 'border-[5px] border-vantage bg-obsidian' : 'border border-white/30'}"></span>
                      <div class="flex flex-col min-w-0">
                        <div class="flex items-center gap-2">
                          <span class="text-[13px] font-bold text-ink truncate">${r.name}</span>
                          ${r.badge ? `<span class="text-[10px] font-bold uppercase tracking-wide text-vantage bg-vantage/10 px-1.5 py-0.5 rounded">${r.badge}</span>` : ''}
                        </div>
                        <span class="text-[12px] text-muted truncate">${r.desc}</span>
                      </div>
                    </div>
                    <span class="text-[12px] font-bold tabular-nums shrink-0 ${r.feeLabel === '$0.00' || r.feeLabel === 'Sin gas' ? 'text-gain' : 'text-muted'}">${r.feeLabel}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <button id="transfer-review-btn" class="tactile w-full py-3.5 rounded-xl bg-vantage text-obsidian font-bold text-[14px] hover:bg-[#f7d83b] flex items-center justify-center gap-2 shadow-[0_0_28px_-6px_rgba(242,206,22,0.55)]">
            <span>Revisar y enviar ${fmtMoney(t.amount, t.sendCurrency)}</span>
            <i data-lucide="arrow-right" class="w-4 h-4 stroke-[2.25]"></i>
          </button>
        </section>

        <aside class="col-span-5 flex flex-col gap-4">
          <div class="anim-card bg-surface hairline rounded-3xl p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <span class="text-[12px] font-bold uppercase tracking-wider text-muted">Destinatario</span>
              <button id="add-recipient-btn" class="tactile text-[12px] font-bold text-vantage hover:underline">+ Nuevo</button>
            </div>
            <div class="flex flex-col gap-2">
              ${state.recipients.map((r) => {
                const active = r.id === t.recipientId;
                return `
                  <button data-recipient="${r.id}" class="recipient-btn anim-row tactile w-full p-3 rounded-xl flex items-center gap-3 text-left ${active ? 'bg-elevated hairline-gold' : 'bg-obsidian/45 hairline hover:border-white/20'}">
                    <div class="w-9 h-9 rounded-full ${active ? 'bg-vantage text-obsidian' : 'bg-subtle text-ink'} flex items-center justify-center text-[12px] font-bold shrink-0">${r.initials}</div>
                    <div class="flex flex-col min-w-0 flex-1">
                      <span class="text-[13px] font-bold text-ink truncate">${r.name}</span>
                      <span class="text-[11px] text-muted truncate">${r.bank}</span>
                    </div>
                    ${active ? '<i data-lucide="check" class="w-4 h-4 text-vantage shrink-0"></i>' : ''}
                  </button>
                `;
              }).join('')}
            </div>
            <div class="pt-3 border-t border-white/[0.06] flex flex-col gap-1.5 text-[12px]">
              <span class="text-muted">IBAN / Cuenta destino</span>
              <div class="flex items-center justify-between gap-2 bg-obsidian hairline rounded-xl px-3 py-2.5">
                <span class="font-mono text-ink/90 truncate">${activeRecipient.iban}</span>
                <button id="copy-iban-btn" class="tactile text-muted hover:text-vantage shrink-0"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>
              </div>
            </div>
          </div>

          <div class="anim-card bg-surface hairline rounded-3xl p-5 flex flex-col gap-3 text-[13px]">
            <span class="text-[12px] font-bold uppercase tracking-wider text-muted">Resumen de Ejecución</span>
            <div class="flex items-center justify-between tabular-nums">
              <span class="text-muted">Ahorro vs. banca tradicional (2.8%)</span>
              <span id="transfer-savings-readout" class="text-gain font-bold">+$${bankSavings.toLocaleString('en-US')}</span>
            </div>
            <div class="flex items-center justify-between tabular-nums">
              <span class="text-muted">Tiempo estimado de llegada</span>
              <span class="text-ink font-medium">${t.rail === 'instant' ? '~15 segundos' : t.rail === 'swift' ? 'Hoy antes de 17:00' : 'Instantáneo'}</span>
            </div>
            <div class="flex items-center justify-between tabular-nums pt-2.5 border-t border-white/[0.06]">
              <span class="text-muted">Total a debitar</span>
              <span id="transfer-total-readout" class="text-ink font-bold text-[15px]">${fmtMoney(Number(t.amount) + fee, t.sendCurrency)}</span>
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  // ===========================================================================
  // 7. SCREEN 3: PORTFOLIO (ANIMATED DONUT RING + HOLDINGS TABLE)
  // ===========================================================================
  function renderPortfolio() {
    const mobile = isMobileLayout();
    const total = state.holdings.reduce((s, h) => s + h.value, 0);
    const R = 56;
    const C = 2 * Math.PI * R;
    let offsetAcc = 0;

    const donutSlices = state.holdings
      .map((h) => {
        const segLen = (h.weight / 100) * C;
        const gap = 3.5;
        const dash = Math.max(2, segLen - gap);
        const dashOffset = -offsetAcc;
        offsetAcc += segLen;
        return `
          <circle
            class="donut-seg"
            cx="72" cy="72" r="${R}"
            fill="none"
            stroke="${h.color}"
            stroke-width="11"
            stroke-linecap="round"
            stroke-dasharray="${dash.toFixed(1)} ${(C - dash).toFixed(1)}"
            stroke-dashoffset="${dashOffset.toFixed(1)}"
            data-final-offset="${dashOffset.toFixed(1)}"
            transform="rotate(-90 72 72)"
          />
        `;
      })
      .join('');

    return `
      <div class="flex flex-col gap-5">
        <section class="anim-card hero-balance-surface hairline rounded-3xl p-5 sm:p-6 grid grid-cols-1 ${mobile ? '' : 'md:grid-cols-12'} gap-6 items-center">
          <div class="${mobile ? '' : 'md:col-span-8'} flex flex-col gap-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex flex-col gap-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-muted">Valor Total de Cartera</span>
                <div class="flex items-baseline gap-2.5 tabular-nums">
                  <span class="text-[30px] sm:text-[36px] font-bold text-ink tracking-tight">${fmtMoney(total, 'USD')}</span>
                  <span class="text-[12px] font-bold text-gain bg-gain/12 px-2 py-0.5 rounded-md">+1.18% hoy</span>
                </div>
              </div>
              <button id="portfolio-rebalance-btn" class="${state.rebalanceApplied ? 'bg-gain/15 text-gain border border-gain/30' : 'btn-glow'} tactile px-4 py-2.5 rounded-xl text-[13px] font-bold w-full sm:w-auto text-center">
                ${state.rebalanceApplied ? '✓ Rebalanceo Activo' : 'Optimizar (+0.85% APY)'}
              </button>
            </div>

            <div class="flex flex-col gap-2.5">
              <div class="w-full h-2.5 rounded-full overflow-hidden flex gap-1 bg-obsidian">
                ${state.holdings.map((h) => `
                  <div class="alloc-bar-seg h-full rounded-full" style="width: ${h.weight}%; background-color: ${h.color}; transform-origin: left center;"></div>
                `).join('')}
              </div>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px]">
                ${state.holdings.map((h) => `
                  <div class="flex items-center gap-1.5 tabular-nums">
                    <span class="w-2 h-2 rounded-sm shrink-0" style="background-color: ${h.color}"></span>
                    <span class="text-ink font-bold">${h.symbol}</span>
                    <span class="text-muted">${h.weight.toFixed(1)}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Animated SVG Donut Ring -->
          <div class="${mobile ? 'flex justify-center pt-2' : 'md:col-span-4 flex justify-center'}">
            <div class="relative w-[144px] h-[144px] flex items-center justify-center">
              <svg width="144" height="144" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r="${R}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="11" />
                ${donutSlices}
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center tabular-nums">
                <span class="text-[10px] uppercase tracking-wider text-muted">Yield</span>
                <span class="text-[20px] font-bold text-vantage leading-tight">${state.rebalanceApplied ? '4.82%' : '3.97%'}</span>
                <span class="text-[10px] text-faint">APY neto</span>
              </div>
            </div>
          </div>
        </section>

        ${mobile ? `
          <section class="anim-card flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <h2 class="text-[13px] font-bold text-ink">Posiciones Activas</h2>
              <span class="text-[12px] text-vantage font-bold tabular-nums">${state.holdings.length} activos</span>
            </div>
            <div class="bg-surface hairline rounded-2xl px-3.5 divide-y divide-white/[0.06]">
              ${state.holdings.map((h) => `
                <div class="anim-row py-3.5 flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <span class="w-2 h-8 rounded-full shrink-0" style="background-color: ${h.color}"></span>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-[14px] font-bold text-ink">${h.symbol}</span>
                        ${h.apy !== '—' ? `<span class="text-[10px] font-bold text-gain bg-gain/10 px-1.5 py-0.5 rounded">${h.apy}</span>` : ''}
                      </div>
                      <span class="text-[11px] text-muted truncate">${h.name}</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end shrink-0 tabular-nums">
                    <span class="text-[14px] font-bold text-ink">${fmtMoney(h.value, 'USD')}</span>
                    <span class="text-[11px] text-gain">+${h.change.toFixed(2)}% · ${h.weight.toFixed(1)}%</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : `
          <section class="anim-card bg-surface hairline rounded-3xl p-6 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-[15px] font-bold text-ink">Posiciones Activas</h2>
              <span class="text-[12px] text-muted">Rendimiento anual estimado: <span class="text-vantage font-bold tabular-nums">${state.rebalanceApplied ? '+$40,628 / año' : '+$33,463 / año'}</span></span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-white/[0.07] text-[11px] uppercase tracking-wider text-muted">
                    <th class="py-2.5 pr-4 font-medium">Activo</th>
                    <th class="py-2.5 px-3 font-medium">Categoría</th>
                    <th class="py-2.5 px-3 font-medium text-right">Peso</th>
                    <th class="py-2.5 px-3 font-medium text-right">APY / Yield</th>
                    <th class="py-2.5 pl-3 font-medium text-right">Valor</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/[0.05] text-[13px] tabular-nums">
                  ${state.holdings.map((h) => `
                    <tr class="anim-row hover:bg-white/[0.025] transition-colors">
                      <td class="py-3.5 pr-4">
                        <div class="flex items-center gap-3">
                          <span class="w-2 h-7 rounded-full shrink-0" style="background-color: ${h.color}"></span>
                          <div class="flex flex-col">
                            <span class="font-bold text-ink">${h.symbol}</span>
                            <span class="text-[12px] text-muted">${h.name}</span>
                          </div>
                        </div>
                      </td>
                      <td class="py-3.5 px-3 text-muted">${h.category}</td>
                      <td class="py-3.5 px-3 text-right text-ink font-medium">${h.weight.toFixed(1)}%</td>
                      <td class="py-3.5 px-3 text-right ${h.apy !== '—' ? 'text-gain font-bold' : 'text-faint'}">${h.apy}</td>
                      <td class="py-3.5 pl-3 text-right">
                        <div class="flex flex-col items-end">
                          <span class="font-bold text-ink">${fmtMoney(h.value, 'USD')}</span>
                          <span class="text-[11px] text-gain">+${h.change.toFixed(2)}%</span>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </section>
        `}
      </div>
    `;
  }

  // ===========================================================================
  // 8. SCREEN 4: ANALYTICS (PERIOD TOGGLE, TOOLTIP BARS & BREAKDOWN)
  // ===========================================================================
  function renderAnalytics() {
    const mobile = isMobileLayout();
    const months6 = [
      { m: 'Jun', inflow: 68, outflow: 34 },
      { m: 'Jul', inflow: 82, outflow: 41 },
      { m: 'Ago', inflow: 74, outflow: 29 },
      { m: 'Sep', inflow: 91, outflow: 44 },
      { m: 'Oct', inflow: 86, outflow: 38 },
      { m: 'Nov', inflow: 96, outflow: 32 },
    ];
    const months12 = [
      { m: 'Ene', inflow: 54, outflow: 28 },
      { m: 'Mar', inflow: 66, outflow: 35 },
      { m: 'May', inflow: 78, outflow: 31 },
      { m: 'Jul', inflow: 82, outflow: 41 },
      { m: 'Sep', inflow: 91, outflow: 44 },
      { m: 'Nov', inflow: 96, outflow: 32 },
    ];
    const months = state.analyticsPeriod === '6M' ? months6 : months12;

    const spendCats = [
      { label: 'Cloud e Infraestructura', pct: 38, amt: '$14,240', color: '#F2CE16' },
      { label: 'Viajes Ejecutivos & Aerolíneas', pct: 24, amt: '$8,990', color: '#E4E4E7' },
      { label: 'Servicios Legales & Auditoría', pct: 21, amt: '$7,860', color: '#30D158' },
      { label: 'Software SaaS & Suscripciones', pct: 17, amt: '$6,370', color: '#71717A' },
    ];

    return `
      <div class="flex flex-col gap-5">
        <div class="${mobile ? 'flex gap-2.5 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-1' : 'grid grid-cols-3 gap-4'}">
          <div class="anim-card card-hover ${mobile ? 'snap-start shrink-0 w-[215px]' : ''} bg-surface hairline rounded-2xl p-4 sm:p-5 flex flex-col gap-1">
            <span class="text-[11px] text-muted font-bold uppercase tracking-wider">Rendimiento YTD</span>
            <span class="text-[24px] sm:text-[28px] font-bold text-ink tabular-nums">${fmtMoney(34820.50, 'USD', true)}</span>
            <span class="text-[11px] text-gain font-bold">+18.4% vs. año anterior</span>
          </div>
          <div class="anim-card card-hover ${mobile ? 'snap-start shrink-0 w-[215px]' : ''} bg-surface hairline rounded-2xl p-4 sm:p-5 flex flex-col gap-1">
            <span class="text-[11px] text-muted font-bold uppercase tracking-wider">Ahorro FX Total</span>
            <span class="text-[24px] sm:text-[28px] font-bold text-vantage tabular-nums">${fmtMoney(6410.00, 'USD')}</span>
            <span class="text-[11px] text-muted">0.00% spread institucional</span>
          </div>
          <div class="anim-card card-hover ${mobile ? 'snap-start shrink-0 w-[215px]' : ''} bg-surface hairline rounded-2xl p-4 sm:p-5 flex flex-col gap-1">
            <span class="text-[11px] text-muted font-bold uppercase tracking-wider">Liquidez T+1</span>
            <span class="text-[24px] sm:text-[28px] font-bold text-ink tabular-nums">54.1%</span>
            <span class="text-[11px] text-muted">Perfil conservador-moderado</span>
          </div>
        </div>

        <!-- Animated Cash Flow Bar Chart with Tooltips -->
        <section class="anim-card bg-surface hairline rounded-3xl p-5 sm:p-6 flex flex-col gap-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex flex-col gap-0.5">
              <h2 class="text-[15px] font-bold text-ink">Flujo de Caja Mensual</h2>
              <span class="text-[12px] text-muted">Ingresos vs. egresos operativos (k USD)</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-3 text-[11px]">
                <span class="flex items-center gap-1.5 text-ink"><span class="w-2.5 h-2.5 rounded-sm bg-vantage"></span>Ingresos</span>
                <span class="flex items-center gap-1.5 text-muted"><span class="w-2.5 h-2.5 rounded-sm bg-white/20"></span>Egresos</span>
              </div>
              <div class="inline-flex bg-obsidian p-1 rounded-xl hairline text-[11px]">
                <button data-an-period="6M" class="an-period-btn tactile px-2.5 py-1 rounded-lg font-bold ${state.analyticsPeriod === '6M' ? 'bg-elevated text-vantage hairline-gold' : 'text-muted'}">6M</button>
                <button data-an-period="1Y" class="an-period-btn tactile px-2.5 py-1 rounded-lg font-bold ${state.analyticsPeriod === '1Y' ? 'bg-elevated text-vantage hairline-gold' : 'text-muted'}">1A</button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-6 gap-2 sm:gap-6 items-end h-48 sm:h-56 pt-6">
            ${months.map((item) => `
              <div class="bar-col-wrap relative flex flex-col items-center gap-2 h-full justify-end cursor-pointer">
                <div class="bar-tooltip absolute -top-2 left-1/2 bg-elevated hairline-gold rounded-lg px-2.5 py-1.5 text-[10px] tabular-nums whitespace-nowrap z-20 shadow-xl">
                  <div class="text-vantage font-bold">+$${item.inflow}k</div>
                  <div class="text-muted">-$${item.outflow}k · Neto +$${item.inflow - item.outflow}k</div>
                </div>
                <div class="w-full flex items-end justify-center gap-1.5 h-36 sm:h-44">
                  <div style="height: ${item.inflow}%" class="cash-bar w-3.5 sm:w-7 rounded-t-lg bg-gradient-to-t from-vantage/75 to-vantage origin-bottom"></div>
                  <div style="height: ${item.outflow}%" class="cash-bar w-3.5 sm:w-7 rounded-t-lg bg-white/15 origin-bottom"></div>
                </div>
                <span class="text-[11px] text-muted font-medium">${item.m}</span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Spending Breakdown + Yield Projection -->
        <div class="grid grid-cols-1 ${mobile ? '' : 'lg:grid-cols-12'} gap-5">
          <section class="anim-card ${mobile ? '' : 'lg:col-span-7'} bg-surface hairline rounded-3xl p-5 sm:p-6 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[15px] font-bold text-ink">Distribución de Gasto Operativo</h3>
              <span class="text-[12px] text-muted tabular-nums">$37,460 / mes</span>
            </div>
            <div class="flex flex-col gap-4">
              ${spendCats.map((cat) => `
                <div class="flex flex-col gap-1.5 tabular-nums">
                  <div class="flex items-center justify-between text-[12px]">
                    <span class="font-medium text-ink">${cat.label}</span>
                    <span class="text-muted"><strong class="text-ink">${cat.amt}</strong> · ${cat.pct}%</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-obsidian overflow-hidden">
                    <div class="spend-bar-fill h-full rounded-full origin-left" style="width: ${cat.pct}%; background-color: ${cat.color};"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <section class="anim-card ${mobile ? '' : 'lg:col-span-5'} hero-balance-surface hairline-gold rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div class="flex flex-col gap-1">
              <span class="text-[11px] font-bold uppercase tracking-widest text-vantage">Proyección Treasury</span>
              <h3 class="text-[18px] font-bold text-ink">Interés compuesto T-Bills</h3>
              <p class="text-[12px] text-muted">Estimación basada en tu tasa ponderada actual de ${state.rebalanceApplied ? '4.82%' : '4.35%'} APY.</p>
            </div>
            <div class="flex flex-col gap-2.5 tabular-nums">
              <div class="bg-obsidian/80 hairline rounded-xl p-3.5 flex items-center justify-between">
                <span class="text-[12px] text-muted">Este mes</span>
                <span class="text-[16px] font-bold text-ink">+$3,412</span>
              </div>
              <div class="bg-obsidian/80 hairline rounded-xl p-3.5 flex items-center justify-between">
                <span class="text-[12px] text-muted">Próximos 90 días</span>
                <span class="text-[16px] font-bold text-gain">+$10,236</span>
              </div>
              <div class="bg-obsidian/80 hairline-gold rounded-xl p-3.5 flex items-center justify-between">
                <span class="text-[12px] text-vantage font-bold">Proyección 12 meses</span>
                <span class="text-[18px] font-bold text-vantage">+$41,850</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // 9. SCREEN 5: CARDS (3D MAGNETIC TILT + CARD SWITCHER + NEW VIRTUAL CARD)
  // ===========================================================================
  function renderCards() {
    const mobile = isMobileLayout();
    const c = state.cards[state.activeCardIdx] || state.cards[0];
    const usedPct = Math.min(100, Math.round((c.spent / c.monthlyLimit) * 100));

    return `
      <div class="flex flex-col gap-5">
        <!-- Card Switcher Pills + Issue Virtual Card -->
        <div class="anim-card flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2 flex-wrap">
            ${state.cards.map((card, i) => `
              <button data-card-idx="${i}" class="card-select-btn tactile px-3.5 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2 ${i === state.activeCardIdx ? 'bg-elevated text-ink hairline-gold' : 'bg-surface hairline text-muted hover:text-ink'}">
                <span class="w-2 h-2 rounded-full ${card.frozen ? 'bg-sky-400' : 'bg-vantage'}"></span>
                <span>${card.name}</span>
                <span class="text-faint tabular-nums">${card.numberMasked.slice(-4)}</span>
              </button>
            `).join('')}
          </div>
          <button id="issue-virtual-card-btn" class="btn-glow px-4 py-2 rounded-xl text-[12px] font-bold">
            <i data-lucide="plus" class="w-3.5 h-3.5 text-vantage"></i>
            <span>Nueva tarjeta virtual</span>
          </button>
        </div>

        <div class="${mobile ? 'flex flex-col gap-5' : 'grid grid-cols-12 gap-6 items-start'}">
          <!-- 3D Metallic Card Stage -->
          <section class="anim-card ${mobile ? '' : 'col-span-5'} flex flex-col gap-4" style="perspective: 950px;">
            <div id="interactive-metal-card" class="metal-card-3d relative rounded-2xl p-5 sm:p-6 aspect-[1.586/1] flex flex-col justify-between hairline-strong shadow-2xl transition-all duration-300 ${c.frozen ? 'grayscale opacity-75' : ''} ${c.theme === 'gold' ? 'bg-gradient-to-br from-[#2B240E] via-[#15130B] to-[#08080A] hairline-gold' : 'bg-gradient-to-br from-[#222229] via-[#111115] to-[#08080A]'}">
              <div class="metal-card-glare"></div>
              ${c.frozen ? '<div class="card-freeze-veil absolute inset-0 z-10 flex items-center justify-center"><span class="px-3.5 py-1.5 rounded-full bg-obsidian/90 border border-sky-400/50 text-sky-300 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5"><i data-lucide="snowflake" class="w-3.5 h-3.5"></i>Tarjeta Congelada</span></div>' : ''}

              <div class="flex items-center justify-between relative z-0">
                <div class="flex items-center gap-2">
                  <svg width="20" height="15" viewBox="0 0 221 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L110.109 166.858L127.539 141.473L32.7384 0C32.7384 0 0 0.242599 0 0Z" fill="#F2CE16"/>
                    <path d="M110.109 101.493L127.545 76.2321L76.2324 0H43.2451L110.109 101.493Z" fill="#F2CE16"/>
                    <path d="M115.195 44.7073L131.611 69.3921L177.767 0.487793H145.029L115.195 44.7073Z" fill="#F2CE16"/>
                    <path d="M187.654 0L115.571 108.977L131.477 133.162L220.15 0H187.654Z" fill="#F2CE16"/>
                    <path d="M109.937 21.7641C116.101 21.7641 121.098 16.8921 121.098 10.8821C121.098 4.87207 116.101 0 109.937 0C103.773 0 98.7759 4.87207 98.7759 10.8821C98.7759 16.8921 103.773 21.7641 109.937 21.7641Z" fill="#F2CE16"/>
                  </svg>
                  <span class="text-[13px] font-bold tracking-tight text-ink">${c.name}</span>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-vantage">${c.badge}</span>
              </div>

              <div class="flex flex-col gap-1 tabular-nums relative z-0">
                <span class="text-[18px] sm:text-[20px] font-medium tracking-[0.15em] text-ink">
                  ${c.showDetails ? c.numberFull : c.numberMasked}
                </span>
              </div>

              <div class="flex items-end justify-between text-[11px] tabular-nums relative z-0">
                <div class="flex flex-col">
                  <span class="text-[9px] uppercase tracking-wider text-faint">Titular</span>
                  <span class="font-bold text-ink">${c.holder}</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex flex-col">
                    <span class="text-[9px] uppercase tracking-wider text-faint">Exp</span>
                    <span class="font-bold text-ink">${c.exp}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[9px] uppercase tracking-wider text-faint">CVV</span>
                    <span class="font-bold text-ink">${c.showDetails ? c.cvv : '•••'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2.5">
              <button id="card-reveal-btn" class="tactile py-3 px-2 rounded-2xl bg-surface hairline hover:border-vantage/40 text-[12px] font-bold text-ink flex items-center justify-center gap-1.5">
                <i data-lucide="${c.showDetails ? 'eye-off' : 'eye'}" class="w-4 h-4 text-vantage"></i>
                <span>${c.showDetails ? 'Ocultar' : 'Datos'}</span>
              </button>
              <button id="card-copy-btn" class="tactile py-3 px-2 rounded-2xl bg-surface hairline hover:border-vantage/40 text-[12px] font-bold text-ink flex items-center justify-center gap-1.5">
                <i data-lucide="copy" class="w-4 h-4 text-muted"></i>
                <span>Copiar</span>
              </button>
              <button id="card-freeze-btn" class="tactile py-3 px-2 rounded-2xl ${c.frozen ? 'bg-vantage text-obsidian' : 'bg-surface hairline hover:border-vantage/40 text-ink'} text-[12px] font-bold flex items-center justify-center gap-1.5">
                <i data-lucide="snowflake" class="w-4 h-4"></i>
                <span>${c.frozen ? 'Activar' : 'Congelar'}</span>
              </button>
            </div>
          </section>

          <!-- Card Limits & Controls -->
          <section class="anim-card ${mobile ? '' : 'col-span-7'} bg-surface hairline rounded-3xl p-5 sm:p-6 flex flex-col gap-5">
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <span class="text-[14px] font-bold text-ink">Límite Mensual</span>
                <span id="card-limit-readout" class="text-[16px] font-bold text-vantage tabular-nums">${fmtMoney(c.monthlyLimit, 'USD')}</span>
              </div>
              <input id="card-limit-slider" type="range" min="5000" max="150000" step="5000" value="${c.monthlyLimit}" class="w-full" />
              <div class="w-full h-1.5 rounded-full bg-obsidian overflow-hidden">
                <div id="card-usage-bar" class="h-full bg-vantage rounded-full transition-all duration-300" style="width: ${usedPct}%"></div>
              </div>
              <div class="flex items-center justify-between text-[11px] text-muted tabular-nums">
                <span>Usado: <strong class="text-ink">${fmtMoney(c.spent, 'USD')}</strong> (${usedPct}%)</span>
                <span>Máx. $150k</span>
              </div>
            </div>

            <div class="flex flex-col divide-y divide-white/[0.06]">
              <div class="py-3.5 flex items-center justify-between gap-4">
                <div class="flex flex-col">
                  <span class="text-[13px] font-bold text-ink">Pagos en línea</span>
                  <span class="text-[11px] text-muted">Cargos SaaS y comercio electrónico</span>
                </div>
                <button data-card-toggle="onlinePayments" class="card-toggle-btn tactile w-11 h-6 rounded-full p-0.5 shrink-0 ${c.onlinePayments ? 'bg-vantage' : 'bg-subtle'}">
                  <span class="block w-5 h-5 rounded-full bg-obsidian transition-transform ${c.onlinePayments ? 'translate-x-5' : 'translate-x-0'}"></span>
                </button>
              </div>
              <div class="py-3.5 flex items-center justify-between gap-4">
                <div class="flex flex-col">
                  <span class="text-[13px] font-bold text-ink">Gasto internacional sin FX</span>
                  <span class="text-[11px] text-muted">Tasa mid-market en 140+ países</span>
                </div>
                <button data-card-toggle="intlSpending" class="card-toggle-btn tactile w-11 h-6 rounded-full p-0.5 shrink-0 ${c.intlSpending ? 'bg-vantage' : 'bg-subtle'}">
                  <span class="block w-5 h-5 rounded-full bg-obsidian transition-transform ${c.intlSpending ? 'translate-x-5' : 'translate-x-0'}"></span>
                </button>
              </div>
              <div class="py-3.5 flex items-center justify-between gap-4">
                <div class="flex flex-col">
                  <span class="text-[13px] font-bold text-ink">Apple Pay &amp; Google Wallet</span>
                  <span class="text-[11px] text-muted">Tokenización biométrica contactless</span>
                </div>
                <button data-card-toggle="applePay" class="card-toggle-btn tactile w-11 h-6 rounded-full p-0.5 shrink-0 ${c.applePay ? 'bg-vantage' : 'bg-subtle'}">
                  <span class="block w-5 h-5 rounded-full bg-obsidian transition-transform ${c.applePay ? 'translate-x-5' : 'translate-x-0'}"></span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // 10. SCREEN 6: SETTINGS (EXECUTIVE PROFILE, SECURITY SCORE & ERP SYNC)
  // ===========================================================================
  function renderSettings() {
    const s = state.settings;
    const score = 78 + (s.passkeyEnabled ? 12 : 0) + (s.instantAlerts ? 10 : 0);

    return `
      <div class="max-w-3xl flex flex-col gap-5">
        <!-- Executive Profile & Security Health -->
        <section class="anim-card hero-balance-surface hairline rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-vantage/30 to-elevated hairline-gold flex items-center justify-center text-[18px] font-bold text-vantage shrink-0">AM</div>
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center gap-2">
                <span class="text-[17px] font-bold text-ink">Alejandro Morales</span>
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gain/15 text-gain">KYC Tier-1</span>
              </div>
              <span class="text-[12px] text-muted">alejandro@vantagecapital.io · Private Wealth ••8841</span>
            </div>
          </div>

          <div class="bg-obsidian/80 hairline rounded-2xl px-4 py-3 flex flex-col gap-1 min-w-[160px] tabular-nums">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-muted">Seguridad</span>
              <span class="font-bold text-vantage">${score}/100</span>
            </div>
            <div class="w-full h-1.5 rounded-full bg-surface overflow-hidden">
              <div class="h-full bg-vantage rounded-full transition-all duration-300" style="width: ${score}%"></div>
            </div>
          </div>
        </section>

        <!-- Preferences & Security -->
        <section class="anim-card bg-surface hairline rounded-3xl p-5 sm:p-6 flex flex-col gap-2">
          <h2 class="text-[15px] font-bold text-ink mb-1">Preferencias y Seguridad</h2>
          <div class="flex flex-col divide-y divide-white/[0.06]">
            <div class="py-3.5 flex items-center justify-between gap-4">
              <div class="flex flex-col">
                <span class="text-[13px] font-bold text-ink">Autenticación con Passkey</span>
                <span class="text-[11px] text-muted">Biometría obligatoria para envíos &gt; $10,000</span>
              </div>
              <button data-setting-toggle="passkeyEnabled" class="setting-toggle-btn tactile w-11 h-6 rounded-full p-0.5 shrink-0 ${s.passkeyEnabled ? 'bg-vantage' : 'bg-subtle'}">
                <span class="block w-5 h-5 rounded-full bg-obsidian transition-transform ${s.passkeyEnabled ? 'translate-x-5' : 'translate-x-0'}"></span>
              </button>
            </div>
            <div class="py-3.5 flex items-center justify-between gap-4">
              <div class="flex flex-col">
                <span class="text-[13px] font-bold text-ink">Alertas de liquidación en vivo</span>
                <span class="text-[11px] text-muted">Notificaciones instantáneas FedNow, SEPA y USDC</span>
              </div>
              <button data-setting-toggle="instantAlerts" class="setting-toggle-btn tactile w-11 h-6 rounded-full p-0.5 shrink-0 ${s.instantAlerts ? 'bg-vantage' : 'bg-subtle'}">
                <span class="block w-5 h-5 rounded-full bg-obsidian transition-transform ${s.instantAlerts ? 'translate-x-5' : 'translate-x-0'}"></span>
              </button>
            </div>
            <div class="py-3.5 flex items-center justify-between gap-4">
              <div class="flex flex-col">
                <span class="text-[13px] font-bold text-ink">Insights de Vantage Copilot</span>
                <span class="text-[11px] text-muted">Sugerencias proactivas de rendimiento en el Resumen</span>
              </div>
              <button data-setting-toggle="copilotInsights" class="setting-toggle-btn tactile w-11 h-6 rounded-full p-0.5 shrink-0 ${s.copilotInsights ? 'bg-vantage' : 'bg-subtle'}">
                <span class="block w-5 h-5 rounded-full bg-obsidian transition-transform ${s.copilotInsights ? 'translate-x-5' : 'translate-x-0'}"></span>
              </button>
            </div>
          </div>
        </section>

        <!-- Connected ERP & Treasury Integrations -->
        <section class="anim-card bg-surface hairline rounded-3xl p-5 sm:p-6 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h2 class="text-[15px] font-bold text-ink">Integraciones Conectadas</h2>
            <span class="text-[11px] text-vantage font-bold">API OAuth 2.0</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${[
              { key: 'erpNetSuite', name: 'NetSuite ERP', desc: 'Conciliación diaria' },
              { key: 'erpXero', name: 'Xero Contabilidad', desc: 'Libro mayor sync' },
              { key: 'erpSlack', name: 'Slack Alertas', desc: 'Canal #tesorería' },
            ].map((it) => `
              <div class="bg-obsidian hairline rounded-2xl p-4 flex flex-col justify-between gap-4">
                <div class="flex items-center justify-between">
                  <span class="text-[13px] font-bold text-ink">${it.name}</span>
                  <button data-setting-toggle="${it.key}" class="setting-toggle-btn tactile w-9 h-5 rounded-full p-0.5 shrink-0 ${s[it.key] ? 'bg-vantage' : 'bg-subtle'}">
                    <span class="block w-4 h-4 rounded-full bg-obsidian transition-transform ${s[it.key] ? 'translate-x-4' : 'translate-x-0'}"></span>
                  </button>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-muted">${it.desc}</span>
                  <span class="${s[it.key] ? 'text-gain font-bold' : 'text-faint'}">${s[it.key] ? 'Activo' : 'Off'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }

  // ===========================================================================
  // 11. RENDER ENGINE + GSAP VIEW CHOREOGRAPHY
  // ===========================================================================
  function animateActiveView(isFullViewChange) {
    if (!window.gsap) return;
    const container = document.getElementById('main-content');
    if (!container) return;

    // 1. Staggered card cascade
    const cards = container.querySelectorAll('.anim-card');
    if (cards.length && isFullViewChange) {
      gsap.from(cards, {
        y: 22,
        opacity: 0,
        scale: 0.985,
        duration: 0.56,
        stagger: 0.055,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }

    // 2. Staggered rows (transactions, holdings, recipients)
    const rows = container.querySelectorAll('.anim-row');
    if (rows.length && isFullViewChange) {
      gsap.from(rows, {
        y: 12,
        opacity: 0,
        duration: 0.42,
        stagger: 0.035,
        delay: 0.14,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    }

    // 3. Hero SVG Chart Line Draw-In + Active Dot Pop
    const linePath = document.getElementById('chart-line-path');
    const areaPath = document.getElementById('chart-area-path');
    const activeDot = document.getElementById('chart-active-dot');
    if (linePath && typeof linePath.getTotalLength === 'function') {
      const len = linePath.getTotalLength();
      gsap.fromTo(
        linePath,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 0.95, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }
      );
      if (areaPath) {
        gsap.fromTo(areaPath, { opacity: 0 }, { opacity: 1, duration: 0.85, delay: 0.15, ease: 'power2.out' });
      }
      if (activeDot) {
        gsap.fromTo(activeDot, { scale: 0 }, { scale: 1, duration: 0.45, delay: 0.65, ease: 'back.out(2)' });
      }
    }

    // 4. Hero Balance & KPI Numeric Roll-Up (on fresh view enter, when privacy mode is off)
    if (isFullViewChange && !state.privacyMode) {
      const balEl = document.getElementById('hero-balance-readout');
      if (balEl && balEl.dataset.targetVal) {
        const target = parseFloat(balEl.dataset.targetVal);
        const start = target * 0.965;
        const compact = isMobileLayout();
        const proxy = { val: start };
        gsap.to(proxy, {
          val: target,
          duration: 0.85,
          ease: 'power3.out',
          onUpdate: () => {
            const w = Math.floor(proxy.val).toLocaleString('en-US');
            const c = (proxy.val % 1).toFixed(2).substring(1);
            balEl.innerHTML = `$${w}<span class="text-muted ${compact ? 'text-[22px]' : 'text-[30px]'} font-medium">${c}</span>`;
          },
        });
      }

      container.querySelectorAll('.kpi-num').forEach((el) => {
        const target = parseFloat(el.dataset.kpi);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        if (isNaN(target)) return;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 0.95,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(proxy.val).toLocaleString('en-US')}${suffix}`;
          },
        });
      });
    }

    // 5. Portfolio Donut & Segmented Bar Sweep
    const allocSegs = container.querySelectorAll('.alloc-bar-seg');
    if (allocSegs.length) {
      gsap.from(allocSegs, { scaleX: 0, duration: 0.72, stagger: 0.06, ease: 'power3.out', clearProps: 'transform' });
    }
    const donutSegs = container.querySelectorAll('.donut-seg');
    if (donutSegs.length) {
      gsap.from(donutSegs, { opacity: 0, strokeDashoffset: 360, duration: 0.9, stagger: 0.07, ease: 'power3.out' });
    }

    // 6. Analytics Cash-Flow Bars & Spending Bars
    const cashBars = container.querySelectorAll('.cash-bar');
    if (cashBars.length) {
      gsap.from(cashBars, { scaleY: 0, duration: 0.75, stagger: 0.04, ease: 'power3.out', clearProps: 'transform' });
    }
    const spendBars = container.querySelectorAll('.spend-bar-fill');
    if (spendBars.length) {
      gsap.from(spendBars, { scaleX: 0, duration: 0.8, stagger: 0.08, delay: 0.15, ease: 'power3.out', clearProps: 'transform' });
    }

    // 7. 3D Magnetic Tilt on Metal Card (gsap.quickTo)
    const metalCard = document.getElementById('interactive-metal-card');
    if (metalCard) {
      const xTo = gsap.quickTo(metalCard, 'x', { duration: 0.35, ease: 'power3.out' });
      const yTo = gsap.quickTo(metalCard, 'y', { duration: 0.35, ease: 'power3.out' });
      const rotXTo = gsap.quickTo(metalCard, 'rotationX', { duration: 0.4, ease: 'power3.out' });
      const rotYTo = gsap.quickTo(metalCard, 'rotationY', { duration: 0.4, ease: 'power3.out' });

      metalCard.addEventListener('mousemove', (e) => {
        const r = metalCard.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        metalCard.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
        metalCard.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        xTo((px - 0.5) * 8);
        yTo((py - 0.5) * 8);
        rotYTo((px - 0.5) * 9);
        rotXTo(-(py - 0.5) * 9);
      });
      metalCard.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
        rotXTo(0);
        rotYTo(0);
      });
    }
  }

  function renderActiveView(isFullViewChange = false) {
    const container = document.getElementById('main-content');
    let html = '';
    if (state.activeView === 'overview') html = renderOverview();
    else if (state.activeView === 'transfer') html = renderTransfer();
    else if (state.activeView === 'portfolio') html = renderPortfolio();
    else if (state.activeView === 'analytics') html = renderAnalytics();
    else if (state.activeView === 'cards') html = renderCards();
    else if (state.activeView === 'settings') html = renderSettings();

    container.innerHTML = html;
    refreshIcons();
    bindViewEvents();
    animateActiveView(isFullViewChange);
  }

  // ===========================================================================
  // 12. VIEW EVENT BINDINGS
  // ===========================================================================
  function bindViewEvents() {
    document.querySelectorAll('.tf-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.timeframe = btn.dataset.tf;
        renderActiveView(false);
      });
    });

    // Interactive chart hover scrubbing
    const chartWrap = document.getElementById('hero-chart-wrap');
    if (chartWrap) {
      const compact = chartWrap.dataset.compact === '1';
      const series = chartSeries[state.timeframe];
      const vals = series.values;
      const H = 200, padTop = 18, padBottom = 10;
      const minV = Math.min(...vals) * 0.992;
      const maxV = Math.max(...vals) * 1.004;
      const range = maxV - minV || 1;
      const crossLine = document.getElementById('chart-crosshair-line');
      const activeDot = document.getElementById('chart-active-dot');
      const readout = document.getElementById('hero-balance-readout');
      const dateEl = document.getElementById('chart-hover-date');

      chartWrap.querySelectorAll('.chart-hit').forEach((strip) => {
        const idx = Number(strip.dataset.ptIdx);
        const xPct = (idx / (vals.length - 1)) * 100;
        const y = padTop + (1 - (vals[idx] - minV) / range) * (H - padTop - padBottom);
        const yPct = (y / H) * 100;
        const onFocus = () => {
          crossLine.style.left = `${xPct.toFixed(2)}%`;
          crossLine.style.opacity = '1';
          activeDot.style.left = `${xPct.toFixed(2)}%`;
          activeDot.style.top = `${yPct.toFixed(2)}%`;
          if (!state.privacyMode) {
            const v = vals[idx];
            const w = Math.floor(v).toLocaleString('en-US');
            const c = (v % 1).toFixed(2).substring(1);
            readout.innerHTML = `$${w}<span class="text-muted ${compact ? 'text-[22px]' : 'text-[30px]'} font-medium">${c}</span>`;
          }
          dateEl.textContent = compact ? series.labels[idx] : `· ${series.labels[idx]}`;
        };
        strip.addEventListener('mouseenter', onFocus);
        strip.addEventListener('touchstart', onFocus, { passive: true });
      });

      chartWrap.addEventListener('mouseleave', () => {
        crossLine.style.opacity = '0';
        const lastIdx = vals.length - 1;
        const ly = padTop + (1 - (vals[lastIdx] - minV) / range) * (H - padTop - padBottom);
        const lyPct = (ly / H) * 100;
        activeDot.style.left = '100%';
        activeDot.style.top = `${lyPct.toFixed(2)}%`;
        const totalBalance = getTotalNetBalance();
        if (!state.privacyMode) {
          const w = Math.floor(totalBalance).toLocaleString('en-US');
          const c = (totalBalance % 1).toFixed(2).substring(1);
          readout.innerHTML = `$${w}<span class="text-muted ${compact ? 'text-[22px]' : 'text-[30px]'} font-medium">${c}</span>`;
        }
        dateEl.textContent = '';
      });
    }

    document.querySelectorAll('.quick-action-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const act = btn.dataset.quick;
        if (act === 'deposit') openDepositModal();
        else if (act === 'transfer' || act === 'exchange') setView('transfer');
        else if (act === 'analytics') setView('analytics');
        else if (act === 'copilot') openCopilot();
      });
    });

    document.querySelectorAll('.goto-btn').forEach((btn) => {
      btn.addEventListener('click', () => setView(btn.dataset.goto));
    });

    const insightBtn = document.getElementById('insight-open-copilot');
    if (insightBtn) insightBtn.addEventListener('click', openCopilot);

    // Transaction filter & live search
    document.querySelectorAll('.tx-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.txFilter = btn.dataset.txFilter;
        renderActiveView(false);
      });
    });

    const txSearch = document.getElementById('tx-search-input');
    if (txSearch) {
      txSearch.addEventListener('input', (e) => {
        state.txQuery = e.target.value;
        const caret = e.target.selectionStart;
        renderActiveView(false);
        const nextInput = document.getElementById('tx-search-input');
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(caret, caret);
        }
      });
    }

    document.querySelectorAll('.tx-row-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tx = state.transactions.find((x) => x.id === btn.dataset.txId);
        if (tx) openTxDetailModal(tx);
      });
    });

    // Transfer view bindings
    const amtInput = document.getElementById('transfer-amount-input');
    if (amtInput) {
      amtInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        state.transfer.amount = isNaN(val) ? 0 : Math.max(0, val);
        const rate = fxRates[state.transfer.sendCurrency][state.transfer.receiveCurrency];
        const fee = state.transfer.rail === 'swift' ? 12.0 : 0.0;
        const netReceive = state.transfer.amount * rate;
        const bankSavings = Math.round(state.transfer.amount * 0.028);
        const out = document.getElementById('transfer-receive-readout');
        if (out) out.textContent = netReceive.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const sav = document.getElementById('transfer-savings-readout');
        if (sav) sav.textContent = `+$${bankSavings.toLocaleString('en-US')}`;
        const tot = document.getElementById('transfer-total-readout');
        if (tot) tot.textContent = fmtMoney(state.transfer.amount + fee, state.transfer.sendCurrency);
        const cta = document.getElementById('transfer-review-btn');
        if (cta) cta.querySelector('span').textContent = `Revisar y enviar ${fmtMoney(state.transfer.amount, state.transfer.sendCurrency)}`;
      });
    }

    document.querySelectorAll('.preset-amt-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.transfer.amount = Number(btn.dataset.presetAmt);
        renderActiveView(false);
      });
    });

    const maxBtn = document.getElementById('transfer-max-btn');
    if (maxBtn) {
      maxBtn.addEventListener('click', () => {
        const acc = state.accounts.find((a) => a.currency === state.transfer.sendCurrency);
        if (acc) {
          state.transfer.amount = acc.balance;
          renderActiveView(false);
        }
      });
    }

    const sendSel = document.getElementById('transfer-send-currency');
    if (sendSel) sendSel.addEventListener('change', (e) => { state.transfer.sendCurrency = e.target.value; renderActiveView(false); });

    const recSel = document.getElementById('transfer-receive-currency');
    if (recSel) recSel.addEventListener('change', (e) => { state.transfer.receiveCurrency = e.target.value; renderActiveView(false); });

    const swapBtn = document.getElementById('transfer-swap-btn');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        const tmp = state.transfer.sendCurrency;
        state.transfer.sendCurrency = state.transfer.receiveCurrency;
        state.transfer.receiveCurrency = tmp;
        state.transfer.swapCount += 1;
        renderActiveView(false);
      });
    }

    document.querySelectorAll('.rail-btn').forEach((btn) => {
      btn.addEventListener('click', () => { state.transfer.rail = btn.dataset.rail; renderActiveView(false); });
    });

    document.querySelectorAll('.recipient-btn').forEach((btn) => {
      btn.addEventListener('click', () => { state.transfer.recipientId = btn.dataset.recipient; renderActiveView(false); });
    });

    const addRecBtn = document.getElementById('add-recipient-btn');
    if (addRecBtn) addRecBtn.addEventListener('click', openAddRecipientModal);

    const copyIbanBtn = document.getElementById('copy-iban-btn');
    if (copyIbanBtn) {
      copyIbanBtn.addEventListener('click', () => {
        const rec = state.recipients.find((r) => r.id === state.transfer.recipientId);
        if (rec) copyText(rec.iban, `IBAN de ${rec.name}`);
      });
    }

    const reviewBtn = document.getElementById('transfer-review-btn');
    if (reviewBtn) reviewBtn.addEventListener('click', openTransferConfirmModal);

    // Portfolio bindings
    const rebBtn = document.getElementById('portfolio-rebalance-btn');
    if (rebBtn) {
      rebBtn.addEventListener('click', () => {
        if (state.rebalanceApplied) showToast('Portafolio optimizado', 'El 5% en Bonos del Tesoro (SGOV) ya está generando 4.92% APY.');
        else applyRebalance();
      });
    }

    // Analytics period toggle
    document.querySelectorAll('.an-period-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.analyticsPeriod = btn.dataset.anPeriod;
        renderActiveView(false);
      });
    });

    // Cards bindings
    document.querySelectorAll('.card-select-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeCardIdx = Number(btn.dataset.cardIdx);
        renderActiveView(false);
      });
    });

    const issueBtn = document.getElementById('issue-virtual-card-btn');
    if (issueBtn) {
      issueBtn.addEventListener('click', () => {
        const last4 = String(Math.floor(1000 + Math.random() * 9000));
        state.cards.push({
          id: 'card-v-' + Date.now(),
          name: `Virtual #${state.cards.length + 1}`,
          badge: 'Virtual · Instantánea',
          numberFull: `4532  6018  4410  ${last4}`,
          numberMasked: `••••  ••••  ••••  ${last4}`,
          holder: 'ALEJANDRO MORALES',
          exp: '11/29',
          cvv: String(Math.floor(100 + Math.random() * 899)),
          spent: 0,
          monthlyLimit: 15000,
          frozen: false,
          showDetails: true,
          onlinePayments: true,
          intlSpending: true,
          applePay: true,
          theme: 'gold',
        });
        state.activeCardIdx = state.cards.length - 1;
        showToast('Tarjeta virtual emitida', `Terminación ••${last4} lista en Apple Pay.`);
        renderActiveView(false);
      });
    }

    const activeCard = state.cards[state.activeCardIdx];
    const revealBtn = document.getElementById('card-reveal-btn');
    if (revealBtn && activeCard) {
      revealBtn.addEventListener('click', () => { activeCard.showDetails = !activeCard.showDetails; renderActiveView(false); });
    }
    const copyCardBtn = document.getElementById('card-copy-btn');
    if (copyCardBtn && activeCard) {
      copyCardBtn.addEventListener('click', () => copyText(activeCard.numberFull.replace(/\s+/g, ''), `Tarjeta ${activeCard.name}`));
    }
    const freezeBtn = document.getElementById('card-freeze-btn');
    if (freezeBtn && activeCard) {
      freezeBtn.addEventListener('click', () => {
        activeCard.frozen = !activeCard.frozen;
        showToast(activeCard.frozen ? 'Tarjeta congelada' : 'Tarjeta reactivada', `${activeCard.name} actualizada al instante.`);
        renderActiveView(false);
      });
    }
    const slider = document.getElementById('card-limit-slider');
    if (slider && activeCard) {
      slider.addEventListener('input', (e) => {
        activeCard.monthlyLimit = Number(e.target.value);
        const readout = document.getElementById('card-limit-readout');
        if (readout) readout.textContent = fmtMoney(activeCard.monthlyLimit, 'USD');
        const bar = document.getElementById('card-usage-bar');
        if (bar) bar.style.width = `${Math.min(100, Math.round((activeCard.spent / activeCard.monthlyLimit) * 100))}%`;
      });
    }
    document.querySelectorAll('.card-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.cardToggle;
        activeCard[key] = !activeCard[key];
        renderActiveView(false);
      });
    });

    // Settings bindings
    document.querySelectorAll('.setting-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.settingToggle;
        state.settings[key] = !state.settings[key];
        showToast('Preferencia guardada', 'Cambios aplicados en tu cuenta.');
        renderActiveView(false);
      });
    });
  }

  // ===========================================================================
  // 13. REBALANCE, MODALS & COPILOT AI
  // ===========================================================================
  function applyRebalance() {
    if (state.rebalanceApplied) return;
    state.rebalanceApplied = true;
    const sgov = state.holdings.find((h) => h.symbol === 'SGOV');
    const cash = state.holdings.find((h) => h.symbol === 'CASH');
    if (sgov && cash) {
      sgov.value += 42145;
      cash.value -= 42145;
      sgov.weight = 34.1;
      cash.weight = 20.0;
    }
    state.transactions.unshift({
      id: 'tx-' + Date.now(),
      title: 'Rebalanceo Automático → SGOV',
      subtitle: 'Vantage Copilot · Bonos 0-3M',
      date: 'Justo ahora',
      amount: -42145.0,
      currency: 'USD',
      type: 'yield',
      status: 'Ejecutado',
      fee: '$0.00',
      rate: '4.92% APY',
      ref: 'VNT-REB-' + Math.floor(1000 + Math.random() * 9000),
    });
    showToast('Rebalanceo ejecutado', '+0.85% APY adicional proyectado.');
    renderActiveView(false);
    renderCopilotMessages();
  }

  function openModal(innerHTML) {
    const backdrop = document.getElementById('modal-backdrop');
    const card = document.getElementById('modal-card');
    const grabber = isMobileLayout() ? '<div class="flex justify-center pt-2.5"><span class="w-9 h-1 rounded-full bg-white/20"></span></div>' : '';
    card.innerHTML = grabber + innerHTML;
    backdrop.classList.remove('hidden');
    backdrop.classList.add('flex');
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0');
      card.classList.remove('translate-y-4', 'sm:scale-95', 'opacity-0');
      card.classList.add('translate-y-0', 'sm:scale-100', 'opacity-100');
    });
    refreshIcons();
  }

  function closeModal() {
    const backdrop = document.getElementById('modal-backdrop');
    const card = document.getElementById('modal-card');
    backdrop.classList.add('opacity-0');
    card.classList.add('translate-y-4', 'sm:scale-95', 'opacity-0');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      backdrop.classList.remove('flex');
    }, 180);
  }

  function openDepositModal() {
    openModal(`
      <div class="p-5 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[15px] font-bold text-ink">Depositar Fondos</span>
            <span class="text-[12px] text-muted">Treasury Account ••8841 · $0.00 comisión</span>
          </div>
          <button id="modal-close-x" class="tactile w-8 h-8 rounded-lg hover:bg-elevated flex items-center justify-center text-muted hover:text-ink"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <div class="bg-obsidian hairline rounded-xl p-3.5 flex flex-col gap-2.5 text-[12px]">
          <div class="flex items-center justify-between">
            <span class="text-muted">Routing (FedWire / ACH)</span>
            <button id="copy-routing" class="tactile font-mono text-ink hover:text-vantage flex items-center gap-1.5">021000021 <i data-lucide="copy" class="w-3 h-3"></i></button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-muted">Cuenta Institucional</span>
            <button id="copy-acct" class="tactile font-mono text-ink hover:text-vantage flex items-center gap-1.5">8841-9920-4410 <i data-lucide="copy" class="w-3 h-3"></i></button>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] font-medium text-muted">Simular depósito instantáneo (USD)</label>
          <input id="deposit-sim-input" type="number" value="15000" min="100" step="500" class="w-full bg-obsidian hairline rounded-xl px-4 py-3 text-[20px] font-bold text-ink tabular-nums focus:outline-none focus:border-vantage/50" />
        </div>
        <div class="flex items-center gap-2.5 pt-1">
          <button id="modal-cancel-btn" class="tactile flex-1 py-3 rounded-xl bg-elevated hairline text-[13px] font-bold text-ink">Cancelar</button>
          <button id="deposit-confirm-btn" class="tactile flex-1 py-3 rounded-xl bg-vantage text-obsidian text-[13px] font-bold hover:bg-[#f7d83b]">Acreditar</button>
        </div>
      </div>
    `);

    document.getElementById('modal-close-x').addEventListener('click', closeModal);
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
    document.getElementById('copy-routing').addEventListener('click', () => copyText('021000021', 'Routing ABA'));
    document.getElementById('copy-acct').addEventListener('click', () => copyText('8841-9920-4410', 'Cuenta Treasury'));
    document.getElementById('deposit-confirm-btn').addEventListener('click', () => {
      const val = parseFloat(document.getElementById('deposit-sim-input').value) || 0;
      if (val <= 0) return;
      const usdAcc = state.accounts.find((a) => a.currency === 'USD');
      usdAcc.balance += val;
      state.transactions.unshift({
        id: 'tx-' + Date.now(),
        title: 'Depósito Instantáneo FedWire',
        subtitle: 'Treasury Account ••8841',
        date: 'Justo ahora',
        amount: val,
        currency: 'USD',
        type: 'deposit',
        status: 'Acreditado',
        fee: '$0.00',
        rate: '—',
        ref: 'VNT-DEP-' + Math.floor(1000 + Math.random() * 9000),
      });
      closeModal();
      showToast('Depósito acreditado', `${fmtMoney(val, 'USD')} añadidos a Treasury.`);
      renderActiveView(false);
    });
  }

  function openAddRecipientModal() {
    openModal(`
      <form id="new-recipient-form" class="p-5 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <span class="text-[15px] font-bold text-ink">Nuevo Destinatario</span>
          <button type="button" id="modal-close-x" class="tactile w-8 h-8 rounded-lg hover:bg-elevated flex items-center justify-center text-muted hover:text-ink"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] text-muted">Nombre o razón social</label>
          <input id="rec-name-inp" required placeholder="Ej. Nordik Ventures GmbH" class="bg-obsidian hairline rounded-xl px-3.5 py-2.5 text-[13px] text-ink focus:outline-none focus:border-vantage/50" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] text-muted">Banco / Red</label>
          <input id="rec-bank-inp" required placeholder="Ej. Deutsche Bank · SEPA" class="bg-obsidian hairline rounded-xl px-3.5 py-2.5 text-[13px] text-ink focus:outline-none focus:border-vantage/50" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[12px] text-muted">IBAN o Número de cuenta</label>
          <input id="rec-iban-inp" required placeholder="DE89 3704 0044 0532 0130 00" class="bg-obsidian hairline rounded-xl px-3.5 py-2.5 text-[13px] font-mono text-ink focus:outline-none focus:border-vantage/50" />
        </div>
        <button type="submit" class="tactile w-full py-3 rounded-xl bg-vantage text-obsidian text-[13px] font-bold">Guardar destinatario</button>
      </form>
    `);
    document.getElementById('modal-close-x').addEventListener('click', closeModal);
    document.getElementById('new-recipient-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rec-name-inp').value.trim();
      const bank = document.getElementById('rec-bank-inp').value.trim();
      const iban = document.getElementById('rec-iban-inp').value.trim();
      const words = name.split(/\s+/);
      const initials = ((words[0]?.[0] || '') + (words[1]?.[0] || words[0]?.[1] || '')).toUpperCase();
      const id = 'rec-' + Date.now();
      state.recipients.push({ id, name, shortName: words[0], bank, iban, currency: 'EUR', initials });
      state.transfer.recipientId = id;
      closeModal();
      showToast('Destinatario guardado', `${name} listo para envíos instantáneos.`);
      renderActiveView(false);
    });
  }

  function openTransferConfirmModal() {
    const t = state.transfer;
    if (t.amount <= 0) {
      showToast('Monto inválido', 'Ingresa un monto mayor a cero.');
      return;
    }
    const rate = fxRates[t.sendCurrency][t.receiveCurrency];
    const netReceive = t.amount * rate;
    const fee = t.rail === 'swift' ? 12.0 : 0.0;
    const rec = state.recipients.find((r) => r.id === t.recipientId) || state.recipients[0];

    openModal(`
      <div class="p-5 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <span class="text-[15px] font-bold text-ink">Confirmar Transferencia</span>
          <button id="modal-close-x" class="tactile w-8 h-8 rounded-lg hover:bg-elevated flex items-center justify-center text-muted hover:text-ink"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <div class="bg-obsidian hairline rounded-xl p-4 flex flex-col gap-2.5 text-[13px] tabular-nums">
          <div class="flex justify-between"><span class="text-muted">Destinatario</span><span class="font-bold text-ink">${rec.name}</span></div>
          <div class="flex justify-between"><span class="text-muted">Envías</span><span class="font-bold text-ink">${fmtMoney(t.amount, t.sendCurrency)}</span></div>
          <div class="flex justify-between"><span class="text-muted">Recibe</span><span class="font-bold text-vantage">${fmtMoney(netReceive, t.receiveCurrency)}</span></div>
          <div class="flex justify-between"><span class="text-muted">Tasa</span><span class="text-ink">1 ${t.sendCurrency} = ${rate.toFixed(5)} ${t.receiveCurrency}</span></div>
          <div class="flex justify-between"><span class="text-muted">Comisión</span><span class="text-gain font-bold">${fee === 0 ? '$0.00' : '$' + fee.toFixed(2)}</span></div>
        </div>
        <div class="flex items-center gap-2.5">
          <button id="modal-cancel-btn" class="tactile flex-1 py-3 rounded-xl bg-elevated hairline text-[13px] font-bold text-ink">Volver</button>
          <button id="transfer-execute-btn" class="tactile flex-1 py-3 rounded-xl bg-vantage text-obsidian text-[13px] font-bold hover:bg-[#f7d83b]">Confirmar</button>
        </div>
      </div>
    `);

    document.getElementById('modal-close-x').addEventListener('click', closeModal);
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
    document.getElementById('transfer-execute-btn').addEventListener('click', () => {
      const sendAcc = state.accounts.find((a) => a.currency === t.sendCurrency);
      if (sendAcc) sendAcc.balance = Math.max(0, sendAcc.balance - (t.amount + fee));
      state.transactions.unshift({
        id: 'tx-' + Date.now(),
        title: rec.name,
        subtitle: t.rail === 'instant' ? 'Instant Rail · SEPA' : t.rail === 'swift' ? 'SWIFT Priority' : 'Digital Settlement (USDC)',
        date: 'Justo ahora',
        amount: -t.amount,
        currency: t.sendCurrency,
        type: 'transfer',
        status: 'Liquidado',
        fee: fee === 0 ? '$0.00' : `$${fee.toFixed(2)}`,
        rate: `1 ${t.sendCurrency} = ${rate.toFixed(5)} ${t.receiveCurrency}`,
        ref: 'VNT-TRF-' + Math.floor(1000 + Math.random() * 9000),
      });
      closeModal();
      showToast('Transferencia liquidada', `${fmtMoney(netReceive, t.receiveCurrency)} enviados a ${rec.shortName}.`);
      setView('overview');
    });
  }

  function openTxDetailModal(tx) {
    openModal(`
      <div class="p-5 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[15px] font-bold text-ink">${tx.title}</span>
            <span class="text-[12px] text-muted">${tx.subtitle}</span>
          </div>
          <button id="modal-close-x" class="tactile w-8 h-8 rounded-lg hover:bg-elevated flex items-center justify-center text-muted hover:text-ink"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <div class="text-[30px] font-bold tabular-nums ${tx.amount > 0 ? 'text-gain' : 'text-ink'}">${fmtMoney(tx.amount, tx.currency, true)}</div>
        <div class="bg-obsidian hairline rounded-xl p-4 flex flex-col gap-2.5 text-[12px] tabular-nums">
          <div class="flex justify-between"><span class="text-muted">Estado</span><span class="text-gain font-bold">${tx.status}</span></div>
          <div class="flex justify-between"><span class="text-muted">Fecha</span><span class="text-ink">${tx.date}</span></div>
          <div class="flex justify-between"><span class="text-muted">Comisión</span><span class="text-ink">${tx.fee}</span></div>
          <div class="flex justify-between"><span class="text-muted">Tasa</span><span class="text-ink">${tx.rate}</span></div>
          <div class="flex justify-between"><span class="text-muted">Referencia</span><span class="font-mono text-ink">${tx.ref}</span></div>
        </div>
        <button id="tx-copy-ref" class="tactile w-full py-3 rounded-xl bg-elevated hairline hover:border-vantage/45 text-[13px] font-bold text-ink">Copiar referencia</button>
      </div>
    `);
    document.getElementById('modal-close-x').addEventListener('click', closeModal);
    document.getElementById('tx-copy-ref').addEventListener('click', () => copyText(tx.ref, 'Referencia'));
  }

  // --- COPILOT DRAWER ---
  function openCopilot() {
    const backdrop = document.getElementById('copilot-backdrop');
    const panel = document.getElementById('copilot-panel');
    backdrop.classList.remove('hidden');
    renderCopilotMessages();
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0');
      panel.classList.remove('translate-x-full');
      panel.classList.add('sheet-open');
    });
    setTimeout(() => document.getElementById('copilot-input').focus(), 220);
  }

  function closeCopilot() {
    const backdrop = document.getElementById('copilot-backdrop');
    const panel = document.getElementById('copilot-panel');
    backdrop.classList.add('opacity-0');
    panel.classList.remove('sheet-open');
    panel.classList.add('translate-x-full');
    setTimeout(() => backdrop.classList.add('hidden'), 260);
  }

  function renderCopilotMessages() {
    const box = document.getElementById('copilot-messages');
    const msgsHtml = state.copilotMessages
      .map(
        (msg) => `
      <div class="copilot-bubble flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}">
        <div class="max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-vantage text-obsidian font-semibold' : 'bg-elevated hairline text-ink'}">
          ${msg.text}
        </div>
        ${msg.action ? `
          <button data-copilot-action="${msg.action.type}" class="copilot-action-btn tactile px-3.5 py-2 rounded-xl text-[12px] font-bold ${state.rebalanceApplied && msg.action.type === 'apply-rebalance' ? 'bg-gain/15 text-gain cursor-default' : 'bg-vantage text-obsidian hover:bg-[#f7d83b]'}">
            ${state.rebalanceApplied && msg.action.type === 'apply-rebalance' ? '✓ Rebalanceo aplicado' : msg.action.label}
          </button>
        ` : ''}
      </div>
    `
      )
      .join('');

    const typingHtml = state.copilotTyping
      ? `<div class="flex items-center gap-1.5 bg-elevated hairline rounded-2xl px-4 py-3 w-fit"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`
      : '';

    box.innerHTML = msgsHtml + typingHtml;
    box.scrollTop = box.scrollHeight;

    if (window.gsap) {
      const bubbles = box.querySelectorAll('.copilot-bubble');
      const last = bubbles[bubbles.length - 1];
      if (last) gsap.from(last, { y: 10, opacity: 0, duration: 0.28, ease: 'power2.out' });
    }

    box.querySelectorAll('.copilot-action-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.copilotAction === 'apply-rebalance') applyRebalance();
      });
    });
  }

  function handleCopilotPrompt(text, presetKey = null) {
    const clean = text.trim();
    if (!clean || state.copilotTyping) return;
    state.copilotMessages.push({ role: 'user', text: clean });
    state.copilotTyping = true;
    renderCopilotMessages();

    setTimeout(() => {
      state.copilotTyping = false;
      let reply = 'Tu portafolio mantiene una liquidez T+1 del 54.1% con volatilidad anualizada de 6.8%. El riel SEPA Instant opera hoy con $0.00 de comisión.';
      let action = null;
      if (presetKey === 'rebalance' || clean.toLowerCase().includes('rebalance')) {
        reply = 'Al mover $42,145 USD (5%) de liquidez ociosa hacia Bonos del Tesoro 0-3M (SGOV), tu rendimiento anual sube en +$3,580 USD/año (+0.85% APY) manteniendo liquidez T+1.';
        action = { label: 'Aplicar rebalanceo ahora', type: 'apply-rebalance' };
      } else if (presetKey === 'fx' || clean.toLowerCase().includes('eur') || clean.toLowerCase().includes('fx')) {
        reply = 'Tienes €148,200 en SEPA Liquidity (19% de tu liquidez total). La tasa mid-market EUR/USD está en 1.0800 con $0.00 de spread.';
      } else if (presetKey === 'risk' || clean.toLowerCase().includes('riesgo')) {
        reply = 'Exposición a renta variable (VOO + MSFT): 37.1%, equilibrada por 54.1% en Bonos del Tesoro y liquidez multi-divisa. Drawdown máximo estimado en estrés: -4.2%.';
      } else if (presetKey === 'summary' || clean.toLowerCase().includes('resumen')) {
        reply = 'Resumen de noviembre: +$104,820 (+14.2%) en balance neto, $1,842.50 acreditados en dividendos Treasury y $685 ahorrados en comisiones FX internacionales.';
      }
      state.copilotMessages.push({ role: 'assistant', text: reply, action });
      renderCopilotMessages();
    }, 450);
  }

  // ===========================================================================
  // 14. LIVE MARKET TICKER SIMULATION + SHELL BOOT CHOREOGRAPHY
  // ===========================================================================
  function startMarketTicker() {
    let spx = 5846.80;
    let eur = 1.0800;
    setInterval(() => {
      const spxEl = document.getElementById('tick-spx');
      const eurEl = document.getElementById('tick-eur');
      if (spxEl) {
        spx += (Math.random() - 0.48) * 1.4;
        spxEl.textContent = spx.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        spxEl.classList.remove('tick-flash');
        void spxEl.offsetWidth;
        spxEl.classList.add('tick-flash');
      }
      if (eurEl) {
        eur += (Math.random() - 0.5) * 0.0004;
        eurEl.textContent = eur.toFixed(4);
      }
    }, 4500);
  }

  function runShellBootAnimation() {
    if (!window.gsap) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.sidebar-enter', { x: -24, opacity: 0, duration: 0.6, clearProps: 'transform,opacity' })
      .from('.sidebar-nav-stagger', { x: -14, opacity: 0, duration: 0.45, stagger: 0.045, clearProps: 'transform,opacity' }, '-=0.4')
      .from('.header-enter', { y: -14, opacity: 0, duration: 0.5, clearProps: 'transform,opacity' }, '-=0.45');
  }

  // ===========================================================================
  // 15. GLOBAL BINDINGS & INIT
  // ===========================================================================
  function togglePrivacy() {
    state.privacyMode = !state.privacyMode;
    ['privacy-icon', 'mobile-privacy-icon'].forEach((id) => {
      const icon = document.getElementById(id);
      if (icon) icon.setAttribute('data-lucide', state.privacyMode ? 'eye-off' : 'eye');
    });
    refreshIcons();
    renderActiveView(false);
  }

  function setMobilePreview(enabled) {
    state.mobilePreview = enabled;
    document.body.classList.toggle('mobile-preview-mode', enabled);
    renderActiveView(true);
    refreshIcons();
  }

  document.querySelectorAll('[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => setView(btn.dataset.nav));
  });
  document.getElementById('brand-home-btn').addEventListener('click', () => setView('overview'));
  document.getElementById('mobile-brand-btn').addEventListener('click', () => setView('overview'));
  document.getElementById('sidebar-profile-btn').addEventListener('click', () => setView('settings'));
  document.getElementById('sidebar-copilot-btn').addEventListener('click', openCopilot);
  document.getElementById('header-copilot-btn').addEventListener('click', openCopilot);
  document.getElementById('mobile-copilot-btn').addEventListener('click', openCopilot);
  document.getElementById('mobile-settings-btn').addEventListener('click', () => setView('settings'));
  document.getElementById('copilot-close-btn').addEventListener('click', closeCopilot);
  document.getElementById('copilot-backdrop').addEventListener('click', (e) => { if (e.target.id === 'copilot-backdrop') closeCopilot(); });
  document.getElementById('modal-backdrop').addEventListener('click', (e) => { if (e.target.id === 'modal-backdrop') closeModal(); });
  document.getElementById('header-deposit-btn').addEventListener('click', openDepositModal);
  document.getElementById('privacy-toggle-btn').addEventListener('click', togglePrivacy);
  document.getElementById('mobile-privacy-btn').addEventListener('click', togglePrivacy);
  document.getElementById('viewport-toggle-btn').addEventListener('click', () => setMobilePreview(true));
  document.getElementById('exit-mobile-preview-btn').addEventListener('click', () => setMobilePreview(false));

  document.querySelectorAll('.copilot-chip').forEach((chip) => {
    chip.addEventListener('click', () => handleCopilotPrompt(chip.textContent, chip.dataset.copilotPrompt));
  });

  document.getElementById('copilot-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = document.getElementById('copilot-input');
    handleCopilotPrompt(inp.value);
    inp.value = '';
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const isHidden = document.getElementById('copilot-backdrop').classList.contains('hidden');
      isHidden ? openCopilot() : closeCopilot();
    } else if (e.key === 'Escape') {
      closeCopilot();
      closeModal();
    }
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!state.mobilePreview) renderActiveView(false);
    }, 120);
  });

  // Boot app
  refreshIcons();
  updateNavStyles();
  renderActiveView(true);
  runShellBootAnimation();
  startMarketTicker();
})();
