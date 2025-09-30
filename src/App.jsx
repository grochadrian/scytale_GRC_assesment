import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Globe,
  Brain,
  Calendar,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  TrendingUp,
} from 'lucide-react';

const phases = [
  {
    phase: "Phase 1: Legal Foundation & Risk Mitigation",
    priority: "CRITICAL - BLOCKING REVENUE",
    frameworks: [
      {
        name: "GDPR Compliance",
        priority: "CRITICAL",
        icon: Globe,
        color: "bg-red-600",
        reasoning: [
          "GDPR isn't optional if we want to work in the EU. No compliance, no business.",
          "We handle a ton of personal/financial data for banks and fintechs. That puts us in the high-risk category.",
          "Fines are massive (millions or % of revenue). Not worth the risk.",
          "GDPR is the baseline. If we don't get this right, nothing else matters.",
          "EU data can't leave the EU. We need a real plan in place to comply with data sovereignty laws.",
          "Auditors and clients will ask for proof. We need to show our due diligence before we even think about certifications."
        ],
        keyActions: [
          "Map out every single place personal data flows in our system.",
          "Set up EU-only servers for EU data.",
          "Run a Data Protection Impact Assessment for our systems. Document everything.",
          "Make sure users know what we're doing with their data and can say no.",
          "Build easy ways for people to get, delete, or move their data if they ask."
        ],
        dataTypes: "Regulated Data, Financial Data, Human-Readable & Non-Human-Readable Data"
      },
      {
        name: "EU AI Act Readiness Assessment",
        priority: "CRITICAL",
        icon: Brain,
        color: "bg-red-500",
        reasoning: [
          "Our AI is high-risk under the new EU rules.",
          "Enforcement is coming fast (2025+). Need to comply ASAP.",
          "This law hits our core product. If we ignore it, we won't be able to do business.",
          "A lot of overlap with GDPR, so we should target both at the same time.",
          "Banks will want proof we're taking action in complying."
        ],
        keyActions: [
          "Figure out exactly how our AI is classified under the Act.",
          "Set up a real process for managing AI risk, not just a policy document.",
          "Show how we pick, clean, and test our training data for bias.",
          "Make it clear how our models make decisions.",
          "Humans need to be able to step in if the AI gets it wrong.",
          "Start keeping records of how accurate and robust our models are."
        ],
        dataTypes: "All data types processed by AI models"
      }
    ]
  },
  {
    phase: "Phase 2: US Market Enablement",
    frameworks: [
      {
        name: "SOC 2 Type I",
        priority: "CRITICAL",
        icon: Shield,
        color: "bg-orange-600",
        reasoning: [
          "Most if not all US banks and fintechs won't even talk to us without SOC 2.",
          "Covers third-party risk, which is what every big client cares about.",
          "Type I just proves we have controls in place. It's the first step.",
          "Focus on integrity, availability, and confidentiality. Don't overcomplicate the CIA triad."
        ],
        keyActions: [
          "Decide exactly what parts of our platform are in scope.",
          "Pick an auditor who actually knows SaaS.",
          "Put in any controls we're missing (access, monitoring, etc).",
          "Collect evidence. Save everything.",
          "Get the Type I audit done and get the report."
        ],
        dataTypes: "All data types - comprehensive security controls"
      },
      {
        name: "CCPA Compliance (Parallel)",
        priority: "MEDIUM",
        icon: FileText,
        color: "bg-orange-400",
        reasoning: [
          "If we want California clients, we need CCPA. Not as tough as GDPR, but still required.",
          "Covers privacy basics for the US. Can't ignore it if we want to grow.",
          "A lot of the work overlaps with GDPR, so we can reuse what we've done.",
          "Can do this in parallel with SOC 2."
        ],
        keyActions: [
          "Check if we even hit the CCPA thresholds. No point if we don't qualify.",
          "Add a 'Do Not Sell My Info' button/process. Make it obvious.",
          "Update privacy notices for California users.",
          "Set up a way for people to make privacy requests."
        ],
        dataTypes: "Regulated Data, Financial Data (California residents)"
      }
    ]
  },
  {
    phase: "Phase 3: Global Enterprise Credibility",
    frameworks: [
      {
        name: "ISO/IEC 27001 (ISMS)",
        priority: "HIGH",
        icon: Lock,
        color: "bg-blue-600",
        reasoning: [
          "ISO 27001 is the gold standard for security. EU banks expect it.",
          "A lot of big clients won't even consider us without it.",
          "Most controls overlap with SOC 2, so we can do both at once.",
          "It's the base for other ISO certs (27701, 27017, etc).",
          "Shows we're serious about security.",
        ],
        keyActions: [
          "Build an ISMS that actually works for us, not just for the audit.",
          "Do a real risk assessment using ISO 27001 controls.",
          "Write policies and a Statement of Applicability.",
          "Put in the controls that matter for SaaS and financial data.",
          "Run internal audits and management reviews.",
        ],
        dataTypes: "All data types - comprehensive ISMS scope"
      },
      {
        name: "SOC 2 Type II",
        priority: "HIGH",
        icon: Shield,
        color: "bg-orange-500",
        reasoning: [
          "SOC 2 Type II is the next step after Type I.",
          "Need 6-12 months of proof. Can do this while working on ISO 27001.",
          "Big clients want ongoing assurance, not just a once off report.",
        ],
        keyActions: [
          "Keep all SOC 2 Type I controls running, all the time.",
          "Automate evidence collection where possible.",
          "Fix any gaps from the Type I audit.",
          "Track everything for 6-12 months.",
          "Get the Type II audit and report done.",
          "Set up a yearly audit cycle so we don't fall behind."
        ],
        dataTypes: "All data types - ongoing operational security"
      }
    ]
  },
  {
    phase: "Phase 4: AI Governance & Privacy Excellence",
    frameworks: [
      {
        name: "ISO/IEC 42001 (AI Management System)",
        priority: "STRATEGIC - COMPETITIVE ADVANTAGE",
        icon: Brain,
        color: "bg-purple-600",
        reasoning: [
          "AI rules are changing fast. If we move first, we stand out against any competition.",
          "Clients want to know our AI is transparent and governed well.",
          "Being ahead on this helps us win deals against competition.",
        ],
        keyActions: [
          "Build an AI management system based on what we've already done for the EU AI Act.",
          "Set up a real framework for AI risk, not just have a checklist.",
          "Track the whole model lifecycle: build, train, deploy, monitor.",
          "Test for bias and fairness, and keep the results for later.",
          "Write up how our models work and why.",
          "Make sure humans can step in if needed.",
        ],
        dataTypes: "All data used in AI model training and inference"
      },
      {
        name: "ISO/IEC 27701 (Privacy Information Management)",
        priority: "MEDIUM-HIGH",
        icon: Lock,
        color: "bg-indigo-600",
        reasoning: [
          "ISO 27701 builds on 27001 and covers privacy. Good for privacy focused clients which ours will be.",
          "Certifies our GDPR work, so we can prove it to anyone.",
          "Goes beyond basic GDPR, shows we're serious about privacy."
        ],
        keyActions: [
          "Expand our ISMS to cover privacy, not just security.",
          "Map 27701 controls to what we've already done for GDPR.",
          "Do a privacy risk assessment and fix any gaps.",
          "Make it easy for people to exercise their privacy rights.",
        ],
        dataTypes: "All personal data - enhanced privacy controls"
      }
    ]
  },
  {
    phase: "Phase 5: Sector-Specific & Optional Frameworks",
    frameworks: [
      {
        name: "DORA (Digital Operational Resilience Act)",
        priority: "CONDITIONAL - MONITOR",
        icon: AlertCircle,
        color: "bg-yellow-600",
        reasoning: [
          "DORA is new for EU finance. We might have to comply if we get big in that space.",
          "Depends on how many EU bank clients we have and how critical we are to them.",
          "Focuses on resilience, incident reporting, and testing.",
          "We can reuse a lot from ISO 27001, SOC 2, and AI work."
        ],
        keyActions: [
          "Track how many EU financial clients we have.",
          "Check with legal if/when DORA applies to us.",
          "If it does, increase our risk management for finance clients.",
          "Set up incident reporting for the sector.",
          "Do advanced resilience testing (scenarios, threat-led, etc)."
        ],
        dataTypes: "All data types - operational resilience focus"
      },
      {
        name: "ISO/IEC 27017 & 27018 (Cloud Extensions)",
        priority: "LOW - NICE TO HAVE",
        icon: Lock,
        color: "bg-blue-400",
        reasoning: [
          "ISO 27017/18 are supplements to ISO 27001. Only do them if clients ask or we need an edge over competition.",
          "27017 is for cloud security, 27018 is for PII in the cloud.",
          "Do it if it helps us win deals."
        ],
        keyActions: [
          "Watch for RFPs (Request for Proposal) that require these certs.",
          "Update our cloud security docs as needed.",
          "Get certified (can combine with ISO 27001 checks)."
        ],
        dataTypes: "All data processed in cloud infrastructure"
      },
      {
        name: "PCI DSS",
        priority: "NOT RECOMMENDED",
        icon: AlertCircle,
        color: "bg-gray-400",
        reasoning: [
          "PCI DSS is only for actual card data. We don't process that, so skip unless forced.",
          "Most client data is tokenized or anonymized. PCI shouldn't apply.",
        ],
        keyActions: [
          "Make sure we never touch raw cardholder data.",
          "If a client pushes, get a QSA (Qualified Security Assessor) to check it first.",
          "Only go down this road if the money is worth it."
        ],
        dataTypes: "Payment card data (only if in scope - unlikely)"
      }
    ]
  }
];

  const roadmapSummary = {
    1: ['GDPR', 'EU AI Act Readiness'],
    2: ['SOC 2 Type I', 'CCPA'],
    3: ['ISO 27001', 'SOC 2 Type II'],
    4: ['ISO 42001', 'ISO 27701'],
    5: ['DORA (conditional)', 'ISO 27017/27018 (optional)'],
  };

  export default function ComplianceRoadmap() {
    const [expandedPhase, setExpandedPhase] = useState(null);

    return (
      <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-black transition-colors duration-200">
        {/* Header */}
        <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-black shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">SecureAI Solutions</h1>
              <p className="text-gray-600 dark:text-gray-400">Strategic Compliance Roadmap</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Business Model</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">SaaS - AI Fraud Detection</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Markets</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">US & EU</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Customers</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Banks & Fintechs</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Data Sovereignty</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">EU & US Hosting</p>
            </div>
          </div>

          <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
            <p className="text-xs font-semibold text-red-900 dark:text-red-400 flex items-center gap-1">⚠️ CRITICAL BUSINESS IMPACT</p>
            <p className="text-xs text-red-800 dark:text-red-300 mt-1">SOC 2 and ISO 27001 are often hard procurement requirements for banks and regulated fintechs.
              Foundational trust signals required to even get to the negotiating table.
            </p>
          </div>
        </div>

        {/* Timeline Roadmap */}
        <div className="space-y-6">
          {phases.map((phaseData, idx) => (
            <div key={idx} className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-800 dark:bg-gray-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  <div>
                    <h2 className="text-xl font-bold">{phaseData.phase}</h2>
                    <p className="text-gray-300 text-sm">{phaseData.timeline}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {phaseData.frameworks.map((framework, fIdx) => {
                  const Icon = framework.icon;
                  const isExpanded = expandedPhase === `${idx}-${fIdx}`;

                  return (
                    <div key={fIdx} className="mb-6 last:mb-0">
                      <div
                        className="flex items-start gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 p-4 rounded transition-colors"
                        onClick={() => setExpandedPhase(isExpanded ? null : `${idx}-${fIdx}`)}
                      >
                        <div className={`${framework.color} p-3 rounded shadow-sm`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{framework.name}</h3>
                              <p className="text-xs text-gray-600 mt-2"><span className="font-semibold">Data Scope:</span> {framework.dataTypes}</p>
                            </div>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                          </div>

                          {isExpanded && (
                            <div className="mt-3 space-y-3">
                              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600" /> Why This Framework?
                                </h4>
                                <ul className="space-y-1">
                                  {framework.reasoning.map((reason, rIdx) => (
                                    <li key={rIdx} className="flex items-start gap-2">
                                      <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-gray-700 dark:text-gray-300 text-sm">{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-700">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                                  <FileText className="w-4 h-4 text-blue-600" /> Key Implementation Actions
                                </h4>
                                <ul className="space-y-1">
                                  {framework.keyActions.map((action, aIdx) => (
                                    <li key={aIdx} className="flex items-start gap-2">
                                      <div className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{aIdx + 1}</div>
                                      <span className="text-gray-700 dark:text-gray-300 text-sm">{action}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Timeline</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-blue-600 to-purple-600" />
            <div className="space-y-6 relative">
              {Object.entries(roadmapSummary).map(([period, frameworks], idx) => {
                const colors = ['bg-red-500', 'bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-yellow-500'];
                const periodLabels = {
                  1: '1',
                  2: '2',
                  3: '3',
                  4: '4',
                  5: '5',
                };

                return (
                  <div key={period} className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${colors[idx]} rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg text-sm`}>
                      {periodLabels[period]}
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-slate-50 to-white p-4 rounded-lg border-l-4 border-slate-700 shadow">
                      <p className="font-bold text-slate-900">{frameworks.join(' + ')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 dark:text-gray-400">
          <p className="text-sm">Prepared for Scytale GRC Recruitment Process</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Based on CompTIA Security+ SY0-701 framework knowledge and industry best practices</p>
        </div>
      </div>
    );
  }