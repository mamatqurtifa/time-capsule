import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Clock, MapPin, Users, Plus, Search, Calendar, Archive, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-7xl font-extralight text-black mb-6 tracking-tight">
              Preserve Your
              <span className="block bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent">
                Moments
              </span>
            </h2>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-black/5 rounded-full blur-xl"></div>
          </div>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Create time capsules filled with memories, photos, and messages. 
            Share them across time and space with the people you love.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent rounded-2xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                <input 
                  type="text" 
                  placeholder="Search capsules by location, date, or memory..."
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none font-light"
                />
                <button className="bg-black text-white px-6 py-2 rounded-xl font-light hover:bg-gray-800 transition-all duration-300 shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group">
            <div className="relative bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black/10 transition-colors duration-300">
                  <Clock className="w-6 h-6 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-black mb-3">Time-Based Opening</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Set future dates for your capsules to unlock. Perfect for anniversaries, birthdays, or future milestones.
                </p>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="relative bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black/10 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-black mb-3">Location Memories</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Attach locations to your capsules. Rediscover memories when you return to meaningful places.
                </p>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="relative bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black/10 transition-colors duration-300">
                  <Users className="w-6 h-6 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-black mb-3">Shared Experiences</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Collaborate on capsules with friends and family. Create collective memories that last forever.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Capsules Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-light text-black">Recent Capsules</h3>
            <button className="text-gray-600 hover:text-black transition-colors font-light flex items-center space-x-2">
              <span>View All</span>
              <div className="w-4 h-4 border-t border-r border-gray-400 transform rotate-45"></div>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative bg-white/40 backdrop-blur-xl border border-gray-200/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Image placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <Heart className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                      <span className="text-sm text-gray-500 font-light">Opens in 2026</span>
                    </div>
                    <h4 className="text-lg font-light text-black mb-2">Jakarta Memories</h4>
                    <p className="text-gray-600 text-sm font-light mb-4">
                      A collection of moments from our trip to the beautiful city...
                    </p>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                      <span className="text-sm text-gray-500 font-light">Jakarta, Indonesia</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-black/10 rounded-3xl blur-2xl transform rotate-1"></div>
            <div className="relative bg-gradient-to-br from-white via-white to-gray-50 border border-gray-200/50 rounded-3xl p-12 shadow-2xl backdrop-blur-xl">
              <h3 className="text-3xl font-light text-black mb-4">Ready to Create Your First Capsule?</h3>
              <p className="text-gray-600 font-light mb-8 max-w-lg mx-auto">
                Start preserving your memories today. Create something beautiful for your future self.
              </p>
              <SignedOut>
                <SignInButton>
                  <button className="bg-black text-white px-8 py-4 rounded-2xl font-light hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button className="bg-black text-white px-8 py-4 rounded-2xl font-light hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  Create Capsule
                </button>
              </SignedIn>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-xl border-t border-gray-200/50 mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center">
                <Archive className="w-3 h-3 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-light text-black">Time Capsule</span>
            </div>
            <p className="text-gray-600 font-light">
              Preserving memories across time and space.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}