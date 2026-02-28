'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Plus, TrendingUp, TrendingDown, Check, Clock, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Expense {
  id: string
  category: string
  item: string
  vendor: string
  estimated: number
  actual: number
  paid: boolean
  status: 'pending' | 'partial' | 'paid'
}

export default function BudgetPage() {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')
  const [sheetOpen, setSheetOpen] = useState(false)

  const expenses: Expense[] = [
    { id: '1', category: 'Venue', item: 'Reception Hall', vendor: 'Grand Ballroom', estimated: 15000, actual: 15000, paid: true, status: 'paid' },
    { id: '2', category: 'Catering', item: 'Food & Beverages', vendor: 'Royal Caterers', estimated: 8000, actual: 8500, paid: true, status: 'paid' },
    { id: '3', category: 'Photography', item: 'Photo + Video', vendor: 'Capture Moments', estimated: 5000, actual: 0, paid: false, status: 'pending' },
    { id: '4', category: 'Decoration', item: 'Floral & Stage', vendor: 'Bloom Studio', estimated: 3000, actual: 1500, paid: true, status: 'partial' },
    { id: '5', category: 'Music', item: 'DJ & Sound', vendor: 'Beat Box', estimated: 2000, actual: 0, paid: false, status: 'pending' },
    { id: '6', category: 'Makeup', item: 'Bridal Makeup', vendor: 'Glam by Sara', estimated: 1500, actual: 1500, paid: true, status: 'paid' },
  ]

  const totalEstimated = expenses.reduce((sum, e) => sum + e.estimated, 0)
  const totalActual = expenses.reduce((sum, e) => sum + e.actual, 0)
  const totalPaid = expenses.filter(e => e.paid).reduce((sum, e) => sum + e.actual, 0)
  const remaining = totalEstimated - totalActual

  const conversionRate = 83
  const convert = (amount: number) => currency === 'INR' ? amount * conversionRate : amount

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.actual
    return acc
  }, {} as Record<string, number>)

  const maxCategory = Math.max(...Object.values(categoryTotals))

  const getStatusBadge = (status: string) => {
    if (status === 'paid') return <Badge className="bg-green-100 text-green-700"><Check className="w-3 h-3 mr-1" />Paid</Badge>
    if (status === 'partial') return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Partial</Badge>
    return <Badge className="bg-red-100 text-red-700"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>
  }

  const formatCurrency = (amount: number) => {
    const value = convert(amount)
    return currency === 'USD' 
      ? `$${value.toLocaleString()}` 
      : `₹${value.toLocaleString()}`
  }

  const spentPercentage = (totalActual / totalEstimated) * 100

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-burgundy mb-2">
            Budget Tracker
          </h1>
          <p className="text-foreground/70">
            {formatCurrency(totalActual)} spent of {formatCurrency(totalEstimated)} budget
          </p>
        </div>

        <div className="flex gap-3">
          <Select value={currency} onValueChange={(v) => setCurrency(v as 'USD' | 'INR')}>
            <SelectTrigger className="w-24 border-burgundy/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
            </SelectContent>
          </Select>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-burgundy hover:bg-burgundy/90 text-cream">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl text-burgundy">
                  Add Expense
                </SheetTitle>
              </SheetHeader>
              <form className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-burgundy/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venue">Venue</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="decoration">Decoration</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="makeup">Makeup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input className="h-12 rounded-xl border-burgundy/20" placeholder="e.g. Reception Hall" />
                </div>

                <div className="space-y-2">
                  <Label>Vendor</Label>
                  <Input className="h-12 rounded-xl border-burgundy/20" placeholder="Vendor name" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Estimated Cost</Label>
                    <Input type="number" className="h-12 rounded-xl border-burgundy/20" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Actual Cost</Label>
                    <Input type="number" className="h-12 rounded-xl border-burgundy/20" placeholder="0" />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl bg-burgundy hover:bg-burgundy/90 text-cream">
                  Add Expense
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card className="p-8 bg-gradient-to-br from-burgundy to-burgundy-700 text-cream">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-cream/80 text-sm mb-1">Total Budget</p>
            <h2 className="font-heading text-4xl font-bold">{formatCurrency(totalEstimated)}</h2>
          </div>
          <DollarSign className="w-16 h-16 text-gold" />
        </div>

        <div className="relative h-4 bg-cream/20 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${spentPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gold rounded-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream/20">
          <div>
            <p className="text-cream/70 text-sm mb-1">Spent</p>
            <p className="text-xl font-bold">{formatCurrency(totalActual)}</p>
          </div>
          <div>
            <p className="text-cream/70 text-sm mb-1">Remaining</p>
            <p className="text-xl font-bold">{formatCurrency(remaining)}</p>
          </div>
          <div>
            <p className="text-cream/70 text-sm mb-1">Paid</p>
            <p className="text-xl font-bold">{formatCurrency(totalPaid)}</p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="font-heading text-2xl font-bold text-burgundy mb-4">By Category</h2>
        <Card className="p-6 space-y-4">
          {Object.entries(categoryTotals).map(([category, amount], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-burgundy">{category}</span>
                <span className="text-foreground/70">{formatCurrency(amount)}</span>
              </div>
              <div className="relative h-3 bg-burgundy/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(amount / maxCategory) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="absolute inset-y-0 left-0 bg-burgundy rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </Card>
      </div>

      <div>
        <h2 className="font-heading text-2xl font-bold text-burgundy mb-4">All Expenses</h2>
        <div className="space-y-3">
          {expenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-burgundy truncate">{expense.item}</h3>
                      {getStatusBadge(expense.status)}
                    </div>
                    <p className="text-sm text-foreground/70 truncate">{expense.vendor}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-foreground/60">
                      <span>Estimated: {formatCurrency(expense.estimated)}</span>
                      {expense.actual > 0 && (
                        <span className={expense.actual > expense.estimated ? 'text-red-600' : 'text-green-600'}>
                          Actual: {formatCurrency(expense.actual)}
                          {expense.actual > expense.estimated ? (
                            <TrendingUp className="inline w-3 h-3 ml-1" />
                          ) : (
                            <TrendingDown className="inline w-3 h-3 ml-1" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-burgundy/5 text-burgundy">
                    {expense.category}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
