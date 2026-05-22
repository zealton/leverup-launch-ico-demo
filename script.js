const TOTAL_SUPPLY = 1_000_000_000;
const VQ0 = 70_000;
const VT0 = 1_060_569_000;
const MIN_T = 251_660_440.677966;
const K_CURVE = VQ0 * VT0;
const FEE_RATE = 0.02;
const GRAD_FEE = 1_000;
const LP_TOKEN_INIT = TOTAL_SUPPLY - (VT0 - MIN_T);
const LP_QUOTE_INIT = 295_000 - VQ0 - GRAD_FEE;
const K_LP = LP_TOKEN_INIT * LP_QUOTE_INIT;
const COST_GRAD_LV = (295_000 - VQ0) / (1 - FEE_RATE);
const PREMIUM = 0.2;
const PRICE_REFRESH_MS = 5_000;

const state = {
  displayUnit: "MON",
  monUsd: 0.03,
  raiseValue: 230_000,
  publicSalePct: 0,
  publicSaleTokens: 0,
  userPrice: 0,
};

const $ = (id) => document.getElementById(id);

const refs = {
  unitUsd: $("unitUsd"),
  unitLvmon: $("unitLvmon"),
  monPrice: $("monPrice"),
  refreshPrice: $("refreshPrice"),
  priceMeta: $("priceMeta"),
  raiseInput: $("raiseInput"),
  raiseRange: $("raiseRange"),
  raiseSuffix: $("raiseSuffix"),
  raiseEquivalent: $("raiseEquivalent"),
  floorLabel: $("floorLabel"),
  rangeMin: $("rangeMin"),
  rangeMax: $("rangeMax"),
  graduationBadge: $("graduationBadge"),
  statusValue: $("statusValue"),
  statusMeta: $("statusMeta"),
  mcUsd: $("mcUsd"),
  mcLv: $("mcLv"),
  spotLv: $("spotLv"),
  spotUsd: $("spotUsd"),
  userPriceLv: $("userPriceLv"),
  donut: $("donut"),
  publicPct: $("publicPct"),
  publicTokens: $("publicTokens"),
  publicValue: $("publicValue"),
  liquidityPct: $("liquidityPct"),
  liquidityTokens: $("liquidityTokens"),
  liquidityValue: $("liquidityValue"),
  communityPct: $("communityPct"),
  communityTokens: $("communityTokens"),
  communityValue: $("communityValue"),
  stackedBar: $("stackedBar"),
  warnings: $("warnings"),
  prebuyShare: $("prebuyShare"),
  prebuyRange: $("prebuyRange"),
  prebuyLimit: $("prebuyLimit"),
  prebuyTotalPct: $("prebuyTotalPct"),
  prebuyTokens: $("prebuyTokens"),
  prebuyMon: $("prebuyMon"),
  prebuyUsd: $("prebuyUsd"),
  projectName: $("projectName"),
  ticker: $("ticker"),
  previewName: $("previewName"),
  previewTicker: $("previewTicker"),
  tokenPicture: $("tokenPicture"),
  tokenPreview: $("tokenPreview"),
  railTokenPreview: $("railTokenPreview"),
  blockType: $("blockType"),
  richToolbar: document.querySelector(".rich-toolbar"),
  launchListPage: $("launchListPage"),
  launchDetailPage: $("launchDetailPage"),
  createPage: $("createPage"),
  launchDetail: $("launchDetail"),
  liveDashboard: $("liveDashboard"),
  mineDashboard: $("mineDashboard"),
};

const launchState = {
  detailMessage: "",
};

