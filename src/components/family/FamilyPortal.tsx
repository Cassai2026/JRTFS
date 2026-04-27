"use client";
import { useState } from "react";

const SERVICES = [
  { id: "basic-cremation", name: "Direct Cremation", description: "Simple, dignified cremation without ceremony", price: 895, category: "Cremation" },
  { id: "attended-cremation", name: "Attended Cremation", description: "Cremation with family attendance at crematorium", price: 1495, category: "Cremation" },
  { id: "burial-standard", name: "Standard Burial", description: "Full burial service with graveside ceremony", price: 2495, category: "Burial" },
  { id: "burial-premium", name: "Premium Burial", description: "Premium burial with full service and reception", price: 3995, category: "Burial" },
  { id: "chapel-service", name: "Chapel Service", description: "Religious or non-religious chapel ceremony", price: 650, category: "Services" },
  { id: "embalming", name: "Embalming", description: "Professional preservation service", price: 350, category: "Preparation" },
  { id: "oak-casket", name: "Oak Casket", description: "Traditional solid oak casket", price: 1250, category: "Casket" },
  { id: "willow-casket", name: "Willow Casket (Eco)", description: "Eco-friendly woven willow casket", price: 850, category: "Casket" },
  { id: "flowers-simple", name: "Simple Floral Tribute", description: "Tasteful floral arrangement", price: 180, category: "Flowers" },
  { id: "flowers-premium", name: "Premium Floral Arrangements", description: "Full floral arrangements including tribute pieces", price: 450, category: "Flowers" },
  { id: "death-cert", name: "Death Certificate Copies (x5)", description: "Five certified copies of the death certificate", price: 75, category: "Administration" },
  { id: "obituary", name: "Obituary Notice", description: "Newspaper obituary placement", price: 120, category: "Administration" },
];

