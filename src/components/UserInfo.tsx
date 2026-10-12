"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { User, LogIn, UserPlus, Shield, Newspaper, PenTool, LayoutDashboard, ChevronDown } from "lucide-react";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignout = async () => {
    try {
      await authClient.signOut();
    } catch (e) {
      console.warn("Signout error:", e);
    }
  };

  return (
    <div className="relative">
      {user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden bg-red-700 text-white flex items-center justify-center font-bold text-xs">
              {user.image ? (
                <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
              ) : (
                (user.name || "U")[0].toUpperCase()
              )}
            </div>
            <div className="text-left hidden lg:block">
              <span className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-red-600 font-semibold">নিউজরুম টিম</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                <span className="font-bold block text-neutral-900 dark:text-neutral-100">{user.name}</span>
                <span className="text-neutral-500 truncate block">{user.email}</span>
              </div>

              <Link
                href="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                <User className="h-3.5 w-3.5 text-neutral-500" />
                <span>আমার প্রোফাইল</span>
              </Link>

              <Link
                href="/admin"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-red-600" />
                <span>অ্যাডমিন ড্যাশবোর্ড</span>
              </Link>

              <Link
                href="/newsroom/reporter"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                <PenTool className="h-3.5 w-3.5 text-blue-500" />
                <span>রিপোর্টার সিএমএস</span>
              </Link>

              <Link
                href="/newsroom/editor"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                <Newspaper className="h-3.5 w-3.5 text-emerald-500" />
                <span>এডিটর রিভিউ প্যানেল</span>
              </Link>

              <div className="border-t border-neutral-100 dark:border-neutral-800 mt-1 pt-1">
                <button
                  onClick={handleSignout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  সাইন আউট
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="btn btn-sm btn-ghost text-neutral-700 dark:text-neutral-200 hover:text-red-700 rounded-lg text-xs font-semibold"
          >
            <LogIn className="h-3.5 w-3.5 mr-1" />
            <span>সাইন ইন</span>
          </Link>
          <Link
            href="/signup"
            className="btn btn-sm bg-red-700 hover:bg-red-800 text-white border-none rounded-lg text-xs font-bold shadow-xs"
          >
            <UserPlus className="h-3.5 w-3.5 mr-1" />
            <span>সাইন আপ</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
