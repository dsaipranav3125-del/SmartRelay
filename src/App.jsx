import { createElement, useEffect, useMemo, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  Bell,
  BrainCircuit,
  Cloud,
  Cpu,
  Flame,
  Gauge,
  Headset,
  LifeBuoy,
  Menu,
  MessageSquare,
  Package,
  Send,
  ShieldAlert,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  TriangleAlert,
  X,
  Zap,
  RadioTower,
} from 'lucide-react'

const heroStats = [
  { label: 'Relay health', value: '72%' },
  { label: 'Prediction confidence', value: '91%' },
  { label: 'Connected inverters', value: '18' },
]

const initialTelemetry = [
  { time: '09:00', temperature: 56, current: 12, voltage: 226, load: 44, trend: 81, switchingCycles: 1210 },
  { time: '09:05', temperature: 58, current: 14, voltage: 224, load: 48, trend: 79, switchingCycles: 1226 },
  { time: '09:10', temperature: 61, current: 16, voltage: 223, load: 53, trend: 77, switchingCycles: 1248 },
  { time: '09:15', temperature: 64, current: 19, voltage: 221, load: 57, trend: 74, switchingCycles: 1268 },
  { time: '09:20', temperature: 66, current: 21, voltage: 220, load: 62, trend: 72, switchingCycles: 1287 },
  { time: '09:25', temperature: 69, current: 23, voltage: 218, load: 66, trend: 70, switchingCycles: 1312 },
]

const realModeApiSample = {
  temperature: 68,
  load: 72,
  cycles: 1200,
}

const historicalReplay = [
  { day: 1, status: 'Healthy', temperature: 54, load: 42, switchingCycles: 940, risk: 24 },
  { day: 3, status: 'Healthy', temperature: 58, load: 48, switchingCycles: 1015, risk: 32 },
  { day: 5, status: 'Warning', temperature: 64, load: 61, switchingCycles: 1140, risk: 51 },
  { day: 7, status: 'Warning', temperature: 69, load: 73, switchingCycles: 1265, risk: 67 },
  { day: 8, status: 'High risk', temperature: 76, load: 84, switchingCycles: 1388, risk: 86 },
]

const teamMembers = [
  { name: 'Luminous Power Technologies', role: 'Product Team' },
  { name: 'AI + IoT + Cloud', role: 'Core Platform' },
]

const architectureFlow = [
  { label: 'Inverter', icon: Zap, detail: 'Live relay temperature, current, voltage, and load are sampled at the device.' },
  { label: 'MODBUS', icon: Activity, detail: 'Raw inverter registers are read through MODBUS before leaving the hardware layer.' },
  { label: 'IoT Device', icon: Cpu, detail: 'The edge device packages inverter telemetry and local alarm state.' },
  { label: 'MQTT', icon: RadioTower, detail: 'Packets are streamed through MQTT for cloud-side processing.' },
  { label: 'Cloud', icon: Cloud, detail: 'Telemetry is aggregated for fleet analytics and remote alerting.' },
  { label: 'AI Model', icon: BrainCircuit, detail: 'RUL and anomaly detection are recomputed continuously.' },
  { label: 'Dashboard', icon: Gauge, detail: 'Operators receive live health, warnings, and service actions.' },
]

const notifications = [
  {
    title: 'Relay failure predicted in 3 days',
    subtitle: 'Cloud prediction engine sees accelerated wear and a shrinking remaining-life window.',
    tone: 'warning',
  },
  {
    title: 'High risk',
    subtitle: 'Edge threshold and cloud model both indicate immediate maintenance planning is required.',
    tone: 'critical',
  },
]

const technicalFeatureCards = [
  { label: 'Input 01', value: 'Temperature' },
  { label: 'Input 02', value: 'Load %' },
  { label: 'Input 03', value: 'Switching cycles' },
]

const platformStrengths = [
  {
    id: 'storytelling',
    title: 'Product storytelling',
    summary: 'Startup-level visual polish and a narrative that lands quickly with stakeholders.',
    detail:
      'The platform combines live telemetry, escalation, and product framing so a judge or customer understands the value in seconds instead of decoding a technical dashboard.',
  },
  {
    id: 'telemetry',
    title: 'Live telemetry',
    summary: 'Streaming charts, relay health, and simulation controls working together in one flow.',
    detail:
      'The dashboard keeps signals moving every second while the simulation panel changes the failure horizon, confidence, and relay stress in real time.',
  },
  {
    id: 'architecture',
    title: 'Edge-to-cloud system',
    summary: 'Clear architecture from inverter sensing to MQTT, AI scoring, and action.',
    detail:
      'Each node in the data path exposes what is happening at that stage so the system feels implementable, not just conceptual.',
  },
  {
    id: 'fleet',
    title: 'Fleet operations',
    summary: 'Map, alerts, and support workflows position the idea as a scalable commercial product.',
    detail:
      'Operations teams can move from a single inverter problem to fleet-wide maintenance decisions, service tickets, and technician action without changing context.',
  },
]

const insightModules = [
  {
    id: 'trend',
    title: 'Prediction trend graph',
    icon: BrainCircuit,
    tone: 'border-cyan-400/15 bg-cyan-400/5 text-cyan-300',
    summary: 'Trend shows decreasing relay life under repeated power cut recovery and high-load switching patterns.',
    action: 'Open health trend',
  },
  {
    id: 'rul',
    title: 'Remaining Useful Life output',
    icon: Gauge,
    tone: 'border-emerald-400/15 bg-emerald-400/5 text-emerald-300',
    summary: 'Final output provides actionable RUL, severity classification, and alert timing for maintenance teams.',
    action: 'View RUL factors',
  },
  {
    id: 'deployment',
    title: 'Deployment fit',
    icon: Cpu,
    tone: 'border-fuchsia-400/15 bg-fuchsia-400/5 text-fuchsia-300',
    summary: 'Built for edge-device inference, cloud analytics, and scalable fleet monitoring in future commercial deployments.',
    action: 'Review rollout view',
  },
]

const supportActions = [
  {
    id: 'docs',
    label: 'Open Help Docs',
    title: 'Relay maintenance playbooks',
    description: 'Guided troubleshooting, setup, warranty, and replacement recommendations for field teams.',
  },
  {
    id: 'ticket',
    label: 'Raise Ticket',
    title: 'Maintenance ticket desk',
    description: 'Create a case, attach inverter health context, and route it to the right service queue.',
  },
  {
    id: 'chat',
    label: 'Live chat with support engineer',
    title: 'Live engineer assist',
    description: 'Start a guided troubleshooting session with a support engineer already primed with telemetry.',
  },
  {
    id: 'maintenance',
    label: 'Schedule preventive maintenance visit',
    title: 'Preventive maintenance scheduling',
    description: 'Reserve the next available field window before the relay crosses into critical wear.',
  },
  {
    id: 'guide',
    label: 'Download product setup guide',
    title: 'Setup and commissioning guide',
    description: 'Pull the latest installation, dongle pairing, and MQTT onboarding guide for your product.',
  },
  {
    id: 'kit',
    label: 'Request replacement relay kit',
    title: 'Replacement relay kit request',
    description: 'Generate a spares request with the selected inverter model, variant, and site location prefilled.',
  },
]

const copilotPrompts = [
  'Give me an executive summary',
  'Why is this inverter in warning state?',
  'Summarize relay health for this product',
  'What action should service take next?',
  'How does the failure simulation work?',
  'Explain the architecture flow',
]

const inverterMap = [
  { name: 'INV-101', region: 'Delhi', status: 'Healthy', x: '18%', y: '42%' },
  { name: 'INV-204', region: 'Mumbai', status: 'Critical', x: '32%', y: '68%' },
  { name: 'INV-318', region: 'Bengaluru', status: 'Warning', x: '54%', y: '78%' },
  { name: 'INV-422', region: 'Kolkata', status: 'Healthy', x: '73%', y: '38%' },
  { name: 'INV-509', region: 'Hyderabad', status: 'Warning', x: '58%', y: '60%' },
]

const modelVariants = {
  'EcoVolt X': ['850VA', '1100VA', '1450VA Solar'],
  'Luminous NXG': ['850', '1150', '1450 ECO'],
  'PowerSine Pro': ['1200VA Home', '1500VA Office', '2000VA Max'],
  'SmartUPS Edge': ['1000VA Rack', '1500VA Tower', '2200VA Industrial'],
}

const demoCredentials = {
  email: 'smartrelay@gmail.com',
  password: '123456',
}

const themeOptions = [
  {
    id: 'dark',
    name: 'Dark Theme',
    description: 'Deep navy interface with bold neon accents.',
    preview: 'from-slate-950 via-slate-900 to-cyan-950',
    glow: 'bg-cyan-400/25',
  },
  {
    id: 'glass',
    name: 'Glass Theme',
    description: 'Bright frosted glass panels with soft blue light.',
    preview: 'from-sky-100 via-white to-cyan-100',
    glow: 'bg-sky-300/35',
  },
  {
    id: 'luminous-white',
    name: 'Luminous White',
    description: 'Clean white workspace with luminous green accents and crisp product contrast.',
    preview: 'from-white via-lime-50 to-green-100',
    glow: 'bg-lime-300/35',
    accentPrimary: '#4f9f1f',
    accentSecondary: '#7cc242',
    fontFamily: 'Manrope',
    pattern: 'none',
  },
  {
    id: 'light',
    name: 'Arctic Light',
    description: 'Bright glass panels with cool blue accents.',
    preview: 'from-white via-slate-100 to-sky-100',
    glow: 'bg-cyan-300/30',
  },
  {
    id: 'aurora',
    name: 'Aurora Pulse',
    description: 'Blue-green gradients with luminous overlays.',
    preview: 'from-teal-950 via-cyan-900 to-emerald-950',
    glow: 'bg-emerald-300/30',
  },
  {
    id: 'sunset',
    name: 'Sunset Circuit',
    description: 'Warm orange-magenta gradients for a bold ops view.',
    preview: 'from-orange-950 via-rose-900 to-fuchsia-950',
    glow: 'bg-orange-300/30',
  },
  {
    id: 'graphite',
    name: 'Graphite Core',
    description: 'Industrial charcoal with crisp silver contrast.',
    preview: 'from-zinc-900 via-slate-800 to-neutral-900',
    glow: 'bg-slate-300/20',
  },
]

const fontOptions = [
  { id: 'Inter', label: 'Inter' },
  { id: 'Space Grotesk', label: 'Space Grotesk' },
  { id: 'Poppins', label: 'Poppins' },
  { id: 'Manrope', label: 'Manrope' },
]

const patternOptions = [
  { id: 'grid', label: 'Grid' },
  { id: 'dots', label: 'Dots' },
  { id: 'waves', label: 'Waves' },
  { id: 'none', label: 'None' },
]

const defaultThemeSettings = {
  accentPrimary: '#22d3ee',
  accentSecondary: '#10b981',
  fontFamily: 'Inter',
  pattern: 'grid',
}

const productCatalog = [
  {
    id: 'prod-1',
    name: 'EcoVolt X',
    variant: '1450VA Solar',
    serial: 'SR-AX1450-21',
    location: 'Chennai Cluster',
    status: 'Warning',
    accentA: '#22d3ee',
    accentB: '#10b981',
  },
  {
    id: 'prod-2',
    name: 'Luminous NXG',
    variant: '1150',
    serial: 'SR-NX1150-09',
    location: 'Hyderabad Hub',
    status: 'Healthy',
    accentA: '#38bdf8',
    accentB: '#4ade80',
  },
  {
    id: 'prod-3',
    name: 'SmartUPS Edge',
    variant: '1500VA Tower',
    serial: 'SR-SE1500-44',
    location: 'Bengaluru Edge',
    status: 'Critical',
    accentA: '#60a5fa',
    accentB: '#fb7185',
  },
]

const statusStyles = {
  Healthy: {
    color: 'text-emerald-300',
    border: 'border-emerald-400/40',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.22)]',
    dot: '#22c55e',
  },
  Warning: {
    color: 'text-amber-300',
    border: 'border-amber-400/40',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.22)]',
    dot: '#f59e0b',
  },
  Critical: {
    color: 'text-rose-300',
    border: 'border-rose-400/40',
    glow: 'shadow-[0_0_40px_rgba(244,63,94,0.24)]',
    dot: '#f43f5e',
  },
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function computeStatus(health) {
  if (health >= 75) return 'Healthy'
  if (health >= 45) return 'Warning'
  return 'Critical'
}

