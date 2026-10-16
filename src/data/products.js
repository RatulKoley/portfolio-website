// ─────────────────────────────────────────────────────────────────────────────
// Shop data — products, services and payment configuration.
// Everything the shop renders comes from this file. Update it as your catalog
// grows; the UI adapts automatically.
//
// TODO(you): fill in bank details, create Razorpay Payment Links per product
// in your Razorpay dashboard and paste each link into `razorpayLink`.
// ─────────────────────────────────────────────────────────────────────────────

export const shopConfig = {
  /** Direct-UPI rail: QR + app deep-link, verified manually via UTR. */
  upi: {
    vpa: "7602497859@superyes",
    payeeName: "Ratul Koley",
  },
  /** Direct bank-transfer rail: NEFT/IMPS, verified manually via reference no. */
  bank: {
    accountName: "Ratul Koley",
    accountNumber: "XXXXXXXXXX", // TODO: replace with your account number
    ifsc: "XXXXXXXXXXX", // TODO: replace with your IFSC code
    bankName: "TODO — Bank name",
    branch: "Kolkata, West Bengal",
  },
  /** Where buyers hear back after submitting the verification form. */
  supportEmail: "ratuljob657@gmail.com",
  /** Renders only when a rail is still unconfigured. */
  notices: {
    razorpay:
      "Razorpay checkout is being set up for this product. Use the direct UPI or bank transfer option below meanwhile.",
  },
};

export const formatInr = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Builds a UPI deep link with the amount pre-filled.
 * Mobile browsers hand this straight to the UPI app; desktop shows a QR.
 */
