import { Badge } from '@/components/ui/badge'
import { Check, X, Clock, AlertCircle, LucideIcon } from 'lucide-react'

type StatusType = 'success' | 'error' | 'warning' | 'info' | 'pending'

interface StatusPillProps {
  status: StatusType
  label: string
  icon?: LucideIcon
  className?: string
}

const statusConfig: Record<StatusType, { icon: LucideIcon; className: string }> = {
  success: {
    icon: Check,
    className: 'bg-green-100 text-green-700',
  },
  error: {
    icon: X,
    className: 'bg-red-100 text-red-700',
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-yellow-100 text-yellow-700',
  },
  info: {
    icon: AlertCircle,
    className: 'bg-blue-100 text-blue-700',
  },
  pending: {
    icon: Clock,
    className: 'bg-gray-100 text-gray-700',
  },
}

export function StatusPill({ status, label, icon, className }: StatusPillProps) {
  const config = statusConfig[status]
  const Icon = icon || config.icon

  return (
    <Badge className={`${config.className} ${className || ''}`}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  )
}
