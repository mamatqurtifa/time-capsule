
'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { 
  Clock, 
  Plus, 
  Menu, 
  X, 
  Home, 
  Compass, 
  Package, 
  Users, 
  Sparkles,
  ChevronDown,
  Bell,
  Settings
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [isLogoAnimating, setIsLogoAnimating] = useState(false)
  const [navItemAnimations, setNavItemAnimations] = useState({})
  const [sparklePositions, setSparklePositions] = useState([])
  const [rippleEffects, setRippleEffects] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    // Generate random sparkle positions
    const generateSparkles = () => {
      const sparkles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2
      }))
      setSparklePositions(sparkles)
    }
    
    generateSparkles()
    const sparkleInterval = setInterval(generateSparkles, 5000)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(sparkleInterval)
    }
  }, [])

  // Handle tooltip positioning relative to mouse
  const updateTooltipPosition = (e, itemIndex) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const tooltipWidth = 120 // estimated tooltip width
    const tooltipHeight = 40 // estimated tooltip height
    
    let x = e.clientX
    let y = rect.bottom + 10
    
    // Adjust horizontal position
    if (x + tooltipWidth/2 > viewportWidth - 20) {
      x = viewportWidth - tooltipWidth/2 - 20
    } else if (x - tooltipWidth/2 < 20) {
      x = tooltipWidth/2 + 20
    }
    
    // Adjust vertical position if too close to bottom
    if (y + tooltipHeight > viewportHeight - 20) {
      y = rect.top - tooltipHeight - 10
    }
    
    setTooltipPosition({ x, y })
    setHoveredItem(itemIndex)
  }

  // Create ripple effect
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setRippleEffects(prev => [...prev, ripple])
    setTimeout(() => {
      setRippleEffects(prev => prev.filter(r => r.id !== ripple.id))
    }, 600)
  }

  const navItems = [
    { name: 'Home', icon: Home, active: true, color: 'from-blue-500 to-purple-600' },
    { name: 'Explore', icon: Compass, active: false, color: 'from-green-500 to-teal-600' },
    { name: 'My Capsules', icon: Package, active: false, color: 'from-orange-500 to-red-600' },
    { name: 'Shared', icon: Users, active: false, color: 'from-pink-500 to-rose-600' },
  ]

  return (
    <>
      {/* Floating tooltip that follows mouse */}
      {hoveredItem !== null && (
        <div 
          className="fixed z-[60] pointer-events-none transition-all duration-200 ease-out"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, 0)'
          }}
        >
          <div className="bg-gray-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium shadow-2xl border border-gray-700/50 animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${navItems[hoveredItem]?.color} animate-pulse`}></div>
              <span>{navItems[hoveredItem]?.name}</span>
            </div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900/95 rotate-45 border-t border-l border-gray-700/50"></div>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 transition-all duration-500 ease-out ${
        isScrolled ? 'scale-[0.97] top-2' : 'scale-100'
      }`}>
        <div className="hidden lg:flex items-center justify-between space-x-6">
          
          {/* Left Section - Logo */}
          <div className={`group bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-5 py-2.5 shadow-lg hover:shadow-2xl transition-all duration-400 ease-out hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden ${
            isScrolled ? 'bg-white/95 shadow-xl border-gray-300/30' : ''
          }`}
          onMouseEnter={() => setIsLogoAnimating(true)}
          onMouseLeave={() => setIsLogoAnimating(false)}
          onClick={createRipple}
          >
            {/* Background animated sparkles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              {sparklePositions.slice(0, 5).map((sparkle) => (
                <div
                  key={sparkle.id}
                  className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"
                  style={{
                    left: `${sparkle.x}%`,
                    top: `${sparkle.y}%`,
                    animationDelay: `${sparkle.delay}s`,
                    animationDuration: `${sparkle.duration}s`
                  }}
                />
              ))}
            </div>
            
            {/* Ripple effects */}
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
                <div className="w-0 h-0 bg-blue-500/30 rounded-full animate-ping" 
                     style={{ animation: 'ripple 0.6s ease-out' }} />
              </div>
            ))}
            
            <div className="flex items-center space-x-3 cursor-pointer relative z-10">
              <div className={`relative w-8 h-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-400 ease-out overflow-hidden ${
                isLogoAnimating ? 'rotate-[360deg] scale-110' : 'group-hover:rotate-12'
              }`}
              style={{ transition: 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
              >
                <Clock className={`w-4 h-4 text-white transform transition-all duration-300 ease-out relative z-10 ${
                  isLogoAnimating ? 'rotate-[720deg] scale-125' : 'group-hover:scale-110 group-hover:rotate-180'
                }`} strokeWidth={1.8} />
                
                {/* Animated background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-400 ease-out blur-sm"></div>
                <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 opacity-0 transition-opacity duration-300 ${
                  isLogoAnimating ? 'opacity-60 animate-pulse' : ''
                }`}></div>
                
                {/* Clock hands animation */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-white/60 rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom rotate-90 animate-spin" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-white/80 rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom rotate-45 animate-spin" style={{ animationDuration: '0.5s' }}></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-bold text-gray-900 tracking-tight transition-all duration-300 ease-out ${
                  isLogoAnimating ? 'text-black scale-105 tracking-wide' : 'group-hover:text-black'
                }`}>
                  Time Capsule
                </span>
                <div className="flex space-x-1">
                  <Sparkles className={`w-3 h-3 text-gray-400 group-hover:text-yellow-500 transition-all duration-300 ease-out opacity-60 group-hover:opacity-100 ${
                    isLogoAnimating ? 'animate-bounce text-yellow-500 scale-150' : 'group-hover:scale-125 animate-pulse'
                  }`} strokeWidth={1.5} />
                  <Sparkles className={`w-2 h-2 text-gray-300 group-hover:text-yellow-400 transition-all duration-400 ease-out opacity-40 group-hover:opacity-80 ${
                    isLogoAnimating ? 'animate-bounce text-yellow-400 scale-[2]' : 'group-hover:scale-150 animate-pulse'
                  }`} strokeWidth={1.5} style={{ animationDelay: '0.5s' }} />
                  <Sparkles className={`w-1.5 h-1.5 text-gray-200 group-hover:text-yellow-300 transition-all duration-500 ease-out opacity-20 group-hover:opacity-60 ${
                    isLogoAnimating ? 'animate-bounce text-yellow-300 scale-[2.5]' : 'group-hover:scale-[2] animate-pulse'
                  }`} strokeWidth={1.5} style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Center Section - Navigation Links */}
          <div className={`bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-2 py-2 shadow-lg hover:shadow-2xl transition-all duration-400 hover:scale-[1.01] hover:-translate-y-0.5 relative overflow-hidden ${
            isScrolled ? 'bg-white/95 shadow-xl border-gray-300/30' : ''
          }`}>
            {/* Floating orbs background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-2 left-4 w-2 h-2 bg-blue-400/20 rounded-full animate-float"></div>
              <div className="absolute bottom-2 right-6 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-float-delay"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-pink-400/20 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex items-center space-x-1 relative z-10">
              {navItems.map((item, index) => (
                <div 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={(e) => {
                    updateTooltipPosition(e, index)
                    setNavItemAnimations(prev => ({ ...prev, [index]: true }))
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null)
                    setNavItemAnimations(prev => ({ ...prev, [index]: false }))
                  }}
                  onMouseMove={(e) => hoveredItem === index && updateTooltipPosition(e, index)}
                  onClick={createRipple}
                >
                  <button 
                    className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ease-out transform overflow-hidden ${
                      item.active 
                        ? 'bg-gray-900 text-white shadow-md hover:shadow-lg hover:bg-black scale-105' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 hover:scale-105'
                    } ${navItemAnimations[index] ? 'animate-wiggle' : ''}`}
                    style={{ 
                      animationDelay: `${index * 80}ms`,
                      transform: hoveredItem === index ? 'translateY(-4px) scale(1.08) rotateX(5deg)' : '',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {/* Button ripple effects */}
                    {rippleEffects.filter(r => hoveredItem === index).map((ripple) => (
                      <div
                        key={ripple.id}
                        className="absolute pointer-events-none"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className={`w-0 h-0 rounded-full animate-ping ${
                          item.active ? 'bg-white/40' : 'bg-gray-900/20'
                        }`} style={{ animation: 'ripple 0.6s ease-out' }} />
                      </div>
                    ))}
                    
                    {/* Morphing background */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                      hoveredItem === index && !item.active 
                        ? `bg-gradient-to-r ${item.color} opacity-5 scale-110` 
                        : 'opacity-0 scale-100'
                    }`}></div>
                    
                    <div className={`relative overflow-hidden rounded-lg p-1 ${
                      item.active ? 'bg-white/20' : 'bg-transparent group-hover:bg-gray-100'
                    } transition-all duration-300 ${
                      hoveredItem === index ? 'bg-gray-100 rotate-6 scale-110' : ''
                    }`}>
                      <item.icon className={`w-4 h-4 transition-all duration-300 ${
                        item.active 
                          ? 'text-white' 
                          : 'text-gray-500 group-hover:text-gray-900'
                      } ${
                        hoveredItem === index ? 'scale-125 rotate-12 filter drop-shadow-lg' : 'group-hover:scale-110'
                      }`} strokeWidth={1.6} />
                      
                      {/* Icon glow effect */}
                      {hoveredItem === index && !item.active && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-lg animate-pulse blur-sm`}></div>
                      )}
                      
                      {/* Floating particles around icon */}
                      {hoveredItem === index && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute -top-1 -left-1 w-1 h-1 bg-current opacity-60 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                          <div className="absolute -top-1 -right-1 w-0.5 h-0.5 bg-current opacity-40 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                          <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-current opacity-50 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                      )}
                    </div>
                    
                    <span className={`font-semibold text-sm hidden xl:block transition-all duration-300 ${
                      item.active ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
                    } ${
                      hoveredItem === index ? 'tracking-wide scale-105' : ''
                    }`}>
                      {item.name}
                    </span>
                    
                    {/* Active indicator with pulsing animation */}
                    {item.active && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-pulse shadow-lg"></div>
                        <div className="absolute inset-0 bg-gray-900 rounded-full animate-ping opacity-30"></div>
                      </div>
                    )}
                    
                    {/* Animated hover indicator */}
                    {!item.active && hoveredItem === index && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 transition-all duration-400 ease-out">
                        <div className={`w-0 h-0.5 bg-gradient-to-r ${item.color} rounded-full group-hover:w-8 transition-all duration-400 ease-out animate-pulse`}></div>
                      </div>
                    )}
                    
                    {/* Progress bar animation */}
                    {hoveredItem === index && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 animate-slide-progress"></div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className={`bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-4 py-2.5 shadow-lg hover:shadow-2xl transition-all duration-400 hover:scale-[1.02] hover:-translate-y-1 ${
            isScrolled ? 'bg-white/95 shadow-xl border-gray-300/30' : ''
          }`}>
            <div className="flex items-center space-x-3">
              <SignedOut>
                <div className="flex items-center space-x-2">
                  <SignInButton>
                    <button className="group px-4 py-2 text-gray-600 hover:text-gray-900 font-semibold text-sm transition-all duration-300 hover:scale-105 rounded-lg hover:bg-gray-50">
                      <span className="relative">
                        Sign In
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </button>
                  </SignInButton>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <SignUpButton>
                    <button className="group bg-gray-900 text-white rounded-xl font-semibold text-sm px-5 py-2 hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden">
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              
              <SignedIn>
                <div className="flex items-center space-x-2">
                  {/* Notifications */}
                  <button className="group p-2.5 rounded-xl bg-gray-50/80 hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-sm hover:shadow-md relative" title="Notifications">
                    <Bell className="w-4 h-4 text-gray-600 group-hover:text-gray-900 group-hover:rotate-12 transition-all duration-300" strokeWidth={1.6} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </button>
                  
                  {/* Create Capsule Button */}
                  <button className="group p-2.5 rounded-xl bg-gradient-to-br from-gray-900 to-black hover:from-black hover:to-gray-800 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-md hover:shadow-lg relative overflow-hidden" title="Create New Capsule">
                    <Plus className="w-4 h-4 text-white group-hover:rotate-180 transition-all duration-400 ease-out relative z-10" strokeWidth={1.8} />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                  
                  <div className="w-px h-6 bg-gray-200"></div>
                  
                  {/* User Profile */}
                  <div className="group ring-2 ring-gray-200/50 rounded-xl hover:ring-gray-300/70 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 relative">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
                        }
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-3 left-3 right-3 z-50 lg:hidden">
        <div className={`bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-4 py-3 shadow-lg transition-all duration-400 ${
          isScrolled ? 'bg-white shadow-xl border-gray-300/30' : ''
        } ${isMobileMenuOpen ? 'rounded-b-none' : ''}`}>
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative w-7 h-7 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 ease-out group-hover:rotate-12 overflow-hidden">
                <Clock className="w-3.5 h-3.5 text-white transform group-hover:scale-110 group-hover:rotate-180 transition-all duration-300 ease-out" strokeWidth={1.8} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-black transition-colors duration-300">
                  Time Capsule
                </span>
                <Sparkles className="w-3 h-3 text-gray-400 group-hover:text-yellow-500 group-hover:scale-125 transition-all duration-300 ease-out opacity-60 group-hover:opacity-100 animate-pulse" strokeWidth={1.5} />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl bg-gray-50/80 hover:bg-gray-100 transition-all duration-300 hover:scale-110 relative overflow-hidden group ${
                isMobileMenuOpen ? 'bg-gray-100 scale-110' : ''
              }`}
            >
              <div className="relative z-10">
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 transform rotate-90 transition-transform duration-300" strokeWidth={1.6} />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`bg-white/95 backdrop-blur-xl border-x border-b border-gray-200/50 rounded-b-2xl shadow-lg transition-all duration-400 ease-out ${
          isScrolled ? 'bg-white border-gray-300/30' : ''
        } ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="px-4 py-4 space-y-2">
            {/* Navigation Items */}
            {navItems.map((item, index) => (
              <button 
                key={item.name}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform group ${
                  item.active 
                    ? 'bg-gray-900 text-white shadow-md scale-[1.02]' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 hover:translate-x-2 hover:scale-[1.01]'
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: `translateX(${isMobileMenuOpen ? '0' : '-20px'})`,
                  opacity: isMobileMenuOpen ? '1' : '0',
                  transition: `all 0.4s ease-out ${index * 100}ms`
                }}
              >
                <div className={`relative overflow-hidden rounded-lg p-1.5 ${item.active ? 'bg-white/20' : 'bg-transparent group-hover:bg-gray-100'} transition-all duration-300`}>
                  <item.icon className={`w-5 h-5 transition-all duration-300 ${
                    item.active ? 'text-white' : 'text-gray-500 group-hover:text-gray-900 group-hover:scale-110'
                  }`} strokeWidth={1.6} />
                  {!item.active && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`}></div>
                  )}
                </div>
                <span className="font-semibold text-sm">{item.name}</span>
                {item.active && (
                  <div className="ml-auto w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200/50 space-y-3" style={{
              transform: `translateY(${isMobileMenuOpen ? '0' : '20px'})`,
              opacity: isMobileMenuOpen ? '1' : '0',
              transition: 'all 0.4s ease-out 0.3s'
            }}>
              <SignedOut>
                <div className="space-y-2">
                  <SignInButton>
                    <button className="w-full px-4 py-3 text-gray-600 hover:text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-50/80 rounded-xl border border-gray-200/50 hover:border-gray-300/50 hover:scale-[1.01]">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="w-full bg-gray-900 text-white rounded-xl font-semibold px-4 py-3 hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] relative overflow-hidden group">
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              
              <SignedIn>
                <div className="flex items-center justify-between bg-gray-50/50 rounded-xl p-3">
                  <div className="flex items-center space-x-3">
                    <button className="p-2.5 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md" title="Notifications">
                      <Bell className="w-4 h-4 text-gray-600" strokeWidth={1.6} />
                    </button>
                    <button className="p-2.5 rounded-xl bg-gray-900 hover:bg-black transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md" title="Create Capsule">
                      <Plus className="w-4 h-4 text-white" strokeWidth={1.8} />
                    </button>
                  </div>
                  <div className="ring-2 ring-gray-200/50 rounded-xl hover:ring-gray-300/70 transition-all duration-300">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9 shadow-sm rounded-xl"
                        }
                      }}
                    />
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Custom CSS for advanced animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(180deg); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-180deg); }
        }
        
        @keyframes slide-progress {
          0% { width: 0%; left: 0%; }
          50% { width: 100%; left: 0%; }
          100% { width: 0%; left: 100%; }
        }
        
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 100px; height: 100px; opacity: 0; }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 50%; }
          25% { border-radius: 20%; }
          50% { border-radius: 10%; }
          75% { border-radius: 30%; }
        }
        
        @keyframes particle-float {
          0% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          50% { transform: translateY(-20px) rotate(180deg) scale(1.2); opacity: 0.7; }
          100% { transform: translateY(-40px) rotate(360deg) scale(0.8); opacity: 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(147, 51, 234, 0.4); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-slide-progress {
          animation: slide-progress 1.5s ease-in-out infinite;
        }
        
        .animate-morph {
          animation: morph 2s ease-in-out infinite;
        }
        
        .animate-particle-float {
          animation: particle-float 2s ease-out forwards;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        /* Custom scroll behavior */
        .navbar-scroll {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Glassmorphism enhancement */
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        /* Advanced hover states */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        /* Magnetic effect for buttons */
        .magnetic-hover {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }
        
        /* 3D perspective effects */
        .perspective-hover {
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .perspective-hover:hover {
          transform: perspective(1000px) rotateX(5deg) translateY(-5px);
        }
        
        /* Gradient animations */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        /* Elastic bounce */
        @keyframes elastic-bounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          75% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        .animate-elastic-bounce {
          animation: elastic-bounce 0.6s ease-out;
        }
        
        /* Breathing effect */
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        .animate-breathe {
          animation: breathe 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}