const launchTokens = [
  {
    id: "mush",
    name: "Mushroom",
    ticker: "MUSH",
    status: "Live",
    contract: "0x4f8c...8a2e",
    targetMon: 620_000,
    raisedMon: 438_500,
    userContributionMon: 18_000,
    walletBalanceMon: 245_320.5,
    marketCapUsd: 184_000,
    buybackMon: 0,
    mineTokens: 250_000,
    mineValueUsd: 3_750,
    mineEpoch: "Epoch 14",
    nadUrl: "https://www.nad.fun/",
    tradeUrl: "https://mush-token.leverup.xyz",
    summary: "Stake and trade with MUSH collateral to mine weekly community rewards.",
    tokenomics: { publicSale: 22.4, liquidity: 18.7, community: 58.9 },
    details: {
      introduction: "Mushroom is a Monad-native culture token for weekly creator campaigns and trading quests.",
      how: "ICO funds seed the launch curve. Public Sale receives fixed-cost tokens while Community allocation remains reserved for post-launch mining rewards.",
      roadmap: "Launch, creator quests, Trade to Mine activation, then staking campaign integrations.",
    },
    txs: [],
  },
  {
    id: "byte",
    name: "Byte Forge",
    ticker: "BYTE",
    status: "Live",
    contract: "0x7a12...f0c9",
    targetMon: 1_200_000,
    raisedMon: 286_000,
    userContributionMon: 0,
    walletBalanceMon: 85_100,
    marketCapUsd: 96_000,
    buybackMon: 0,
    mineTokens: 420_000,
    mineValueUsd: 5_880,
    mineEpoch: "Epoch 14",
    nadUrl: "https://www.nad.fun/",
    tradeUrl: "https://byte-token.leverup.xyz",
    summary: "Infrastructure meme for build competitions, contributor quests, and trading fee rewards.",
    tokenomics: { publicSale: 14.6, liquidity: 20.3, community: 65.1 },
    details: {
      introduction: "Byte Forge targets builders who want a launch-native reward layer for tools, bots, and hackathon contributions.",
      how: "The Community bucket is reserved for weekly post-launch trading and builder incentive programs.",
      roadmap: "Raise completion, deployment, first mining epoch, then developer bounty seasons.",
    },
    txs: [],
  },
  {
    id: "signal",
    name: "Monad Signal",
    ticker: "SIGN",
    status: "Launched",
    contract: "0x2c94...31bd",
    targetMon: 700_000,
    raisedMon: 700_000,
    userContributionMon: 32_000,
    marketCapUsd: 315_000,
    buybackMon: 57_500,
    mineTokens: 9_580_000,
    mineValueUsd: 301_770,
    mineEpoch: "Epoch 15",
    epochEndsIn: "4d 12h",
    nadUrl: "https://www.nad.fun/",
    tradeUrl: "https://sign-token.leverup.xyz",
    summary: "Launch intelligence token with Community allocation routed to Trade to Mine.",
    tokenomics: { publicSale: 23.5, liquidity: 19.1, community: 57.4 },
    txs: [
      ["0xb7a1...2d90", "12,400 MON", "Buyback"],
      ["0x91c4...a330", "8,900 MON", "Buyback"],
      ["0xf01d...95be", "6,250 MON", "Buyback"],
    ],
  },
  {
    id: "vault",
    name: "Vault Rush",
    ticker: "VLT",
    status: "Launched",
    contract: "0x8f22...19de",
    targetMon: 450_000,
    raisedMon: 450_000,
    userContributionMon: 0,
    marketCapUsd: 142_000,
    buybackMon: 18_200,
    mineTokens: 4_400_000,
    mineValueUsd: 61_600,
    mineEpoch: "Epoch 14",
    epochEndsIn: "2d 08h",
    nadUrl: "https://www.nad.fun/",
    tradeUrl: "https://vlt-token.leverup.xyz",
    summary: "Community vault token distributing mined allocation through volume and P&L competitions.",
    tokenomics: { publicSale: 20.8, liquidity: 18.4, community: 60.8 },
    txs: [
      ["0xe92a...db77", "4,400 MON", "Buyback"],
      ["0x3a76...05aa", "2,150 MON", "Buyback"],
    ],
  },
  {
    id: "orbit",
    name: "Orbit Desk",
    ticker: "ORBT",
    status: "Launched",
    contract: "0x1d4e...8f70",
    targetMon: 900_000,
    raisedMon: 512_000,
    userContributionMon: 12_000,
    marketCapUsd: 88_000,
    buybackMon: 9_600,
    mineTokens: 2_100_000,
    mineValueUsd: 29_400,
    mineEpoch: "Epoch 15",
    epochEndsIn: "6d 03h",
    nadUrl: "https://www.nad.fun/",
    tradeUrl: "https://orbt-token.leverup.xyz",
    summary: "Desk token running a focused Trade to Mine pool for volume and P&L contributors.",
    tokenomics: { publicSale: 18.9, liquidity: 17.8, community: 63.3 },
    txs: [
      ["0x6cd4...0a61", "2,900 MON", "Buyback"],
      ["0x2f99...b711", "1,120 MON", "Buyback"],
    ],
  },
];

function ceilTo(value, step) {
  return Math.ceil(value / step) * step;
}

function currentFloor() {
  return ceilTo(COST_GRAD_LV, 10000);
}

function currentStep() {
  return 10000;
}

function toLvmon(value = state.raiseValue) {
  return value;
}

function formatCompact(value, prefix = "", suffix = "") {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${prefix}${(value / 1_000_000_000).toFixed(2)}B${suffix}`;
  if (abs >= 1_000_000) return `${prefix}${(value / 1_000_000).toFixed(2)}M${suffix}`;
  if (abs >= 1_000) return `${prefix}${(value / 1_000).toFixed(2)}k${suffix}`;
  if (abs >= 1) return `${prefix}${value.toFixed(2)}${suffix}`;
  if (abs === 0) return `${prefix}0${suffix}`;
  return `${prefix}${value.toPrecision(3)}${suffix}`;
}

function formatWhole(value, prefix = "", suffix = "") {
  return `${prefix}${Math.round(value).toLocaleString("en-US")}${suffix}`;
}

function formatPct(value) {
  return `${value.toFixed(2)}%`;
}

function formatMonExact(value) {
  return `${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })} MON`;
}

function formatUsdExact(value) {
  return `$${Math.round(Number(value)).toLocaleString("en-US")}`;
}

function formatTokenExact(value, symbol) {
  return `${Math.round(Number(value)).toLocaleString("en-US")} ${symbol}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[char]);
}

