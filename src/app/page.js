'use client'
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Clock, MapPin, Users, Plus, Search, Calendar, Heart, Star, Sparkles, ChevronRight, Play, Camera, Globe, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState({})
  const [hoveredCard, setHoveredCard] = useState(null)
  const [searchFocus, setSearchFocus] = useState(false)
  const [floatingElements, setFloatingElements] = useState([])
  const [rippleEffects, setRippleEffects] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Generate floating elements
    const generateFloatingElements = () => {
      const elements = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 8,
        opacity: Math.random() * 0.3 + 0.1
      }))
      setFloatingElements(elements)
    }

    window.addEventListener('mousemove', handleMouseMove)
    generateFloatingElements()

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const createRipple = (e, callback) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setRippleEffects(prev => [...prev, ripple])
    setTimeout(() => {
      setRippleEffects(prev => prev.filter(r => r.id !== ripple.id))
      if (callback) callback()
    }, 600)
  }

  const features = [
    {
      icon: Clock,
      title: "Time-Based Opening",
      description: "Set future dates for your capsules to unlock. Perfect for anniversaries, birthdays, or future milestones.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: MapPin,
      title: "Location Memories",
      description: "Attach locations to your capsules. Rediscover memories when you return to meaningful places.",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: Users,
      title: "Shared Experiences",
      description: "Collaborate on capsules with friends and family. Create collective memories that last forever.",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    }
  ]

  const capsulePreviews = [
    {
      id: 1,
      title: "Jakarta Memories",
      description: "A collection of moments from our trip to the beautiful city...",
      location: "Jakarta, Indonesia",
      openDate: "Opens in 2026",
      image: "from-orange-200 to-red-300",
      likes: 24,
      isLiked: false
    },
    {
      id: 2,
      title: "College Days",
      description: "Friends, laughter, and unforgettable moments from university life...",
      location: "Bandung, Indonesia", 
      openDate: "Opens in 2025",
      image: "from-purple-200 to-indigo-300",
      likes: 18,
      isLiked: true
    },
    {
      id: 3,
      title: "Family Reunion",
      description: "Precious moments with loved ones during our annual gathering...",
      location: "Yogyakarta, Indonesia",
      openDate: "Opens in 2027",
      image: "from-green-200 to-teal-300",
      likes: 31,
      isLiked: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-float-random"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              opacity: element.opacity,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`
            }}
          />
        ))}
      </div>

      {/* Mouse follower gradient */}
      <div 
        className="fixed w-96 h-96 bg-gradient-radial from-blue-500/5 via-purple-500/3 to-transparent rounded-full pointer-events-none z-10 transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 relative z-20">
        <div id="animate-hero" className={`text-center mb-16 transition-all duration-1000 ${
          isVisible['animate-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative inline-block group">
            {/* Hero title with advanced animations */}
            <h1 className="text-6xl md:text-8xl font-extralight text-black mb-6 tracking-tight relative">
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Preserve
              </span>{' '}
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Your
              </span>
              <span className="block bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent animate-fade-in-up relative" style={{ animationDelay: '0.6s' }}>
                Moments
                {/* Animated sparkles around "Moments" */}
                <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-yellow-400 animate-pulse opacity-60" />
                <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-blue-400 animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
                <Star className="absolute top-0 left-1/2 w-3 h-3 text-purple-400 animate-bounce opacity-50" style={{ animationDelay: '1.5s' }} />
              </span>
            </h1>
            
            {/* Floating orbs around title */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-float-slow"></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-xl animate-float-slow-delay"></div>
            <div className="absolute top-1/2 -right-12 w-12 h-12 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-lg animate-pulse"></div>
          </div>
          
          <p className={`text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up`} style={{ animationDelay: '0.8s' }}>
            Create time capsules filled with memories, photos, and messages. 
            Share them across time and space with the people you love.
          </p>

          {/* Animated stats */}
          <div className={`flex justify-center space-x-8 mt-8 animate-fade-in-up`} style={{ animationDelay: '1s' }}>
            <div className="text-center group">
              <div className="text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-sm text-gray-500">Capsules Created</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">5K+</div>
              <div className="text-sm text-gray-500">Happy Users</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">25+</div>
              <div className="text-sm text-gray-500">Countries</div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div id="animate-search" className={`max-w-3xl mx-auto mb-20 transition-all duration-1000 ${
          isVisible['animate-search'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative group">
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transition-opacity duration-500 ${
              searchFocus ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}></div>
            
            <div className={`relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-6 shadow-2xl transition-all duration-500 hover:shadow-3xl ${
              searchFocus ? 'scale-[1.02] shadow-3xl' : 'hover:scale-[1.01]'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className={`w-6 h-6 text-gray-400 transition-all duration-300 ${
                    searchFocus ? 'text-blue-500 scale-110' : ''
                  }`} strokeWidth={1.5} />
                  {searchFocus && (
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                  )}
                </div>
                
                <input 
                  type="text" 
                  placeholder="Search capsules by location, date, or memory..."
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none font-light text-lg"
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                />
                
                <button 
                  className="group bg-black text-white px-8 py-3 rounded-2xl font-light hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden"
                  onClick={createRipple}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Search</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {rippleEffects.map((ripple) => (
                    <div
                      key={ripple.id}
                      className="absolute pointer-events-none"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="w-0 h-0 bg-white/30 rounded-full animate-ping" style={{ animation: 'ripple 0.6s ease-out' }} />
                    </div>
                  ))}
                </button>
              </div>
              
              {/* Search suggestions */}
              <div className="flex flex-wrap gap-2 mt-4 opacity-60">
                {['Jakarta', 'Family', 'Birthday', 'Travel', 'Friends'].map((tag, index) => (
                  <button 
                    key={tag}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div id="animate-features" className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 ${
          isVisible['animate-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all duration-500 scale-105`}></div>
              
              <div className={`relative bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] ${
                hoveredCard === index ? 'bg-white/90' : ''
              }`}>
                {/* Background pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon with advanced animations */}
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden`}>
                    <feature.icon className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                    {/* Icon sparkles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                      <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-black mb-4 group-hover:text-gray-900 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Hover arrow */}
                  <div className={`mt-4 flex items-center text-sm font-medium transition-all duration-300 ${
                    hoveredCard === index ? 'text-gray-900 translate-x-2' : 'text-transparent translate-x-0'
                  }`}>
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Recent Capsules */}
        <section id="animate-capsules" className={`mb-20 transition-all duration-1000 ${
          isVisible['animate-capsules'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-light text-black mb-2">Recent Capsules</h2>
              <p className="text-gray-600 font-light">Discover memories from our community</p>
            </div>
            <button className="group text-gray-600 hover:text-black transition-all duration-300 font-light flex items-center space-x-2 hover:scale-105">
              <span>View All</span>
              <div className="w-4 h-4 border-t border-r border-gray-400 group-hover:border-black transform rotate-45 transition-all duration-300 group-hover:translate-x-1"></div>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capsulePreviews.map((capsule, index) => (
              <div 
                key={capsule.id} 
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={(e) => createRipple(e)}
              >
                <div className="relative bg-white/50 backdrop-blur-xl border border-gray-200/30 rounded-3xl overflow-hidden shadow-lg hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
                  {/* Ripple effects */}
                  {rippleEffects.map((ripple) => (
                    <div
                      key={ripple.id}
                      className="absolute pointer-events-none z-20"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="w-0 h-0 bg-blue-500/30 rounded-full animate-ping" style={{ animation: 'ripple 0.6s ease-out' }} />
                    </div>
                  ))}

                  {/* Card glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Image placeholder with gradient */}
                  <div className={`relative h-52 bg-gradient-to-br ${capsule.image} group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
                    {/* Overlay pattern */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500"></div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    
                    {/* Top right actions */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className={`bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
                        capsule.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}>
                        <Heart className="w-4 h-4" strokeWidth={1.5} fill={capsule.isLiked ? 'currentColor' : 'none'} />
                      </button>
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                        <span className="text-xs font-medium text-gray-700">{capsule.likes}</span>
                      </div>
                    </div>

                    {/* Bottom gradient overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-6 z-10">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                      <span className="text-sm text-gray-500 font-light">{capsule.openDate}</span>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <Globe className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">
                      {capsule.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-light mb-4 leading-relaxed">
                      {capsule.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        <span className="text-sm text-gray-500 font-light">{capsule.location}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section id="animate-cta" className={`text-center transition-all duration-1000 ${
          isVisible['animate-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative inline-block group">
            {/* Multiple background layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-3xl blur-xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-700"></div>
            
            <div className="relative bg-gradient-to-br from-white via-white to-gray-50 border border-gray-200/50 rounded-3xl p-12 md:p-16 shadow-2xl backdrop-blur-xl group-hover:shadow-3xl transition-all duration-500">
              {/* Floating elements inside CTA */}
              <div className="absolute top-8 left-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <Camera className="w-6 h-6 text-gray-400 animate-float-slow" />
              </div>
              <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <Zap className="w-5 h-5 text-gray-400 animate-float-slow-delay" />
              </div>
              <div className="absolute bottom-8 left-12 opacity-15 group-hover:opacity-30 transition-opacity duration-500">
                <Star className="w-4 h-4 text-gray-400 animate-pulse" />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-light text-black mb-6 group-hover:scale-105 transition-transform duration-300">
                  Ready to Create Your First Capsule?
                </h2>
                <p className="text-xl text-gray-600 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                  Start preserving your memories today. Create something beautiful for your future self and loved ones.
                </p>
                
                {/* Enhanced CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <SignedOut>
                    <SignInButton>
                      <button className="group bg-black text-white px-10 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
                        <span className="relative z-10 flex items-center space-x-2">
                          <span>Get Started</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </SignInButton>
                    <button className="group border-2 border-gray-200 text-gray-700 px-10 py-4 rounded-2xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105">
                      <span className="flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Watch Demo</span>
                      </span>
                    </button>
                  </SignedOut>
                  
                  <SignedIn>
                    <button className="group bg-black text-white px-10 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
                      <span className="relative z-10 flex items-center space-x-2">
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Create Capsule</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </SignedIn>
                </div>

                {/* Social proof */}
                <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.9/5 rating</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span>Trusted by 10,000+ users</span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span>Free to start</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/70 backdrop-blur-xl border-t border-gray-200/50 mt-24 relative overflow-hidden">
        {/* Footer background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-500 to-orange-500 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center">
            {/* Footer logo with clock animation */}
            <div className="flex items-center justify-center space-x-3 mb-8 group">
              <div className="relative w-8 h-8 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:rotate-12 overflow-hidden">
                <Clock className="w-4 h-4 text-white transform group-hover:scale-110 group-hover:rotate-180 transition-all duration-500 relative z-10" strokeWidth={1.8} />
                
                {/* Clock hands animation */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-white/60 rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom rotate-90 animate-spin" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-white/80 rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom rotate-45 animate-spin" style={{ animationDuration: '0.5s' }}></div>
                </div>
                
                {/* Glow effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-400 blur-sm"></div>
              </div>
              
              <span className="text-2xl font-light text-black group-hover:text-gray-800 transition-colors duration-300">
                Time Capsule
              </span>
              <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:scale-125 transition-all duration-300 animate-pulse opacity-60 group-hover:opacity-100" />
            </div>
            
            {/* Footer tagline */}
            <p className="text-lg text-gray-600 font-light mb-8 max-w-md mx-auto">
              Preserving memories across time and space, connecting hearts through moments.
            </p>

            {/* Footer navigation */}
            <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
              {[
                { name: 'About', href: '#' },
                { name: 'Privacy', href: '#' },
                { name: 'Terms', href: '#' },
                { name: 'Support', href: '#' },
                { name: 'Blog', href: '#' },
                { name: 'API', href: '#' }
              ].map((link, index) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-105 relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: Users, label: 'Community' },
                { icon: Globe, label: 'Website' },
                { icon: Heart, label: 'Support' }
              ].map((social, index) => (
                <button
                  key={social.label}
                  className="group p-3 bg-gray-100/50 hover:bg-gray-200/50 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-md"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <social.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" strokeWidth={1.5} />
                </button>
              ))}
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200/50 pt-8">
              <p className="text-gray-500 text-sm font-light">
                © 2025 Time Capsule. Made with{' '}
                <Heart className="inline w-4 h-4 text-red-500 mx-1" fill="currentColor" />{' '}
                for preserving memories.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes float-slow-delay {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-3deg);
          }
        }

        @keyframes float-random {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(-25px) translateX(15px) rotate(270deg);
          }
        }

        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(147, 51, 234, 0.4);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes scale-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-slow-delay {
          animation: float-slow-delay 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-random {
          animation: float-random 15s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-scale-pulse {
          animation: scale-pulse 2s ease-in-out infinite;
        }

        .animate-shimmer {
          position: relative;
          overflow: hidden;
        }

        .animate-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        /* Gradient backgrounds */
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        /* Custom hover effects */
        .hover-float:hover {
          transform: translateY(-5px);
        }

        .hover-glow:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        /* Performance optimizations */
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}