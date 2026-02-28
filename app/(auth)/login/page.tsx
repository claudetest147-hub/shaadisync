'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, signup, signInWithGoogle } from '@/lib/actions/auth'
import { Mail, Lock, User, Chrome } from 'lucide-react'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = mode === 'login' 
        ? await login(formData)
        : await signup(formData)
      
      if (result?.error) {
        setError(result.error)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await signInWithGoogle()
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
    } catch {
      setError('Failed to sign in with Google')
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-burgundy mb-3">
          {mode === 'login' ? 'Welcome Back' : 'Get Started'}
        </h1>
        <p className="text-foreground/70">
          {mode === 'login' 
            ? 'Sign in to continue planning your wedding' 
            : 'Create your account to start planning'}
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6"
        >
          <p className="text-sm text-destructive">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === 'signup' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <Label htmlFor="full_name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Jane & John"
                required
                className="pl-10 h-12 rounded-xl border-burgundy/20 focus:border-burgundy"
              />
            </div>
          </motion.div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="pl-10 h-12 rounded-xl border-burgundy/20 focus:border-burgundy"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              className="pl-10 h-12 rounded-xl border-burgundy/20 focus:border-burgundy"
            />
          </div>
        </div>

        {mode === 'login' && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-burgundy/20" />
              <span className="text-foreground/70">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-burgundy hover:text-burgundy/80">
              Forgot password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-burgundy hover:bg-burgundy/90 text-cream font-semibold text-base"
        >
          {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-burgundy/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-cream text-foreground/60">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full h-12 rounded-xl border-burgundy/20 hover:bg-burgundy/5"
      >
        <Chrome className="w-5 h-5 mr-2" />
        Google
      </Button>

      <div className="mt-8 text-center text-sm">
        <span className="text-foreground/70">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        </span>
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login')
            setError('')
          }}
          className="text-burgundy hover:text-burgundy/80 font-semibold"
        >
          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </motion.div>
  )
}
