'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Plus, Clock, FileText, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface SubEvent {
  id: string
  name: string
  emoji: string
  date: string
  time: string
  venue: string
  confirmedGuests: number
  totalGuests: number
  notes: string
  color: string
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<SubEvent | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const events: SubEvent[] = [
    {
      id: '1',
      name: 'Mehndi Night',
      emoji: '🎨',
      date: 'March 18, 2026',
      time: '6:00 PM',
      venue: 'Garden Lawn, Home',
      confirmedGuests: 45,
      totalGuests: 60,
      notes: 'Traditional mehndi ceremony with music and snacks. Ladies only event.',
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: '2',
      name: 'Haldi Ceremony',
      emoji: '💛',
      date: 'March 19, 2026',
      time: '10:00 AM',
      venue: 'Home',
      confirmedGuests: 30,
      totalGuests: 40,
      notes: 'Morning Haldi ceremony. Wear yellow clothes. Breakfast will be served.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: '3',
      name: 'Sangeet Night',
      emoji: '🎵',
      date: 'March 20, 2026',
      time: '7:00 PM',
      venue: 'Grand Ballroom',
      confirmedGuests: 120,
      totalGuests: 150,
      notes: 'Evening of music and dance performances. DJ + live band. Dinner included.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: '4',
      name: 'Wedding Ceremony',
      emoji: '💍',
      date: 'March 21, 2026',
      time: '9:00 AM',
      venue: 'Temple Hall',
      confirmedGuests: 180,
      totalGuests: 200,
      notes: 'Traditional Hindu wedding ceremony. Starts at 9 AM sharp. Lunch will be served.',
      color: 'from-red-500 to-rose-600',
    },
    {
      id: '5',
      name: 'Reception',
      emoji: '🥂',
      date: 'March 21, 2026',
      time: '7:00 PM',
      venue: 'Grand Ballroom',
      confirmedGuests: 250,
      totalGuests: 300,
      notes: 'Evening reception with cocktails and dinner. Formal attire.',
      color: 'from-burgundy to-burgundy-700',
    },
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-burgundy mb-2">
            Events
          </h1>
          <p className="text-foreground/70">
            {events.length} ceremonies planned
          </p>
        </div>

        <Button className="bg-burgundy hover:bg-burgundy/90 text-cream">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => {
                setSelectedEvent(event)
                setSheetOpen(true)
              }}
            >
              <div className={`bg-gradient-to-r ${event.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-8xl opacity-10">
                  {event.emoji}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{event.emoji}</span>
                    <h3 className="font-heading text-2xl font-bold">{event.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-burgundy mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground/70">Venue</p>
                    <p className="font-medium text-burgundy">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-burgundy mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground/70 mb-2">Guest Attendance</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/70">
                          {event.confirmedGuests} of {event.totalGuests} confirmed
                        </span>
                        <span className="font-semibold text-burgundy">
                          {Math.round((event.confirmedGuests / event.totalGuests) * 100)}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-burgundy/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(event.confirmedGuests / event.totalGuests) * 100}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                          className="absolute inset-y-0 left-0 bg-burgundy rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-burgundy/10">
                  <Badge variant="secondary" className="bg-burgundy/5 text-burgundy">
                    {event.totalGuests} invited
                  </Badge>
                  <ChevronRight className="w-5 h-5 text-burgundy/40 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl overflow-y-auto">
          {selectedEvent && (
            <>
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-r ${selectedEvent.color}`} />
              
              <div className="relative z-10">
                <SheetHeader className="text-white mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{selectedEvent.emoji}</span>
                    <SheetTitle className="font-heading text-3xl text-white">
                      {selectedEvent.name}
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <div className="space-y-6 bg-cream rounded-t-3xl p-6 -mx-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 text-foreground/70 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Date</span>
                      </div>
                      <p className="font-semibold text-burgundy">{selectedEvent.date}</p>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2 text-foreground/70 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Time</span>
                      </div>
                      <p className="font-semibold text-burgundy">{selectedEvent.time}</p>
                    </Card>
                  </div>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-foreground/70 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Venue</span>
                    </div>
                    <p className="font-semibold text-burgundy">{selectedEvent.venue}</p>
                  </Card>

                  <div>
                    <h3 className="font-semibold text-burgundy mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Guest List
                    </h3>
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-3xl font-bold text-burgundy">{selectedEvent.confirmedGuests}</p>
                          <p className="text-sm text-foreground/70">Confirmed</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-foreground/50">{selectedEvent.totalGuests}</p>
                          <p className="text-sm text-foreground/70">Total Invited</p>
                        </div>
                      </div>
                      <div className="relative h-3 bg-burgundy/10 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-burgundy rounded-full"
                          style={{ width: `${(selectedEvent.confirmedGuests / selectedEvent.totalGuests) * 100}%` }}
                        />
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold text-burgundy mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Notes
                    </h3>
                    <Card className="p-4">
                      <p className="text-foreground/70">{selectedEvent.notes}</p>
                    </Card>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-burgundy hover:bg-burgundy/90 text-cream">
                      View Guest List
                    </Button>
                    <Button variant="outline" className="flex-1 border-burgundy/20">
                      Edit Event
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
