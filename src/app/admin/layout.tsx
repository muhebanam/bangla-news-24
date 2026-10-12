"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  CheckCircle2,
  ListTodo,
  BarChart3,
  Megaphone,
  Sparkles,
  ShieldAlert,
  Users,
  Compass,
  Building2,
  Handshake,
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  PenTool,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<string>("SUPER_ADMIN");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navSections = [
    {
      title: "প্রধান ব্যবস্থাপনা",
      items: [
        { label: "ড্যাশবোর্ড", href: "/admin", icon: LayoutDashboard },
        { label: "কমান্ড সেন্টার", href: "/admin/command-center", icon: Compass, badge: "নতুন" },
      ],
    },
    {
      title: "কনটেন্ট ও সিএমএস",
      items: [
        { label: "সব সংবাদ", href: "/admin/news", icon: FileText },
        { label: "নতুন সংবাদ তৈরি", href: "/admin/news/create", icon: PlusCircle },
        { label: "এডিটর রিভিউ কিউ", href: "/admin/news/review", icon: CheckCircle2, badge: "জরুরি" },
        { label: "অ্যাসাইনমেন্ট ডেস্ক", href: "/admin/assignments", icon: ListTodo },
      ],
    },
    {
      title: "নিউজরুম রোলস",
      items: [
        { label: "রিপোর্টার পোর্টাল", href: "/newsroom/reporter", icon: PenTool },
        { label: "এডিটর প্যানেল", href: "/newsroom/editor", icon: CheckCircle2 },
      ],
    },
    {
      title: "ইন্টেলিজেন্স ও মনিটাইজেশন",
      items: [
        { label: "অ্যানালিটিক্স ও ট্র্যাকিং", href: "/admin/analytics", icon: BarChart3 },
        { label: "বিজ্ঞাপন ম্যানেজার", href: "/admin/monetization/ads", icon: Megaphone },
        { label: "এআই নিউজরুম হাব", href: "/admin/ai", icon: Sparkles, badge: "এআই" },
      ],
    },
    {
      title: "এন্টারপ্রাইজ সিস্টেমস",
      items: [
        { label: "সিআরএম ও নিউজলেটার", href: "/admin/enterprise/crm", icon: Users },
        { label: "সিন্ডিকেট পার্টনারস", href: "/admin/enterprise/partners", icon: Handshake },
        { label: "লিগ্যাল ও কমপ্লায়েন্স", href: "/admin/enterprise/legal", icon: ShieldAlert },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 -mx-4 -my-6 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden bg-neutral-900 text-white p-3 flex items-center justify-between">
        <span className="font-bold text-sm flex items-center gap-2">
          <span className="h-6 w-6 bg-red-700 text-white flex items-center justify-center font-bold text-xs rounded">২৪</span>
          <span>বাংলা নিউজ২৪ সিএমএস</span>
        </span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`w-72 bg-neutral-900 text-neutral-300 border-r border-neutral-800 flex flex-col shrink-0 ${
          sidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        {/* Brand Area */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white group">
            <div className="h-8 w-8 rounded-lg bg-red-700 flex items-center justify-center font-black text-sm">
              ২৪
            </div>
            <div>
              <span className="font-black text-sm block leading-tight">বাংলা নিউজ২৪</span>
              <span className="text-[10px] text-neutral-400">এন্টারপ্রাইজ সিএমএস</span>
            </div>
          </Link>
          <Link
            href="/"
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
            title="মূল সাইটে ফিরে যান"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {/* Role Switcher Pill for Demo & Testing */}
        <div className="p-4 bg-neutral-950/60 border-b border-neutral-800">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
            ভূমিকা নির্বাচন (RBAC Role Switcher):
          </label>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="select select-xs w-full bg-neutral-900 border-neutral-700 text-white rounded-lg"
          >
            <option value="SUPER_ADMIN">সুপার অ্যাডমিন (SUPER_ADMIN)</option>
            <option value="ADMIN">অ্যাডমিন (ADMIN)</option>
            <option value="EDITOR">বার্তা সম্পাদক (EDITOR)</option>
            <option value="REPORTER">প্রতিবেদক (REPORTER)</option>
          </select>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 mb-1">
                {section.title}
              </span>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                      isActive
                        ? "bg-red-700 text-white font-bold shadow-md shadow-red-700/20"
                        : "hover:bg-neutral-800 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-neutral-800 text-amber-400">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Mini Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/40 text-[11px] text-neutral-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-red-700 text-white font-bold text-xs flex items-center justify-center">
              অ
            </div>
            <div>
              <span className="font-bold text-white block">অ্যাডমিন ইউজার</span>
              <span className="text-[10px] text-neutral-400">অনলাইন • অ্যাক্টিভ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
