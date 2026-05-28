'use client'

import { useState } from 'react'
import { User, Mail, Building, Briefcase, Heart, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

export function MemberRegistrationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [role, setRole] = useState('')
  const [motivation, setMotivation] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg('Full Name is required.')
      return
    }
    if (!email.trim()) {
      setErrorMsg('Email Address is required.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/members/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, organization, role, motivation })
      })

      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
      } else {
        setErrorMsg(data.error || 'Failed to submit registration.')
      }
    } catch (err) {
      setErrorMsg('Network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full text-center p-8 bg-slate-900/10 dark:bg-slate-950/20 border border-emerald-500/25 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#44AA44]/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/10 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 font-['Open_Sans'] tracking-tight">Anjay, Welcome!</h3>
        <p className="text-slate-300 text-sm max-w-sm leading-relaxed mb-6">
          Your application was securely saved into our PostgreSQL database. Welcome to the **OpenJKN Working Group**!
        </p>

        <div className="w-full text-left bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2 text-xs font-mono text-slate-400 max-w-sm">
          <div><span className="text-emerald-500">Applicant:</span> {name}</div>
          <div><span className="text-emerald-500">Contact:</span> {email}</div>
          <div><span className="text-emerald-500">Affiliation:</span> {organization || 'Individual'}</div>
          <div><span className="text-emerald-500">Position:</span> {role || 'Researcher/Developer'}</div>
        </div>

        <button
          onClick={() => {
            setSuccess(false)
            setName('')
            setEmail('')
            setOrganization('')
            setRole('')
            setMotivation('')
          }}
          className="mt-6 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-all"
        >
          Submit another registration
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">Full Name *</label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            required
            placeholder="Ariefan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#72A0C1] transition-colors"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-1">
        <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">Email Address *</label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            required
            placeholder="ariefan@openjkn.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#72A0C1] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Organization */}
        <div className="space-y-1">
          <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">Organization</label>
          <div className="relative">
            <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="BPJS / UGM / GIZ"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#72A0C1] transition-colors"
            />
          </div>
        </div>

        {/* Role */}
        <div className="space-y-1">
          <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">Your Role</label>
          <div className="relative">
            <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Developer / Student"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#72A0C1] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Motivation Statement */}
      <div className="space-y-1">
        <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">Why do you want to join? (Motivation)</label>
        <div className="relative">
          <Heart className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <textarea
            rows={3}
            placeholder="I want to learn about tiered referral simulation and SATUSEHAT integration..."
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#72A0C1] transition-colors resize-none"
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#72A0C1] hover:bg-[#5a8bb0] disabled:opacity-50 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-lg shadow-[#72A0C1]/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Connecting to PostgreSQL database...
          </>
        ) : (
          <span>Submit Co-Creation Request</span>
        )}
      </button>
    </form>
  )
}
