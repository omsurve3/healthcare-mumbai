"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Zap, Shield, Users, Mail, Lock, Building2, AlertCircle, CheckCircle } from "lucide-react"

const roles = [
  { id: "executive", label: "Hospital Executive", description: "Full analytics dashboard", icon: Shield },
  { id: "department", label: "Department Head", description: "Department-specific data", icon: Users },
  { id: "admin", label: "Administrator", description: "System administration", icon: Zap },
]

export default function SignupPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    hospitalName: "",
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"

    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format"

    if (!formData.hospitalName.trim())
      newErrors.hospitalName = "Hospital name is required"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters"

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password"
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"

    if (!selectedRole) newErrors.role = "Please select a role"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
    if (apiError) setApiError("")
  }

  const handleSignup = async () => {
    setApiError("")
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          hospitalName: formData.hospitalName,
          role: selectedRole,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setApiError(data.message || "Signup failed")
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
      console.error("Signup error:", err)
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
      {/* LEFT: Signup form section */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        {/* Animated background only on left side */}
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
            <p className="text-slate-300 text-lg">Create Your Account</p>
            <p className="text-slate-400 text-sm mt-2">
              Join hospitals already using AI for surge prediction
            </p>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants} className="space-y-4 mb-8">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Dr. Sarah Johnson"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="sarah@hospital.com"
                  value={formData.email}
                  onChange={handleInputChange}
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

            {/* Hospital Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Hospital Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  name="hospitalName"
                  placeholder="City Medical Center"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 px-3 py-2 text-sm pl-10 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
                    errors.hospitalName ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.hospitalName && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.hospitalName}
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 px-3 py-2 text-sm pl-10 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-2">Password must contain:</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-2">
                  {formData.password.length >= 8 ? (
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  At least 8 characters
                </li>
              </ul>
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer rounded-xl border bg-slate-900/40 backdrop-blur-sm transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-cyan-500 bg-slate-800/80 border-cyan-500"
                        : "border-slate-700/60 hover:bg-slate-800/50 hover:border-slate-500"
                    }`}
                  >
                    <div className="p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <div
                          className={`p-2 rounded-lg transition-colors duration-300 ${
                            isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-700/50 text-slate-400"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="font-medium text-white text-sm mb-1">
                        {role.label}
                      </h3>
                      <p className="text-xs text-slate-400">{role.description}</p>
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

          {/* Signup Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </motion.div>

          {/* Login Link */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/Login")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Sign In
              </button>
            </p>
          </motion.div>

          {/* Footer */}
          <motion.p variants={itemVariants} className="text-center text-slate-400 text-xs mt-8">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </motion.div>
      </div>

      {/* RIGHT: Image section */}
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
