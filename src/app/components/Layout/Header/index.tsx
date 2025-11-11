"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"

import Logo from "./Logo"
import HeaderLink from "../Header/Navigation/HeaderLink"
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink"
import SignIn from "@/app/components/Auth/SignIn"
import SignUp from "@/app/components/Auth/SignUp"
import { HeaderType } from "@/app/types/menu"

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [navLink, setNavLink] = useState<HeaderType[]>([])

  const signInRef = useRef<HTMLDivElement>(null)
  const signUpRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // ✅ fetch menu hanya di client
  useEffect(() => {
    fetch("/api/data")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setNavLink(data.HeaderData))
      .catch((err) => console.error("❌ Error fetching HeaderData:", err))
  }, [])

  // ✅ sticky header
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ✅ Tutup modal/menu jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (signInRef.current && !signInRef.current.contains(target)) setIsSignInOpen(false)
      if (signUpRef.current && !signUpRef.current.contains(target)) setIsSignUpOpen(false)
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) setNavbarOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ✅ Nonaktifkan scroll saat modal/menu terbuka
  useEffect(() => {
    document.body.style.overflow = isSignInOpen || isSignUpOpen || navbarOpen ? "hidden" : ""
  }, [isSignInOpen, isSignUpOpen, navbarOpen])

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Logo />

        {/* 🌐 Desktop Navigation */}
        <nav className="hidden lg:flex grow items-center justify-center gap-6">
          {navLink.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>

        {/* 🔐 Auth Buttons + Burger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSignInOpen(true)}
            className="hidden lg:block bg-primary text-white hover:bg-primary/20 hover:text-primary py-2 px-6 rounded-full text-lg font-medium transition-all"
          >
            Sign In
          </button>

          {/* 🔸 Mobile Menu Button */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="lg:hidden p-2 rounded-md border border-gray-300 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Icon icon="ci:hamburger-lg" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* 🟦 Mobile Overlay */}
      {navbarOpen && <div className="fixed inset-0 bg-black/50 z-30" />}

      {/* 🟩 Mobile Menu */}
      <aside
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 z-40 ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Logo />
          <button onClick={() => setNavbarOpen(false)} aria-label="Close menu">
            <Icon icon="material-symbols:close-rounded" width={26} height={26} />
          </button>
        </div>

        <nav className="flex flex-col items-start p-4 space-y-3">
          {navLink.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}

          <div className="mt-6 flex flex-col space-y-3 w-full">
            <button
              onClick={() => {
                setIsSignInOpen(true)
                setNavbarOpen(false)
              }}
              className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
            >
              Official
            </button>
            <button
              onClick={() => {
                setIsSignUpOpen(true)
                setNavbarOpen(false)
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </aside>

      {/* 🟨 SignIn Modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={signInRef}
            className="relative bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
          >
            <button
              onClick={() => setIsSignInOpen(false)}
              className="absolute top-3 right-3"
              aria-label="Close Sign In"
            >
              <Icon icon="material-symbols:close-rounded" width={24} height={24} />
            </button>
            <SignIn />
          </div>
        </div>
      )}

      {/* 🟩 SignUp Modal */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={signUpRef}
            className="relative bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
          >
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="absolute top-3 right-3"
              aria-label="Close Sign Up"
            >
              <Icon icon="material-symbols:close-rounded" width={24} height={24} />
            </button>
            <SignUp />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
