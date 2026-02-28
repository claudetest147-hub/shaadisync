'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Link2, UserPlus, Check, X, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Guest {
  id: string
  name: string
  email: string
  group_name: string
  plus_one_allowed: boolean
  rsvp_status?: 'accepted' | 'declined' | 'pending'
  party_size: number
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    fetchGuests()
  }, [])

  useEffect(() => {
    filterGuests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guests, searchQuery, selectedGroup])

  const fetchGuests = async () => {
    const mockGuests: Guest[] = [
      { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', group_name: 'Bride Side', plus_one_allowed: true, rsvp_status: 'accepted', party_size: 2 },
      { id: '2', name: 'Mike Chen', email: 'mike@example.com', group_name: 'Groom Side', plus_one_allowed: true, rsvp_status: 'accepted', party_size: 2 },
      { id: '3', name: 'Emily Davis', email: 'emily@example.com', group_name: 'Bride Side', plus_one_allowed: false, rsvp_status: 'pending', party_size: 1 },
      { id: '4', name: 'James Wilson', email: 'james@example.com', group_name: 'Groom Side', plus_one_allowed: true, rsvp_status: 'declined', party_size: 1 },
      { id: '5', name: 'Lisa Anderson', email: 'lisa@example.com', group_name: 'Friends', plus_one_allowed: true, rsvp_status: 'accepted', party_size: 2 },
      { id: '6', name: 'David Martinez', email: 'david@example.com', group_name: 'Friends', plus_one_allowed: false, rsvp_status: 'pending', party_size: 1 },
    ]

    setGuests(mockGuests)
  }

  const filterGuests = () => {
    let filtered = guests

    if (searchQuery) {
      filtered = filtered.filter(guest =>
        guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedGroup !== 'all') {
      if (selectedGroup === 'pending') {
        filtered = filtered.filter(guest => !guest.rsvp_status || guest.rsvp_status === 'pending')
      } else if (selectedGroup === 'confirmed') {
        filtered = filtered.filter(guest => guest.rsvp_status === 'accepted')
      } else if (selectedGroup === 'declined') {
        filtered = filtered.filter(guest => guest.rsvp_status === 'declined')
      } else {
        filtered = filtered.filter(guest => guest.group_name.toLowerCase() === selectedGroup.toLowerCase())
      }
    }

    setFilteredGuests(filtered)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusBadge = (status?: string) => {
    if (!status || status === 'pending') {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
    }
    if (status === 'accepted') {
      return <Badge variant="secondary" className="bg-green-100 text-green-700"><Check className="w-3 h-3 mr-1" />Confirmed</Badge>
    }
    return <Badge variant="secondary" className="bg-red-100 text-red-700"><X className="w-3 h-3 mr-1" />Declined</Badge>
  }

  const copyRSVPLink = () => {
    const link = `${window.location.origin}/rsvp/demo-event`
    navigator.clipboard.writeText(link)
    alert('RSVP link copied!')
  }

  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.rsvp_status === 'accepted').length,
    pending: guests.filter(g => !g.rsvp_status || g.rsvp_status === 'pending').length,
    declined: guests.filter(g => g.rsvp_status === 'declined').length,
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-burgundy mb-2">
            Guest List
          </h1>
          <p className="text-foreground/70">
            {stats.total} total • {stats.confirmed} confirmed • {stats.pending} pending
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-burgundy/20 hover:bg-burgundy/5"
            onClick={copyRSVPLink}
          >
            <Link2 className="w-4 h-4 mr-2" />
            Copy RSVP Link
          </Button>
          <Button className="bg-burgundy hover:bg-burgundy/90 text-cream">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Guest
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <Input
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl border-burgundy/20"
            />
          </div>

          <Tabs value={selectedGroup} onValueChange={setSelectedGroup} className="w-full lg:w-auto">
            <TabsList className="grid grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {['Bride Side', 'Groom Side', 'Friends'].map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(selectedGroup === group.toLowerCase() ? 'all' : group.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedGroup === group.toLowerCase()
                  ? 'bg-burgundy text-cream'
                  : 'bg-burgundy/5 text-burgundy hover:bg-burgundy/10'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </Card>

      <div className="space-y-3">
        {filteredGuests.map((guest, index) => (
          <motion.div
            key={guest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="p-4 hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
              onClick={() => {
                setSelectedGuest(guest)
                setSheetOpen(true)
              }}
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-burgundy/10 text-burgundy">
                  <AvatarFallback className="bg-burgundy/10 text-burgundy font-semibold">
                    {getInitials(guest.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-burgundy truncate">{guest.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-foreground/70 truncate">{guest.email}</p>
                    {guest.plus_one_allowed && (
                      <Badge variant="secondary" className="bg-gold/10 text-gold text-xs">
                        +{guest.party_size - 1}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(guest.rsvp_status)}
                  <Badge variant="secondary" className="bg-burgundy/5 text-burgundy hidden lg:inline-flex">
                    {guest.group_name}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredGuests.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-16 h-16 text-burgundy/20 mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-bold text-burgundy mb-2">No guests found</h3>
            <p className="text-foreground/70">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="font-heading text-2xl text-burgundy">
              {selectedGuest?.name}
            </SheetTitle>
          </SheetHeader>

          {selectedGuest && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground/70">Email</label>
                <p className="text-burgundy mt-1">{selectedGuest.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground/70">Group</label>
                <p className="text-burgundy mt-1">{selectedGuest.group_name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground/70">Party Size</label>
                <p className="text-burgundy mt-1">
                  {selectedGuest.party_size} {selectedGuest.party_size === 1 ? 'person' : 'people'}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground/70 mb-2 block">RSVP Status</label>
                {getStatusBadge(selectedGuest.rsvp_status)}
              </div>

              <div className="flex gap-3 pt-6">
                <Button className="flex-1 bg-burgundy hover:bg-burgundy/90 text-cream">
                  Edit Details
                </Button>
                <Button variant="outline" className="flex-1 border-destructive text-destructive hover:bg-destructive/5">
                  Remove
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
