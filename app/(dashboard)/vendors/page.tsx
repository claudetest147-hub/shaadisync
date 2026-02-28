'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Utensils, Music, Palette, Sparkles, Phone, Mail, Plus, DollarSign } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface Vendor {
  id: string
  name: string
  category: string
  phone: string
  email: string
  cost: number
  status: 'contacted' | 'booked' | 'deposit' | 'paid'
  notes: string
  payments: { date: string; amount: number; type: string }[]
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Photography: Camera,
  Catering: Utensils,
  Music: Music,
  Decoration: Palette,
  Makeup: Sparkles,
}

export default function VendorsPage() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Capture Moments',
      category: 'Photography',
      phone: '+1 555-0123',
      email: 'info@capturemoments.com',
      cost: 5000,
      status: 'booked',
      notes: 'Includes photo + video package, drone footage',
      payments: [
        { date: '2026-01-15', amount: 1500, type: 'Deposit' },
      ],
    },
    {
      id: '2',
      name: 'Royal Caterers',
      category: 'Catering',
      phone: '+1 555-0456',
      email: 'contact@royalcaterers.com',
      cost: 8500,
      status: 'paid',
      notes: '150 guests, vegetarian & non-veg options',
      payments: [
        { date: '2026-01-10', amount: 4000, type: 'Deposit' },
        { date: '2026-02-20', amount: 4500, type: 'Final Payment' },
      ],
    },
    {
      id: '3',
      name: 'Beat Box',
      category: 'Music',
      phone: '+1 555-0789',
      email: 'bookings@beatbox.com',
      cost: 2000,
      status: 'contacted',
      notes: 'DJ + sound system for reception',
      payments: [],
    },
    {
      id: '4',
      name: 'Bloom Studio',
      category: 'Decoration',
      phone: '+1 555-0321',
      email: 'hello@bloomstudio.com',
      cost: 3000,
      status: 'deposit',
      notes: 'Floral arrangements + stage decoration',
      payments: [
        { date: '2026-02-01', amount: 1500, type: 'Deposit' },
      ],
    },
    {
      id: '5',
      name: 'Glam by Sara',
      category: 'Makeup',
      phone: '+1 555-0654',
      email: 'sara@glambysara.com',
      cost: 1500,
      status: 'paid',
      notes: 'Bridal makeup + hair styling',
      payments: [
        { date: '2026-02-15', amount: 1500, type: 'Full Payment' },
      ],
    },
  ]

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'contacted':
        return { label: 'Contacted', color: 'bg-blue-100 text-blue-700' }
      case 'booked':
        return { label: 'Booked', color: 'bg-purple-100 text-purple-700' }
      case 'deposit':
        return { label: 'Deposit Paid', color: 'bg-yellow-100 text-yellow-700' }
      case 'paid':
        return { label: 'Fully Paid', color: 'bg-green-100 text-green-700' }
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700' }
    }
  }

  const statusOrder = ['contacted', 'booked', 'deposit', 'paid']

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-burgundy mb-2">
            Vendors
          </h1>
          <p className="text-foreground/70">
            {vendors.length} vendors • {vendors.filter(v => v.status === 'paid').length} fully paid
          </p>
        </div>

        <Button className="bg-burgundy hover:bg-burgundy/90 text-cream">
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
        {statusOrder.map((status) => {
          const config = getStatusConfig(status)
          const count = vendors.filter(v => v.status === status).length
          return (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${config.color}`}
            >
              {config.label} ({count})
            </button>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((vendor, index) => {
          const Icon = categoryIcons[vendor.category] || Camera
          const statusConfig = getStatusConfig(vendor.status)
          const totalPaid = vendor.payments.reduce((sum, p) => sum + p.amount, 0)

          return (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="p-6 hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
                onClick={() => {
                  setSelectedVendor(vendor)
                  setSheetOpen(true)
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-burgundy" />
                  </div>
                  <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                </div>

                <h3 className="font-heading text-lg font-bold text-burgundy mb-1">
                  {vendor.name}
                </h3>
                <p className="text-sm text-foreground/70 mb-4">{vendor.category}</p>

                <div className="flex items-center justify-between pt-4 border-t border-burgundy/10">
                  <div>
                    <p className="text-xs text-foreground/60">Total Cost</p>
                    <p className="text-lg font-bold text-burgundy">${vendor.cost.toLocaleString()}</p>
                  </div>
                  {totalPaid > 0 && (
                    <div className="text-right">
                      <p className="text-xs text-foreground/60">Paid</p>
                      <p className="text-sm font-semibold text-green-600">${totalPaid.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-heading text-2xl text-burgundy">
              {selectedVendor?.name}
            </SheetTitle>
          </SheetHeader>

          {selectedVendor && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = categoryIcons[selectedVendor.category] || Camera
                  return <Icon className="w-8 h-8 text-burgundy" />
                })()}
                <div>
                  <p className="text-sm text-foreground/70">Category</p>
                  <p className="font-semibold text-burgundy">{selectedVendor.category}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-foreground/70 mb-2">Status</p>
                <Badge className={`${getStatusConfig(selectedVendor.status).color} text-base px-4 py-2`}>
                  {getStatusConfig(selectedVendor.status).label}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-foreground/70 mb-1">Total Cost</p>
                  <p className="text-2xl font-bold text-burgundy">
                    ${selectedVendor.cost.toLocaleString()}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-foreground/70 mb-1">Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${selectedVendor.payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                  </p>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold text-burgundy mb-3">Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${selectedVendor.phone}`}
                    className="flex items-center gap-3 p-3 bg-burgundy/5 rounded-xl hover:bg-burgundy/10 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-burgundy" />
                    <span className="text-burgundy font-medium">{selectedVendor.phone}</span>
                  </a>
                  <a
                    href={`mailto:${selectedVendor.email}`}
                    className="flex items-center gap-3 p-3 bg-burgundy/5 rounded-xl hover:bg-burgundy/10 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-burgundy" />
                    <span className="text-burgundy font-medium">{selectedVendor.email}</span>
                  </a>
                </div>
              </div>

              {selectedVendor.notes && (
                <div>
                  <h3 className="font-semibold text-burgundy mb-2">Notes</h3>
                  <p className="text-foreground/70">{selectedVendor.notes}</p>
                </div>
              )}

              {selectedVendor.payments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-burgundy mb-3">Payment History</h3>
                  <div className="space-y-2">
                    {selectedVendor.payments.map((payment, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-burgundy">{payment.type}</p>
                            <p className="text-sm text-foreground/60">
                              {new Date(payment.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-lg font-bold text-green-600">
                              ${payment.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-burgundy hover:bg-burgundy/90 text-cream">
                  Edit Details
                </Button>
                <Button variant="outline" className="flex-1 border-burgundy/20">
                  Add Payment
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
