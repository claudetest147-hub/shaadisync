'use client'

import { Heart, Home, Users, DollarSign, Menu, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/guests', label: 'Guests', icon: Users },
  { href: '/budget', label: 'Budget', icon: DollarSign },
  { href: '/more', label: 'More', icon: Menu },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [fabOpen, setFabOpen] = useState(false)

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-0">
      <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-lg border-b border-burgundy/10 lg:hidden">
        <div className="px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-burgundy fill-burgundy" />
            <span className="font-heading text-xl font-bold text-burgundy">ShaadiSync</span>
          </Link>
        </div>
      </header>

      <div className="lg:flex lg:h-screen">
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-burgundy/10 lg:bg-card">
          <div className="p-6 border-b border-burgundy/10">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-burgundy fill-burgundy" />
              <span className="font-heading text-2xl font-bold text-burgundy">ShaadiSync</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-burgundy text-cream'
                      : 'text-foreground/70 hover:bg-burgundy/5 hover:text-burgundy'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-burgundy/10">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-burgundy/20 hover:bg-burgundy/5"
            >
              <Menu className="w-5 h-5" />
              Settings
            </Button>
          </div>
        </aside>

        <main className="flex-1 lg:overflow-y-auto">
          {children}
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-burgundy/10 lg:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`flex flex-col items-center gap-1 ${
                    isActive ? 'text-burgundy' : 'text-foreground/60'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-burgundy rounded-full"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      <Dialog open={fabOpen} onOpenChange={setFabOpen}>
        <DialogTrigger asChild>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-burgundy text-cream rounded-full shadow-lg flex items-center justify-center lg:hidden"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Quick Add</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <Button
              variant="outline"
              className="justify-start h-14 border-burgundy/20 hover:bg-burgundy/5"
              onClick={() => setFabOpen(false)}
            >
              <Users className="w-5 h-5 mr-3" />
              Add Guest
            </Button>
            <Button
              variant="outline"
              className="justify-start h-14 border-burgundy/20 hover:bg-burgundy/5"
              onClick={() => setFabOpen(false)}
            >
              <DollarSign className="w-5 h-5 mr-3" />
              Add Expense
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
