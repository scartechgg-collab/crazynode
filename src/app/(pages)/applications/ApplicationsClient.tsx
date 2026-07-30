"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight, ChevronLeft, Check, User, FileText, ShieldCheck,
  Send, Loader2, CheckCircle2, AlertCircle, Lock,
} from "lucide-react";

type FieldType = "text" | "textarea" | "select" | "number" | "email" | "url" | "tel" | "date" | "range" | "checkbox" | "radio";

interface AppField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
  description?: string;
}

interface AppTemplate {
  id: number;
  title: string;
  fields: AppField[];
  isOpen: boolean;
  closedMessage: string;
}

const skillsList = [
  "Node.js", "React/Next.js", "Linux Administration", "Database Management",
  "Customer Support", "Community Management", "Networking", "Discord Bot Dev",
  "Content Creation", "Sales & Marketing", "Python", "Java", "Cybersecurity",
];

const inputCls = "w-full bg-black/30 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:border-brand/50 outline-none transition-colors text-white placeholder:text-gray-600";

export default function ApplicationsClient() {
  const [template, setTemplate] = useState<AppTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Step 1 State
  const [userInfo, setUserInfo] = useState({
    fullName: "", age: "", city: "", country: "", discord: "", email: "",
    skills: [] as string[], hoursPerDay: "", about: "", contact: "",
  });

  // Step 2 State (Dynamic)
  const [roleData, setRoleData] = useState<Record<string, any>>({});

  // Step 3 State
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    fetch("/api/applications/template")
      .then((r) => r.json())
      .then((d) => setTemplate(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleSkill = (skill: string) => {
    setUserInfo((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const validateStep1 = () => {
    if (!userInfo.fullName || !userInfo.age || !userInfo.city || !userInfo.country || !userInfo.discord || !userInfo.email || !userInfo.hoursPerDay || !userInfo.about) {
      setError("Please fill all required fields.");
      return false;
    }
    if (parseInt(userInfo.age) < 16) {
      setError("You must be 16 or older to apply.");
      return false;
    }
    if (userInfo.skills.length === 0) {
      setError("Please select at least one skill.");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep2 = () => {
    if (!template) return true;
    for (const field of template.fields) {
      if (field.required && !roleData[field.id] && roleData[field.id] !== 0) {
        setError("Please fill all required fields.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!agreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    if (!template) return;
    
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/applications/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...userInfo, 
          roleData,
          templateId: template.id 
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
    } catch (e: any) {
      setError(e.message || "Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  if (template && !template.isOpen) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[100px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 max-w-md w-full text-center"
        >
          <div className="premium-card p-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <Lock className="w-10 h-10 text-red-400" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-3">Applications Closed</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {template.closedMessage || "There are no applications open at CrazyNode right now. Check back later!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="px-6 py-2.5 bg-brand hover:bg-brand-dark rounded-xl text-sm font-semibold transition-colors">
                Back to Home
              </Link>
              <a href="https://discord.gg/crazynode" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 border border-white/10 hover:bg-white/[0.04] rounded-xl text-sm font-medium text-gray-400 transition-colors">
                Join Discord
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
          className="max-w-md w-full premium-card p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Thank you for applying to CrazyNode! Our team will review your application and reach out via Discord if you are shortlisted.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const totalSteps = 3;
  const steps = [
    { id: 1, label: "Personal Info", icon: User },
    { id: 2, label: "Role Specifics", icon: FileText },
    { id: 3, label: "Terms & Submit", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand/4 blur-[120px]" />
      </div>

      <div className="flex-1 flex items-center justify-center py-16 px-4 relative z-10">
        <div className="w-full max-w-5xl">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-1">{template?.title || "Staff Application"}</h1>
            <p className="text-sm text-gray-500">Join the CrazyNode team — complete all steps below</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="flex items-center justify-center gap-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
                    step > s.id ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : step === s.id ? "bg-brand/10 border-brand/30 text-brand"
                      : "bg-white/[0.02] border-white/[0.06] text-gray-600"
                  }`}>
                    {step > s.id ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                    {s.label}
                  </div>
                  {i < steps.length - 1 && <div className={`w-8 h-px ${step > s.id ? "bg-green-500/30" : "bg-white/[0.06]"}`} />}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="premium-card p-6 md:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  <h3 className="text-lg font-bold mb-5">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {[
                      { label: "Full Name *", field: "fullName", type: "text", placeholder: "Your full name" },
                      { label: "Age (16+ only) *", field: "age", type: "number", placeholder: "e.g. 20" },
                      { label: "City *", field: "city", type: "text", placeholder: "Your city" },
                      { label: "Country *", field: "country", type: "text", placeholder: "Your country" },
                      { label: "Discord Username *", field: "discord", type: "text", placeholder: "username" },
                      { label: "Email Address *", field: "email", type: "email", placeholder: "you@example.com" },
                    ].map(({ label, field, type, placeholder }) => (
                      <div key={field}>
                        <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                        <input type={type} value={(userInfo as any)[field]} onChange={(e) => setUserInfo({ ...userInfo, [field]: e.target.value })} className={inputCls} placeholder={placeholder} />
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-gray-400 mb-2 block">Technical Skills <span className="text-gray-600">(Select all that apply) *</span></label>
                    <div className="flex flex-wrap gap-2">
                      {skillsList.map((skill) => (
                        <button key={skill} type="button" onClick={() => toggleSkill(skill)} className={`px-3 py-1.5 rounded-full text-xs border transition-all ${userInfo.skills.includes(skill) ? "bg-brand/10 border-brand/40 text-white" : "bg-white/[0.02] border-white/[0.06] text-gray-400 hover:border-white/20"}`}>
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Hours you can give per day *</label>
                      <input value={userInfo.hoursPerDay} onChange={(e) => setUserInfo({ ...userInfo, hoursPerDay: e.target.value })} className={inputCls} placeholder="e.g. 4-5 hours" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Other Contact <span className="text-gray-600">(Optional)</span></label>
                      <input value={userInfo.contact} onChange={(e) => setUserInfo({ ...userInfo, contact: e.target.value })} className={inputCls} placeholder="Telegram / Twitter / GitHub" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Tell Us About Yourself *</label>
                    <textarea rows={4} value={userInfo.about} onChange={(e) => setUserInfo({ ...userInfo, about: e.target.value })} className={inputCls + " resize-none"} placeholder="Brief introduction — your background, experience, and why you want to join..." />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  <h3 className="text-lg font-bold mb-5">Role Specifics</h3>
                  {(!template?.fields || template.fields.length === 0) ? (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                      <p>No additional questions configured for this application.</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {template.fields.map((field) => (
                        <DynamicField key={field.id} field={field} value={roleData[field.id]} onChange={(v) => setRoleData({ ...roleData, [field.id]: v })} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  <h3 className="text-lg font-bold mb-5">Terms & Conditions</h3>
                  <div className="bg-black/20 border border-white/[0.06] rounded-xl p-5 max-h-64 overflow-y-auto text-sm text-gray-400 space-y-3 mb-5">
                    {[
                      "By submitting this application, you confirm that all provided information is true and accurate.",
                      "Providing false information may result in immediate disqualification or termination from the team.",
                      "You agree to maintain confidentiality regarding any proprietary information accessed during your role.",
                      "CrazyNode reserves the right to accept or reject any application without providing a reason.",
                      "If selected, you will be required to follow company guidelines and maintain professional conduct.",
                      "This role may be unpaid/volunteer unless otherwise stated and agreed upon in a separate agreement.",
                      "You grant CrazyNode the right to contact you via your provided Discord/email regarding your application.",
                    ].map((t, i) => (
                      <p key={i} className="flex gap-2"><span className="text-brand shrink-0">{i + 1}.</span>{t}</p>
                    ))}
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${agreed ? "bg-brand border-brand" : "border-white/20 group-hover:border-white/40"}`}>
                      {agreed && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <input type="checkbox" className="sr-only" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                    <span className="text-sm text-gray-300">I have read and agree to the Terms and Conditions. I confirm all information provided is truthful.</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.06]">
              {step > 1 ? (
                <button onClick={handleBack} className="px-5 py-2.5 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl flex items-center gap-2 hover:bg-white/[0.04] transition-all">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Step {step} of {totalSteps}</span>
                {step < totalSteps ? (
                  <button onClick={handleNext} className="px-6 py-2.5 bg-brand hover:bg-brand-dark rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2.5 bg-green-500 hover:bg-green-600 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50">
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Application</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DynamicField({ field, value, onChange }: { field: AppField; value: any; onChange: (v: any) => void }) {
  const cls = "w-full bg-black/30 border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm focus:border-brand/50 outline-none transition-colors text-white placeholder:text-gray-600";

  return (
    <div>
      <label className="text-sm text-gray-300 mb-1 block font-medium">
        {field.label} {field.required && <span className="text-red-400">*</span>}
      </label>
      {field.description && <p className="text-xs text-gray-500 mb-2">{field.description}</p>}

      {field.type === "textarea" && (
        <textarea rows={4} placeholder={field.placeholder} value={value || ""} onChange={(e) => onChange(e.target.value)} className={cls + " resize-none"} />
      )}

      {["text", "email", "url", "tel", "date"].includes(field.type) && (
        <input type={field.type} placeholder={field.placeholder} value={value || ""} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}

      {field.type === "number" && (
        <input type="number" min={field.min} max={field.max} placeholder={field.placeholder} value={value || ""} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}

      {field.type === "select" && (
        <select value={value || ""} onChange={(e) => onChange(e.target.value)} className={cls}>
          <option value="">Select an option...</option>
          {(field.options || []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}

      {field.type === "radio" && (
        <div className="flex flex-wrap gap-3 mt-1">
          {(field.options || []).map((opt) => (
            <label key={opt} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm cursor-pointer transition-all ${value === opt ? "bg-brand/10 border-brand/40 text-white" : "bg-white/[0.02] border-white/[0.06] text-gray-400 hover:border-white/20"}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${value === opt ? "border-brand" : "border-gray-600"}`}>
                {value === opt && <div className="w-2 h-2 rounded-full bg-brand" />}
              </div>
              <input type="radio" className="sr-only" checked={value === opt} onChange={() => onChange(opt)} />
              {opt}
            </label>
          ))}
        </div>
      )}

      {field.type === "checkbox" && (
        <label className="flex items-center gap-3 cursor-pointer group mt-1">
          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${value ? "bg-brand border-brand" : "border-white/20 group-hover:border-white/40"}`}>
            {value && <Check className="w-3 h-3 text-white" />}
          </div>
          <input type="checkbox" className="sr-only" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="text-sm text-gray-300">Yes</span>
        </label>
      )}

      {field.type === "range" && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{field.min ?? 0}</span>
            <span className="text-white font-semibold">{value ?? Math.round(((field.min ?? 0) + (field.max ?? 100)) / 2)}</span>
            <span>{field.max ?? 100}</span>
          </div>
          <input type="range" min={field.min ?? 0} max={field.max ?? 100} value={value ?? Math.round(((field.min ?? 0) + (field.max ?? 100)) / 2)} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-brand" />
        </div>
      )}
    </div>
  );
}
