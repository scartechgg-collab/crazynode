"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronRight, ChevronLeft, Check, User, FileText, ShieldCheck, 
  Send, Loader2, CheckCircle2, AlertCircle
} from "lucide-react";

// Mock template - In a real app, this would be fetched from /api/applications/template
const applicationTemplate = {
  title: "Staff Application",
  step2Fields: [
    { id: "experience", label: "Previous Experience", type: "textarea", required: true, placeholder: "Describe your past roles..." },
    { id: "role", label: "Which role are you applying for?", type: "select", required: true, options: ["Support Agent", "Moderator", "Developer", "Community Manager"] },
    { id: "availability", label: "Weekly Availability (Hours)", type: "text", required: true, placeholder: "e.g. 20 hours" }
  ]
};

const skillsList = [
  "Node.js", "React/Next.js", "Linux Administration", "Database Management", 
  "Customer Support", "Community Management", "Networking", "Discord Bot Dev", 
  "Content Creation", "Sales & Marketing"
];

export default function ApplicationsClient() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Step 1 State
  const [userInfo, setUserInfo] = useState({
    fullName: "", age: "", city: "", country: "", discord: "", email: "", 
    skills: [] as string[], hoursPerDay: "", about: "", contact: ""
  });

  // Step 2 State (Dynamic)
  const [roleData, setRoleData] = useState<Record<string, any>>({});

  // Step 3 State
  const [agreed, setAgreed] = useState(false);

  const toggleSkill = (skill: string) => {
    setUserInfo(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill) 
        : [...prev.skills, skill]
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
      setError("Please select at least one technical skill.");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep2 = () => {
    for (const field of applicationTemplate.step2Fields) {
      if (field.required && !roleData[field.id]) {
        setError("Please fill all required role-specific fields.");
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
    setSubmitting(true);
    setError("");

    // Simulate API Call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full premium-card p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
          <p className="text-gray-400 text-sm mb-6">Thank you for applying. Our team will review your application and contact you via Discord if you are shortlisted.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white py-12 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        
        {/* Sidebar / Progress */}
        <div className="lg:col-span-1">
          <div className="premium-card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-1">Application Form</h2>
            <p className="text-xs text-gray-500 mb-6">{applicationTemplate.title}</p>
            
            <div className="space-y-4">
              {[
                { id: 1, label: "User Information", icon: User },
                { id: 2, label: "Role Specifics", icon: FileText },
                { id: 3, label: "Terms & Conditions", icon: ShieldCheck }
              ].map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    step > s.id ? "bg-green-500/10 border-green-500/30 text-green-400" :
                    step === s.id ? "bg-brand/10 border-brand/30 text-brand" : 
                    "bg-white/[0.02] border-white/[0.06] text-gray-600"
                  }`}>
                    {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-sm ${step >= s.id ? "text-white" : "text-gray-600"}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="lg:col-span-2">
          <div className="premium-card p-6 md:p-8 min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: USER INFO */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                  <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-gray-400">Full Name *</label>
                      <input value={userInfo.fullName} onChange={e => setUserInfo({...userInfo, fullName: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Age (16+ only) *</label>
                      <input type="number" value={userInfo.age} onChange={e => setUserInfo({...userInfo, age: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">City *</label>
                      <input value={userInfo.city} onChange={e => setUserInfo({...userInfo, city: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Country *</label>
                      <input value={userInfo.country} onChange={e => setUserInfo({...userInfo, country: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Discord ID *</label>
                      <input value={userInfo.discord} onChange={e => setUserInfo({...userInfo, discord: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" placeholder="username" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Email Address *</label>
                      <input type="email" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-gray-400">Technical Skills (Select all that apply) *</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skillsList.map(skill => (
                        <button 
                          key={skill} 
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            userInfo.skills.includes(skill) 
                              ? "bg-brand/10 border-brand/30 text-white" 
                              : "bg-white/[0.02] border-white/[0.06] text-gray-400 hover:border-white/20"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-gray-400">Hours you can give per day *</label>
                      <input value={userInfo.hoursPerDay} onChange={e => setUserInfo({...userInfo, hoursPerDay: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" placeholder="e.g. 4-5 hours" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Any Contact (Optional)</label>
                      <input value={userInfo.contact} onChange={e => setUserInfo({...userInfo, contact: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" placeholder="Telegram/Twitter" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-gray-400">Tell About Yourself *</label>
                    <textarea rows={4} value={userInfo.about} onChange={e => setUserInfo({...userInfo, about: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none resize-none" placeholder="Brief introduction about yourself..."></textarea>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: ROLE SPECIFICS */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                  <h3 className="text-lg font-bold mb-4">Role Specifics</h3>
                  
                  <div className="space-y-4">
                    {applicationTemplate.step2Fields.map(field => (
                      <div key={field.id}>
                        <label className="text-xs text-gray-400">{field.label} {field.required && "*"}</label>
                        {field.type === "textarea" && (
                          <textarea rows={4} placeholder={field.placeholder} value={roleData[field.id] || ""} onChange={e => setRoleData({...roleData, [field.id]: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none resize-none" />
                        )}
                        {field.type === "text" && (
                          <input type="text" placeholder={field.placeholder} value={roleData[field.id] || ""} onChange={e => setRoleData({...roleData, [field.id]: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none" />
                        )}
                        {field.type === "select" && (
                          <select value={roleData[field.id] || ""} onChange={e => setRoleData({...roleData, [field.id]: e.target.value})} className="w-full mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand/50 outline-none">
                            <option value="">Select an option...</option>
                            {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: T&C */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                  <h3 className="text-lg font-bold mb-4">Terms & Conditions</h3>
                  
                  <div className="bg-black/20 border border-white/[0.06] rounded-xl p-4 max-h-[300px] overflow-y-auto text-sm text-gray-400 space-y-3 mb-4">
                    <p>1. By submitting this application, you confirm that all provided information is true and accurate to the best of your knowledge.</p>
                    <p>2. You understand that providing false information may result in immediate disqualification or termination from the team.</p>
                    <p>3. You agree to maintain confidentiality regarding any proprietary information accessed during your role.</p>
                    <p>4. CrazyNode reserves the right to accept or reject applications without providing a reason.</p>
                    <p>5. If selected, you will be required to follow the company guidelines and maintain professional conduct.</p>
                    <p>6. This is an unpaid/volunteer position unless otherwise stated and agreed upon in a separate contract.</p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 accent-brand" />
                    <span className="text-sm text-gray-300">I have read and agree to the Terms and Conditions and Privacy Policy.</span>
                  </label>
                </motion.div>
              )}

            </AnimatePresence>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/[0.06]">
              {step > 1 ? (
                <button onClick={handleBack} className="px-5 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl flex items-center gap-2 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <button onClick={handleNext} className="px-6 py-2 bg-brand rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-brand-dark transition-colors">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2 bg-green-500 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-50">
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Application</>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
