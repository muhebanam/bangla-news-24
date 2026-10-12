"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Flame, Radio, Video, LayoutDashboard, Search } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "হোম", href: "/", icon: Home },
    { label: "ট্রেন্ডিং", href: "/trending", icon: Flame },
    { label: "লাইভ", href: "/live", icon: Radio, pulse: true },
    { label: "ভিডিও", href: "/videos", icon: Video },
    { label: "সিএমএস", href: "/admin", icon: LayoutDashboard },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 md:hidden py-1 px-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 text-[11px] font-medium transition-colors relative ${
                isActive
                  ? "text-red-700 dark:text-red-400 font-bold"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-red-600"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5 mb-0.5" />
                {item.pulse && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-600 animate-ping" />
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
