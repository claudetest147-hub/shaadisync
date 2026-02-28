import { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="p-12 text-center">
      <Icon className="w-20 h-20 text-burgundy/20 mx-auto mb-6" />
      <h3 className="font-heading text-3xl font-bold text-burgundy mb-4">
        {title}
      </h3>
      <p className="text-foreground/70 mb-8 max-w-md mx-auto">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-burgundy hover:bg-burgundy/90 text-cream"
        >
          {actionLabel}
        </Button>
      )}
    </Card>
  )
}