function tokenProgress(token) {
  return Math.min(100, (token.raisedMon / token.targetMon) * 100);
}

function tokenRemaining(token) {
  return Math.max(0, token.targetMon - token.raisedMon);
}

function tokenById(id) {
  return launchTokens.find((token) => token.id === id) || launchTokens[0];
}

function renderDashboardCard(token, mode) {
  const progress = tokenProgress(token);
  const remaining = tokenRemaining(token);
  if (mode === "live") {
    return `
      <a class="dash-card" href="#/launch/${token.id}">
        <div class="launch-card-head">
          <div class="token-title">
            <span class="token-mark">${escapeHtml(token.ticker.slice(0, 1))}</span>
            <div>
              <strong>${escapeHtml(token.name)}</strong>
              <span>$${escapeHtml(token.ticker)}</span>
            </div>
          </div>
          <span class="status-chip live">Live</span>
        </div>
        <div class="progress-block">
          <div class="progress-label"><span>${formatMonExact(token.raisedMon)} / ${formatMonExact(token.targetMon)}</span><strong>${progress.toFixed(1)}%</strong></div>
          <div class="progress-track"><span style="width:${progress}%"></span></div>
        </div>
        <div class="dash-footer">
          <span>Remaining ${formatMonExact(remaining)}</span>
          <strong>${token.userContributionMon > 0 ? `${formatMonExact(token.userContributionMon)} entered` : "No entry"}</strong>
        </div>
      </a>
    `;
  }

  return `
    <article class="dash-card mine">
      <div class="launch-card-head">
        <div class="token-title">
          <span class="token-mark">${escapeHtml(token.ticker.slice(0, 1))}</span>
          <div>
            <strong>${escapeHtml(token.name)}</strong>
            <span>$${escapeHtml(token.ticker)} · ${escapeHtml(token.mineEpoch)}</span>
          </div>
        </div>
      </div>
      <div class="mine-split">
        <div><span>Weekly Pool</span><strong>${formatTokenExact(token.mineTokens, escapeHtml(token.ticker))}</strong></div>
        <div><span>Value</span><strong>${formatUsdExact(token.mineValueUsd)}</strong></div>
      </div>
      <div class="dash-footer">
        <span>Epoch ends in ${escapeHtml(token.epochEndsIn || "4d")}</span>
        <strong>Market Cap ${formatUsdExact(token.marketCapUsd)}</strong>
      </div>
      <div class="dash-actions">
        <a href="#/launch/${token.id}">Detail</a>
        <a class="external" href="${escapeHtml(token.tradeUrl)}" target="_blank" rel="noreferrer">Trade</a>
      </div>
    </article>
  `;
}

function renderLaunchDashboard() {
  if (!refs.liveDashboard || !refs.mineDashboard) return;
  refs.liveDashboard.innerHTML = launchTokens
    .filter((token) => token.status === "Live")
    .map((token) => renderDashboardCard(token, "live"))
    .join("");
  refs.mineDashboard.innerHTML = launchTokens
    .filter((token) => token.status === "Launched")
    .map((token) => renderDashboardCard(token, "mine"))
    .join("");
}

