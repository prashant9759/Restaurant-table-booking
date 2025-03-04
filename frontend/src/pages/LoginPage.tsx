"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Facebook } from "lucide-react"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login")

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" })

  // Signup form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [terms, setTerms] = useState(false)
  const [signupErrors, setSignupErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: "",
  })

  // Login form validation
  const validateLoginForm = () => {
    const errors = { email: "", password: "" }
    let isValid = true

    if (!loginEmail) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!loginPassword) {
      errors.password = "Password is required"
      isValid = false
    } else if (loginPassword.length < 8) {
      errors.password = "Password must be at least 8 characters"
      isValid = false
    }

    setLoginErrors(errors)
    return isValid
  }

  // Signup form validation
  const validateSignupForm = () => {
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: "",
    }
    let isValid = true

    if (!firstName || firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters"
      isValid = false
    }

    if (!lastName || lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters"
      isValid = false
    }

    if (!signupEmail) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!phone || phone.length < 10) {
      errors.phone = "Please enter a valid phone number"
      isValid = false
    }

    if (!signupPassword) {
      errors.password = "Password is required"
      isValid = false
    } else if (signupPassword.length < 8) {
      errors.password = "Password must be at least 8 characters"
      isValid = false
    }

    if (signupPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    if (!terms) {
      errors.terms = "You must accept the terms and conditions"
      isValid = false
    }

    setSignupErrors(errors)
    return isValid
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateLoginForm()) {
      // In a real app, you would handle login here
      alert("Login successful (demo only)")
    }
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateSignupForm()) {
      // In a real app, you would handle signup here
      alert("Signup successful (demo only)")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Tabs */}
        <div className="flex rounded-md overflow-hidden border mb-6">
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === "login" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === "signup" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <div className="bg-white shadow-md rounded-lg border overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Login to your account</h2>
              <p className="text-sm text-gray-500 mt-1">Enter your email and password to access your account</p>
            </div>
            <div className="p-6 space-y-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className={`w-full px-3 py-2 border rounded-md ${
                      loginErrors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  {loginErrors.email && <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-3 py-2 border rounded-md ${
                        loginErrors.password ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {loginErrors.password && <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="mr-2">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Facebook className="h-5 w-5 text-blue-600 mr-2" />
                  Facebook
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Signup Form */}
        {activeTab === "signup" && (
          <div className="bg-white shadow-md rounded-lg border overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Create an account</h2>
              <p className="text-sm text-gray-500 mt-1">Enter your details to create a new account</p>
            </div>
            <div className="p-6 space-y-6">
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      placeholder="John"
                      className={`w-full px-3 py-2 border rounded-md ${
                        signupErrors.firstName ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {signupErrors.firstName && <p className="text-red-500 text-xs mt-1">{signupErrors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      placeholder="Doe"
                      className={`w-full px-3 py-2 border rounded-md ${
                        signupErrors.lastName ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {signupErrors.lastName && <p className="text-red-500 text-xs mt-1">{signupErrors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    className={`w-full px-3 py-2 border rounded-md ${
                      signupErrors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                  {signupErrors.email && <p className="text-red-500 text-xs mt-1">{signupErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    className={`w-full px-3 py-2 border rounded-md ${
                      signupErrors.phone ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {signupErrors.phone && <p className="text-red-500 text-xs mt-1">{signupErrors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-3 py-2 border rounded-md ${
                        signupErrors.password ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signupErrors.password && <p className="text-red-500 text-xs mt-1">{signupErrors.password}</p>}
                  <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-3 py-2 border rounded-md ${
                        signupErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signupErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{signupErrors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I accept the{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        terms and conditions
                      </a>
                    </label>
                    {signupErrors.terms && <p className="text-red-500 text-xs mt-1">{signupErrors.terms}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="mr-2">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Facebook className="h-5 w-5 text-blue-600 mr-2" />
                  Facebook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

