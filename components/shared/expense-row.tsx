import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Clock, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface ExpenseRowProps {
  item: string
  vendor: string
  category: string
  estimated: number
  actual: number
  status: 'pending' | 'partial' | 'paid'
  currency?: 'USD' | 'INR'
  onClick?: () => void
}

export function ExpenseRow({
  item,
  vendor,
  category,
  estimated,
  actual,
  status,
  currency = 'USD',
  onClick,
}: ExpenseRowProps) {
  const formatCurrency = (amount: number) => {
    return currency === 'USD'
      ? `$${amount.toLocaleString()}`
      : `₹${amount.toLocaleString()}`
  }

  const getStatusBadge = () => {
    if (status === 'paid') {
      return (
        <Badge className="bg-green-100 text-green-700">
          <Check className="w-3 h-3 mr-1" />
          Paid
        </Badge>
      )
    }
    if (status === 'partial') {
      return (
        <Badge className="bg-yellow-100 text-yellow-700">
          <Clock className="w-3 h-3 mr-1" />
          Partial
        </Badge>
      )
    }
    return (
      <Badge className="bg-red-100 text-red-700">
        <AlertCircle className="w-3 h-3 mr-1" />
        Pending
      </Badge>
    )
  }

  return (
    <Card className="p-4 hover:shadow-lg transition-all cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-burgundy truncate">{item}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-sm text-foreground/70 truncate">{vendor}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-foreground/60">
            <span>Estimated: {formatCurrency(estimated)}</span>
            {actual > 0 && (
              <span
                className={
                  actual > estimated ? 'text-red-600' : 'text-green-600'
                }
              >
                Actual: {formatCurrency(actual)}
                {actual > estimated ? (
                  <TrendingUp className="inline w-3 h-3 ml-1" />
                ) : (
                  <TrendingDown className="inline w-3 h-3 ml-1" />
                )}
              </span>
            )}
          </div>
        </div>
        <Badge variant="secondary" className="bg-burgundy/5 text-burgundy">
          {category}
        </Badge>
      </div>
    </Card>
  )
}
