import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react'

interface EventCardProps {
  emoji: string
  name: string
  date: string
  time: string
  venue: string
  confirmedGuests: number
  totalGuests: number
  color: string
  onClick?: () => void
}

export function EventCard({
  emoji,
  name,
  date,
  time,
  venue,
  confirmedGuests,
  totalGuests,
  color,
  onClick,
}: EventCardProps) {
  const percentage = Math.round((confirmedGuests / totalGuests) * 100)

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className={`bg-gradient-to-r ${color} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 text-8xl opacity-10">
          {emoji}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{emoji}</span>
            <h3 className="font-heading text-2xl font-bold">{name}</h3>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-burgundy mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground/70">Venue</p>
            <p className="font-medium text-burgundy">{venue}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-burgundy mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-foreground/70 mb-2">Guest Attendance</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">
                  {confirmedGuests} of {totalGuests} confirmed
                </span>
                <span className="font-semibold text-burgundy">{percentage}%</span>
              </div>
              <div className="relative h-2 bg-burgundy/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-y-0 left-0 bg-burgundy rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-burgundy/10">
          <Badge variant="secondary" className="bg-burgundy/5 text-burgundy">
            {totalGuests} invited
          </Badge>
          <ChevronRight className="w-5 h-5 text-burgundy/40 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  )
}
