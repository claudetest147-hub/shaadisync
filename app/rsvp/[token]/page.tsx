'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Users, Check, X, Minus, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import confetti from 'canvas-confetti'

interface SubEvent {
  id: string
  name: string
  date: string
  venue: string
  response: 'yes' | 'no' | 'maybe' | null
  mealPreference: string
}

export default function RSVPPage() {
  const [step, setStep] = useState<'form' | 'thank-you'>('form')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [plusOnes, setPlusOnes] = useState(0)
  const [message, setMessage] = useState('')
  const [subEvents, setSubEvents] = useState<SubEvent[]>([
    { id: '1', name: 'Engagement Ceremony', date: 'March 15, 2026', venue: 'Garden Estate', response: null, mealPreference: '' },
    { id: '2', name: 'Mehndi Night', date: 'March 20, 2026', venue: 'Home', response: null, mealPreference: '' },
    { id: '3', name: 'Wedding Ceremony', date: 'March 21, 2026', venue: 'Grand Ballroom', response: null, mealPreference: '' },
    { id: '4', name: 'Reception', date: 'March 21, 2026', venue: 'Grand Ballroom', response: null, mealPreference: '' },
  ])

  const updateResponse = (id: string, response: 'yes' | 'no' | 'maybe') => {
    setSubEvents(subEvents.map(event =>
      event.id === id ? { ...event, response: event.response === response ? null : response } : event
    ))
  }

  const updateMealPreference = (id: string, preference: string) => {
    setSubEvents(subEvents.map(event =>
      event.id === id ? { ...event, mealPreference: preference } : event
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      })
    }, 250)

    setStep('thank-you')
  }

  const canSubmit = guestName && guestEmail && subEvents.some(e => e.response)

  if (step === 'thank-you') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-burgundy/5 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-12 text-center border-burgundy/20 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-12 h-12 text-burgundy fill-burgundy" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-4xl font-bold text-burgundy mb-4"
            >
              Thank You!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-foreground/70 mb-8"
            >
              We&apos;ve received your RSVP. We can&apos;t wait to celebrate with you!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-burgundy/5 rounded-2xl p-6 mb-8"
            >
              <p className="text-sm text-foreground/70 mb-2">Confirmed for</p>
              <p className="font-semibold text-burgundy text-lg">{guestName}</p>
              {plusOnes > 0 && (
                <p className="text-sm text-foreground/70 mt-2">Plus {plusOnes} guest{plusOnes > 1 ? 's' : ''}</p>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-foreground/60"
            >
              A confirmation has been sent to {guestEmail}
            </motion.p>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-burgundy/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Heart className="w-8 h-8 text-burgundy fill-burgundy" />
            <span className="font-heading text-3xl font-bold text-burgundy">Jane & John</span>
          </motion.div>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-burgundy mb-3">
            You&apos;re Invited!
          </h1>
          <p className="text-lg text-foreground/70">
            We&apos;d love to have you celebrate with us
          </p>
        </div>

        <Card className="p-8 border-burgundy/20 shadow-xl mb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-burgundy">Your Details</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="h-12 rounded-xl border-burgundy/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="h-12 rounded-xl border-burgundy/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Bringing Guests?</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setPlusOnes(Math.max(0, plusOnes - 1))}
                    disabled={plusOnes === 0}
                    className="h-12 w-12 rounded-xl border-burgundy/20"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-burgundy">{plusOnes}</span>
                    <p className="text-sm text-foreground/70">additional guest{plusOnes !== 1 ? 's' : ''}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setPlusOnes(plusOnes + 1)}
                    className="h-12 w-12 rounded-xl border-burgundy/20"
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-burgundy">Events</h2>
              <p className="text-sm text-foreground/70">Let us know which events you can attend</p>

              <div className="space-y-4">
                {subEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 bg-card border-burgundy/10">
                      <div className="mb-4">
                        <h3 className="font-semibold text-burgundy text-lg mb-2">{event.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-foreground/70">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.venue}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3 mb-4">
                        <Button
                          type="button"
                          variant={event.response === 'yes' ? 'default' : 'outline'}
                          onClick={() => updateResponse(event.id, 'yes')}
                          className={`flex-1 h-12 rounded-xl ${
                            event.response === 'yes'
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'border-burgundy/20 hover:bg-green-50'
                          }`}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Yes
                        </Button>

                        <Button
                          type="button"
                          variant={event.response === 'maybe' ? 'default' : 'outline'}
                          onClick={() => updateResponse(event.id, 'maybe')}
                          className={`flex-1 h-12 rounded-xl ${
                            event.response === 'maybe'
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                              : 'border-burgundy/20 hover:bg-yellow-50'
                          }`}
                        >
                          <Minus className="w-4 h-4 mr-2" />
                          Maybe
                        </Button>

                        <Button
                          type="button"
                          variant={event.response === 'no' ? 'default' : 'outline'}
                          onClick={() => updateResponse(event.id, 'no')}
                          className={`flex-1 h-12 rounded-xl ${
                            event.response === 'no'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'border-burgundy/20 hover:bg-red-50'
                          }`}
                        >
                          <X className="w-4 h-4 mr-2" />
                          No
                        </Button>
                      </div>

                      {event.response === 'yes' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <Select
                            value={event.mealPreference}
                            onValueChange={(value) => updateMealPreference(event.id, value)}
                          >
                            <SelectTrigger className="h-12 rounded-xl border-burgundy/20">
                              <SelectValue placeholder="Select meal preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vegetarian">Vegetarian</SelectItem>
                              <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                              <SelectItem value="vegan">Vegan</SelectItem>
                              <SelectItem value="halal">Halal</SelectItem>
                              <SelectItem value="kosher">Kosher</SelectItem>
                            </SelectContent>
                          </Select>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message to the Couple (Optional)</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your well wishes..."
                  rows={4}
                  className="w-full pl-10 pt-3 pr-4 pb-3 rounded-xl border border-burgundy/20 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20 resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full h-14 rounded-xl bg-burgundy hover:bg-burgundy/90 text-cream font-semibold text-lg"
            >
              Submit RSVP
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-foreground/60">
          Powered by <span className="text-burgundy font-semibold">ShaadiSync</span>
        </p>
      </motion.div>
    </div>
  )
}