function computeSimulation(load, temperature, cuts) {
  const health = clamp(100 - load * 0.38 - (temperature - 35) * 1.25 - cuts * 3.7, 6, 96)
  const remainingLife = clamp(health - 4, 4, 94)
  const failureDays = Math.max(1, Math.round((100 - health) / 5))
  const confidence = clamp(96 - (load * 0.08 + cuts * 0.7 + Math.abs(temperature - 58) * 0.14), 72, 97)
  const status = computeStatus(health)

  return {
    health: Math.round(health),
    remainingLife: Math.round(remainingLife),
    failureDays,
    confidence: Math.round(confidence),
    status,
  }
}

function computePredictionEngine({ temperature, load, switchingCycles }) {
  const regressionScore =
    -65 +
    temperature * 1.08 +
    load * 0.72 +
    (switchingCycles / 100) * 0.86
  const failureRisk = Math.round(clamp(regressionScore, 2, 99))
  const remainingLife = Math.round(clamp(100 - failureRisk, 1, 98))
  const failureDays = Math.max(1, Math.round(remainingLife / 11))
  const riskLabel = failureRisk >= 75 ? 'High risk' : failureRisk >= 45 ? 'Warning' : 'Healthy'
  const edgeAlert =
    temperature >= 72 || load >= 85
      ? 'Edge alert: buzzer or LED threshold triggered'
      : 'Edge alert: monitor locally'
  const cloudAlert =
    failureRisk >= 75
      ? `Cloud alert: relay failure predicted in ${failureDays} days`
      : failureRisk >= 45
        ? 'Cloud alert: relay degradation trend detected'
        : 'Cloud alert: normal operating window'

  return {
    remainingLife,
    failureRisk,
    failureDays,
    riskLabel,
    edgeAlert,
    cloudAlert,
    weightedRisk: Number(regressionScore.toFixed(1)),
  }
}

function getRiskToneClass(riskLabel) {
  if (riskLabel === 'High risk') return 'border-rose-400/20 bg-rose-400/10 text-rose-100'
  if (riskLabel === 'Warning') return 'border-amber-400/20 bg-amber-400/10 text-amber-100'
  return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
}

function randomStep(value, min, max, variance) {
  const next = value + (Math.random() * variance * 2 - variance)
  return Number(clamp(next, min, max).toFixed(1))
}

function estimateNodeRisk(node) {
  const base = node.status === 'Critical' ? 84 : node.status === 'Warning' ? 61 : 34
  const variance = node.name.length % 9
  return clamp(base + variance, 1, 99)
}

function GlassCard({ className = '', children }) {
  return (
    <div
      className={`rounded-[28px] border border-white/10 bg-white/[0.055] backdrop-blur-2xl shadow-[0_24px_100px_rgba(2,8,24,0.42)] ${className}`}
    >
      {children}
    </div>
  )
}

function SectionHeader({ eyebrow, title, body, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-200">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">{body}</p>
    </div>
  )
}

function ProductVisual({ accentA, accentB, label }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 p-4">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at top left, ${accentA}, transparent 32%), radial-gradient(circle at bottom right, ${accentB}, transparent 28%)`,
        }}
      />
      <div className="relative flex h-44 items-center justify-center">
        <div
          className="absolute h-28 w-32 rounded-[28px] border border-white/15 shadow-[0_0_40px_rgba(15,23,42,0.35)]"
          style={{
            background: `linear-gradient(180deg, ${accentA}20, rgba(15,23,42,0.9))`,
          }}
        />
        <div
          className="absolute h-6 w-18 rounded-full blur-xl"
          style={{ background: accentB, bottom: '1.5rem', width: '7rem', opacity: 0.35 }}
        />
        <div className="absolute h-2 w-14 rounded-full bg-white/10" style={{ top: '2.8rem' }} />
        <div className="absolute flex gap-2" style={{ top: '4.6rem' }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accentA }} />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accentB }} />
        </div>
      </div>
      <p className="relative text-center text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
    </div>
  )
}

