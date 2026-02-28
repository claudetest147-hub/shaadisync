'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Users, DollarSign, Download, Trash2, LogOut, Settings as SettingsIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { signOut } from '@/lib/actions/auth'

interface Collaborator {
  id: string
  name: string
  email: string
  role: 'owner' | 'editor' | 'viewer'
}

export default function SettingsPage() {
  const [currency, setCurrency] = useState('USD')

  const collaborators: Collaborator[] = [
    { id: '1', name: 'You', email: 'you@example.com', role: 'owner' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'editor' },
    { id: '3', name: 'John Doe', email: 'john@example.com', role: 'viewer' },
  ]

  const getRoleBadge = (role: string) => {
    if (role === 'owner') return <Badge className="bg-burgundy text-cream">Owner</Badge>
    if (role === 'editor') return <Badge className="bg-blue-100 text-blue-700">Editor</Badge>
    return <Badge className="bg-gray-100 text-gray-700">Viewer</Badge>
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl lg:text-4xl font-bold text-burgundy mb-2">
          Settings
        </h1>
        <p className="text-foreground/70">
          Manage your account and preferences
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-heading text-xl font-bold text-burgundy mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile
        </h2>
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              defaultValue="Jane & John"
              className="h-12 rounded-xl border-burgundy/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue="you@example.com"
              className="h-12 rounded-xl border-burgundy/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="h-12 rounded-xl border-burgundy/20"
            />
          </div>

          <Button className="bg-burgundy hover:bg-burgundy/90 text-cream">
            Save Changes
          </Button>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-heading text-xl font-bold text-burgundy mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Collaborators
        </h2>
        <Card className="p-6 space-y-4">
          <p className="text-sm text-foreground/70">
            Invite family members to help plan your wedding. Owners have full access, editors can modify content, and viewers can only view.
          </p>

          <div className="flex gap-3">
            <Input
              placeholder="Enter email address"
              className="h-12 rounded-xl border-burgundy/20"
            />
            <Button className="bg-burgundy hover:bg-burgundy/90 text-cream whitespace-nowrap">
              Send Invite
            </Button>
          </div>

          <div className="space-y-2 pt-4">
            {collaborators.map((collab) => (
              <div
                key={collab.id}
                className="flex items-center justify-between p-4 bg-burgundy/5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <p className="font-medium text-burgundy">{collab.name}</p>
                    <p className="text-sm text-foreground/70">{collab.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getRoleBadge(collab.role)}
                  {collab.role !== 'owner' && (
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-heading text-xl font-bold text-burgundy mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Preferences
        </h2>
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="h-12 rounded-xl border-burgundy/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select defaultValue="mdy">
              <SelectTrigger className="h-12 rounded-xl border-burgundy/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-heading text-xl font-bold text-burgundy mb-4 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Data
        </h2>
        <Card className="p-6 space-y-4">
          <p className="text-sm text-foreground/70">
            Download your data in CSV format for backup or use in other tools.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 border-burgundy/20 hover:bg-burgundy/5">
              <Download className="w-4 h-4 mr-2" />
              Export Guest List
            </Button>
            <Button variant="outline" className="h-12 border-burgundy/20 hover:bg-burgundy/5">
              <Download className="w-4 h-4 mr-2" />
              Export Budget
            </Button>
            <Button variant="outline" className="h-12 border-burgundy/20 hover:bg-burgundy/5">
              <Download className="w-4 h-4 mr-2" />
              Export Vendors
            </Button>
            <Button variant="outline" className="h-12 border-burgundy/20 hover:bg-burgundy/5">
              <Download className="w-4 h-4 mr-2" />
              Export All Data
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-heading text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5" />
          Danger Zone
        </h2>
        <Card className="p-6 space-y-4 border-red-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-burgundy mb-1">Delete Event</h3>
              <p className="text-sm text-foreground/70">
                Permanently delete this event and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" className="whitespace-nowrap">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Event
            </Button>
          </div>

          <div className="pt-4 border-t border-red-200">
            <form action={signOut}>
              <Button type="submit" variant="outline" className="border-burgundy/20 hover:bg-burgundy/5">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
