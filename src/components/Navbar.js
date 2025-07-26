'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { 
  Archive, 
  Plus, 
  Menu, 
  X, 
  Home, 
  Compass, 
  Package, 
  Users, 
  Sparkles,
  LogIn,
  UserPlus
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', icon: Home, active: true },
    { name: 'Explore', icon: Compass, active: false },
    { name: 'My Capsules', icon: Package, active: false },
    { name: 'Shared', icon: Users, active: false },
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-6 transition-all duration-700 ${
        isScrolled ? 'scale-95 top-3' : 'scale-100'
      }`}>
        <div className="hidden lg:flex items-center justify-between space-x-8">
          
          {/* Left Section - Logo */}
          <div className={`bg-white/90 backdrop-blur-2xl border border-gray-200/60 rounded-full px-8 py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 ${
            isScrolled ? 'bg-white/95 shadow-xl' : ''
          }`}>
            <div className="flex items-center space-x-4 group">
              <div className="relative w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ease-out group-hover:rotate-6 overflow-hidden">
                <Archive className="w-5 h-5 text-white transform group-hover:scale-110 transition-all duration-300 ease-out relative z-10" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-semibold text-black tracking-tight group-hover:text-gray-800 transition-colors duration-300 ease-out">
                  Time Capsule
                </span>
                <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:scale-125 transition-all duration-300 ease-out opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Center Section - Navigation Links */}
          <div className={`bg-white/90 backdrop-blur-2xl border border-gray-200/60 rounded-full px-3 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
            isScrolled ? 'bg-white/95 shadow-xl' : ''
          }`}>
            <div className="flex items-center space-x-2">
              {navItems.map((item, index) => (
                <div key={item.name} className="relative group">
                  <button 
                    className={`flex items-center space-x-3 px-5 py-3 rounded-full transition-all duration-300 ${
                      item.active 
                        ? 'bg-black text-white shadow-lg hover:shadow-xl hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-black hover:bg-gray-100/80'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className={`w-4 h-4 transition-all duration-300 ${
                      item.active ? 'text-white' : 'text-gray-500 group-hover:text-black group-hover:scale-110'
                    }`} strokeWidth={1.5} />
                    <span className="font-medium text-sm hidden xl:block">{item.name}</span>
                  </button>
                  {item.active && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full animate-pulse"></div>
                  )}
                  {!item.active && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gray-400 rounded-full group-hover:w-8 transition-all duration-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Profile */}
          <div className={`bg-white/90 backdrop-blur-2xl border border-gray-200/60 rounded-full px-6 py-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
            isScrolled ? 'bg-white/95 shadow-xl' : ''
          }`}>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <button className="px-5 py-2.5 text-gray-600 hover:text-black font-medium text-sm transition-all duration-300 hover:scale-105">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-black text-white rounded-full font-medium text-sm px-6 py-2.5 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center space-x-4">
                  {/* Create Capsule Button */}
                  <button className="p-3 rounded-full bg-gradient-to-br from-black/5 to-black/10 hover:from-black/10 hover:to-black/20 transition-all duration-300 group hover:scale-110 hover:-translate-y-0.5 shadow-lg hover:shadow-xl" title="Create New Capsule">
                    <Plus className="w-5 h-5 text-gray-600 group-hover:text-black group-hover:rotate-90 transition-all duration-300" strokeWidth={1.5} />
                  </button>
                  {/* User Profile */}
                  <div className="ring-2 ring-gray-200/50 rounded-full hover:ring-gray-300/70 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-full h-full shadow-lg hover:shadow-xl transition-all duration-300"
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

      {/* Mobile Navbar */}
      <nav className="fixed top-4 left-4 right-4 z-50 lg:hidden">
        <div className={`bg-white/95 backdrop-blur-2xl border border-gray-200/60 rounded-2xl px-4 py-3 shadow-2xl transition-all duration-500 ${
          isScrolled ? 'bg-white shadow-xl' : ''
        }`}>
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center shadow-lg">
                <Archive className="w-4 h-4 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-semibold text-black tracking-tight">Time Capsule</span>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-300 hover:scale-110"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 transform rotate-90 transition-transform duration-300" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 transition-transform duration-300" strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`mt-4 overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-2 pb-4">
              {navItems.map((item, index) => (
                <button 
                  key={item.name}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform ${
                    item.active 
                      ? 'bg-black text-white shadow-lg' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-100/80 hover:translate-x-2'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200/50">
                <SignedOut>
                  <div className="space-y-2">
                    <SignInButton>
                      <button className="w-full px-4 py-3 text-gray-600 hover:text-black font-medium transition-all duration-300 hover:bg-gray-100/80 rounded-xl">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="w-full bg-black text-white rounded-xl font-medium px-4 py-3 hover:bg-gray-800 transition-all duration-300 shadow-lg">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-between">
                    <button className="p-3 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-300">
                      <Plus className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                    </button>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 shadow-lg"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}