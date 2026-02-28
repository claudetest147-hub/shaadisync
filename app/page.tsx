'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Heart, Calendar, Users, DollarSign, ListChecks, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-cream/80 backdrop-blur-lg border-b border-burgundy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-burgundy fill-burgundy" />
              <span className="font-heading text-xl font-bold text-burgundy">ShaadiSync</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-burgundy hover:text-burgundy/80 transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-burgundy text-cream rounded-lg text-sm font-medium hover:bg-burgundy/90 transition-all active:scale-95">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream to-burgundy/5 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-burgundy">Wedding Planning Made Simple</span>
              </motion.div>

              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-burgundy mb-6 leading-tight">
                Plan Your Perfect
                <span className="block text-gold">Wedding</span>
              </h1>

              <p className="text-lg lg:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
                Manage guests, track RSVPs, plan your budget, and coordinate every detail in one beautiful place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="group px-8 py-4 bg-burgundy text-cream rounded-xl text-lg font-semibold hover:bg-burgundy/90 transition-all active:scale-95 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2">
                  Start Planning Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/vendors" className="px-8 py-4 bg-card text-burgundy rounded-xl text-lg font-semibold hover:bg-card/80 transition-all active:scale-95 border-2 border-burgundy/20">
                  Browse Vendors
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-burgundy/5 rounded-full blur-3xl" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        </section>

        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold text-burgundy mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-foreground/70">
                Powerful features designed for modern couples
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Guest Management',
                  description: 'Import, organize, and manage your guest list with ease. Track plus-ones, dietary restrictions, and contact info.',
                },
                {
                  icon: CheckCircle2,
                  title: 'RSVP Tracking',
                  description: 'Share beautiful RSVP links. Get real-time updates as guests respond. Send automated reminders.',
                },
                {
                  icon: DollarSign,
                  title: 'Budget Planner',
                  description: 'Track estimated vs actual costs. Link payments to vendors. Stay on top of your wedding budget.',
                },
                {
                  icon: Calendar,
                  title: 'Timeline Builder',
                  description: 'Create your day-of schedule. Share timelines with your team. Keep everyone on the same page.',
                },
                {
                  icon: ListChecks,
                  title: 'Planning Checklist',
                  description: 'Pre-built templates for every event type. Assign tasks. Track progress. Never miss a detail.',
                },
                {
                  icon: Heart,
                  title: 'Vendor Directory',
                  description: 'Browse verified vendors. Read reviews. Compare prices. Book the perfect team for your big day.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-cream p-8 rounded-2xl border border-burgundy/10 hover:border-burgundy/20 transition-all hover:shadow-lg group"
                >
                  <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-burgundy/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-burgundy" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-burgundy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-burgundy to-burgundy-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-cream mb-6">
                Start Planning Today
              </h2>
              <p className="text-lg text-cream/80 mb-10">
                Join thousands of couples who&apos;ve planned their perfect wedding with ShaadiSync.
              </p>
              <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-burgundy rounded-xl text-lg font-semibold hover:bg-cream/90 transition-all active:scale-95 shadow-xl">
                Create Your Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <footer className="bg-card py-12 border-t border-burgundy/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-burgundy fill-burgundy" />
                <span className="font-heading text-xl font-bold text-burgundy">ShaadiSync</span>
              </div>
              <p className="text-foreground/60 text-sm">
                © 2026 ShaadiSync. Made with love for modern couples.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
