import { Card } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

interface CountdownCardProps {
  title: string
  venue?: string
  days: number
  hours: number
  minutes: number
}

export function CountdownCard({ title, venue, days, hours, minutes }: CountdownCardProps) {
  return (
    <Card className="p-8 bg-gradient-to-br from-burgundy to-burgundy-700 text-cream border-0 shadow-xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-cream/80 text-sm mb-1">Next Event</p>
          <h2 className="font-heading text-3xl font-bold">{title}</h2>
          {venue && (
            <p className="text-cream/80 mt-2 flex items-center gap-2">
              {venue}
            </p>
          )}
        </div>
        <Calendar className="w-12 h-12 text-gold" />
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cream/20">
        <div className="text-center">
          <div className="text-4xl font-bold">{days}</div>
          <div className="text-cream/70 text-sm mt-1">Days</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{hours}</div>
          <div className="text-cream/70 text-sm mt-1">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{minutes}</div>
          <div className="text-cream/70 text-sm mt-1">Minutes</div>
        </div>
      </div>
    </Card>
  )
}