export const buildUpiUri = ({ vpa, payeeName, amountInr, note }) => {
  const params = new URLSearchParams({
    pa: vpa,
    pn: payeeName,
    am: String(amountInr),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
};

export const productTypes = {
  app: { label: "Ready app", chip: "bg-blue-500/10 text-blue-300 border-blue-400/20" },
  "source-code": { label: "Source code", chip: "bg-violet-500/10 text-violet-300 border-violet-400/20" },
  service: { label: "Service", chip: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20" },
};

// ─── Catalog ─────────────────────────────────────────────────────────────────
// Fields:
//   type          app | source-code | service
//   tagline       one-liner shown on cards
//   description   full pitch on the product page
//   features      bullet list on the product page
//   techStack     chips (first 3 show on cards)
//   priceInr      price in rupees; services use a "starting at" floor
//   compareAt     optional original price, renders struck-through
//   license       shown verbatim in the buy panel
//   delivery      how the buyer receives it after payment is verified
//   razorpayLink  Razorpay Payment Link URL (TODO per product)
//   demoUrl       optional live demo ("" hides the button)
//   gallery       optional [{ src, alt }] screenshots ("" palette hero until filled)
//   live          set false to hide a product from the shop without deleting it

export const products = [
  {
    slug: "hospital-management-system-source",
    name: "Hospital Management System — Full Source Code",
    type: "source-code",
    tagline: "Multi-tenant HMS + Laboratory Information System, battle-tested across 10+ hospitals.",
    description:
      "The complete source code of a production Hospital Management System I architected and led: multi-tenant microservices, a Laboratory Information System integrating diagnostic machines, billing, appointments, pharmacy, HRMS and secure medical-records storage. Deployed and running for 10+ institutions — you get the real thing, not a demo scaffold.",
    features: [
      "Multi-tenant architecture with per-hospital data isolation",
      "Lab module with machine integration patterns for 3+ diagnostic devices",
      "Billing, appointments, pharmacy and inventory modules included",
      "JWT/MSAL authentication and encrypted medical-records handling",
      "SignalR/WebSockets real-time updates across the web and desktop layers",
      "xUnit test suite and CI/CD pipeline configs included",
    ],
    techStack: [".NET 8", "MySQL", "MSAL", "SignalR", "Angular", "Azure"],
    priceInr: 24999,
    compareAt: 39999,
    license:
      "Commercial license for one company. Modify and deploy for your own products; resale or redistribution of the source code is not permitted.",
    delivery:
      "Private ZIP download link and a GitHub repository invite, sent to your email after payment is verified (usually within a few hours).",
    razorpayLink: "", // TODO: create a Razorpay Payment Link for this product and paste the URL
    demoUrl: "",
    gallery: [],
    live: true,
  },
  {
    slug: "ambulance-fleet-tracking-starter",
    name: "Ambulance Fleet Tracking Starter",
    type: "source-code",
    tagline: "Real-time geospatial tracking and emergency dispatch backend, optimized schemas included.",
    description:
      "A complete backend foundation for live vehicle tracking: driver apps push location updates, an optimized spatial schema serves live fleet maps, and a dispatch flow prioritizes the nearest available vehicle. Built for a real emergency-response use case and tuned for low-latency reads.",
    features: [
      "Live location ingestion API with batching and error handling",
      "Optimized MySQL spatial schema for fast radius/nearby queries",
      "Dispatch workflow: availability, assignment and trip lifecycle",
      "Node.js/Express codebase with environment-based configuration",
      "Postman collection demonstrating every endpoint",
    ],
    techStack: ["Node.js", "Express.js", "MySQL", "WebSockets", "Postman"],
    priceInr: 9999,
    license:
      "Commercial license for one company. Attribution in your product's about page is appreciated but not required.",
    delivery:
      "Private ZIP download link, sent to your email after payment is verified (usually within a few hours).",
    razorpayLink: "",
    demoUrl: "",
    gallery: [],
    live: true,
  },
  {
    slug: "ai-ocr-document-parser",
    name: "AI OCR Document Parser (Node.js)",
    type: "app",
    tagline: "The exact OCR pipeline I built for parsing forms and documents, packaged and documented.",
    description:
      "A working OCR document-parsing pipeline: upload a form image or PDF, get structured fields out the other side. Includes pre-processing (deskew, denoise), confidence scoring per field, a validation layer for common document types, and a clean REST interface you can drop into any backend.",
    features: [
      "REST upload-and-parse endpoint with queue-friendly async mode",
      "Confidence scoring and per-field validation rules",
      "Extensible template system for new document types",
      "Dockerfile and deploy notes for Linux servers",
      "Benchmark script with sample forms included",
    ],
    techStack: ["Python", "Node.js", "OCR", "Docker", "REST API"],
    priceInr: 4999,
    license:
      "Commercial license for one company. You may integrate it into products you sell; you may not resell the toolkit itself.",
    delivery:
      "Private ZIP download link and setup call (30 minutes) after payment is verified.",
    razorpayLink: "",
    demoUrl: "",
    gallery: [],
    live: true,
  },
  {
    slug: "custom-web-app-development",
    name: "Custom Web App Development",
    type: "service",
    tagline: "Full design-to-deploy delivery of your web application, led by a team lead who ships.",
    description:
      "Bring an idea or a problem; I take it through discovery, architecture, iterative builds with regular demos, and a production deployment on Azure or your cloud of choice. You get the discipline of an enterprise team lead — Agile sprints, code reviews, tests, CI/CD — without hiring a team.",
    features: [
      "Discovery call and written technical proposal with milestones",
      "Modern stack: React/Angular frontends, .NET Core/Node.js backends",
      "Regular demo builds so you see progress every sprint",
      "CI/CD pipeline and cloud deployment included",
      "30 days of post-launch support included",
    ],
    techStack: ["React", ".NET Core", "Node.js", "Azure", "CI/CD"],
    priceInr: 19999,
    pricePrefix: "starting at",
    license: "Full ownership of all delivered code and assets transfers to you on final payment.",
    delivery:
      "Milestone-based: agreed schedule at kickoff, source delivered to your repository as milestones complete.",
    razorpayLink: "",
    demoUrl: "",
    gallery: [],
    live: true,
  },
  {
    slug: "complete-business-software-setup",
    name: "Complete Business Software Setup",
    type: "service",
    tagline: "Your operations, digitized end-to-end: billing, inventory, HRMS, dashboards — one build.",
    description:
      "For businesses tired of spreadsheets and disconnected tools: I scope your operations and deliver one integrated system — billing and invoicing, inventory, employee and payroll workflows, role-based dashboards and reporting — modeled on the modules I built for real restaurants, hospitals and enterprises.",
    features: [
      "On-site (Kolkata) or remote requirements workshop",
      "Billing, inventory, HRMS and visitor modules configured to your process",
      "Staff training session and printed quick-reference guides",
      "Reports and tax-ready exports configured",
      "Optional yearly maintenance contract",
    ],
    techStack: [".NET Core", "React", "SQL Server", "Reporting", "Training"],
    priceInr: 49999,
    pricePrefix: "starting at",
    license: "Delivered as your system: full ownership and a documented handover on completion.",
    delivery:
      "Scoped project: kickoff within a week of booking, deployed and handed over per the agreed schedule.",
    razorpayLink: "",
    demoUrl: "",
    gallery: [],
    live: true,
  },
  {
    slug: "api-integration-work",
    name: "API & System Integration",
    type: "service",
    tagline: "Payment gateways, SMS/WhatsApp, machines, third-party APIs — wired correctly and documented.",
    description:
      "One-off or ongoing integration work: Razorpay/payment gateways, SMS and WhatsApp providers, government or logistics APIs, lab machines and custom hardware bridges. I've built 500+ production REST APIs and integrations that run at 99.9% uptime — your integration will be tested, documented and monitored.",
    features: [
      "Fixed-scope quote after a short technical discovery call",
      "Error handling, retries and idempotency built in by default",
      "Webhook receivers and signature verification done properly",
      "Integration documentation your team can maintain",
    ],
    techStack: ["REST APIs", "Webhooks", "Payment Gateways", "Node.js", ".NET"],
    priceInr: 9999,
    pricePrefix: "starting at",
    license: "Work-for-hire: all integration code is owned by you on completion.",
    delivery: "Per the agreed statement of work; most integrations complete in 1–3 weeks.",
    razorpayLink: "",
    demoUrl: "",
    gallery: [],
    live: true,
  },
];

export const getLiveProducts = () => products.filter((p) => p.live !== false);

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);

export const isService = (product) => product.type === "service";

// ─── Sitemap helpers (used by scripts/generate-sitemap.mjs at build time) ────
export const SITE_BASE_URL = "https://ratulkoley.dpdns.org";

export const sitemapProductPaths = () =>
  getLiveProducts().map((p) => `/shop/${p.slug}`);

/** "How buying works" — shown at the top of the shop. */
export const buyingSteps = [
  {
    title: "Choose & pay",
    description: "Pay with Razorpay, scan the direct UPI QR, or use a bank transfer — whatever suits you.",
  },
  {
    title: "Share the reference",
    description: "Submit the 12-digit UTR (UPI) or bank reference number through the short order form.",
  },
  {
    title: "Get delivered",
    description: "I verify the credit manually and email your download link or kickoff schedule. Usually within hours.",
  },
];
