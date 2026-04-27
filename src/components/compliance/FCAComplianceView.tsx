"use client";

const FCA_STATEMENTS = [
  {
    id: "fca-001",
    title: "FCA Demands and Needs Statement — Funeral Plans",
    version: "v1.0",
    status: "PLACEHOLDER",
    effectiveDate: "2022-07-29",
    content: `PLACEHOLDER — REQUIRES FCA COMPLIANCE OFFICER REVIEW

This statement is issued in compliance with the Financial Conduct Authority (FCA) regulatory requirements for funeral plan providers, effective 29 July 2022 (FCA PS21/20).

1. REGULATED ACTIVITY
The provision of funeral plan contracts as defined under:
- Financial Services and Markets Act 2000 (FSMA)
- Regulated Activities Order 2001 (RAO)
- Financial Services and Markets Act 2000 (Regulated Activities) (Amendment) (No.2) Order 2022

2. DEMANDS AND NEEDS ASSESSMENT
[PLACEHOLDER] Assessment criteria must be defined by qualified FCA compliance officer.
Reference: FCA Finalised Guidance FG21/6 — Funeral plans: Regulated activities and business model assessment.

3. PRICE TRANSPARENCY OBLIGATIONS
All prices must be disclosed upfront in accordance with FCA Conduct of Business Sourcebook (COBS).
Third-party disbursements must be identified separately and passed at cost price.

4. CANCELLATION RIGHTS
[PLACEHOLDER] 30-day cooling off period to be confirmed with FCA guidance.

5. COMPLAINTS PROCEDURE
[PLACEHOLDER] FCA-regulated complaints process to be inserted here.
Financial Ombudsman Service (FOS) referral information required.

6. FINANCIAL COMPENSATION SCHEME
[PLACEHOLDER] FSCS protection details to be confirmed.

⚠️ THIS IS A PLACEHOLDER DOCUMENT. DO NOT USE IN PRODUCTION WITHOUT FCA COMPLIANCE REVIEW.
References: FCA PS21/20, FCA CP21/20, FCA FG21/6`,
  },
  {
    id: "fca-002",
    title: "FCA Price Transparency Statement",
    version: "v1.0",
    status: "PLACEHOLDER",
    effectiveDate: "2022-07-29",
    content: `PLACEHOLDER — FCA Price Transparency Statement

In accordance with FCA Consumer Duty (PS22/9, effective 31 July 2023):

1. PRICE AND VALUE OUTCOME
All pricing information must enable customers to make informed decisions.
No hidden fees or charges are permitted.

2. CONSUMER UNDERSTANDING OUTCOME
Information must be communicated in plain language.
All costs must be presented clearly before purchase commitment.

3. CONSUMER SUPPORT OUTCOME
[PLACEHOLDER] Support contact details to be inserted.

4. ZERO-MARKUP THIRD-PARTY DISBURSEMENTS
Third-party costs (crematorium fees, cemetery fees, doctor's fees) are passed at exact cost.
Any change in third-party fees will be communicated immediately.

⚠️ THIS IS A PLACEHOLDER DOCUMENT. REQUIRES FCA COMPLIANCE REVIEW.`,
  },
  {
    id: "fca-003",
    title: "FCA Consumer Duty Statement",
    version: "v1.0",
    status: "PLACEHOLDER",
    effectiveDate: "2023-07-31",
    content: `PLACEHOLDER — FCA Consumer Duty Statement (PS22/9)

Effective 31 July 2023, this firm operates under FCA Consumer Duty requirements:

1. ACTING IN GOOD FAITH
This firm commits to acting honestly and transparently in all customer dealings.

2. AVOIDING FORESEEABLE HARM
All services are designed to avoid causing foreseeable harm to customers.
Vulnerable customer protections are in place: [PLACEHOLDER — details required].

3. ENABLING CUSTOMERS TO PURSUE FINANCIAL OBJECTIVES
Services are matched to customer needs through structured Demands and Needs assessment.

4. MONITORING AND REPORTING
[PLACEHOLDER] Annual Consumer Duty board report required.
Customer outcome monitoring metrics to be defined.

⚠️ THIS IS A PLACEHOLDER DOCUMENT. REQUIRES LEGAL AND FCA COMPLIANCE REVIEW.`,
  },
];

export function FCAComplianceView() {
  return (
    <div>
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="text-yellow-300 font-bold mb-1">Compliance Placeholder Notice</h3>
            <p className="text-yellow-400 text-sm">
              All statements below are placeholders and MUST be reviewed and approved by a qualified FCA compliance officer before going live. References: FCA PS21/20, FCA CP21/20, FCA FG21/6, FCA PS22/9.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {FCA_STATEMENTS.map((stmt) => (
          <div key={stmt.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div>
                <h3 className="text-white font-semibold">{stmt.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-gray-500 text-xs">{stmt.id}</span>
                  <span className="text-gray-500 text-xs">Version {stmt.version}</span>
                  <span className="text-gray-500 text-xs">Effective: {stmt.effectiveDate}</span>
                </div>
              </div>
              <span className="bg-yellow-900/50 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-700">
                {stmt.status}
              </span>
            </div>
            <div className="p-6">
              <pre className="text-gray-400 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                {stmt.content}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4">FCA Registration Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">FCA Authorization</div>
            <div className="text-yellow-400 font-semibold text-sm">PENDING</div>
            <div className="text-gray-600 text-xs mt-1">Placeholder</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">FRN Number</div>
            <div className="text-yellow-400 font-semibold text-sm">TBC</div>
            <div className="text-gray-600 text-xs mt-1">To be assigned</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">Consumer Duty</div>
            <div className="text-yellow-400 font-semibold text-sm">PLACEHOLDER</div>
            <div className="text-gray-600 text-xs mt-1">Review required</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">Last Compliance Review</div>
            <div className="text-yellow-400 font-semibold text-sm">NOT YET</div>
            <div className="text-gray-600 text-xs mt-1">Requires officer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