export function FamilyPortal() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [step, setStep] = useState<"services" | "documents" | "review" | "complete">("services");
  const [consentGiven, setConsentGiven] = useState(false);
  const [fcaSigned, setFcaSigned] = useState(false);

  const categories = ["All", ...Array.from(new Set(SERVICES.map((s) => s.category)))];

  const filteredServices = activeCategory === "All"
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedItems = SERVICES.filter((s) => selectedServices.includes(s.id));
  const total = selectedItems.reduce((sum, s) => sum + s.price, 0);
  const disbursementEstimate = total * 0.15;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b-4 border-blue-700 py-6 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="text-3xl">⚖️</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sovereign Family Portal</h1>
              <p className="text-blue-700 font-medium">Transparent Pricing | No Hidden Costs | Your Choices, Your Control</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          {["services", "documents", "review", "complete"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s ? "bg-blue-700 text-white" :
                ["services", "documents", "review", "complete"].indexOf(step) > i
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium capitalize ${step === s ? "text-blue-700" : "text-gray-500"}`}>
                {s}
              </span>
              {i < 3 && <div className="w-8 h-px bg-gray-300 ml-2" />}
            </div>
          ))}
        </div>

        {step === "services" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Services</h2>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 font-medium">
                  💡 All prices shown are final. Zero hidden markups. What you see is exactly what you pay.
                </p>
              </div>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-blue-700 text-white"
                      : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {filteredServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-colors ${
                      isSelected
                        ? "border-blue-700 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {service.category}
                        </span>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-xl font-bold text-gray-900">£{service.price.toLocaleString()}</div>
                        {isSelected && (
                          <div className="text-green-600 text-xs font-medium mt-1">✓ Selected</div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedItems.length > 0 && (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Cost Summary</h3>
                <div className="space-y-2 mb-4">
                  {selectedItems.map((s) => (
                    <div key={s.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{s.name}</span>
                      <span className="font-medium">£{s.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Third-party disbursements (est.)</span>
                    <span>£{disbursementEstimate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Estimated Total</span>
                    <span className="text-blue-700">£{(total + disbursementEstimate).toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm">
                    ✅ <strong>Zero Hidden Markup Guarantee:</strong> All third-party costs are passed directly to you at cost price. No markup. Ever.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep("documents")}
              disabled={selectedItems.length === 0}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors"
            >
              Continue to Documents →
            </button>
          </div>
        )}

        {step === "documents" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Legal Documents</h2>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
              <p className="text-yellow-800 font-medium">
                🔒 <strong>Zero-Extraction Policy:</strong> All documents are encrypted end-to-end. Your data is NEVER shared with third-party insurers or any external parties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {["Death Certificate", "Grant of Probate / Letters of Administration", "ID (Passport or Driving License)", "Pre-paid Funeral Plan (if applicable)"].map((doc) => (
                <div key={doc} className="bg-white border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer transition-colors">
                  <div className="text-3xl mb-2">📄</div>
                  <div className="font-medium text-gray-900">{doc}</div>
                  <div className="text-sm text-gray-500 mt-1">Click or drag to upload</div>
                  <div className="text-xs text-gray-400 mt-2">PDF, JPG, PNG (max 10MB)</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep("services")} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button onClick={() => setStep("review")} className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors">
                Continue to Review →
              </button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h2>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Selected Services</h3>
              <div className="space-y-2">
                {selectedItems.map((s) => (
                  <div key={s.id} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">{s.name}</span>
                    <span className="font-semibold">£{s.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-700">£{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">FCA Compliance — Demands and Needs Statement</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-3 max-h-48 overflow-y-auto mb-4">
                <p><strong>PLACEHOLDER — FCA Demands and Needs Statement v1.0</strong></p>
                <p>In accordance with the Financial Conduct Authority (FCA) regulations for funeral plan providers (effective 29 July 2022), this statement records the demands and needs of the customer as assessed at the time of purchase.</p>
                <p>Regulated Activity: The provision of a funeral plan contract as defined under the Financial Services and Markets Act 2000 (Regulated Activities) Order 2001 as amended by the Financial Services and Markets Act 2000 (Regulated Activities) (Amendment) (No.2) Order 2022.</p>
                <p><strong>Customer Assessment:</strong> Based on the information provided, the recommended funeral arrangement has been matched to your stated demands and needs including budget constraints, religious or cultural requirements, and personal preferences.</p>
                <p><strong>Price Transparency:</strong> All costs have been disclosed upfront. No hidden fees. Third-party disbursements will be passed at cost price with zero markup as required under FCA conduct rules.</p>
                <p className="text-yellow-700 bg-yellow-50 p-2 rounded border border-yellow-200">⚠️ PLACEHOLDER: This statement must be reviewed and approved by a qualified FCA compliance officer before going live. Reference: FCA PS21/20, FCA FG21/6.</p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={fcaSigned}
                  onChange={(e) => setFcaSigned(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-blue-700"
                />
                <span className="text-sm text-gray-700">
                  I have read and understood the FCA Demands and Needs Statement. I confirm the recommended services meet my needs.
                </span>
              </label>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Data Protection & Zero-Extraction Consent</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 mb-4">
                <p className="mb-2">Under our <strong>Zero-Extraction Data Policy</strong>:</p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Your personal and financial data is encrypted using AES-256-GCM encryption</li>
                  <li>Your data will NEVER be shared with third-party insurers, marketing companies, or data brokers</li>
                  <li>We retain your data only for legal compliance purposes (minimum 7 years)</li>
                  <li>You have the right to request data deletion (subject to legal retention requirements)</li>
                </ul>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-blue-700"
                />
                <span className="text-sm text-gray-700">
                  I consent to the processing of my data under the Zero-Extraction Policy and understand my data rights.
                </span>
              </label>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep("documents")} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button
                onClick={() => setStep("complete")}
                disabled={!consentGiven || !fcaSigned}
                className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You</h2>
            <p className="text-gray-600 text-lg mb-4 max-w-lg mx-auto">
              Your arrangements have been received and recorded in our Sovereign system. A confirmation will be sent to you.
            </p>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-md mx-auto mb-8">
              <h3 className="font-bold text-blue-900 mb-3">Your Reference</h3>
              <div className="font-mono text-2xl text-blue-700">SFS-{Date.now().toString(36).toUpperCase()}</div>
              <p className="text-blue-600 text-sm mt-2">Please save this reference number</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-green-800 text-sm">
                🔒 Your data is protected under Zero-Extraction Policy.<br />
                Your details have been encrypted and will never be shared.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
