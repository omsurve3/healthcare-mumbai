"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Zap, Shield, Users, Mail, Lock, AlertCircle } from "lucide-react"

const roles = [
  { id: "executive", label: "Hospital Executive", description: "Access full analytics dashboard", icon: Shield },
  { id: "department", label: "Department Head", description: "View department-specific data", icon: Users },
  { id: "admin", label: "Administrator", description: "System administration & settings", icon: Zap },
]

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format"

    if (!password) newErrors.password = "Password is required"
    if (!selectedRole) newErrors.role = "Please select a role"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    setApiError("")
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setApiError(data.message || "Login failed")
        setIsLoading(false)
        return
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "phis-user",
          JSON.stringify({
            email: data.user.email,
            fullName: data.user.fullName,
            role: data.user.role,
            hospitalId: data.user.hospitalId,
          }),
        )
      }

      router.push("/dashboard")
    } catch (err) {
      console.error("Login error:", err)
      setApiError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-900">
      {/* LEFT: Login form */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-2xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">SWASTHISHIELD</h1>
            <p className="text-slate-300 text-lg">Sign in to your account</p>
            <p className="text-slate-400 text-sm mt-2">
              Access AI-powered hospital surge predictions & analytics
            </p>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants} className="space-y-4 mb-8">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }))
                    }
                  }}
                  placeholder="sarah@hospital.com"
                  className={`w-full rounded-md border bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 px-3 py-2 text-sm pl-10 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }))
                    }
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-md border bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 px-3 py-2 text-sm pl-10 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>
          </motion.div>

          {/* Role Selection */}
          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {roles.map((role) => {
                const Icon = role.icon
                const isSelected = selectedRole === role.id

                return (
                  <motion.div
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id)
                      if (errors.role) {
                        setErrors((prev) => ({ ...prev, role: "" }))
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-pointer rounded-xl border bg-slate-900/40 backdrop-blur-sm transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-cyan-500 bg-slate-800/80 border-cyan-500"
                        : "border-slate-700/60 hover:bg-slate-800/50 hover:border-slate-500"
                    }`}
                  >
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div
                          className={`p-3 rounded-lg transition-colors duration-300 ${
                            isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-700/50 text-slate-400"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-white mb-2">{role.label}</h3>
                      <p className="text-sm text-slate-400">{role.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            {errors.role && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.role}
              </p>
            )}
          </motion.div>

          {/* API Error */}
          {apiError && (
            <motion.p
              variants={itemVariants}
              className="text-red-400 text-sm mb-4 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {apiError}
            </motion.p>
          )}

          {/* Sign In Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </motion.div>

          {/* Link to Signup */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-slate-400 text-sm">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => router.push("/Signin")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Create one
              </button>
            </p>
          </motion.div>

          {/* Footer */}
          <motion.p variants={itemVariants} className="text-center text-slate-400 text-xs mt-8">
            Clinical Intelligence powered by Advanced AI
          </motion.p>
        </motion.div>
      </div>

      {/* RIGHT: Image */}
      <div className="flex-1 relative hidden lg:block">
        <img
          src="/swasthishield-auth.jpg"
          alt="Hospital analytics preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>
    </div>
  )
}
