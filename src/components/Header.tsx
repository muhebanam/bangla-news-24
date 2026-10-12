"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import {
  Search,
  Sun,
  Moon,
  CloudSun,
  TrendingUp,
  Tv,
  Radio,
  BookOpen,
  Bell,
  Sparkles,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("news-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("news-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const bnDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const enDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors">
      {/* Top Utility Bar */}
      <div className="bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-[12px] py-1.5 px-4 text-neutral-600 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Date & Location */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{bnDate}</span>
            <span className="hidden sm:inline text-neutral-400">|</span>
            <span className="hidden sm:inline">{enDate}</span>
            <span className="hidden md:inline text-neutral-400">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <CloudSun className="h-3.5 w-3.5" />
              <span>ঢাকা ৩০°সে (আংশিক মেঘলা)</span>
            </div>
          </div>

          {/* Right: Market Pulse & Media Links */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>ডিএসই: ৬,২৪০.৪ (+০.৮%)</span>
              <span className="text-neutral-400">|</span>
              <span>ডলার: ১২১.৫০ ৳</span>
            </div>

            <Link
              href="/live"
              className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold hover:underline"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>লাইভ</span>
            </Link>

            <Link href="/live-tv" className="flex items-center gap-1 hover:text-red-600 transition-colors">
              <Tv className="h-3 w-3" />
              <span>লাইভ টিভি</span>
            </Link>

            <Link href="/podcasts" className="flex items-center gap-1 hover:text-red-600 transition-colors">
              <Radio className="h-3 w-3" />
              <span>পডকাস্ট</span>
            </Link>

            <Link href="/subscription" className="hidden sm:flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium">
              <Sparkles className="h-3 w-3" />
              <span>প্রিমিয়াম</span>
            </Link>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors"
              title="থিম পরিবর্তন"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Portal Logo & Title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center font-black text-2xl shadow-md group-hover:scale-105 transition-transform">
              ২৪
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-red-700 dark:text-red-500 tracking-tight leading-tight">
                বাংলা নিউজ২৪
              </span>
              <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                Bangla News 24 • Digital Media Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Top Header Ad / Newsroom Quick Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <div className="border border-red-100 dark:border-neutral-800 bg-red-50/50 dark:bg-neutral-800/50 rounded-xl p-2 px-3 flex items-center gap-3 text-xs">
            <div className="text-left">
              <span className="block font-bold text-red-700 dark:text-red-400">এন্টারপ্রাইজ নিউজরুম</span>
              <span className="text-neutral-600 dark:text-neutral-400">সিএমএস • এআই ডেক্স • অ্যানালিটিক্স</span>
            </div>
            <Link
              href="/admin"
              className="btn btn-xs bg-red-700 hover:bg-red-800 text-white border-none rounded-lg flex items-center gap-1"
            >
              <LayoutDashboard className="h-3 w-3" />
              <span>ড্যাশবোর্ড</span>
            </Link>
          </div>

          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="অনুসন্ধান"
          >
            <Search className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
          </button>

          {/* User Sign In / Profile */}
          <UserInfo />
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="bg-neutral-100 dark:bg-neutral-800/80 border-y border-neutral-200 dark:border-neutral-700 py-3 px-4 animate-in fade-in slide-in-from-top-2">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সংবাদ অনুসন্ধান করুন (কীওয়ার্ড, ব্যক্তি, বিষয়)..."
                className="input input-sm md:input-md w-full pl-10 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:border-red-600"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="btn btn-sm md:btn-md bg-red-700 hover:bg-red-800 text-white border-none rounded-lg px-6"
            >
              খুঁজুন
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="btn btn-sm md:btn-md btn-ghost rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Main Navigation Links */}
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
