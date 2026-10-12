"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Smartphone,
  Radio,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("অনুগ্রহ করে একটি ইমেইল ঠিকানা দিন");
      return;
    }
    toast.success("নিউজলেটারে সফলভাবে সাবস্ক্রাইব করা হয়েছে!");
    setEmail("");
  };

  return (
    <footer className="mt-16 bg-neutral-900 text-neutral-300 border-t-4 border-red-700">
      {/* Newsletter Strip */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-700/20 text-red-500 rounded-xl">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">দৈনিক নিউজলেটারে যুক্ত হোন</h3>
              <p className="text-xs text-neutral-400">প্রতিদিনের সেরা ও বিশ্লেষণধর্মী খবর সরাসরি আপনার ইনবক্সে।</p>
            </div>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল ঠিকানা দিন"
              className="input input-sm md:input-md bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 w-full md:w-72 focus:outline-none focus:border-red-600 rounded-lg"
            />
            <button
              type="submit"
              className="btn btn-sm md:btn-md bg-red-700 hover:bg-red-800 text-white border-none rounded-lg px-6 flex items-center gap-2"
            >
              <span>যুক্ত হোন</span>
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-red-700 text-white flex items-center justify-center font-black text-xl rounded-lg shadow-lg">
                ২৪
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">বাংলা নিউজ২৪</span>
                <span className="block text-[11px] text-red-400 font-medium">সত্যের পক্ষে সর্বদা অবিচল</span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
              বাংলা নিউজ২৪ বাংলাদেশের একটি শীর্ষস্থানীয় সার্বক্ষণিক ডিজিটাল সংবাদ মাধ্যম। রাজনীতি, অর্থনীতি, আন্তর্জাতিক ও বিনোদন জগতের সবশেষ ও বস্তুনিষ্ঠ তথ্য পাঠকের কাছে পৌঁছে দিতে আমরা প্রতিজ্ঞাবদ্ধ।
            </p>
            <div className="space-y-2 text-xs text-neutral-400">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500 shrink-0" />
                <span>প্লট ১২, বীর উত্তম সি আর দত্ত রোড, কারওয়ান বাজার, ঢাকা-১২১৫</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-500 shrink-0" />
                <span>+৮৮০ ২ ৯১০০০৮৮, +৮৮০ ২ ৯১০০০৮৯</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-500 shrink-0" />
                <span>news@banglanews24.com, editor@banglanews24.com</span>
              </p>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              সংবাদ বিভাগ
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-red-400 transition-colors">মূলপাতা</Link></li>
              <li><Link href="/category/national" className="hover:text-red-400 transition-colors">জাতীয়</Link></li>
              <li><Link href="/category/politics" className="hover:text-red-400 transition-colors">রাজনীতি</Link></li>
              <li><Link href="/category/economy" className="hover:text-red-400 transition-colors">অর্থনীতি</Link></li>
              <li><Link href="/category/international" className="hover:text-red-400 transition-colors">আন্তর্জাতিক</Link></li>
              <li><Link href="/category/sports" className="hover:text-red-400 transition-colors">খেলাধুলা</Link></li>
              <li><Link href="/category/entertainment" className="hover:text-red-400 transition-colors">বিনোদন</Link></li>
              <li><Link href="/category/technology" className="hover:text-red-400 transition-colors">তথ্যপ্রযুক্তি</Link></li>
            </ul>
          </div>

          {/* Multimedia & Features */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              মাল্টিমিডিয়া ও স্পেশাল
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/live" className="text-red-400 font-semibold hover:underline flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>লাইভ নিউজ</Link></li>
              <li><Link href="/videos" className="hover:text-red-400 transition-colors">ভিডিও প্ল্যাটফর্ম</Link></li>
              <li><Link href="/podcasts" className="hover:text-red-400 transition-colors">অডিও পডকাস্ট</Link></li>
              <li><Link href="/gallery" className="hover:text-red-400 transition-colors">ছবিতে আজকের বিশ্ব</Link></li>
              <li><Link href="/trending" className="hover:text-red-400 transition-colors">ট্রেন্ডিং সংবাদ</Link></li>
              <li><Link href="/fact-check" className="hover:text-red-400 transition-colors">ফ্যাক্ট-চেক ডেস্ক</Link></li>
              <li><Link href="/data-stories" className="hover:text-red-400 transition-colors">ডাটা জার্নালিজম</Link></li>
              <li><Link href="/archive" className="hover:text-red-400 transition-colors">আর্কাইভ</Link></li>
            </ul>
          </div>

          {/* Portal & CMS */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              নিউজরুম ও ম্যানেজমেন্ট
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/admin" className="text-amber-400 hover:underline">অ্যাডমিন ড্যাশবোর্ড</Link></li>
              <li><Link href="/newsroom/reporter" className="hover:text-red-400 transition-colors">রিপোর্টার সিএমএস</Link></li>
              <li><Link href="/newsroom/editor" className="hover:text-red-400 transition-colors">এডিটর প্যানেল</Link></li>
              <li><Link href="/admin/command-center" className="hover:text-red-400 transition-colors">কমান্ড সেন্টার</Link></li>
              <li><Link href="/admin/ai" className="hover:text-red-400 transition-colors">এআই নিউজরুম</Link></li>
              <li><Link href="/subscription" className="hover:text-red-400 transition-colors">প্রিমিয়াম সাবস্ক্রিপশন</Link></li>
              <li><Link href="/admin/enterprise/legal" className="hover:text-red-400 transition-colors">নীতিমালা ও সংশোধন</Link></li>
            </ul>

            <div className="mt-6">
              <span className="text-xs text-neutral-400 block mb-2 font-medium">সামাজিক যোগাযোগ:</span>
              <div className="flex gap-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-neutral-800 hover:bg-blue-600 hover:text-white transition-colors" title="Facebook">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-neutral-800 hover:bg-red-600 hover:text-white transition-colors" title="YouTube">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-neutral-800 hover:bg-sky-500 hover:text-white transition-colors" title="X / Twitter">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-neutral-800 hover:bg-pink-600 hover:text-white transition-colors" title="Instagram">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Editorial Disclosure */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>প্রধান সম্পাদক: ড. আশরাফুল আলম</span>
            <span>•</span>
            <span>বার্তা সম্পাদক: মাহবুব মোর্শেদ</span>
            <span>•</span>
            <span>প্রকাশক: মিডিয়া ডিজিটাল লিমিটেড</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span>বাংলাদেশ প্রেস কাউন্সিল আচরণবিধি অনুযায়ী পরিচালিত</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-neutral-600">
          © ২০২৬ বাংলা নিউজ ২৪ (Bangla News 24)। সর্বস্বত্ব সংরক্ষিত। অনুমতি ছাড়া সাইটের কোনো কন্টেন্ট পুনরুৎপাদন কপিরাইট আইনের লঙ্ঘন।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