function renderLaunchDetail(id) {
  if (!refs.launchDetail) return;
  const token = tokenById(id);
  const progress = tokenProgress(token);
  const remaining = tokenRemaining(token);
  const isLive = token.status === "Live";
  const launched = token.status === "Launched";
  const message = launchState.detailMessage ? `<div class="notice info">${escapeHtml(launchState.detailMessage)}</div>` : "";
  const maxInvest = Math.min(remaining, token.walletBalanceMon || 0);
  const tokenomics = token.tokenomics || { publicSale: 0, liquidity: 0, community: 0 };

  const investPanel = isLive ? `
    <section class="panel action-panel">
      <div class="panel-head compact">
        <div>
          <h2>Invest</h2>
          <p>Funds can be withdrawn anytime until the configured MON target is reached.</p>
        </div>
      </div>
      <label class="field">
        <span>Invest Amount</span>
        <div class="amount-input">
          <input id="detailInvestInput" type="number" min="0" max="${maxInvest}" step="1000" value="${Math.min(10_000, maxInvest)}">
          <strong>MON</strong>
        </div>
        <small>Available space: ${formatMonExact(remaining)} · Balance: ${formatMonExact(token.walletBalanceMon || 0)}</small>
      </label>
      <div class="action-buttons">
        <button class="max-btn" type="button" data-action="max" data-id="${token.id}">Max</button>
        <button class="invest-btn" type="button" data-action="invest" data-id="${token.id}">Invest</button>
        <button class="exit-btn" type="button" data-action="withdraw" data-id="${token.id}" ${token.userContributionMon <= 0 ? "disabled" : ""}>Withdraw ${formatMonExact(token.userContributionMon)}</button>
      </div>
    </section>
  ` : "";

  const postLaunchPanel = launched ? `
    <section class="panel">
      <div class="panel-head compact">
        <div>
          <h2>Swap</h2>
          <p>Open the token market.</p>
        </div>
      </div>
      <div class="external-actions">
        <a href="${escapeHtml(token.tradeUrl)}" target="_blank" rel="noreferrer">Open token trading page</a>
        <a href="${escapeHtml(token.nadUrl)}" target="_blank" rel="noreferrer">Open nad.fun</a>
      </div>
    </section>
  ` : "";

  const tradeMinePanel = launched ? `
    <section class="panel trade-mine-panel">
      <div class="panel-head compact">
        <div>
          <h2>Trade to Mine</h2>
          <p>Community allocation is distributed through trading activity with ${escapeHtml(token.ticker)} collateral.</p>
        </div>
        <span class="status-chip live">${escapeHtml(token.mineEpoch)} · LIVE</span>
      </div>
      <div class="trade-mine-hero">
        <div>
          <span>Mining Pool / Week</span>
          <strong>${formatTokenExact(token.mineTokens, escapeHtml(token.ticker))}</strong>
          <small>${formatUsdExact(token.mineValueUsd)} estimated value · resets in ${escapeHtml(token.epochEndsIn || "4d")}</small>
        </div>
        <button type="button">Trade with ${escapeHtml(token.ticker)} as collateral</button>
      </div>
      <div class="trade-mine-grid">
        <article class="mining-rule-card">
          <div class="rule-head">
            <span>Volume</span>
            <strong>70%</strong>
          </div>
          <div class="rule-pool">${formatTokenExact(token.mineTokens * 0.7, escapeHtml(token.ticker))}</div>
          <p>All qualifying traders split this pool pro-rata by qualifying trading volume.</p>
          <div class="rule-lines">
            <div><span>Eligibility</span><strong>Trade volume counted up to 100x</strong></div>
            <div><span>Your qualified volume</span><strong>$24.82k</strong></div>
            <div><span>Total qualified volume</span><strong>$1.42M</strong></div>
          </div>
          <div class="progress-block">
            <div class="progress-label"><span>Your share estimate</span><strong>1.75%</strong></div>
            <div class="progress-track"><span style="width:35%"></span></div>
          </div>
        </article>
        <article class="mining-rule-card">
          <div class="rule-head">
            <span>P&L</span>
            <strong>30%</strong>
          </div>
          <div class="rule-pool">${formatTokenExact(token.mineTokens * 0.3, escapeHtml(token.ticker))}</div>
          <p>Only top 10 positive P&L traders share this pool by their P&L weight.</p>
          <div class="rule-lines">
            <div><span>Your P&L rank</span><strong>#14</strong></div>
            <div><span>Cutoff P&L</span><strong>+$870</strong></div>
            <div><span>Your P&L</span><strong>+$680</strong></div>
          </div>
          <div class="leaderboard-mini">
            <div class="tx-row"><span>#1 0xa7c2...8810</span><strong>+$8,420</strong><span>${formatTokenExact(token.mineTokens * 0.087, escapeHtml(token.ticker))}</span></div>
            <div class="tx-row"><span>#2 0x3e09...2bf1</span><strong>+$5,640</strong><span>${formatTokenExact(token.mineTokens * 0.058, escapeHtml(token.ticker))}</span></div>
            <div class="tx-row"><span>#3 0xd421...77ab</span><strong>+$4,210</strong><span>${formatTokenExact(token.mineTokens * 0.044, escapeHtml(token.ticker))}</span></div>
          </div>
        </article>
      </div>
    </section>
  ` : "";

  const txRows = token.txs.map((tx) => `
    <div class="tx-row">
      <span>${escapeHtml(tx[0])}</span>
      <strong>${escapeHtml(tx[1])}</strong>
      <span>${escapeHtml(tx[2])}</span>
    </div>
  `).join("") || `<div class="tx-row"><span>No buyback transactions yet.</span><strong>0 MON</strong><span>Pending</span></div>`;

  const fundingPanel = isLive ? `
      <section class="panel">
        <div class="panel-head compact">
          <div>
            <h2>Funding</h2>
            <p>Launch succeeds only when the configured MON target is fully filled.</p>
          </div>
        </div>
        <div class="range-block">
          <div class="progress-block">
            <div class="progress-label">
              <span>${formatMonExact(token.raisedMon)} / ${formatMonExact(token.targetMon)}</span>
              <strong>${progress.toFixed(2)}%</strong>
            </div>
            <div class="progress-track"><span style="width:${progress}%"></span></div>
          </div>
        </div>
        <div class="summary-grid">
          <article class="stat-card"><span>Remaining Capacity</span><strong>${formatMonExact(remaining)}</strong><small>Before deploy trigger</small></article>
          <article class="stat-card"><span>Your Contribution</span><strong>${formatMonExact(token.userContributionMon)}</strong><small>Can withdraw before target</small></article>
          <article class="stat-card"><span>Market Cap</span><strong>${formatUsdExact(token.marketCapUsd)}</strong><small>Synced app estimate</small></article>
          <article class="stat-card"><span>Total Buyback</span><strong>${formatMonExact(token.buybackMon)}</strong><small>Protocol buyback total</small></article>
        </div>
      </section>
  ` : `
      <section class="panel">
        <div class="panel-head compact">
          <div>
            <h2>Market</h2>
            <p>Post-launch market and buyback snapshot.</p>
          </div>
        </div>
        <div class="summary-grid launched-stats">
          <article class="stat-card"><span>Market Cap</span><strong>${formatUsdExact(token.marketCapUsd)}</strong><small>Synced app estimate</small></article>
          <article class="stat-card"><span>Total Buyback</span><strong>${formatMonExact(token.buybackMon)}</strong><small>Protocol buyback total</small></article>
          <article class="stat-card"><span>Mine Pool</span><strong>${formatTokenExact(token.mineTokens, escapeHtml(token.ticker))}</strong><small>${escapeHtml(token.mineEpoch)}</small></article>
        </div>
      </section>
  `;

  const tokenomicsPanel = isLive ? `
      <section class="panel">
        <div class="panel-head compact">
          <div>
            <h2>Tokenomics</h2>
            <p>Launch allocation preview based on the configured MON raise.</p>
          </div>
        </div>
        <div class="tokenomics-mini">
          <div class="stacked-bar tokenomics-bar">
            <div style="width:${tokenomics.publicSale}%; background:var(--public)">${tokenomics.publicSale.toFixed(1)}%</div>
            <div style="width:${tokenomics.liquidity}%; background:var(--liquidity)">${tokenomics.liquidity.toFixed(1)}%</div>
            <div style="width:${tokenomics.community}%; background:var(--community)">${tokenomics.community.toFixed(1)}%</div>
          </div>
          <div class="card-metrics">
            <div class="mini-metric"><span>Public Sale</span><strong>${tokenomics.publicSale.toFixed(1)}%</strong></div>
            <div class="mini-metric"><span>Liquidity</span><strong>${tokenomics.liquidity.toFixed(1)}%</strong></div>
            <div class="mini-metric"><span>Community</span><strong>${tokenomics.community.toFixed(1)}%</strong></div>
          </div>
        </div>
      </section>
  ` : "";

  const projectInfoPanel = isLive ? `
      <section class="panel">
        <div class="panel-head compact">
          <div>
            <h2>Project Information</h2>
            <p>Additional launch details provided by the deployer.</p>
          </div>
        </div>
        <div class="project-info">
          <article><span>Introduction</span><p>${escapeHtml(token.details?.introduction || token.summary)}</p></article>
          <article><span>How it Works</span><p>${escapeHtml(token.details?.how || "Community allocation is reserved for post-launch programs.")}</p></article>
          <article><span>Roadmap</span><p>${escapeHtml(token.details?.roadmap || "Launch, mine, and expand trading incentives.")}</p></article>
        </div>
      </section>
  ` : "";

  refs.launchDetail.innerHTML = `
    <div class="detail-main">
      <section class="detail-title">
        <div class="detail-head">
          <div class="token-title">
            <span class="token-mark">${escapeHtml(token.ticker.slice(0, 1))}</span>
            <div>
              <h1>${escapeHtml(token.name)}</h1>
              <span>$${escapeHtml(token.ticker)} · ${escapeHtml(token.contract)}</span>
            </div>
          </div>
          <span class="status-chip ${isLive ? "live" : "launched"}">${token.status}</span>
        </div>
        <p>${escapeHtml(token.summary)}</p>
      </section>

      ${fundingPanel}

      ${tokenomicsPanel}

      ${projectInfoPanel}

      ${message}

      ${tradeMinePanel}

      ${launched ? `<section id="buybackPrintArea" class="panel">
        <div class="panel-head compact">
          <div>
            <h2>Buyback Transactions</h2>
            <p>Compact transaction log for the token detail page.</p>
          </div>
        </div>
        <div class="tx-list">${txRows}</div>
        <button class="print-btn" type="button" data-action="print">Print transactions</button>
      </section>` : ""}
    </div>

    <aside class="detail-side">
      ${investPanel}
      ${postLaunchPanel}
      ${launched ? `<section class="panel">
        <div class="panel-head compact">
          <div>
            <h2>Mine Allocation</h2>
            <p>${launched ? "Community allocation routed to Trade to Mine." : "Visible after successful launch."}</p>
          </div>
        </div>
        <div class="allocation-list">
          <article class="allocation-card public">
            <span>Mineable Amount</span>
            <strong>${formatTokenExact(token.mineTokens, escapeHtml(token.ticker))}</strong>
            <small>${escapeHtml(token.mineEpoch)}</small>
          </article>
          <article class="allocation-card liquidity">
            <span>Mine Value</span>
            <strong>${formatUsdExact(token.mineValueUsd)}</strong>
            <small>At current token estimate</small>
          </article>
        </div>
      </section>` : ""}
    </aside>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function showRoute() {
  const hash = window.location.hash || "#/launch";
  refs.launchListPage.hidden = true;
  refs.launchDetailPage.hidden = true;
  refs.createPage.hidden = true;

  if (hash.startsWith("#/create")) {
    refs.createPage.hidden = false;
  } else if (hash.startsWith("#/launch/")) {
    refs.launchDetailPage.hidden = false;
    renderLaunchDetail(hash.split("/")[2]);
  } else {
    refs.launchListPage.hidden = false;
    renderLaunchDashboard();
  }
}

function calculateTokenomics(raiseLvmon) {
  let tBought;
  let pCurve;
  let dexSpend = 0;

  if (raiseLvmon < COST_GRAD_LV) {
    const net = raiseLvmon * (1 - FEE_RATE);
    const vQEnd = VQ0 + net;
    const vTEnd = K_CURVE / vQEnd;
    tBought = VT0 - vTEnd;
    pCurve = vQEnd / vTEnd;
  } else {
    dexSpend = raiseLvmon - COST_GRAD_LV;
    const netDex = dexSpend * (1 - FEE_RATE);
    const vQLpEnd = LP_QUOTE_INIT + netDex;
    const vTLpEnd = K_LP / vQLpEnd;
    tBought = (VT0 - MIN_T) + (LP_TOKEN_INIT - vTLpEnd);
    pCurve = vQLpEnd / vTLpEnd;
  }

  const pUser = pCurve / (1 + PREMIUM);
  const tUser = raiseLvmon / pUser;
  const tComm = tBought - tUser;
  const tLiquidity = TOTAL_SUPPLY - tBought;
  const mcCurve = pCurve * TOTAL_SUPPLY;

  return {
    graduated: raiseLvmon >= COST_GRAD_LV,
    raiseLvmon,
    dexSpend,
    tBought,
    pCurve,
    pUser,
    tUser,
    tComm,
    tLiquidity,
    mcCurve,
    publicPct: (tUser / TOTAL_SUPPLY) * 100,
    liquidityPct: (tLiquidity / TOTAL_SUPPLY) * 100,
    communityPct: (tComm / TOTAL_SUPPLY) * 100,
  };
}

function setDisplayUnit(nextUnit) {
  state.displayUnit = nextUnit;
  render();
}

function clampRaise() {
  const floor = currentFloor();
  if (!Number.isFinite(state.raiseValue) || state.raiseValue < floor) {
    state.raiseValue = floor;
  }
}

function syncRaiseInput(value, shouldClamp = false) {
  const parsed = Number(value);
  if (Number.isFinite(parsed)) {
    state.raiseValue = parsed;
  }
  if (shouldClamp) clampRaise();
  render();
}

function configureRange() {
  const floor = currentFloor();
  const baseMax = 15_000_000;
  const max = Math.max(baseMax, ceilTo(state.raiseValue, currentStep()));
  refs.raiseRange.min = floor;
  refs.raiseRange.max = max;
  refs.raiseRange.step = currentStep();
  refs.raiseRange.value = Math.min(Math.max(state.raiseValue, floor), max);
  refs.rangeMin.textContent = `${formatCompact(floor)} MON`;
  refs.rangeMax.textContent = `${formatCompact(max)} MON+`;
}

function renderBars(model) {
  const publicEnd = model.publicPct;
  const liquidityEnd = model.publicPct + model.liquidityPct;
  refs.donut.style.background = `conic-gradient(
    var(--public) 0 ${publicEnd}%,
    var(--liquidity) ${publicEnd}% ${liquidityEnd}%,
    var(--community) ${liquidityEnd}% 100%
  )`;

  const items = [
    { label: "Public", pct: model.publicPct, color: "var(--public)" },
    { label: "LP", pct: model.liquidityPct, color: "var(--liquidity)" },
    { label: "Community", pct: Math.max(0, model.communityPct), color: "var(--community)" },
  ];

  refs.stackedBar.innerHTML = "";
  for (const item of items) {
    const segment = document.createElement("div");
    segment.style.width = `${Math.max(0, item.pct)}%`;
    segment.style.background = item.color;
    segment.textContent = item.pct >= 10 ? `${item.label} ${item.pct.toFixed(1)}%` : "";
    if (item.pct < 10) segment.className = "hide-label";
    refs.stackedBar.appendChild(segment);
  }
}

function renderWarnings(model) {
  const notices = [];
  if (model.tUser > model.tBought) {
    notices.push({
      type: "warning",
      text: `Premium is too high for this raise. Public Sale ${formatCompact(model.tUser)} tokens exceeds bought supply ${formatCompact(model.tBought)} tokens. Increase raise amount or reduce the fixed premium model.`,
    });
  }
  if (!model.graduated) {
    notices.push({
      type: "warning",
      text: `Raise is below graduation threshold. Minimum is ${formatCompact(COST_GRAD_LV)} MON before Liquidity can be seeded.`,
    });
  }
  if (state.monUsd <= 0) {
    notices.push({
      type: "warning",
      text: "MON price must be greater than zero for USD conversion.",
    });
  }

  refs.warnings.innerHTML = "";
  for (const notice of notices) {
    const node = document.createElement("div");
    node.className = `notice ${notice.type}`;
    node.textContent = notice.text;
    refs.warnings.appendChild(node);
  }
}

function renderPrebuy() {
  const share = Math.min(100, Math.max(0, Number(refs.prebuyShare.value) || 0));
  refs.prebuyShare.value = share;
  refs.prebuyRange.value = share;
  const ratio = share / 100;
  const tokens = state.publicSaleTokens * ratio;
  const mon = tokens * state.userPrice;
  refs.prebuyLimit.textContent = `Max: 100% of Public Sale = ${formatPct(state.publicSalePct)} of total supply`;
  refs.prebuyTotalPct.textContent = formatPct(state.publicSalePct * ratio);
  refs.prebuyTokens.textContent = `${formatCompact(tokens)} tokens`;
  refs.prebuyMon.textContent = `${formatCompact(mon)} MON`;
  refs.prebuyUsd.textContent = formatCompact(mon * state.monUsd, "$");
}

function render({ clamp = true } = {}) {
  state.monUsd = Math.max(0.0001, Number(refs.monPrice.value) || 0.03);
  if (clamp) clampRaise();
  const floor = currentFloor();
  const model = calculateTokenomics(toLvmon());

  state.publicSalePct = model.publicPct;
  state.publicSaleTokens = model.tUser;
  state.userPrice = model.pUser;

  refs.unitUsd.classList.toggle("active", state.displayUnit === "USD");
  refs.unitLvmon.classList.toggle("active", state.displayUnit === "MON");
  refs.raiseSuffix.textContent = "MON";
  refs.raiseInput.step = currentStep();
  refs.raiseInput.min = floor;
  refs.raiseInput.value = Math.round(state.raiseValue);
  refs.floorLabel.textContent = `Minimum: ${formatWhole(floor, "", " MON")} graduation threshold. No hard maximum.`;
  refs.raiseEquivalent.hidden = state.displayUnit !== "USD";
  refs.raiseEquivalent.textContent = `${formatWhole(state.raiseValue, "", " MON")} = ${formatCompact(state.raiseValue * state.monUsd, "$")} at current MON price`;
  configureRange();

  refs.graduationBadge.textContent = model.graduated ? "Graduated" : "Below Threshold";
  refs.statusValue.textContent = model.graduated ? "Graduated" : "Not Graduated";
  refs.statusMeta.textContent = `Curve ${formatCompact(COST_GRAD_LV)} MON / DEX ${formatCompact(Math.max(0, model.dexSpend))} MON`;
  refs.mcUsd.textContent = formatCompact(model.mcCurve * state.monUsd, "$");
  refs.mcLv.textContent = `${formatCompact(model.mcCurve)} MON`;
  refs.spotLv.textContent = `${model.pCurve.toPrecision(4)} MON`;
  refs.spotUsd.textContent = formatCompact(model.pCurve * state.monUsd, "$");
  refs.userPriceLv.textContent = `${model.pUser.toPrecision(4)} MON`;

  refs.publicPct.textContent = formatPct(model.publicPct);
  refs.publicTokens.textContent = `${formatCompact(model.tUser)} tokens`;
  refs.publicValue.textContent = `${formatCompact(model.tUser * model.pCurve * state.monUsd, "$")} @ spot`;
  refs.liquidityPct.textContent = formatPct(model.liquidityPct);
  refs.liquidityTokens.textContent = `${formatCompact(model.tLiquidity)} tokens`;
  refs.liquidityValue.textContent = `${formatCompact(model.tLiquidity * model.pCurve * state.monUsd, "$")} @ spot`;
  refs.communityPct.textContent = formatPct(model.communityPct);
  refs.communityTokens.textContent = `${formatCompact(model.tComm)} tokens`;
  refs.communityValue.textContent = `${formatCompact(model.tComm * model.pCurve * state.monUsd, "$")} @ spot`;

  renderBars(model);
  renderPrebuy();
  renderWarnings(model);
}

async function refreshMonPrice({ silent = false } = {}) {
  if (!silent) refs.priceMeta.textContent = "Fetching CoinGecko price...";
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=monad&vs_currencies=usd");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    const price = json?.monad?.usd;
    if (!Number.isFinite(price) || price <= 0) throw new Error("Price unavailable");
    refs.monPrice.value = price;
    refs.priceMeta.textContent = `Auto refresh: ${formatCompact(price, "$")} / MON`;
    render();
  } catch (error) {
    if (!silent) refs.priceMeta.textContent = `Price fetch failed. Current MON price kept.`;
  }
}

refs.unitUsd.addEventListener("click", () => setDisplayUnit("USD"));
refs.unitLvmon.addEventListener("click", () => setDisplayUnit("MON"));
refs.monPrice.addEventListener("input", () => {
  state.monUsd = Math.max(0.0001, Number(refs.monPrice.value) || 0.03);
  clampRaise();
  render();
});
refs.refreshPrice.addEventListener("click", refreshMonPrice);
refs.raiseInput.addEventListener("input", (event) => {
  const parsed = Number(event.target.value);
  if (Number.isFinite(parsed)) state.raiseValue = parsed;
  render({ clamp: false });
});
refs.raiseInput.addEventListener("change", (event) => syncRaiseInput(event.target.value, true));
refs.raiseInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") syncRaiseInput(event.currentTarget.value, true);
});
refs.raiseRange.addEventListener("input", (event) => syncRaiseInput(event.target.value, false));
refs.prebuyShare.addEventListener("input", renderPrebuy);
refs.prebuyRange.addEventListener("input", (event) => {
  refs.prebuyShare.value = event.target.value;
  renderPrebuy();
});
refs.projectName.addEventListener("input", () => {
  refs.previewName.textContent = refs.projectName.value.trim() || "Project Name";
});
refs.ticker.addEventListener("input", () => {
  refs.previewTicker.textContent = `$${(refs.ticker.value.trim() || "TICKER").toUpperCase()}`;
});
refs.tokenPicture.addEventListener("change", (event) => {
  const [file] = event.target.files || [];
  if (!file) return;
  const url = URL.createObjectURL(file);
  refs.tokenPreview.src = url;
  refs.railTokenPreview.src = url;
  refs.tokenPreview.closest(".token-avatar")?.classList.add("has-image");
  refs.railTokenPreview.closest(".preview-avatar")?.classList.add("has-image");
});

refs.richToolbar.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const command = button.dataset.command;
  const insert = button.dataset.insert;
  if (command === "createLink") {
    const url = window.prompt("Paste URL");
    if (url) document.execCommand("createLink", false, url);
    return;
  }
  if (command) {
    document.execCommand(command, false, null);
    return;
  }
  if (insert === "table") {
    document.execCommand("insertHTML", false, "<table><tbody><tr><th>Metric</th><th>Value</th></tr><tr><td></td><td></td></tr></tbody></table><p></p>");
  }
  if (insert === "image") {
    document.execCommand("insertHTML", false, "<p><strong>Image:</strong> add asset URL or upload note here.</p>");
  }
});

refs.blockType.addEventListener("change", (event) => {
  document.execCommand("formatBlock", false, event.target.value);
});

refs.launchDetail.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;
  const action = actionTarget.dataset.action;
  if (action === "print") {
    window.print();
    return;
  }

  const token = tokenById(actionTarget.dataset.id);
  if (action === "max") {
    const input = $("detailInvestInput");
    if (input) input.value = Math.min(tokenRemaining(token), token.walletBalanceMon || 0);
    return;
  }

  if (action === "invest") {
    const input = $("detailInvestInput");
    const requested = Math.max(0, Number(input?.value) || 0);
    const amount = Math.min(requested, tokenRemaining(token), token.walletBalanceMon || 0);
    if (amount <= 0 || token.status !== "Live") return;
    token.raisedMon += amount;
    token.userContributionMon += amount;
    token.walletBalanceMon = Math.max(0, (token.walletBalanceMon || 0) - amount);
    if (token.raisedMon >= token.targetMon) {
      token.raisedMon = token.targetMon;
      token.status = "Launched";
      launchState.detailMessage = `${token.name} reached its MON target. Deploy is triggered and withdrawals are now closed.`;
    } else {
      launchState.detailMessage = `Invested ${formatMonExact(amount)} into ${token.name}.`;
    }
    renderLaunchDetail(token.id);
    renderLaunchDashboard();
  }

  if (action === "withdraw" && token.status === "Live" && token.userContributionMon > 0) {
    const amount = token.userContributionMon;
    token.raisedMon = Math.max(0, token.raisedMon - amount);
    token.userContributionMon = 0;
    token.walletBalanceMon = (token.walletBalanceMon || 0) + amount;
    launchState.detailMessage = `Withdrew ${formatMonExact(amount)}. Funds are no longer locked in this live raise.`;
    renderLaunchDetail(token.id);
    renderLaunchDashboard();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  render();
  showRoute();
  refreshMonPrice();
  window.setInterval(() => refreshMonPrice({ silent: true }), PRICE_REFRESH_MS);
  if (window.lucide) window.lucide.createIcons();
});

window.addEventListener("hashchange", () => {
  launchState.detailMessage = "";
  showRoute();
});
