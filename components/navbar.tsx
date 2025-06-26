"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                SkillCircle
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-primary"
              >
                Home
              </Link>
              <Link
                href="/matches"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-primary"
              >
                Matches
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-primary"
              >
                Chat
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-primary"
              >
                Schedule
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-primary"
              >
                Resources
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ModeToggle />
            <Link href="/profile">
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <ModeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary ml-2"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-muted">
              Home
            </Link>
            <Link href="/matches" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-muted">
              Matches
            </Link>
            <Link href="/chat" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-muted">
              Chat
            </Link>
            <Link href="/schedule" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-muted">
              Schedule
            </Link>
            <Link href="/resources" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-muted">
              Resources
            </Link>
            <Link href="/profile" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-muted">
              Profile
            </Link>
            <Link href="/login" className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-muted">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
