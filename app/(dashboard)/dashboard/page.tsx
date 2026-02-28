'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, DollarSign, CheckCircle2, Clock, MapPin, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/lib/supabase/client'

interface Event {
  id: string
  title: string
  event_date: string
  venue_name: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ user_metadata?: { full_name?: string } } | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        fetchEvents()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchEvents = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('events')
      .select('id, title, event_date, venue_name')
      .order('event_date', { ascending: true })
      .limit(5)

    if (data && !error) {
      setEvents(data)
      if (data[0]?.event_date) {
        updateCountdown(data[0].event_date)
      }
    }
    setLoading(false)
  }

  const updateCountdown = (targetDate: string) => {
    const update = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const distance = target - now

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      })
    }

    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there'

  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-48 w-full" />
        <div className="grid md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl lg:text-4xl font-bold text-burgundy mb-2">
          Hey {firstName}! 👋
        </h1>
        {events.length > 0 && (
          <p className="text-foreground/70 text-lg">
            {countdown.days > 0 ? `${countdown.days} days to go` : 'Your big day is here!'}
          </p>
        )}
      </motion.div>

      {events.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 bg-gradient-to-br from-burgundy to-burgundy-700 text-cream border-0 shadow-xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-cream/80 text-sm mb-1">Next Event</p>
                <h2 className="font-heading text-3xl font-bold">{events[0].title}</h2>
                <p className="text-cream/80 mt-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {events[0].venue_name || 'Venue TBA'}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-gold" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cream/20">
              <div className="text-center">
                <div className="text-4xl font-bold">{countdown.days}</div>
                <div className="text-cream/70 text-sm mt-1">Days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{countdown.hours}</div>
                <div className="text-cream/70 text-sm mt-1">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{countdown.minutes}</div>
                <div className="text-cream/70 text-sm mt-1">Minutes</div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-10 h-10 text-burgundy" />
            <Badge variant="secondary" className="bg-burgundy/10 text-burgundy">
              +12
            </Badge>
          </div>
          <div className="text-3xl font-bold text-burgundy mb-1">48</div>
          <div className="text-sm text-foreground/70">Guests Confirmed</div>
        </Card>

        <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 text-gold" />
            <Badge variant="secondary" className="bg-gold/10 text-gold">
              82%
            </Badge>
          </div>
          <div className="text-3xl font-bold text-burgundy mb-1">$24.5K</div>
          <div className="text-sm text-foreground/70">Budget Spent</div>
        </Card>

        <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
            <Badge variant="secondary" className="bg-green-100 text-green-600">
              5 due
            </Badge>
          </div>
          <div className="text-3xl font-bold text-burgundy mb-1">32 / 45</div>
          <div className="text-sm text-foreground/70">Tasks Complete</div>
        </Card>
      </motion.div>

      {events.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-2xl font-bold text-burgundy">Upcoming Events</h2>
            <button className="text-sm text-burgundy hover:text-burgundy/80 font-medium">
              View All
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            {events.slice(1).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-6 min-w-[280px] bg-card hover:shadow-lg transition-all cursor-pointer active:scale-95">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-burgundy mb-1">{event.title}</h3>
                      <p className="text-sm text-foreground/70 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(event.event_date).toLocaleDateString()}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-foreground/40" />
                  </div>
                  {event.venue_name && (
                    <p className="text-sm text-foreground/70 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.venue_name}
                    </p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-heading text-2xl font-bold text-burgundy mb-4">Recent Activity</h2>
        <Card className="divide-y divide-burgundy/10">
          {[
            { text: 'Sarah Johnson confirmed attendance', time: '2 hours ago', type: 'rsvp' },
            { text: 'Photography payment marked as paid', time: '5 hours ago', type: 'payment' },
            { text: 'Timeline updated for Reception', time: 'Yesterday', type: 'update' },
            { text: '12 new guests added to list', time: '2 days ago', type: 'guest' },
          ].map((activity, index) => (
            <div key={index} className="p-4 hover:bg-burgundy/5 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-burgundy">{activity.text}</p>
                  <p className="text-xs text-foreground/60 mt-1">{activity.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-foreground/40" />
              </div>
            </div>
          ))}
        </Card>
      </motion.div>

      {events.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <Calendar className="w-20 h-20 text-burgundy/20 mx-auto mb-6" />
          <h2 className="font-heading text-3xl font-bold text-burgundy mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            Create your first event to begin organizing your perfect wedding celebration.
          </p>
          <button className="px-6 py-3 bg-burgundy text-cream rounded-xl font-semibold hover:bg-burgundy/90 transition-all active:scale-95">
            Create Event
          </button>
        </motion.div>
      )}
    </div>
  )
}
