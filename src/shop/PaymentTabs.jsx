import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { AlertCircle, Building2, Check, Copy, ExternalLink, Landmark, Smartphone } from "lucide-react";
import {
  shopConfig,
  buildUpiUri,
  formatInr,
  isService,
} from "../data/products";
import { copyToClipboard } from "./copyToClipboard";

const tabStyles = {
  razorpay: { icon: ExternalLink, label: "Razorpay" },
  upi: { icon: Smartphone, label: "Direct UPI" },
  bank: { icon: Landmark, label: "Bank transfer" },
};

const CopyField = ({ label, value, mono = true }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyToClipboard(value)) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }
      }}
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-white/[0.03] px-3.5 py-3 text-left transition-colors hover:border-zinc-500"
    >
      <span>
        <span className="block text-xs text-zinc-500">{label}</span>
        <span className={`block text-sm text-zinc-200 ${mono ? "font-mono" : ""}`}>{value}</span>
      </span>
      {copied ? <Check className="size-4 shrink-0 text-green-400" /> : <Copy className="size-4 shrink-0 text-zinc-400" />}
    </button>
  );
};

const PaymentTabs = ({ product }) => {
  const [tab, setTab] = useState("razorpay");
  const [submittedEmail, setSubmittedEmail] = useState(null);
  const upi = shopConfig.upi;
  const amountNote = useMemo(
    () => `Payment for ${product.name} on ratulkoley.dpdns.org`.slice(0, 40),
    [product.name],
  );
  const upiUri = useMemo(
    () =>
      buildUpiUri({
        vpa: upi.vpa,
        payeeName: upi.payeeName,
        amountInr: product.priceInr,
        note: amountNote,
      }),
    [upi, product.priceInr, amountNote],
  );
  const isSvc = isService(product);
  const razorpayReady = Boolean(product.razorpayLink);
  const bankReady = !shopConfig.bank.accountNumber.startsWith("X");

  const railDisabled = (key) => key === "razorpay" && !razorpayReady;

  const availableTab = [ "razorpay", "upi", "bank" ].find((key) => !railDisabled(key));

  const activeTab = railDisabled(tab) ? availableTab : tab;

  return (
    <div className="rounded-xl border border-line bg-panel p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          {isSvc && <span className="block text-xs text-zinc-500">starting at</span>}
          <p className="text-3xl font-semibold tracking-tight text-white">{formatInr(product.priceInr)}</p>
          {product.compareAt && (
            <p className="mt-1 text-sm text-zinc-500">
              <span className="line-through">{formatInr(product.compareAt)}</span>{" "}
              <span className="text-green-400">
                save {formatInr(product.compareAt - product.priceInr)}
              </span>
            </p>
          )}
        </div>
        {isSvc && <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">Quote after scoping</span>}
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Payment method" className="mt-6 grid grid-cols-3 gap-1 rounded-lg border border-line bg-ink p-1">
        {Object.entries(tabStyles).map(([key, { icon: Icon, label }]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            disabled={railDisabled(key)}
            onClick={() => setTab(key)}
            title={railDisabled(key) ? "Not set up yet for this product" : undefined}
            className={`flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition-colors sm:text-sm ${
              activeTab === key
                ? "bg-brand text-white"
                : railDisabled(key)
                  ? "text-zinc-600"
                  : "text-zinc-400 hover:text-white"
            }`}
          >
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </div>

      {activeTab === "razorpay" && (
        <div className="mt-5">
          {razorpayReady ? (
            <>
              <p className="text-sm leading-6 text-zinc-400">
                Secure checkout via Razorpay — UPI, cards, netbanking and wallets. You'll be redirected to Razorpay's hosted page.
              </p>
              <a
                href={product.razorpayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand bg-brand px-4 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(37,99,235,0.22)] transition-colors hover:bg-blue-500"
              >
                <ExternalLink className="size-4" /> Pay {formatInr(product.priceInr)} with Razorpay
              </a>
              <p className="mt-3 text-xs text-zinc-500">
                Paid already? Submit your payment reference below and I'll confirm on my end.
              </p>
            </>
          ) : (
            <div className="flex gap-3 rounded-lg border border-amber-400/20 bg-amber-500/[0.07] px-4 py-3 text-sm text-amber-200">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <p>{shopConfig.notices.razorpay}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "upi" && (
        <div className="mt-5">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <div className="rounded-xl bg-white p-3">
              <QRCodeSVG value={upiUri} size={132} includeMargin={false} aria-label={`UPI QR code for ${formatInr(product.priceInr)}`} />
            </div>
            <div className="w-full min-w-0">
              <p className="text-sm text-zinc-400">
                Scan with any UPI app (GPay, PhonePe, Paytm). The amount <strong className="text-zinc-200">{formatInr(product.priceInr)}</strong> is pre-filled — just confirm.
              </p>
              <div className="mt-3 space-y-2">
                <CopyField label="UPI ID" value={upi.vpa} />
                <a
                  href={upiUri}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-zinc-500 sm:hidden"
                >
                  <Smartphone className="size-4" /> Open UPI app
                </a>
              </div>
            </div>
          </div>
          <p className="mt-4 rounded-lg bg-white/[0.03] px-3.5 py-2.5 text-xs leading-5 text-zinc-500">
            After paying, note the <strong className="text-zinc-300">12-digit UTR</strong> from your UPI app and submit it below —
            that's how I match your payment and deliver.
          </p>
        </div>
      )}

      {activeTab === "bank" && (
        <div className="mt-5">
          {bankReady ? (
            <>
              <p className="text-sm text-zinc-400">Transfer {formatInr(product.priceInr)} via IMPS/NEFT:</p>
              <div className="mt-3 space-y-2">
                <CopyField label="Account name" value={shopConfig.bank.accountName} mono={false} />
                <CopyField label="Account number" value={shopConfig.bank.accountNumber} />
                <CopyField label="IFSC code" value={shopConfig.bank.ifsc} />
                <CopyField label="Bank" value={`${shopConfig.bank.bankName}, ${shopConfig.bank.branch}`} mono={false} />
              </div>
              <p className="mt-4 rounded-lg bg-white/[0.03] px-3.5 py-2.5 text-xs leading-5 text-zinc-500">
                After transferring, submit the UTR / reference number below so I can match your credit.
              </p>
            </>
          ) : (
            <div className="flex gap-3 rounded-lg border border-amber-400/20 bg-amber-500/[0.07] px-4 py-3 text-sm text-amber-200">
              <Building2 className="mt-0.5 size-4 shrink-0" />
              <p>Bank details are being added shortly — use the UPI option meanwhile.</p>
            </div>
          )}
        </div>
      )}

      {/* Verification form — Netlify Forms */}
      <div className="mt-8 border-t border-line pt-6">
        {submittedEmail ? (
          <div className="rounded-lg border border-positive/30 bg-positive/10 px-4 py-4 text-sm text-green-200">
            <p className="font-medium">Reference received — thank you.</p>
            <p className="mt-1.5 text-green-300/80">
              I'll verify the credit and email you at <span className="font-mono">{submittedEmail}</span> with your download or kickoff details,
              usually within a few hours. Questions? <a className="underline" href={`mailto:${shopConfig.supportEmail}`}>{shopConfig.supportEmail}</a>
            </p>
          </div>
        ) : (
          <form
            name="order-verification"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.target);
              const email = data.get("email");
              fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(data).toString(),
              })
                .then(() => setSubmittedEmail(email))
                .catch(() => alert("Could not submit right now — please email the reference instead."));
            }}
          >
            <input type="hidden" name="form-name" value="order-verification" />
            <input type="hidden" name="product" value={product.name} />
            <input type="hidden" name="amount" value={product.priceInr} />
            <input type="hidden" name="method" value={activeTab} />
            <p className="hidden">
              <label>Don't fill this out: <input name="bot-field" /></label>
            </p>
            <p className="text-sm font-medium text-white">Paid already? Verify your order</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <label className="sr-only" htmlFor="ov-name">Your name</label>
              <input
                id="ov-name" name="name" required placeholder="Your name"
                className="rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500"
              />
              <label className="sr-only" htmlFor="ov-email">Email</label>
              <input
                id="ov-email" name="email" type="email" required placeholder="Email for delivery"
                className="rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500"
              />
              <label className="sr-only" htmlFor="ov-utr">UTR / reference</label>
              <input
                id="ov-utr" name="utr" required inputMode="numeric" placeholder="UPI UTR or bank reference no."
                className="rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 sm:col-span-2"
              />
              <label className="sr-only" htmlFor="ov-notes">Notes</label>
              <textarea
                id="ov-notes" name="notes" rows="2" placeholder="Notes (optional) — WhatsApp number, questions…"
                className="rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 sm:col-span-2"
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full rounded-lg border border-brand bg-brand px-4 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(37,99,235,0.22)] transition-colors hover:bg-blue-500"
            >
              Submit payment reference
            </button>
            <p className="mt-3 text-xs text-zinc-600">
              Manual verification keeps this shop fee-free: no percentage cut, no middleman. Your reference goes straight to my inbox.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentTabs;