function MetricChart({ title, color, dataKey, unit, data }) {
  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {data[data.length - 1][dataKey]}
            <span className="ml-1 text-sm text-slate-400">{unit}</span>
          </p>
        </div>
        <div
          className="h-11 w-11 rounded-2xl border border-white/10"
          style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
        />
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                borderRadius: '16px',
                color: '#e2e8f0',
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

function ArchitectureNode({ label, icon: Icon, isLast, active, detail }) {
  return (
    <div className="group relative flex flex-1 items-center justify-center">
      <GlassCard className={`relative z-10 flex min-h-32 w-full flex-col items-center justify-center gap-3 p-5 text-center transition ${active ? 'border-cyan-300/40 shadow-[0_0_35px_rgba(34,211,238,0.24)]' : ''}`}>
        <div className={`rounded-2xl border border-cyan-400/25 bg-cyan-400/10 p-3 text-cyan-200 ${active ? 'animate-pulse' : ''}`}>
          {createElement(Icon, { className: 'h-6 w-6' })}
        </div>
        <p className="text-sm font-medium text-slate-100">{label}</p>
        <p className="text-xs leading-6 text-slate-400 md:hidden">{detail}</p>
        <div className="pointer-events-none absolute inset-x-3 -bottom-16 hidden rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs text-slate-300 opacity-0 transition group-hover:opacity-100 md:block">
          {detail}
        </div>
      </GlassCard>
      {!isLast ? (
        <div className="hidden md:block absolute left-[calc(100%-8px)] top-1/2 h-px w-12 bg-gradient-to-r from-cyan-400/60 to-emerald-400/60">
          {active ? <span className="absolute -top-1 left-0 h-2 w-2 animate-ping rounded-full bg-cyan-300" /> : null}
        </div>
      ) : null}
    </div>
  )
}

function AuthScreen({ authMode, setAuthMode, authForm, setAuthForm, onSubmit, authError, onDemoMode }) {
  const isCreate = authMode === 'create'
  const availableVariants = authForm.model ? modelVariants[authForm.model] ?? [] : []

  function applyDemoCredentials() {
    setAuthForm((current) => ({
      ...current,
      email: demoCredentials.email,
      password: demoCredentials.password,
    }))
  }

  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-cyan-200">
            <Activity className="h-4 w-4" />
            Secure platform access
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
            SmartRelay AI control center for predictive maintenance.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Sign in to access live inverter intelligence, AI-driven relay health monitoring, and fleet-wide maintenance workflows.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {heroStats.map((item) => (
              <GlassCard key={item.label} className="p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <GlassCard className="p-6 md:p-8">
            <div className="mb-6 flex rounded-full border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${!isCreate ? 'bg-cyan-400 text-slate-950' : 'text-slate-300'}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('create')}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${isCreate ? 'bg-cyan-400 text-slate-950' : 'text-slate-300'}`}
              >
                Create Account
              </button>
            </div>

            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {isCreate ? 'Create workspace access' : 'Welcome back'}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                {isCreate ? 'Register your inverter profile' : 'Login to SmartRelay AI'}
              </h2>
            </div>

            {!isCreate ? (
              <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100 md:flex-row md:items-center md:justify-between">
                <div>
                  Demo credentials: <span className="font-semibold">{demoCredentials.email}</span> / <span className="font-semibold">{demoCredentials.password}</span>
                </div>
                <button
                  type="button"
                  onClick={applyDemoCredentials}
                  className="w-full rounded-full border border-cyan-300/30 bg-slate-950/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:border-cyan-300/50 hover:bg-slate-950/60 md:w-auto"
                >
                  Use Demo Login
                </button>
              </div>
            ) : null}

            {authError ? (
              <div className="mb-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
                {authError}
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={onSubmit}>
              {isCreate ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm text-slate-300">Full name</span>
                    <input
                      required
                      value={authForm.name}
                      onChange={(event) => setAuthForm((current) => ({ ...current, name: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                      placeholder="Enter your name"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm text-slate-300">Organization</span>
                    <input
                      value={authForm.organization}
                      onChange={(event) => setAuthForm((current) => ({ ...current, organization: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                      placeholder="Luminous Power Technologies"
                    />
                  </label>
                </div>
              ) : null}

              <label className="space-y-2">
                <span className="text-sm text-slate-300">Email address</span>
                <input
                  type="email"
                  required
                  value={authForm.email}
                  onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                  placeholder="name@company.com"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-slate-300">Password</span>
                <input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                  placeholder="Enter password"
                />
              </label>

              {isCreate ? (
                <>
                  <label className="space-y-2">
                    <span className="text-sm text-slate-300">Inverter model</span>
                    <select
                      required
                      value={authForm.model}
                      onChange={(event) =>
                        setAuthForm((current) => ({
                          ...current,
                          model: event.target.value,
                          variant: '',
                        }))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                    >
                      <option value="">Select model</option>
                      {Object.keys(modelVariants).map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-slate-300">Variant</span>
                    <select
                      required
                      value={authForm.variant}
                      disabled={!authForm.model}
                      onChange={(event) => setAuthForm((current) => ({ ...current, variant: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">{authForm.model ? 'Select variant' : 'Select model first'}</option>
                      {availableVariants.map((variant) => (
                        <option key={variant} value={variant}>
                          {variant}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_36px_rgba(45,212,191,0.28)]"
              >
                {isCreate ? 'Create Account' : 'Login'}
              </button>
              {!isCreate ? (
                <button
                  type="button"
                  onClick={onDemoMode}
                  className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white"
                >
                  Enter Demo Mode
                </button>
              ) : null}
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

function App() {
  const [authMode, setAuthMode] = useState('signin')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [userMenuView, setUserMenuView] = useState('overview')
  const [activePage, setActivePage] = useState('dashboard')
  const [themeByProduct, setThemeByProduct] = useState(() => {
    if (typeof window === 'undefined') return {}
    const stored = window.localStorage.getItem('smartrelay-theme-by-product')
    return stored ? JSON.parse(stored) : {}
  })
  const [themeSettingsByProduct, setThemeSettingsByProduct] = useState(() => {
    if (typeof window === 'undefined') return {}
    const stored = window.localStorage.getItem('smartrelay-theme-settings-by-product')
    return stored ? JSON.parse(stored) : {}
  })
  const [savedPresetsByProduct, setSavedPresetsByProduct] = useState(() => {
    if (typeof window === 'undefined') return {}
    const stored = window.localStorage.getItem('smartrelay-theme-presets-by-product')
    return stored ? JSON.parse(stored) : {}
  })
  const [importPresetJson, setImportPresetJson] = useState('')
  const [preferences, setPreferences] = useState({
    soundAlerts: true,
    emailNotifications: true,
  })
  const [authForm, setAuthForm] = useState({
    name: '',
    organization: '',
    email: '',
    password: '',
    model: '',
    variant: '',
  })
  const [dashboardVisible, setDashboardVisible] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(productCatalog[0].id)
  const [activeArchitectureStep, setActiveArchitectureStep] = useState(0)
  const [failureSimulationRunning, setFailureSimulationRunning] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [isCopilotOpen, setIsCopilotOpen] = useState(false)
  const [copilotMode, setCopilotMode] = useState('high-level')
  const [copilotInput, setCopilotInput] = useState('')
  const [copilotMessages, setCopilotMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'SmartRelay Copilot is online. Ask about relay health, simulation behavior, alerts, or the selected inverter product.',
    },
  ])
  const [selectedNotificationTitle, setSelectedNotificationTitle] = useState(notifications[0].title)
  const [selectedMapNodeName, setSelectedMapNodeName] = useState(inverterMap[1].name)
  const [selectedStrengthId, setSelectedStrengthId] = useState(platformStrengths[0].id)
  const [selectedInsightId, setSelectedInsightId] = useState(insightModules[0].id)
  const [selectedTeamRole, setSelectedTeamRole] = useState(teamMembers[0].role)
  const [supportView, setSupportView] = useState('docs')
  const [ticketCount, setTicketCount] = useState(12)
  const [dataMode, setDataMode] = useState('simulation')
  const [isRealDataLoading, setIsRealDataLoading] = useState(false)
  const [replayIndex, setReplayIndex] = useState(historicalReplay.length - 1)
  const [lastDispatch, setLastDispatch] = useState(null)
  const [profile, setProfile] = useState({
    fullName: 'SmartRelay Admin',
    email: demoCredentials.email,
    role: 'Operations Manager',
    company: 'Luminous Power Technologies',
    phone: '+91 98765 43210',
  })
  const [simulation, setSimulation] = useState({
    load: 63,
    temperature: 61,
    powerCuts: 5,
  })
  const [telemetry, setTelemetry] = useState(initialTelemetry)
  const [liveMetrics, setLiveMetrics] = useState({
    health: 72,
    remainingLife: 68,
    confidence: 91,
    failureDays: 5,
  })

  const lastAlertTone = useRef('')
  const copilotMessageId = useRef(1)

  const simulationState = useMemo(
    () => computeSimulation(simulation.load, simulation.temperature, simulation.powerCuts),
    [simulation],
  )
  const livePrediction = useMemo(
    () =>
      computePredictionEngine({
        temperature: telemetry[telemetry.length - 1].temperature,
        load: telemetry[telemetry.length - 1].load,
        switchingCycles: telemetry[telemetry.length - 1].switchingCycles,
      }),
    [telemetry],
  )
  const replayPoint = historicalReplay[replayIndex]
  const fleetRiskRanking = useMemo(
    () =>
      inverterMap
        .map((node) => ({
          ...node,
          risk: estimateNodeRisk(node),
        }))
        .sort((a, b) => b.risk - a.risk),
    [],
  )
  const topRiskyDevices = fleetRiskRanking.slice(0, 3)
  const fleetHealthScore = Math.round(
    fleetRiskRanking.reduce((acc, item) => acc + (100 - item.risk), 0) / fleetRiskRanking.length,
  )
  const failureReasonBreakdown = useMemo(() => {
    const latest = telemetry[telemetry.length - 1]
    const temperatureScore = latest.temperature * 1.08
    const loadScore = latest.load * 0.72
    const cyclesScore = (latest.switchingCycles / 100) * 0.86
    const total = temperatureScore + loadScore + cyclesScore || 1
    const toContribution = (score) => Math.round((score / total) * livePrediction.failureRisk)

    return [
      { label: 'High temperature', value: toContribution(temperatureScore), hint: `${latest.temperature} C` },
      { label: 'High load', value: toContribution(loadScore), hint: `${latest.load}%` },
      { label: 'Switching cycles', value: toContribution(cyclesScore), hint: `${latest.switchingCycles} cycles` },
    ]
  }, [telemetry, livePrediction.failureRisk])
  const riskConfidenceSeries = useMemo(
    () =>
      telemetry.map((point) => {
        const pointPrediction = computePredictionEngine({
          temperature: point.temperature,
          load: point.load,
          switchingCycles: point.switchingCycles,
        })
        const confidence = Math.round(
          clamp(97 - pointPrediction.failureRisk * 0.35 + (90 - point.temperature) * 0.08, 56, 98),
        )
        return {
          time: point.time,
          risk: pointPrediction.failureRisk,
          confidence,
        }
      }),
    [telemetry],
  )

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveArchitectureStep((current) => (current + 1) % architectureFlow.length)
    }, 1200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('smartrelay-theme-by-product', JSON.stringify(themeByProduct))
  }, [themeByProduct])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('smartrelay-theme-settings-by-product', JSON.stringify(themeSettingsByProduct))
  }, [themeSettingsByProduct])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('smartrelay-theme-presets-by-product', JSON.stringify(savedPresetsByProduct))
  }, [savedPresetsByProduct])

  useEffect(() => {
    let timer = null
    let active = true
    const fetchMockRealData = async () =>
      new Promise((resolve) => {
        window.setTimeout(() => {
          resolve({
            temperature: randomStep(realModeApiSample.temperature, 60, 82, 1.8),
            load: randomStep(realModeApiSample.load, 58, 88, 2.4),
            cycles: Math.round(realModeApiSample.cycles + Math.random() * 120),
          })
        }, 420)
      })

    const tick = async () => {
      let realModePoint = null
      if (dataMode === 'real') {
        setIsRealDataLoading(true)
        realModePoint = await fetchMockRealData()
        if (!active) return
        setIsRealDataLoading(false)
      }
      setTelemetry((current) => {
        const previous = current[current.length - 1]
        const nextTime = `09:${String((current.length * 5) % 60).padStart(2, '0')}`
        const nextTemperature =
          dataMode === 'real' && realModePoint
            ? Number(clamp(realModePoint.temperature + (Math.random() * 1.4 - 0.7), 55, 89).toFixed(1))
            : randomStep(previous.temperature, 45, 90, 4.2)
        const nextLoad =
          dataMode === 'real' && realModePoint
            ? Number(clamp(realModePoint.load + (Math.random() * 2 - 1), 25, 95).toFixed(1))
            : randomStep(previous.load, 22, 95, 4.8)
        const nextPoint = {
          time: nextTime,
          temperature: nextTemperature,
          current: randomStep(previous.current, 8, 31, 2.5),
          voltage: randomStep(previous.voltage, 208, 235, 3.2),
          load: nextLoad,
          trend: randomStep(previous.trend, 34, 89, 3.5),
          switchingCycles:
            dataMode === 'real' && realModePoint
              ? Math.round(clamp(realModePoint.cycles + Math.random() * 16, 900, 3000))
              : Math.round(previous.switchingCycles + 8 + Math.random() * 18),
        }

        return [...current.slice(-7), nextPoint]
      })

      setLiveMetrics((current) => {
        const nextHealth = Math.round(clamp(current.health + (Math.random() * 8 - 4), 46, 91))
        return {
          health: nextHealth,
          remainingLife: Math.round(clamp(nextHealth - 4 + (Math.random() * 6 - 3), 35, 88)),
          confidence: Math.round(clamp(current.confidence + (Math.random() * 4 - 2), 84, 97)),
          failureDays: Math.max(2, Math.round((100 - nextHealth) / 5)),
        }
      })

      if (!active) return
      timer = window.setTimeout(tick, 1000 + Math.random() * 1000)
    }

    void tick()

    return () => {
      active = false
      if (timer) window.clearTimeout(timer)
      setIsRealDataLoading(false)
    }
  }, [dataMode])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!preferences.soundAlerts) {
      lastAlertTone.current = 'healthy'
      return
    }

    const tone = simulationState.status === 'Critical' ? 'critical' : simulationState.status === 'Warning' ? 'warning' : 'healthy'

    if (tone === 'healthy' || tone === lastAlertTone.current) {
      lastAlertTone.current = tone
      return
    }

    if (typeof window === 'undefined') return

    const audioContext = new window.AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    oscillator.type = 'sine'
    oscillator.frequency.value = tone === 'critical' ? 820 : 620
    gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + (tone === 'critical' ? 0.45 : 0.28))
    oscillator.start()
    oscillator.stop(audioContext.currentTime + (tone === 'critical' ? 0.48 : 0.3))
    oscillator.onended = () => {
      void audioContext.close()
    }

    lastAlertTone.current = tone
  }, [preferences.soundAlerts, simulationState.status])

  const liveStatus = computeStatus(liveMetrics.health)
  const liveStyle = statusStyles[liveStatus]
  const simulationStyle = statusStyles[simulationState.status]

  const radialData = [{ name: 'Remaining Life', value: liveMetrics.remainingLife, fill: '#22d3ee' }]
  const healthPieData = [
    { name: 'Remaining', value: simulationState.health, fill: simulationStyle.dot },
    { name: 'Risk', value: 100 - simulationState.health, fill: '#132238' },
  ]
  const selectedProduct = productCatalog.find((item) => item.id === selectedProductId) ?? productCatalog[0]
  const theme = themeByProduct[selectedProductId] ?? 'dark'
  const themeSettings = themeSettingsByProduct[selectedProductId] ?? defaultThemeSettings
  const savedPresets = savedPresetsByProduct[selectedProductId] ?? []
  const selectedNotification = notifications.find((item) => item.title === selectedNotificationTitle) ?? notifications[0]
  const selectedMapNode = inverterMap.find((item) => item.name === selectedMapNodeName) ?? inverterMap[0]
  const selectedStrength = platformStrengths.find((item) => item.id === selectedStrengthId) ?? platformStrengths[0]
  const selectedInsight = insightModules.find((item) => item.id === selectedInsightId) ?? insightModules[0]
  const selectedTeamMember = teamMembers.find((item) => item.role === selectedTeamRole) ?? teamMembers[0]
  const activeSupportAction = supportActions.find((item) => item.id === supportView) ?? supportActions[0]
  const copilotBrief = [
    {
      label: 'Risk level',
      value: computeStatus(liveMetrics.health),
      detail: `${liveMetrics.health}% relay health on ${selectedProduct.name} ${selectedProduct.variant}.`,
    },
    {
      label: 'Failure horizon',
      value: `${liveMetrics.failureDays} days`,
      detail: `Confidence ${liveMetrics.confidence}% based on live thermal and load patterns.`,
    },
    {
      label: 'Next best action',
      value: computeStatus(liveMetrics.health) === 'Critical' ? 'Dispatch now' : computeStatus(liveMetrics.health) === 'Warning' ? 'Schedule service' : 'Continue monitoring',
      detail: `${activeSupportAction.title} is the current support workflow in focus.`,
    },
    {
      label: 'Business impact',
      value: computeStatus(liveMetrics.health) === 'Critical' ? 'Downtime risk high' : computeStatus(liveMetrics.health) === 'Warning' ? 'Preventive window open' : 'Uptime stable',
      detail: `Selected site: ${selectedProduct.location}.`,
    },
  ]

  function scrollToSection(sectionId) {
    if (typeof document === 'undefined') return
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function goToDashboard() {
    setActivePage('dashboard')
    setIsMobileNavOpen(false)
  }

  function navigateToSection(sectionId) {
    setActivePage('dashboard')
    setIsMobileNavOpen(false)
    window.setTimeout(() => scrollToSection(sectionId), 40)
  }

  function updateTheme(themeId) {
    setThemeByProduct((current) => ({ ...current, [selectedProductId]: themeId }))
    const selectedThemeOption = themeOptions.find((item) => item.id === themeId)
    if (!selectedThemeOption) return
    if (selectedThemeOption.accentPrimary || selectedThemeOption.accentSecondary || selectedThemeOption.fontFamily || selectedThemeOption.pattern) {
      updateThemeSettings((current) => ({
        ...current,
        accentPrimary: selectedThemeOption.accentPrimary ?? current.accentPrimary,
        accentSecondary: selectedThemeOption.accentSecondary ?? current.accentSecondary,
        fontFamily: selectedThemeOption.fontFamily ?? current.fontFamily,
        pattern: selectedThemeOption.pattern ?? current.pattern,
      }))
    }
  }

  function updateThemeSettings(nextValue) {
    setThemeSettingsByProduct((current) => ({
      ...current,
      [selectedProductId]:
        typeof nextValue === 'function'
          ? nextValue(current[selectedProductId] ?? defaultThemeSettings)
          : nextValue,
    }))
  }

  function handleAuthSubmit(event) {
    event.preventDefault()
    if (authMode === 'signin') {
      const email = authForm.email.trim().toLowerCase()
      const password = authForm.password

      if (email === demoCredentials.email && password === demoCredentials.password) {
        setAuthError('')
        setProfile((current) => ({ ...current, email: demoCredentials.email }))
        setIsAuthenticated(true)
        return
      }

      setAuthError('Invalid login. Use the demo credentials shown above to access the platform.')
      return
    }

    setAuthError('')
    setProfile({
      fullName: authForm.name || 'SmartRelay User',
      email: authForm.email,
      role: 'Field Operator',
      company: authForm.organization || 'Luminous Power Technologies',
      phone: '+91 90000 00000',
    })
    const matchingProduct = productCatalog.find(
      (item) => item.name === authForm.model && item.variant === authForm.variant,
    )
    if (matchingProduct) {
      setSelectedProductId(matchingProduct.id)
    }
    setIsAuthenticated(true)
  }

  function saveCurrentPreset() {
    const preset = {
      id: `preset-${Date.now()}`,
      name: `${selectedProduct.name} Preset ${savedPresets.length + 1}`,
      theme,
      ...themeSettings,
    }
    setSavedPresetsByProduct((current) => ({
      ...current,
      [selectedProductId]: [preset, ...(current[selectedProductId] ?? [])].slice(0, 8),
    }))
  }

  function applyPreset(preset) {
    updateTheme(preset.theme)
    updateThemeSettings({
      accentPrimary: preset.accentPrimary,
      accentSecondary: preset.accentSecondary,
      fontFamily: preset.fontFamily,
      pattern: preset.pattern,
    })
  }

  function renamePreset(presetId, name) {
    setSavedPresetsByProduct((current) => ({
      ...current,
      [selectedProductId]: (current[selectedProductId] ?? []).map((preset) =>
        preset.id === presetId ? { ...preset, name } : preset,
      ),
    }))
  }

  function deletePreset(presetId) {
    setSavedPresetsByProduct((current) => ({
      ...current,
      [selectedProductId]: (current[selectedProductId] ?? []).filter((preset) => preset.id !== presetId),
    }))
  }

  function exportPresets() {
    if (typeof window === 'undefined') return
    const payload = {
      productId: selectedProductId,
      productName: selectedProduct.name,
      presets: savedPresets,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedProduct.name.replace(/\s+/g, '-').toLowerCase()}-theme-presets.json`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  function importPresets() {
    try {
      const parsed = JSON.parse(importPresetJson)
      const presets = Array.isArray(parsed) ? parsed : parsed.presets
      if (!Array.isArray(presets)) return
      setSavedPresetsByProduct((current) => ({
        ...current,
        [selectedProductId]: [...presets, ...(current[selectedProductId] ?? [])].slice(0, 8),
      }))
      setImportPresetJson('')
    } catch {
      setImportPresetJson('')
    }
  }

  function enterDemoMode() {
    setAuthError('')
    setAuthForm((current) => ({
      ...current,
      email: demoCredentials.email,
      password: demoCredentials.password,
    }))
    setProfile((current) => ({ ...current, email: demoCredentials.email }))
    setIsAuthenticated(true)
  }

  function handleSupportAction(actionId) {
    setSupportView(actionId)

    if (actionId === 'ticket') {
      const nextTicket = ticketCount + 1
      setTicketCount(nextTicket)
      setToast({
        title: 'Support case created',
        body: `Case SR-${nextTicket} is queued for ${selectedProduct.name} ${selectedProduct.variant}.`,
        tone: 'warning',
      })
      return
    }

    if (actionId === 'chat') {
      setToast({
        title: 'Engineer joined the session',
        body: `Live assist is reviewing ${selectedProduct.serial} telemetry now.`,
        tone: 'warning',
      })
      return
    }

    if (actionId === 'maintenance') {
      setToast({
        title: 'Maintenance visit reserved',
        body: `Preventive service has been scheduled for ${selectedProduct.location}.`,
        tone: 'warning',
      })
      return
    }

    if (actionId === 'guide') {
      setToast({
        title: 'Guide prepared',
        body: `Latest commissioning guide for ${selectedProduct.name} is ready to review.`,
        tone: 'warning',
      })
      return
    }

    if (actionId === 'kit') {
      setToast({
        title: 'Replacement kit request sent',
        body: `A relay kit request was logged for ${selectedProduct.variant}.`,
        tone: 'warning',
      })
      return
    }

    setToast({
      title: 'Help docs opened',
      body: `Troubleshooting documents for ${selectedProduct.name} are active in the support workspace.`,
      tone: 'warning',
    })
  }

  function generateCopilotReply(question) {
    const prompt = question.trim().toLowerCase()
    const healthState = computeStatus(liveMetrics.health)
    const latestTelemetry = telemetry[telemetry.length - 1]
    const isAsking = (...keywords) => keywords.some((keyword) => prompt.includes(keyword))
    const wordCount = prompt.split(/\s+/).filter(Boolean).length

    if (wordCount <= 4 && !isAsking('theme', 'simulation', 'architecture', 'telemetry', 'alert', 'support')) {
      return `${selectedProduct.name} ${selectedProduct.variant} is currently ${healthState}. Relay health is ${liveMetrics.health}%, the model predicts likely failure in ${liveMetrics.failureDays} days, and the next best action is ${healthState === 'Critical' ? 'immediate maintenance' : healthState === 'Warning' ? 'preventive service scheduling' : 'continued monitoring'}.`
    }

    if (isAsking('executive', 'overview', 'summary', 'brief', 'high level', 'high-level')) {
      return `${selectedProduct.name} ${selectedProduct.variant} at ${selectedProduct.location} is currently ${healthState}. The model estimates ${liveMetrics.failureDays} days to likely failure with ${liveMetrics.confidence}% confidence. Current stress indicators are ${latestTelemetry.temperature} C temperature, ${latestTelemetry.current} A current, and ${latestTelemetry.load}% load, so the recommended business action is ${healthState === 'Critical' ? 'immediate service dispatch' : healthState === 'Warning' ? 'preventive maintenance scheduling' : 'continued monitoring'}.`
    }

    if (isAsking('warning', 'critical', 'status', 'risky', 'risk', 'why', 'what is happening', 'what’s happening', 'whats happening', 'is this bad', 'problem', 'issue')) {
      return `${selectedProduct.name} ${selectedProduct.variant} is currently ${healthState}. High temperature and load spikes are accelerating degradation, while switching-cycle growth is compounding wear. With temperature at ${latestTelemetry.temperature} C and load at ${latestTelemetry.load}%, the model flags early failure risk. Recommended: reduce load by 10% and schedule preventive relay service.`
    }

    if (isAsking('summarize relay', 'relay health', 'product', 'inverter', 'selected product', 'serial', 'tell me about this', 'about this inverter', 'give details', 'details')) {
      return `Selected product: ${selectedProduct.name} ${selectedProduct.variant}, serial ${selectedProduct.serial}, located at ${selectedProduct.location}. Remaining life is estimated at ${liveMetrics.remainingLife}%, relay health is ${liveMetrics.health}%, confidence is ${liveMetrics.confidence}%, and the projected failure horizon is ${liveMetrics.failureDays} days.`
    }

    if (isAsking('service', 'next', 'action', 'maintenance', 'recommend', 'what should', 'what do i do', 'what to do', 'what now', 'next step')) {
      return `Recommended next step: ${healthState === 'Critical' ? 'dispatch immediate maintenance, raise a replacement relay ticket, and prioritize this site for service.' : healthState === 'Warning' ? 'schedule preventive maintenance, review thermal history, and monitor switching-cycle growth closely.' : 'continue monitoring, keep periodic inspection active, and maintain the current service cadence.'} The support workspace is currently focused on ${activeSupportAction.title.toLowerCase()}.`
    }

    if (isAsking('simulation', 'simulate', 'failure demo', 'run failure', 'demo', 'how it works')) {
      return `Failure simulation progressively increases load, temperature, and power-cut frequency. As those values rise, the platform recalculates relay health, remaining life, confidence, and projected failure window so users can see warning states move into critical conditions in real time.`
    }

    if (isAsking('alert', 'notification', 'alarm', 'toast', 'message', 'popup')) {
      return `The active notification is "${selectedNotification.title}". It reflects the live relay risk pattern and can be escalated directly into service action, engineer assist, or preventive maintenance from the dashboard.`
    }

    if (isAsking('temperature', 'current', 'voltage', 'load', 'telemetry', 'data', 'numbers', 'readings', 'metrics')) {
      return `Latest telemetry for ${selectedProduct.name}: temperature ${latestTelemetry.temperature} C, current ${latestTelemetry.current} A, voltage ${latestTelemetry.voltage} V, and load ${latestTelemetry.load}%. These live signals are used with switching patterns to estimate remaining useful life and failure timing.`
    }

    if (isAsking('architecture', 'mqtt', 'modbus', 'cloud', 'edge', 'iot', 'flow', 'system design', 'how data moves')) {
      return `The architecture flow is: inverter sensing at the edge, IoT device packaging the telemetry, MQTT transport into the cloud, AI scoring for RUL and anomaly detection, and finally dashboard plus service actions for operators. The goal is to connect physical inverter behavior to actionable maintenance decisions.`
    }

    if (isAsking('map', 'fleet', 'multiple inverter', 'site', 'locations', 'branches')) {
      return `The fleet map shows multiple inverter locations and status levels so teams can move from single-device monitoring to fleet-wide service planning. Right now the highlighted site is ${selectedMapNode.name} in ${selectedMapNode.region}, with status ${selectedMapNode.status}.`
    }

    if (isAsking('support', 'ticket', 'help', 'customer care', 'engineer', 'assistance', 'contact support')) {
      return `Support operations are currently centered on ${activeSupportAction.title.toLowerCase()}. From here the platform can raise a ticket, start live engineer assist, schedule preventive maintenance, or request a replacement relay kit based on the selected inverter context.`
    }

    if (isAsking('theme', 'white theme', 'dark theme', 'appearance')) {
      return `Theme Studio lets each product keep its own visual preset. You can switch to Luminous White for a bright green-accent workspace, choose darker monitoring themes for operations-heavy users, and save presets per product.`
    }

    return `Here is the plain-language view: ${selectedProduct.name} ${selectedProduct.variant} is in ${healthState} state, relay health is ${liveMetrics.health}%, and the platform estimates likely failure in ${liveMetrics.failureDays} days. The dashboard is seeing heat, load, and switching stress patterns that justify ${healthState === 'Critical' ? 'urgent action' : healthState === 'Warning' ? 'preventive intervention' : 'continued monitoring'}. If you want, ask naturally about what is happening, what to do next, the data, the system flow, or the selected inverter and I will answer from the live context.`
  }

  function sendCopilotMessage(messageText) {
    const text = messageText.trim()
    if (!text) return
    const nextId = copilotMessageId.current
    copilotMessageId.current += 2

    const userMessage = {
      id: `user-${nextId}`,
      role: 'user',
      text,
    }
    const assistantMessage = {
      id: `assistant-${nextId + 1}`,
      role: 'assistant',
      text: generateCopilotReply(text),
    }

    setCopilotMessages((current) => [...current, userMessage, assistantMessage])
    setCopilotInput('')
    setIsCopilotOpen(true)
  }

  function runFailureSimulation() {
    if (failureSimulationRunning) return

    const steps = [
      {
        simulation: { load: 72, temperature: 68, powerCuts: 6 },
        metrics: { health: 72, remainingLife: 61, confidence: 93, failureDays: 6 },
        toast: { title: 'Anomaly detected', body: 'Thermal stress rising above learned operating baseline.', tone: 'warning' },
      },
      {
        simulation: { load: 86, temperature: 81, powerCuts: 8 },
        metrics: { health: 20, remainingLife: 16, confidence: 95, failureDays: 2 },
        toast: { title: 'WARNING: Relay degradation accelerating', body: 'Switching cycles and heat are forcing rapid wear.', tone: 'warning' },
      },
      {
        simulation: { load: 94, temperature: 92, powerCuts: 11 },
        metrics: { health: 5, remainingLife: 4, confidence: 97, failureDays: 2 },
        toast: { title: 'CRITICAL: Relay failure imminent', body: 'Projected contact failure window is now under 48 hours.', tone: 'critical' },
      },
    ]

    setFailureSimulationRunning(true)
    let index = 0

    const applyStep = () => {
      const step = steps[index]
      setSimulation(step.simulation)
      setLiveMetrics(step.metrics)
      setToast(step.toast)
      index += 1

      if (index === steps.length) {
        window.setTimeout(() => setFailureSimulationRunning(false), 900)
        return
      }

      window.setTimeout(applyStep, 1200)
    }

    applyStep()
  }

  function dispatchTechnician() {
    const issue =
      livePrediction.failureRisk >= 75 ? '🔴 High failure risk' : livePrediction.failureRisk >= 45 ? '⚠️ Relay wear warning' : 'Monitoring check'
    const action =
      livePrediction.failureRisk >= 75 ? 'Immediate relay replacement and thermal inspection' : 'Inspect load distribution and schedule preventive maintenance'

    setLastDispatch({
      location: selectedProduct.location,
      issue,
      action,
    })
    setToast({
      title: 'Technician dispatched',
      body: `Field engineer is assigned to ${selectedProduct.location} for ${selectedProduct.serial}.`,
      tone: 'warning',
    })
  }

  return (
    <div
      className={`theme-${theme} ${toast?.tone === 'critical' ? 'critical-shake' : ''} min-h-screen bg-[#030712] text-white`}
      style={{
        '--accent-primary': themeSettings.accentPrimary,
        '--accent-secondary': themeSettings.accentSecondary,
        '--app-font': `"${themeSettings.fontFamily}", Inter, sans-serif`,
      }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_24%),linear-gradient(180deg,#020617_0%,#020817_48%,#030712_100%)]" />
        {themeSettings.pattern === 'grid' ? (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
        ) : null}
        {themeSettings.pattern === 'dots' ? (
          <div className="absolute inset-0 bg-[radial-gradient(rgba(34,211,238,0.18)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
        ) : null}
        {themeSettings.pattern === 'waves' ? (
          <div className="absolute inset-0 opacity-35 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]">
            <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
            <div className="absolute inset-x-0 top-[34%] h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
            <div className="absolute inset-x-0 top-[50%] h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
            <div className="absolute inset-x-0 top-[66%] h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
          </div>
        ) : null}
        <motion.div
          className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -18, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{ x: [0, -35, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {!isAuthenticated ? (
        <AuthScreen
          authMode={authMode}
          setAuthMode={setAuthMode}
          authForm={authForm}
          setAuthForm={setAuthForm}
          onSubmit={handleAuthSubmit}
          authError={authError}
          onDemoMode={enterDemoMode}
        />
      ) : null}

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed left-4 right-4 top-4 z-50 rounded-3xl border p-4 shadow-[0_0_60px_rgba(2,8,24,0.45)] sm:left-auto sm:right-5 sm:top-5 sm:w-[min(92vw,380px)] ${
            toast.tone === 'critical'
              ? 'border-rose-400/30 bg-rose-500/18'
              : 'border-amber-400/30 bg-amber-500/14'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-slate-950/50 p-3">
              <TriangleAlert className={`h-5 w-5 ${toast.tone === 'critical' ? 'text-rose-200' : 'text-amber-200'}`} />
            </div>
            <div>
              <p className="font-semibold text-white">{toast.title}</p>
              <p className="mt-1 text-sm text-slate-100">{toast.body}</p>
            </div>
          </div>
        </motion.div>
      ) : null}

      {isAuthenticated ? (
        <>
          {isCopilotOpen ? (
            <div className="fixed inset-x-3 bottom-24 z-50 overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 shadow-[0_24px_80px_rgba(2,8,24,0.45)] backdrop-blur-2xl sm:inset-x-auto sm:right-6 sm:w-[min(94vw,520px)] sm:rounded-[32px]">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-2.5 text-cyan-200">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">SmartRelay Copilot</p>
                    <p className="text-sm text-slate-400">High-level and context-aware assistant</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCopilotOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-white/10 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setCopilotMode('high-level')}
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${copilotMode === 'high-level' ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200'}`}
                >
                  High-Level
                </button>
                <button
                  type="button"
                  onClick={() => setCopilotMode('chat')}
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${copilotMode === 'chat' ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200'}`}
                >
                  Chat
                </button>
              </div>

              {copilotMode === 'high-level' ? (
                <div className="space-y-5 px-6 py-5">
                  <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Executive summary</p>
                    <p className="mt-3 text-sm leading-7 text-white sm:text-[15px]">
                      {selectedProduct.name} at {selectedProduct.location} is in {computeStatus(liveMetrics.health)} state. The model estimates {liveMetrics.failureDays} days to likely failure and recommends {computeStatus(liveMetrics.health) === 'Critical' ? 'immediate field intervention' : computeStatus(liveMetrics.health) === 'Warning' ? 'preventive maintenance scheduling' : 'continued active monitoring'}.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {copilotBrief.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                        <p className="mt-2 text-xs leading-6 text-slate-300">{item.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Ask next</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {copilotPrompts.map((prompt) => (
                        <button
                          type="button"
                          key={prompt}
                          onClick={() => {
                            setCopilotMode('chat')
                            sendCopilotMessage(prompt)
                          }}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/30"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className={`${copilotMode === 'chat' ? 'block' : 'hidden'} max-h-[52vh] space-y-4 overflow-y-auto px-6 py-5`}>
                {copilotMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.role === 'assistant'
                        ? 'border border-white/10 bg-white/5 text-slate-200'
                        : 'ml-4 sm:ml-10 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950'
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>

              <div className={`${copilotMode === 'chat' ? 'block' : 'hidden'} border-t border-white/10 px-6 py-5`}>
                <div className="mb-4 grid gap-2 sm:grid-cols-2">
                  {copilotPrompts.map((prompt) => (
                    <button
                      type="button"
                      key={prompt}
                      onClick={() => sendCopilotMessage(prompt)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/30"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    sendCopilotMessage(copilotInput)
                  }}
                  className="flex items-center gap-3"
                >
                  <input
                    value={copilotInput}
                    onChange={(event) => setCopilotInput(event.target.value)}
                    placeholder="Ask Copilot about health, alerts, or support"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition focus:border-cyan-400/40"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setIsCopilotOpen((current) => !current)}
            className="fixed bottom-4 left-4 right-4 z-50 inline-flex items-center justify-center gap-3 rounded-full border border-cyan-300/25 bg-slate-950/85 px-4 py-3 text-sm font-medium text-cyan-100 shadow-[0_18px_50px_rgba(2,8,24,0.42)] backdrop-blur-xl sm:bottom-5 sm:left-auto sm:right-6"
          >
            <MessageSquare className="h-4 w-4" />
            Copilot
          </button>
        </>
      ) : null}

      {isAuthenticated ? (
      <div className="relative z-10 mx-auto max-w-[92rem] px-4 pb-20 pt-4 sm:px-6 sm:pt-6 lg:px-8 xl:px-10">
        <header className="sticky top-2 z-30 mb-6 rounded-[28px] border border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(2,8,24,0.35)] md:top-4 md:mb-8 md:rounded-full">
          <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap md:gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-2.5 text-cyan-200">
                <Zap className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-300">SmartRelay AI – Predictive Maintenance for Inverters</p>
              </div>
            </div>

            <nav className="hidden flex-wrap items-center gap-3 text-sm text-slate-300 md:flex">
              {activePage !== 'dashboard' ? (
                <button
                  type="button"
                  onClick={goToDashboard}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:text-cyan-200"
                >
                  ←
                </button>
              ) : null}
              <button type="button" onClick={goToDashboard} className="transition hover:text-cyan-200">Dashboard</button>
              <button type="button" onClick={() => navigateToSection('insights')} className="transition hover:text-cyan-200">AI Insights</button>
              <button type="button" onClick={() => navigateToSection('simulation')} className="transition hover:text-cyan-200">Simulation</button>
              <button type="button" onClick={() => navigateToSection('architecture')} className="transition hover:text-cyan-200">Architecture</button>
              <button type="button" onClick={() => navigateToSection('team')} className="transition hover:text-cyan-200">Team</button>
              <button type="button" onClick={() => { setActivePage('theme-studio'); setIsMobileNavOpen(false) }} className="transition hover:text-cyan-200">Themes</button>
            </nav>

            <button
              type="button"
              onClick={() => setIsMobileNavOpen((current) => !current)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden"
              aria-label="Toggle navigation"
            >
              {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="relative ml-auto md:ml-0">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((current) => !current)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-sm font-semibold text-slate-950">
                  {profile.fullName
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{profile.fullName}</p>
                  <p className="text-xs text-slate-400">{profile.role}</p>
                </div>
              </button>

              {isUserMenuOpen ? (
                <div className="absolute right-0 top-16 z-40 w-[min(92vw,360px)] rounded-[28px] border border-white/10 bg-slate-950/95 p-5 shadow-[0_20px_80px_rgba(2,8,24,0.55)] backdrop-blur-2xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-sm font-semibold text-slate-950">
                      {profile.fullName
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white">{profile.fullName}</p>
                      <p className="text-sm text-slate-400">{profile.email}</p>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-2">
                    {[
                      ['overview', 'Overview'],
                      ['details', 'Update Details'],
                      ['settings', 'Settings'],
                    ].map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setUserMenuView(key)}
                        className={`rounded-full px-3 py-2 text-xs font-medium transition ${userMenuView === key ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {userMenuView === 'overview' ? (
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Role</p>
                        <p className="mt-2 text-white">{profile.role}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Company</p>
                        <p className="mt-2 text-white">{profile.company}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Phone</p>
                        <p className="mt-2 text-white">{profile.phone}</p>
                      </div>
                    </div>
                  ) : null}

                  {userMenuView === 'details' ? (
                    <div className="space-y-3">
                      <label className="space-y-1.5">
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Full name</span>
                        <input
                          value={profile.fullName}
                          onChange={(event) => setProfile((current) => ({ ...current, fullName: event.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                        />
                      </label>
                      <label className="space-y-1.5">
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Email</span>
                        <input
                          value={profile.email}
                          onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                        />
                      </label>
                      <label className="space-y-1.5">
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Role</span>
                        <input
                          value={profile.role}
                          onChange={(event) => setProfile((current) => ({ ...current, role: event.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                        />
                      </label>
                      <label className="space-y-1.5">
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Phone</span>
                        <input
                          value={profile.phone}
                          onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setToast({
                            title: 'Profile updated',
                            body: `${profile.fullName}'s account details were saved successfully.`,
                            tone: 'warning',
                          })
                        }
                        className="w-full rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100"
                      >
                        Save Updated Details
                      </button>
                    </div>
                  ) : null}

                  {userMenuView === 'settings' ? (
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Theme</p>
                        <button
                          type="button"
                          onClick={() => {
                            setActivePage('theme-studio')
                            setIsUserMenuOpen(false)
                          }}
                          className="mt-3 w-full rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100"
                        >
                          Open Theme Studio
                        </button>
                        <p className="mt-3 text-xs text-slate-400">
                          Active theme: {themeOptions.find((item) => item.id === theme)?.name}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-white">Sound alerts</p>
                            <p className="text-xs text-slate-400">Play warning tones for severe relay states</p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setPreferences((current) => ({
                                ...current,
                                soundAlerts: !current.soundAlerts,
                              }))
                            }
                            className={`rounded-full px-4 py-2 text-xs font-medium ${preferences.soundAlerts ? 'bg-emerald-400 text-slate-950' : 'border border-white/10 bg-transparent text-slate-200'}`}
                          >
                            {preferences.soundAlerts ? 'On' : 'Off'}
                          </button>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-white">Email notifications</p>
                            <p className="text-xs text-slate-400">Receive service and maintenance updates</p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setPreferences((current) => ({
                                ...current,
                                emailNotifications: !current.emailNotifications,
                              }))
                            }
                            className={`rounded-full px-4 py-2 text-xs font-medium ${preferences.emailNotifications ? 'bg-emerald-400 text-slate-950' : 'border border-white/10 bg-transparent text-slate-200'}`}
                          >
                            {preferences.emailNotifications ? 'On' : 'Off'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 grid gap-2">
                    <button
                      type="button"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-slate-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {isMobileNavOpen ? (
              <div className="mt-4 grid w-full gap-2 border-t border-white/10 pt-4 md:hidden">
                {activePage !== 'dashboard' ? (
                  <button
                    type="button"
                    onClick={goToDashboard}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200"
                  >
                    Back to dashboard
                  </button>
                ) : null}
                <button type="button" onClick={goToDashboard} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200">Dashboard</button>
                <button type="button" onClick={() => navigateToSection('insights')} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200">AI Insights</button>
                <button type="button" onClick={() => navigateToSection('simulation')} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200">Simulation</button>
                <button type="button" onClick={() => navigateToSection('architecture')} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200">Architecture</button>
                <button type="button" onClick={() => navigateToSection('team')} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200">Team</button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('theme-studio')
                    setIsMobileNavOpen(false)
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200"
                >
                  Themes
                </button>
              </div>
            ) : null}
          </div>
        </header>

        {activePage === 'theme-studio' ? (
          <main className="space-y-10 md:space-y-12">
            <section className="space-y-6">
              <SectionHeader
                eyebrow="Theme studio"
                title="Customize the full SmartRelay AI experience."
                body="Choose from multiple complete visual themes. This page controls the whole application shell, cards, text, and surfaces so the product feels fully customized."
              />

              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <GlassCard className="p-6 md:p-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    {themeOptions.map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => updateTheme(item.id)}
                        className={`rounded-[28px] border p-5 text-left transition ${theme === item.id ? 'border-cyan-300/40 bg-cyan-400/10' : 'border-white/10 bg-white/5 hover:border-cyan-300/20'}`}
                      >
                        <div className={`relative mb-4 h-24 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${item.preview}`}>
                          <div className={`absolute -right-2 top-3 h-16 w-16 rounded-full blur-2xl ${item.glow}`} />
                          <div className="absolute inset-x-4 top-4 h-3 rounded-full bg-white/20" />
                          <div className="absolute inset-x-4 top-11 h-8 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md" />
                          <div className="absolute bottom-3 left-4 h-2 w-14 rounded-full bg-white/15" />
                          <div className="absolute bottom-3 right-4 h-2 w-8 rounded-full bg-white/15" />
                        </div>
                        <p className="text-lg font-semibold text-white">{item.name}</p>
                        <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-4">
                      <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Accent primary</span>
                      <input
                        type="color"
                        value={themeSettings.accentPrimary}
                        onChange={(event) =>
                          updateThemeSettings((current) => ({
                            ...current,
                            accentPrimary: event.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-2xl border border-white/10 bg-transparent"
                      />
                    </label>

                    <label className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-4">
                      <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Accent secondary</span>
                      <input
                        type="color"
                        value={themeSettings.accentSecondary}
                        onChange={(event) =>
                          updateThemeSettings((current) => ({
                            ...current,
                            accentSecondary: event.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-2xl border border-white/10 bg-transparent"
                      />
                    </label>

                    <label className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-4">
                      <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Font style</span>
                      <select
                        value={themeSettings.fontFamily}
                        onChange={(event) =>
                          updateThemeSettings((current) => ({
                            ...current,
                            fontFamily: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
                      >
                        {fontOptions.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-4">
                      <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Background pattern</span>
                      <select
                        value={themeSettings.pattern}
                        onChange={(event) =>
                          updateThemeSettings((current) => ({
                            ...current,
                            pattern: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
                      >
                        {patternOptions.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 md:p-8">
                  <h3 className="mt-2 text-3xl font-semibold text-white">
                    {themeOptions.find((item) => item.id === theme)?.name}
                  </h3>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                          <button
                            type="button"
                            onClick={saveCurrentPreset}
                            className="w-full rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-100 sm:w-auto"
                          >
                            Save Current Preset
                          </button>
                          <button
                            type="button"
                            onClick={exportPresets}
                            className="w-full rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-100 sm:w-auto"
                          >
                            Export
                          </button>
                        </div>
                      </div>
                      <textarea
                        value={importPresetJson}
                        onChange={(event) => setImportPresetJson(event.target.value)}
                        placeholder=""
                        className="mb-3 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
                      />
                      <button
                        type="button"
                        onClick={importPresets}
                        className="mb-4 w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-100 sm:w-auto"
                      >
                        Import Presets
                      </button>
                      <div className="space-y-3">
                        {savedPresets.length === 0 ? null : (
                          savedPresets.map((preset) => (
                            <div key={preset.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-medium text-white">{preset.name}</p>
                                  <p className="text-xs text-slate-400">
                                    {themeOptions.find((item) => item.id === preset.theme)?.name} · {preset.fontFamily} · {preset.pattern}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => applyPreset(preset)}
                                  className="rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-slate-100"
                                >
                                  Apply
                                </button>
                              </div>
                              <div className="mt-3 grid gap-2">
                                <input
                                  value={preset.name}
                                  onChange={(event) => renamePreset(preset.id, event.target.value)}
                                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white outline-none transition focus:border-cyan-400/40"
                                />
                                <button
                                  type="button"
                                  onClick={() => deletePreset(preset.id)}
                                  className="rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs font-medium text-rose-200"
                                >
                                  Delete Preset
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setActivePage('dashboard')}
                        className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 font-semibold text-slate-950 sm:w-auto"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </section>
          </main>
        ) : (
        <main className="space-y-10 md:space-y-14">
          <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center xl:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-emerald-200">
                <Activity className="h-4 w-4" />
                Live AI monitoring for smart energy systems
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[5.25rem]">
                Predict Failures Before They Happen
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                AI-powered predictive maintenance for smart energy systems with clear judges-ready
                proof points: prediction logic, live telemetry simulation, explainable alerts, and
                architecture flow from device data to AI action.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <motion.a
                  href="#dashboard"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-center font-semibold text-slate-950 shadow-[0_0_36px_rgba(45,212,191,0.28)] sm:w-auto"
                >
                  View Dashboard
                </motion.a>
                <motion.a
                  href="#simulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 text-center font-semibold text-cyan-100 sm:w-auto"
                >
                  Live Simulation
                </motion.a>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={runFailureSimulation}
                  disabled={failureSimulationRunning}
                  className="w-full rounded-full border border-rose-400/30 bg-rose-400/12 px-6 py-3 font-semibold text-rose-100 shadow-[0_0_36px_rgba(244,63,94,0.18)] disabled:opacity-70 sm:w-auto"
                >
                  {failureSimulationRunning ? 'Simulating Failure...' : 'Run Failure Simulation'}
                </motion.button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {heroStats.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.2 }}
                  >
                    <GlassCard className="h-full p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                      <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <GlassCard className="mt-6 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Judge demo checklist</p>
                <div className="mt-3 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
                  <p>✓ Prediction: Remaining Life = f(temperature, load, cycles)</p>
                  <p>✓ Live stream: telemetry updates every 1-2 seconds</p>
                  <p>✓ Alerts: ⚠️ Replace relay in X days, 🔴 High risk</p>
                  <p>✓ Architecture: Inverter → MODBUS → IoT → MQTT → Cloud → AI → Dashboard</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <GlassCard className="relative overflow-hidden p-6 md:p-8 xl:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_18%)]" />
                <div className="absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Relay risk card</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Smart Relay Cluster A</h2>
                    </div>
                    <div className={`rounded-full border px-4 py-1 text-sm font-medium ${livePrediction.riskLabel === 'High risk' ? 'border-rose-400/30 bg-rose-400/10 text-rose-200' : livePrediction.riskLabel === 'Warning' ? 'border-amber-400/30 bg-amber-400/10 text-amber-300' : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'}`}>
                      {livePrediction.riskLabel}
                    </div>
                  </div>
                  <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[1fr_0.92fr]">
                    <div className="flex items-center justify-center">
                      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-cyan-400/20 bg-slate-950/60 shadow-[0_0_80px_rgba(34,211,238,0.18)] sm:h-56 sm:w-56">
                        <div className="absolute inset-4 rounded-full border border-emerald-400/20" />
                        <div className="text-center">
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Relay Health</p>
                          <p className="mt-3 text-5xl font-semibold text-white sm:text-6xl">{livePrediction.remainingLife}%</p>
                          <p className="mt-2 text-sm text-amber-300">Status: {livePrediction.riskLabel}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <GlassCard className="p-5">
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Prediction system</p>
                        <p className="mt-2 text-2xl font-semibold text-white">Relay failure predicted in {livePrediction.failureDays} days</p>
                        <p className="mt-2 text-sm text-slate-300">Inputs: temperature, load %, and switching cycles. Output: remaining life {livePrediction.remainingLife}% and failure risk {livePrediction.failureRisk}%.</p>
                        <p className="mt-2 text-xs text-cyan-200/90">Formula (linear model): risk = -65 + 1.08*temperature + 0.72*load + 0.86*(switchingCycles/100); remaining life % = 100 - risk.</p>
                      </GlassCard>
                      <GlassCard className="p-5">
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Alert summary</p>
                        <div className="mt-3 space-y-3 text-sm text-slate-200">
                          <div className="flex items-center gap-3">
                            <ShieldAlert className="h-4 w-4 text-amber-300" />
                            {livePrediction.cloudAlert}
                          </div>
                          <div className="flex items-center gap-3">
                            <Bell className="h-4 w-4 text-rose-300" />
                            {livePrediction.edgeAlert}
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </section>

          <section id="dashboard" className="space-y-6">
            <SectionHeader
              eyebrow="Live dashboard"
              title="Real-time inverter intelligence with startup-grade visual polish."
              body="Streaming telemetry updates automatically with two options: Simulation Mode and Real Data Mode (mock API). Monitor relay stress, predict remaining life, and surface action before a failure event."
            />

            <div className="flex items-center justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-cyan-100">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                LIVE
                <span className="ml-2 whitespace-nowrap tracking-normal text-[11px] font-medium text-slate-200/90">
                  updates every 1-2 seconds
                </span>
              </div>
            </div>

            <GlassCard className="p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Data source mode</p>
                  <p className="mt-1 text-sm text-slate-200">Switch between synthetic stream and mock API-backed real mode.</p>
                </div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => setDataMode('simulation')}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${dataMode === 'simulation' ? 'bg-cyan-400 text-slate-950' : 'text-slate-200'}`}
                  >
                    Simulation Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setDataMode('real')}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${dataMode === 'real' ? 'bg-emerald-400 text-slate-950' : 'text-slate-200'}`}
                  >
                    Real Data Mode
                  </button>
                </div>
              </div>
              <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300">
                {dataMode === 'real'
                  ? `Mock API sample: { "temperature": ${realModeApiSample.temperature}, "load": ${realModeApiSample.load}, "cycles": ${realModeApiSample.cycles} } ${isRealDataLoading ? '(fetching...)' : '(latest sample ingested)'}` 
                  : 'Simulation mode streams synthetic telemetry for demo stress testing.'}
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-100">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
                Connected to mock API (real-time simulation)
              </div>
            </GlassCard>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <GlassCard className={`p-6 md:p-8 xl:p-10 ${liveMetrics.health < 25 ? 'shadow-[0_0_60px_rgba(244,63,94,0.25)]' : ''}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Digital twin</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">Inverter live device model</h3>
                    <p className="mt-2 text-xs text-slate-400">
                      Source: {dataMode === 'real' ? `Real Data Mode (mock API${isRealDataLoading ? ' - fetching' : ''})` : 'Simulation Mode'}
                    </p>
                  </div>
                  <Flame className={`${liveMetrics.health < 25 ? 'text-rose-300' : liveMetrics.health < 50 ? 'text-amber-300' : 'text-cyan-300'} h-6 w-6`} />
                  <div className={`rounded-full px-3 py-1 text-xs font-semibold ${liveMetrics.health < 25 ? 'bg-rose-400/15 text-rose-200' : liveMetrics.health < 50 ? 'bg-amber-400/15 text-amber-200' : 'bg-emerald-400/15 text-emerald-200'}`}>
                    {computeStatus(liveMetrics.health)}
                  </div>
                </div>

                <div className="relative mt-6 flex h-60 items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/60 sm:h-72">
                  <div className={`absolute inset-0 transition ${liveMetrics.health < 25 ? 'bg-rose-500/10' : liveMetrics.health < 50 ? 'bg-amber-500/10' : 'bg-cyan-500/10'}`} />
                  <div className={`absolute h-40 w-40 rounded-full blur-3xl ${liveMetrics.health < 25 ? 'bg-rose-500/35' : liveMetrics.health < 50 ? 'bg-amber-400/25' : 'bg-cyan-400/20'}`} />
                  <div className="relative h-40 w-44 rounded-[30px] border border-white/15 bg-slate-900/80 shadow-[0_0_40px_rgba(15,23,42,0.45)] sm:h-44 sm:w-52 sm:rounded-[36px]">
                    <div className="absolute left-6 right-6 top-5 h-3 rounded-full bg-white/10" />
                    <div className={`absolute left-10 right-10 top-16 h-16 rounded-[20px] border border-white/10 transition ${liveMetrics.health < 25 ? 'bg-rose-500/30' : liveMetrics.health < 50 ? 'bg-amber-500/25' : 'bg-cyan-500/20'}`} />
                    <motion.div
                      className={`absolute left-1/2 top-[5.65rem] h-4 w-4 -translate-x-1/2 rounded-full ${liveMetrics.health < 25 ? 'bg-rose-300' : 'bg-emerald-300'}`}
                      animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                    <div className="absolute bottom-5 left-7 right-7 flex justify-between">
                      <span className={`h-2.5 w-10 rounded-full ${liveMetrics.health < 25 ? 'bg-rose-400' : liveMetrics.health < 50 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <span className="h-2.5 w-10 rounded-full bg-white/10" />
                      <span className="h-2.5 w-10 rounded-full bg-white/10" />
                    </div>
                    <div className={`absolute -bottom-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full blur-xl ${liveMetrics.health < 25 ? 'bg-rose-400/45' : liveMetrics.health < 50 ? 'bg-amber-400/35' : 'bg-cyan-400/30'}`} />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Heat zone</p>
                    <p className="mt-2 text-lg text-white">{telemetry[telemetry.length - 1].temperature} C</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Relay state</p>
                    <p className="mt-2 text-lg text-white">{liveMetrics.health < 25 ? 'Blinking critical' : 'Stable switching'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Load stress</p>
                    <p className="mt-2 text-lg text-white">{telemetry[telemetry.length - 1].load}%</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 md:p-8 xl:p-10">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">AI event feed</p>
                <div className="mt-5 space-y-3">
                  {[
                    liveMetrics.health < 25
                      ? 'Anomaly detected: relay wear is outside normal operating envelope.'
                      : dataMode === 'real'
                        ? 'Live mock API payloads are being fused with model features for risk scoring.'
                        : 'Pattern learned from previous failures is being compared against live telemetry.',
                    `Confidence score adjusted to ${liveMetrics.confidence}% based on latest thermal and load correlation.`,
                    liveMetrics.failureDays <= 2
                      ? 'Failure horizon compressed. Immediate maintenance path is recommended.'
                      : 'Model is streaming a healthy baseline while tracking switching-cycle acceleration.',
                  ].map((message) => (
                    <div key={message} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                      {message}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="grid gap-5">
              <GlassCard className="p-6 md:p-8 xl:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Manage products</p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">Switch between registered inverters</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
                    <Package className="h-4 w-4" />
                    {productCatalog.length} products linked
                  </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[0.74fr_1.26fr]">
                  <ProductVisual
                    accentA={selectedProduct.accentA}
                    accentB={selectedProduct.accentB}
                    label={`${selectedProduct.name} ${selectedProduct.variant}`}
                  />

                  <div className="grid gap-3">
                    {productCatalog.map((product) => {
                      const tone = statusStyles[product.status]
                      const active = product.id === selectedProductId

                      return (
                        <button
                          type="button"
                          key={product.id}
                          onClick={() => setSelectedProductId(product.id)}
                          className={`rounded-3xl border p-4 text-left transition ${active ? `${tone.border} bg-white/10` : 'border-white/10 bg-white/5 hover:border-cyan-400/25'}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-semibold text-white">{product.name}</p>
                              <p className="text-sm text-slate-400">{product.variant}</p>
                              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">{product.serial}</p>
                            </div>
                            <span className={`text-sm ${tone.color}`}>{product.status}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                            <span>{product.location}</span>
                            <span className="text-cyan-200">{active ? 'Active product' : 'Switch to view'}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="grid gap-5 md:grid-cols-2">
                <MetricChart title="Temperature" color="#22d3ee" dataKey="temperature" unit="C" data={telemetry} />
                <MetricChart title="Current" color="#10b981" dataKey="current" unit="A" data={telemetry} />
                <MetricChart title="Voltage" color="#38bdf8" dataKey="voltage" unit="V" data={telemetry} />
                <MetricChart title="Load %" color="#a3e635" dataKey="load" unit="%" data={telemetry} />
              </div>

              <div className="space-y-5">
                <GlassCard className={`p-6 md:p-7 ${liveStyle.border} ${liveStyle.glow}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Remaining Life</p>
                      <p className="mt-2 text-2xl font-semibold text-white">Remaining Life: {livePrediction.remainingLife}%</p>
                    </div>
                    <div className={`rounded-full border px-4 py-1 text-sm font-medium ${liveStyle.border} ${liveStyle.color}`}>
                      {liveStatus}
                    </div>
                  </div>

                  <div className="h-48 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        innerRadius="72%"
                        outerRadius="100%"
                        data={radialData}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar background dataKey="value" cornerRadius={18} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="-mt-24 text-center sm:-mt-32">
                    <p className="text-4xl font-semibold text-white sm:text-5xl">{livePrediction.remainingLife}%</p>
                    <p className="mt-2 text-sm text-slate-400">Remaining Life</p>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">AI Prediction Card</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">Relay failure predicted in {livePrediction.failureDays} days</h3>
                    </div>
                    <BrainCircuit className="h-8 w-8 text-cyan-300" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Linear regression model uses temperature, load %, and switching cycles to estimate remaining life and failure risk. Current failure risk is {livePrediction.failureRisk}%.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className={`rounded-2xl border p-4 ${getRiskToneClass(livePrediction.riskLabel)}`}>
                      <p className="text-xs uppercase tracking-[0.22em] opacity-70">Failure risk</p>
                      <p className="mt-2 text-2xl font-semibold">{livePrediction.failureRisk}%</p>
                      <p className="mt-2 text-sm opacity-80">{livePrediction.riskLabel}</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-100">
                      <p className="text-xs uppercase tracking-[0.22em] opacity-70">Model score</p>
                      <p className="mt-2 text-2xl font-semibold">{livePrediction.weightedRisk}</p>
                      <p className="mt-2 text-sm opacity-80">Weighted stress score from temperature, load, and switching cycles.</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Why did it fail?</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-200">
                      {failureReasonBreakdown.map((reason) => (
                        <div key={reason.label} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-slate-950/35 px-3 py-2">
                          <span>{reason.label} ({reason.hint})</span>
                          <span className="font-semibold text-amber-200">+{reason.value}% risk</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => sendCopilotMessage('Why is this relay failing?')}
                    className="mt-4 w-full rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 sm:w-auto"
                  >
                    AI Assistant: 1-click insight
                  </button>
                </GlassCard>

                <GlassCard className="p-6 md:p-7">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Alerts Panel</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-amber-100">
                      ⚠️ Relay failure predicted in {livePrediction.failureDays} days
                    </div>
                    <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-100">
                      🔴 High risk
                    </div>
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-100">
                      Email alert simulation: service@luminous.in receives prediction snapshot and inverter context
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>

          <section id="insights" className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="AI insights"
                title="Explainable model logic for predictive maintenance."
                body="Inputs include temperature, switching cycles, and load. The model outputs Remaining Useful Life (RUL), status severity, and an interpretable confidence score for decision support."
              />

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {technicalFeatureCards.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-lg font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={telemetry}>
                    <defs>
                      <linearGradient id="healthTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.7} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
                    <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        borderRadius: '16px',
                        color: '#e2e8f0',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="trend"
                      stroke="#22d3ee"
                      fill="url(#healthTrend)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-8 xl:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Confidence score</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{liveMetrics.confidence}%</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                High confidence indicates stable telemetry quality and strong agreement across the model's degradation features.
              </p>
              <div className="mt-6 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskConfidenceSeries}>
                    <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
                    <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={30} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        borderRadius: '16px',
                        color: '#e2e8f0',
                      }}
                    />
                    <Line type="monotone" dataKey="risk" stroke="#f43f5e" strokeWidth={2.5} dot={false} name="Risk %" />
                    <Line type="monotone" dataKey="confidence" stroke="#22d3ee" strokeWidth={2.5} dot={false} name="Confidence %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-xs text-slate-400">Confidence vs Risk visualization (time-series intelligence depth).</p>

              <div className="mt-8 grid gap-4">
                {insightModules.map((item) => {
                  const Icon = item.icon
                  const active = selectedInsight.id === item.id
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        setSelectedInsightId(item.id)
                        setToast({
                          title: item.title,
                          body: `${item.action} is now active for ${selectedProduct.name}.`,
                          tone: 'warning',
                        })
                      }}
                      className={`rounded-3xl border p-5 text-left transition ${item.tone} ${active ? 'shadow-[0_0_40px_rgba(34,211,238,0.14)] ring-1 ring-cyan-300/35' : 'hover:border-cyan-400/20'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${item.tone.split(' ').at(-1)}`} />
                        <p className="font-medium text-white">{item.title}</p>
                      </div>
                      <p className="mt-3 text-sm text-slate-300">{item.summary}</p>
                    </button>
                  )
                })}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Insight workspace</p>
                  <h4 className="mt-2 text-xl font-semibold text-white">{selectedInsight.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{selectedInsight.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToSection('dashboard')}
                      className="w-full rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 sm:w-auto"
                    >
                      Link to dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => sendCopilotMessage(`Explain ${selectedInsight.title.toLowerCase()} for this inverter`)}
                      className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 sm:w-auto"
                    >
                      Ask Copilot
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="Technical depth"
                title="A real prediction system, even if lightweight."
                body="The current implementation uses a linear regression model: temperature, load %, and switching cycles are combined with tuned coefficients, then converted into Remaining Life (%) and failure horizon."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Algorithm</p>
                  <p className="mt-2 text-xl font-semibold text-white">Linear regression + edge thresholds</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Cloud prediction computes failure risk using weighted feature coefficients, while the edge layer runs immediate threshold alerts for fast local protection.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Live output</p>
                  <p className="mt-2 text-xl font-semibold text-white">Remaining Life {livePrediction.remainingLife}%</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Current failure risk is {livePrediction.failureRisk}% with projected failure in {livePrediction.failureDays} days, based on the current sensor stream.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Features used</p>
                  <p className="mt-2 text-xl font-semibold text-white">{telemetry[telemetry.length - 1].temperature} C / {telemetry[telemetry.length - 1].load}% / {telemetry[telemetry.length - 1].switchingCycles} cycles</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">These are the same kinds of factors expected in real relay-life estimation: thermal load, operating load, and switching history.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Why prediction works</p>
                  <p className="mt-2 text-xl font-semibold text-white">Stress signals correlate with wear</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">As temperature rises, load spikes, and switching cycles accumulate, relay contact wear accelerates. That relationship is what the prediction layer is visualizing.</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="Edge + Cloud"
                title="Two-layer concept for practical deployment."
                body="The solution is split so some alerts can happen immediately at the inverter, while deeper remaining-life estimation happens in the cloud."
              />
              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-100">Edge concept</p>
                  <p className="mt-2 text-xl font-semibold text-white">Threshold-based buzzer / LED alert</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">If temperature or load crosses critical limits, the edge layer can raise a local buzzer or LED alert immediately without waiting for cloud inference.</p>
                  <p className="mt-3 text-sm text-amber-100">{livePrediction.edgeAlert}</p>
                </div>
                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Cloud concept</p>
                  <p className="mt-2 text-xl font-semibold text-white">ML-style remaining-life prediction</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">MODBUS data is read at the inverter, sent through an IoT device, published over MQTT, scored in the cloud, and displayed as remaining life plus failure risk for maintenance teams.</p>
                  <p className="mt-3 text-sm text-cyan-100">{livePrediction.cloudAlert}</p>
                </div>
              </div>
            </GlassCard>
          </section>

          <section id="simulation" className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="Simulation panel"
                title="Interactive controls that make the AI story tangible."
                body="Move the sliders to simulate harsher operating conditions. Health score, status color, and prediction cards update instantly as operating conditions change."
              />

              <div className="mt-8 space-y-6">
                {[
                  {
                    label: 'Load %',
                    value: simulation.load,
                    min: 10,
                    max: 100,
                    key: 'load',
                  },
                  {
                    label: 'Temperature',
                    value: simulation.temperature,
                    min: 25,
                    max: 95,
                    key: 'temperature',
                  },
                  {
                    label: 'Power cuts frequency',
                    value: simulation.powerCuts,
                    min: 0,
                    max: 12,
                    key: 'powerCuts',
                  },
                ].map((slider) => (
                  <div key={slider.key}>
                    <div className="mb-3 flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-200">{slider.label}</label>
                      <span className="text-sm text-cyan-200">{slider.value}</span>
                    </div>
                    <input
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      value={slider.value}
                      onChange={(event) =>
                        setSimulation((current) => ({
                          ...current,
                          [slider.key]: Number(event.target.value),
                        }))
                      }
                      className="slider w-full"
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid gap-5">
              <GlassCard className={`p-6 ${simulationStyle.border} ${simulationStyle.glow}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Dynamic health score</p>
                    <h3 className="mt-2 text-3xl font-semibold text-white">{simulationState.health}%</h3>
                  </div>
                  <div className={`rounded-full border px-4 py-1 text-sm font-medium ${simulationStyle.border} ${simulationStyle.color}`}>
                    {simulationState.status}
                  </div>
                </div>

                <div className="mt-6 h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={healthPieData}
                        dataKey="value"
                        innerRadius={70}
                        outerRadius={92}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                      >
                        {healthPieData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="-mt-24 text-center sm:-mt-32">
                  <p className="text-4xl font-semibold text-white sm:text-5xl">{simulationState.remainingLife}%</p>
                  <p className="mt-2 text-sm text-slate-400">Remaining Life</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">AI output</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Failure in {simulationState.failureDays} days</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Confidence score</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{simulationState.confidence}%</p>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                  <SlidersHorizontal className="h-4 w-4 text-cyan-300" />
                  Sound alert triggers automatically when the simulation enters warning or critical state.
                </p>
              </GlassCard>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="Historical failure replay"
                title="Replay degradation story over time."
                body="Use the slider to replay failure progression from healthy operation to warning and high-risk states."
              />
              <div className="mt-6 space-y-4">
                <input
                  type="range"
                  min={0}
                  max={historicalReplay.length - 1}
                  value={replayIndex}
                  onChange={(event) => setReplayIndex(Number(event.target.value))}
                  className="slider w-full"
                />
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Day {replayPoint.day}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{replayPoint.status}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Temperature {replayPoint.temperature} C, Load {replayPoint.load}%, Cycles {replayPoint.switchingCycles}, Risk {replayPoint.risk}%.
                  </p>
                </div>
                <div className="grid gap-2 text-sm text-slate-300">
                  {historicalReplay.map((point) => (
                    <p key={point.day} className={point.day === replayPoint.day ? 'text-cyan-200' : ''}>
                      Day {point.day} {'->'} {point.status.toLowerCase()}
                    </p>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="Business impact"
                title="Translate model output into measurable value."
                body="Hackathon judges evaluate business value as much as technical depth."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-rose-100">Without SmartRelay</p>
                  <p className="mt-2 text-xl font-semibold text-white">Downtime: 5 hours</p>
                  <p className="mt-2 text-sm text-slate-200">Estimated loss: ₹50,000 from unplanned interruption and emergency replacement.</p>
                </div>
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-100">With SmartRelay</p>
                  <p className="mt-2 text-xl font-semibold text-white">Downtime: 0</p>
                  <p className="mt-2 text-sm text-slate-200">Prevented failure saves ₹50,000 downtime cost through preventive action and planned service window.</p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Industry readiness</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-100">
                  <li>- Works with existing MODBUS devices</li>
                  <li>- Scalable messaging via MQTT</li>
                  <li>- Cloud-ready architecture for fleet analytics</li>
                  <li>- Tested with simulated inverter data aligned to MODBUS protocol ranges</li>
                </ul>
              </div>
            </GlassCard>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="Alerts & notifications"
                title="Mobile-style escalation UI for field response."
                body="Show the product beyond charts: notification surfaces make the maintenance workflow tangible and operationally useful."
              />
              <div className="mt-8 space-y-4">
                {notifications.map((item, index) => {
                  const toneClass =
                    item.tone === 'critical'
                      ? 'border-rose-400/30 bg-rose-400/10'
                      : 'border-amber-400/30 bg-amber-400/10'
                  const active = selectedNotification.title === item.title

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.12 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className={`rounded-3xl border p-1 ${toneClass} ${active ? 'shadow-[0_0_40px_rgba(34,211,238,0.18)]' : ''}`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedNotificationTitle(item.title)
                          setToast({
                            title: item.title,
                            body: `${item.subtitle} Notification routed to service operations.`,
                            tone: item.tone,
                          })
                        }}
                        className="w-full rounded-[22px] px-4 py-4 text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="rounded-2xl bg-slate-950/40 p-3 text-white">
                            <Smartphone className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            <p className="mt-2 text-sm text-slate-200">{item.subtitle}</p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  )
                })}
              </div>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Selected notification</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{selectedNotification.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{selectedNotification.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleSupportAction('ticket')}
                    className="w-full rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 sm:w-auto"
                  >
                    Escalate to service
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSupportAction('chat')}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 sm:w-auto"
                  >
                    Notify engineer
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="Future scope"
                title="Multiple inverter map for fleet-wide monitoring."
                body="A spatial fleet view helps position the idea as a scalable commercial platform, not just a single-device dashboard."
              />

              <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.42fr]">
                <div className="hidden relative min-h-[280px] overflow-hidden rounded-[28px] border border-cyan-400/12 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.7),rgba(3,7,18,0.96))] sm:block sm:min-h-[360px]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  <div className="absolute inset-[10%] rounded-[36px] border border-white/5" />
                  <div className="absolute left-[18%] top-[28%] h-40 w-52 rounded-full bg-cyan-500/10 blur-3xl" />
                  <div className="absolute right-[10%] top-[18%] h-36 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

                  {inverterMap.map((node) => {
                    const tone = statusStyles[node.status]
                    return (
                      <motion.div
                        key={node.name}
                        className="absolute"
                        style={{ left: node.x, top: node.y }}
                        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedMapNodeName(node.name)}
                          className="relative text-left"
                        >
                          <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-current opacity-20 blur-md" style={{ color: tone.dot }} />
                          <div className={`relative rounded-2xl border border-white/12 bg-slate-950/80 px-3 py-2 shadow-[0_0_36px_rgba(15,23,42,0.5)] ${selectedMapNode.name === node.name ? 'ring-2 ring-cyan-300/50' : ''}`}>
                            <div className="mb-1 flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tone.dot }} />
                              <p className="text-xs font-semibold text-white">{node.name}</p>
                            </div>
                            <p className="text-[11px] text-slate-400">{node.region}</p>
                          </div>
                        </button>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="grid gap-3 sm:hidden">
                  {inverterMap.map((node) => {
                    const tone = statusStyles[node.status]
                    return (
                      <button
                        type="button"
                        key={`${node.name}-mobile`}
                        onClick={() => setSelectedMapNodeName(node.name)}
                        className={`w-full rounded-2xl border bg-white/5 p-4 text-left transition ${tone.border} ${selectedMapNode.name === node.name ? 'shadow-[0_0_40px_rgba(34,211,238,0.16)]' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-white">{node.name}</p>
                            <p className="text-sm text-slate-400">{node.region}</p>
                          </div>
                          <span className={`text-sm ${tone.color}`}>{node.status}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="hidden space-y-3 sm:block">
                  {inverterMap.map((node) => {
                    const tone = statusStyles[node.status]
                    return (
                      <button
                        type="button"
                        key={node.name}
                        onClick={() => setSelectedMapNodeName(node.name)}
                        className={`w-full rounded-2xl border bg-white/5 p-4 text-left transition ${tone.border} ${selectedMapNode.name === node.name ? 'shadow-[0_0_40px_rgba(34,211,238,0.16)]' : 'hover:border-cyan-400/30'}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-white">{node.name}</p>
                            <p className="text-sm text-slate-400">{node.region}</p>
                          </div>
                          <span className={`text-sm ${tone.color}`}>{node.status}</span>
                        </div>
                      </button>
                    )
                  })}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Selected inverter</p>
                    <p className="mt-2 text-lg font-semibold text-white">{selectedMapNode.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{selectedMapNode.region} • {selectedMapNode.status}</p>
                    <p className="mt-2 text-sm text-cyan-100">Fleet health score: {fleetHealthScore}%</p>
                    <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/35 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Top 3 risky devices</p>
                      <div className="mt-2 space-y-1 text-sm text-slate-200">
                        {topRiskyDevices.map((node, index) => (
                          <p key={node.name}>{index + 1}. {node.name} - {node.risk}% risk</p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleSupportAction('maintenance')}
                        className="w-full rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 sm:w-auto"
                      >
                        Schedule visit
                      </button>
                      <button
                        type="button"
                        onClick={dispatchTechnician}
                        className="w-full rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100 sm:w-auto"
                      >
                        Send technician
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSupportAction('chat')}
                        className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 sm:w-auto"
                      >
                        Open live assist
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:hidden">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Selected inverter</p>
                  <p className="mt-2 text-lg font-semibold text-white">{selectedMapNode.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{selectedMapNode.region} • {selectedMapNode.status}</p>
                  <p className="mt-2 text-sm text-cyan-100">Fleet health score: {fleetHealthScore}%</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleSupportAction('maintenance')}
                      className="w-full rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100"
                    >
                      Schedule visit
                    </button>
                    <button
                      type="button"
                      onClick={dispatchTechnician}
                      className="w-full rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100"
                    >
                      Send technician
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupportAction('chat')}
                      className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100"
                    >
                      Open live assist
                    </button>
                  </div>
                </div>
                {lastDispatch ? (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">Field engineer mode</p>
                    <p className="mt-2 text-sm text-slate-100">Location: {lastDispatch.location}</p>
                    <p className="mt-1 text-sm text-slate-100">Issue: {lastDispatch.issue}</p>
                    <p className="mt-1 text-sm text-slate-100">Suggested action: {lastDispatch.action}</p>
                  </div>
                ) : null}
              </div>
            </GlassCard>
          </section>

          <section id="architecture" className="space-y-6">
            <SectionHeader
              eyebrow="Architecture"
              title="End-to-end data flow from inverter hardware to AI-driven action."
              body="Inverter → MODBUS → IoT Device → MQTT → Cloud → AI Model → Dashboard. The visual chain below makes the system easy to pitch by showing exactly how relay telemetry becomes actionable maintenance intelligence."
              align="center"
            />

            <div className="grid gap-4 md:grid-cols-6">
              {architectureFlow.map((item, index) => (
                <ArchitectureNode
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  isLast={index === architectureFlow.length - 1}
                  active={index === activeArchitectureStep}
                  detail={item.detail}
                />
              ))}
            </div>
          </section>

          <section id="team" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <GlassCard className="p-6 md:p-8 xl:p-10">
              <SectionHeader
                eyebrow="Team"
                title="Reducing downtime using AI-powered predictive maintenance."
                body="SmartRelay AI turns raw inverter behavior into clear maintenance decisions. The result is better uptime, smarter service scheduling, and a product vision that feels immediately commercial."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {teamMembers.map((member) => (
                  <button
                    type="button"
                    key={member.role}
                    onClick={() => {
                      setSelectedTeamRole(member.role)
                      setToast({
                        title: member.role,
                        body: `${member.name} details are active in the team panel.`,
                        tone: 'warning',
                      })
                    }}
                    className={`rounded-3xl border bg-white/5 p-5 text-left transition ${selectedTeamMember.role === member.role ? 'border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.14)]' : 'border-white/10 hover:border-cyan-400/20'}`}
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{member.role}</p>
                    <p className="mt-2 text-xl font-semibold text-white">{member.name}</p>
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Selected team focus</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{selectedTeamMember.name}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {selectedTeamMember.role === 'Product Team'
                    ? 'Leads product strategy, inverter lifecycle workflows, and the operator experience across monitoring, service, and support.'
                    : 'Owns the AI, IoT, telemetry, and cloud system that powers predictive maintenance and relay failure forecasting.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => sendCopilotMessage(`Give me a high level summary of the ${selectedTeamMember.role.toLowerCase()}`)}
                    className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100"
                  >
                    Ask Copilot
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToSection('architecture')}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100"
                  >
                    View related flow
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-8 xl:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Platform strengths</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {platformStrengths.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSelectedStrengthId(item.id)}
                    className={`rounded-3xl border p-5 text-left text-sm leading-7 transition ${selectedStrength.id === item.id ? 'border-cyan-400/30 bg-cyan-400/10 text-white shadow-[0_0_40px_rgba(34,211,238,0.16)]' : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/25'}`}
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-2 text-slate-300">{item.summary}</p>
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Active story panel</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{selectedStrength.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{selectedStrength.detail}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDashboardVisible(true)
                    setSelectedStrengthId('storytelling')
                    scrollToSection('dashboard')
                    setToast({
                      title: 'Platform story running',
                      body: 'The walkthrough is now focused on the live dashboard and decision flow.',
                      tone: 'warning',
                    })
                  }}
                  className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 font-semibold text-slate-950"
                >
                  Open Platform Story
                </button>
                <button
                  type="button"
                  onClick={() => {
                    scrollToSection('simulation')
                    runFailureSimulation()
                  }}
                  className="rounded-full border border-white/10 px-5 py-3 font-semibold text-slate-100"
                >
                  Run Simulation
                </button>
              </div>
              {dashboardVisible ? (
                <p className="mt-4 text-sm text-emerald-300">Platform story active. Scroll to the live dashboard to continue the walkthrough.</p>
              ) : null}
            </GlassCard>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
                  <LifeBuoy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Support center</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">Help and Customer Care</h3>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <Headset className="h-5 w-5 text-emerald-300" />
                    <p className="font-medium text-white">Customer Care</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Contact the support desk for product assistance, maintenance scheduling, and escalation handling.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-cyan-100">
                    <p>Phone: +91 1800 120 9000</p>
                    <p>Email: care@smartrelay.ai</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <LifeBuoy className="h-5 w-5 text-cyan-300" />
                    <p className="font-medium text-white">Help Desk</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Access troubleshooting guides, onboarding help, warranty details, and relay replacement recommendations.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleSupportAction('docs')}
                      className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100"
                    >
                      Open Help Docs
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupportAction('ticket')}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100"
                    >
                      Raise Ticket
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Interactive support workspace</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{activeSupportAction.title}</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-slate-200">
                    Active product: {selectedProduct.name}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{activeSupportAction.description}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Case queue</p>
                    <p className="mt-2 text-lg font-semibold text-white">{ticketCount} active cases</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Current serial</p>
                    <p className="mt-2 text-lg font-semibold text-white">{selectedProduct.serial}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Service target</p>
                    <p className="mt-2 text-lg font-semibold text-white">{selectedProduct.location}</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Quick care actions</p>
              <div className="mt-5 grid gap-3">
                {supportActions
                  .filter((item) => item.id !== 'docs' && item.id !== 'ticket')
                  .map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleSupportAction(item.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${supportView === item.id ? 'border-cyan-400/30 bg-cyan-400/10 text-white shadow-[0_0_36px_rgba(34,211,238,0.14)]' : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/25'}`}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Action status</p>
                <p className="mt-2 text-lg font-semibold text-white">{activeSupportAction.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{activeSupportAction.description}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleSupportAction('ticket')}
                    className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100"
                  >
                    Convert to ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('dashboard')}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100"
                  >
                    View product data
                  </button>
                </div>
              </div>
            </GlassCard>
          </section>
        </main>
        )}
      </div>
      ) : null}
    </div>
  )
}

export default App
