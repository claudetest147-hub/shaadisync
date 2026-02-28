import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  badge?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    className?: string
  }
  iconColor?: string
}

export function StatCard({ icon: Icon, label, value, badge, iconColor = 'text-burgundy' }: StatCardProps) {
  return (
    <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-10 h-10 ${iconColor}`} />
        {badge && (
          <Badge variant={badge.variant || 'secondary'} className={badge.className}>
            {badge.label}
          </Badge>
        )}
      </div>
      <div className="text-3xl font-bold text-burgundy mb-1">{value}</div>
      <div className="text-sm text-foreground/70">{label}</div>
    </Card>
  )
}
