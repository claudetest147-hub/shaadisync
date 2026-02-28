'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Clock, Users, Send, Link2, Copy } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

interface RSVPGuest {
  id: string
  name: string
  email: string
  rsvp_status: 'accepted' | 'declined' | 'pending'
  party_size: number
  dietary_restrictions?: string
  responded_at?: string
  rsvp_token: string
}

export default function RSVPPage() {
  const [guests, setGuests] = useState<RSVPGuest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<RSVPGuest[]>([])
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedGuest, setSelectedGuest] = useState<RSVPGuest | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    fetchRSVPs()
  }, [])

  useEffect(() => {
    filterGuests()
  }, [guests, selectedStatus])

  const fetchRSVPs = async () => {
    // Mock data - replace with actual API call
    const mockGuests: RSVPGuest[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        rsvp_status: 'accepted',
        party_size: 2,
        dietary_restrictions: 'Vegetarian',
        responded_at: '2026-02-15',
        rsvp_token: 'abc123',
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@example.com',
        rsvp_status: 'accepted',
        party_size: 2,
        responded_at: '2026-02-18',
        rsvp_token: 'def456',
      },
      {
        id: '3',
        name: 'Emily Davis',
        email: 'emily@example.com',
        rsvp_status: 'pending',
        party_size: 1,
        rsvp_token: 'ghi789',
      },
      {
        id: '4',
        name: 'David Lee',
        email: 'david@example.com',
        rsvp_status: 'declined',
        party_size: 1,
        responded_at: '2026-02-20',
        rsvp_token: 'jkl012',
      },
      {
        id: '5',
        name: 'Anna Smith',
        email: 'anna@example.com',
        rsvp_status: 'pending',
        party_size: 3,
        rsvp_token: 'mno345',
      },
    ]
    setGuests(mockGuests)
  }

  const filterGuests = () => {
    if (selectedStatus === 'all') {
      setFilteredGuests(guests)
    } else {
      setFilteredGuests(guests.filter(g => g.rsvp_status === selectedStatus))
    }
  }

  const copyRSVPLink = (token: string) => {
    const link = `${window.location.origin}/rsvp/${token}`
    navigator.clipboard.writeText(link)
    toast.success('RSVP link copied to clipboard!')
  }

  const stats = {
    total: guests.length,
    accepted: guests.filter(g => g.rsvp_status === 'accepted').length,
    declined: guests.filter(g => g.rsvp_status === 'declined').length,
    pending: guests.filter(g => g.rsvp_status === 'pending').length,
    totalAttending: guests
      .filter(g => g.rsvp_status === 'accepted')
      .reduce((sum, g) => sum + g.party_size, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'declined':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Check className="h-4 w-4" />
      case 'declined':
        return <X className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary">RSVP Management</h1>
            <p className="mt-2 text-muted-foreground">
              Track guest responses and manage invitations
            </p>
          </div>
          <Button className="gap-2">
            <Send className="h-4 w-4" />
            Send Reminders
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invited</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold">{stats.accepted}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-3">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Declined</p>
                <p className="text-2xl font-bold">{stats.declined}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-100 p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attending</p>
                <p className="text-2xl font-bold">{stats.totalAttending}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
          <TabsList>
            <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({stats.accepted})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="declined">Declined ({stats.declined})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Guest List */}
        <div className="grid gap-4">
          {filteredGuests.map((guest) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                className="cursor-pointer p-6 transition-all hover:shadow-md"
                onClick={() => {
                  setSelectedGuest(guest)
                  setSheetOpen(true)
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                      {guest.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{guest.name}</h3>
                      <p className="text-sm text-muted-foreground">{guest.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Party Size</p>
                      <p className="text-2xl font-bold">{guest.party_size}</p>
                    </div>
                    <Badge className={\`gap-1 \${getStatusColor(guest.rsvp_status)}\`}>
                      {getStatusIcon(guest.rsvp_status)}
                      {guest.rsvp_status.charAt(0).toUpperCase() + guest.rsvp_status.slice(1)}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyRSVPLink(guest.rsvp_token)
                      }}
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Guest Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Guest Details</SheetTitle>
          </SheetHeader>
          {selectedGuest && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="mt-1 text-lg font-semibold">{selectedGuest.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="mt-1">{selectedGuest.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Badge className={\`mt-1 gap-1 \${getStatusColor(selectedGuest.rsvp_status)}\`}>
                  {getStatusIcon(selectedGuest.rsvp_status)}
                  {selectedGuest.rsvp_status.charAt(0).toUpperCase() + selectedGuest.rsvp_status.slice(1)}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Party Size</label>
                <p className="mt-1 text-2xl font-bold">{selectedGuest.party_size}</p>
              </div>

              {selectedGuest.dietary_restrictions && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Dietary Restrictions
                  </label>
                  <p className="mt-1">{selectedGuest.dietary_restrictions}</p>
                </div>
              )}

              {selectedGuest.responded_at && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Responded On
                  </label>
                  <p className="mt-1">{selectedGuest.responded_at}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">RSVP Link</label>
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 justify-start gap-2"
                    onClick={() => copyRSVPLink(selectedGuest.rsvp_token)}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
