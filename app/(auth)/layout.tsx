import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Heart className="w-8 h-8 text-burgundy fill-burgundy" />
            <span className="font-heading text-2xl font-bold text-burgundy">ShaadiSync</span>
          </Link>
          {children}
        </div>
      </div>

      <div className="hidden lg:flex relative bg-gradient-to-br from-burgundy via-burgundy-700 to-burgundy-900 p-12 items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6bS0yIDJ2LTJoLTJ2Mmgyem0wLTJ2LTJoLTJ2Mmgyem0yIDB2LTJoLTJ2Mmgyem0wIDJ2MmgtMnYtMmgyem0yLTJ2Mmgydi0yaC0yem0wIDBoMnYtMmgtMnYyem0yIDJ2LTJoLTJ2Mmgyem0wIDBoLTJ2Mmgydi0yem0wIDJ2Mmgydi0yaC0yem0wIDBoLTJ2Mmgydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="relative z-10 max-w-lg text-center">
          <h2 className="font-heading text-5xl font-bold text-cream mb-6">
            Plan Your Dream Wedding
          </h2>
          <p className="text-xl text-cream/80">
            Everything you need to organize the perfect celebration, all in one beautiful place.
          </p>
        </div>

        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex items-center justify-between text-cream/60 text-sm">
            <span>Made with ❤️ for modern couples</span>
            <span>© 2026 ShaadiSync</span>
          </div>
        </div>
      </div>
    </div>
  )
}
