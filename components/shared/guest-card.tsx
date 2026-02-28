import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Check, X, Clock } from 'lucide-react'

interface GuestCardProps {
  name: string
  email: string
  groupName: string
  partySize: number
  plusOneAllowed: boolean
  rsvpStatus?: 'accepted' | 'declined' | 'pending'
  onClick?: () => void
}

export function GuestCard({
  name,
  email,
  groupName,
  partySize,
  plusOneAllowed,
  rsvpStatus,
  onClick,
}: GuestCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusBadge = (status?: string) => {
    if (!status || status === 'pending') {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      )
    }
    if (status === 'accepted') {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          <Check className="w-3 h-3 mr-1" />
          Confirmed
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="bg-red-100 text-red-700">
        <X className="w-3 h-3 mr-1" />
        Declined
      </Badge>
    )
  }

  return (
    <Card
      className="p-4 hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 bg-burgundy/10 text-burgundy">
          <AvatarFallback className="bg-burgundy/10 text-burgundy font-semibold">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-burgundy truncate">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-foreground/70 truncate">{email}</p>
            {plusOneAllowed && (
              <Badge variant="secondary" className="bg-gold/10 text-gold text-xs">
                +{partySize - 1}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {getStatusBadge(rsvpStatus)}
          <Badge variant="secondary" className="bg-burgundy/5 text-burgundy hidden lg:inline-flex">
            {groupName}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
