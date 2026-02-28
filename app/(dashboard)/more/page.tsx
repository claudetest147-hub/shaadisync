'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, CheckSquare, Settings, FileText, Gift, Bell, HelpCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function MorePage() {
  const menuItems = [
    { icon: Calendar, label: 'Events', href: '/events', color: 'from-purple-500 to-pink-600' },
    { icon: CheckSquare, label: 'Checklist', href: '/checklist', color: 'from-green-500 to-emerald-600' },
    { icon: Settings, label: 'Settings', href: '/settings', color: 'from-gray-500 to-slate-600' },
    { icon: FileText, label: 'Notes', href: '#', color: 'from-blue-500 to-indigo-600' },
    { icon: Gift, label: 'Registry', href: '#', color: 'from-red-500 to-rose-600' },
    { icon: Bell, label: 'Notifications', href: '#', color: 'from-yellow-500 to-orange-600' },
    { icon: HelpCircle, label: 'Help & Support', href: '#', color: 'from-teal-500 to-cyan-600' },
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl lg:text-4xl font-bold text-burgundy mb-2">
          More
        </h1>
        <p className="text-foreground/70">
          Additional tools and settings
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group active:scale-95">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-burgundy">{item.label}</h3>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
