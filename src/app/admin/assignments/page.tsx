"use client";

import { useState } from "react";
import { ListTodo, PlusCircle, Clock, CheckCircle2, AlertCircle, Calendar, User } from "lucide-react";
import toast from "react-hot-toast";

interface AssignmentItem {
  id: string;
  title: string;
  description: string;
  beat: string;
  assignedTo: { name: string };
  priority: string;
  status: string;
  deadline: string;
}

const initialAssignments: AssignmentItem[] = [
  {
    id: "asgn-1",
    title: "জাতীয় বাজেট ২০২৬-২৭: খাতভিত্তিক বরাদ্দ ও নাগরিক প্রত্যাশা",
    description: "অর্থ মন্ত্রণালয় ও শীর্ষ অর্থনীতিবিদদের সাথে কথা বলে বিস্তারিত প্রতিবেদন প্রস্তুত করতে হবে।",
    beat: "অর্থনীতি",
    assignedTo: { name: "মাহমুদুর রহমান" },
    priority: "জরুরি",
    status: "চলমান",
    deadline: "১৪ অক্টোবর ২০২৬",
  },
  {
    id: "asgn-2",
    title: "রাজধানীর বায়ুমান সূচক ও আধুনিক বর্জ্য ব্যবস্থাপনা প্রকল্প",
    description: "দুই সিটি কর্পোরেশনের সাম্প্রতিক পদক্ষেপ এবং বায়ুদূষণ রোধে স্থাপিত মনিটরিং স্টেশনগুলোর কার্যকারিতা নিয়ে অনুসন্ধানমূলক রিপোর্ট।",
    beat: "পরিবেশ",
    assignedTo: { name: "রাশেদুল ইসলাম" },
    priority: "উচ্চ",
    status: "বরাদ্দকৃত",
    deadline: "১৬ অক্টোবর ২০২৬",
  },
  {
    id: "asgn-3",
    title: "নারী ক্রিকেটে নতুন প্রতিভার উত্থান: অনূর্ধ্ব-১৯ ক্যাম্প রিপোর্ট",
    description: "মিরপুর ক্রিকেট একাডেমিতে চলমান বিশেষ প্রশিক্ষণ ক্যাম্প থেকে প্লেয়ারদের সাক্ষাৎকার সংগ্রহ।",
    beat: "খেলা",
    assignedTo: { name: "শাকিল আহমেদ" },
    priority: "স্বাভাবিক",
    status: "সম্পন্ন",
    deadline: "১০ অক্টোবর ২০২৬",
  },
];

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>(initialAssignments);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beat, setBeat] = useState("জাতীয়");
  const [assignedTo, setAssignedTo] = useState("মাহমুদুর রহমান");
  const [priority, setPriority] = useState("স্বাভাবিক");

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("অনুগ্রহ করে সকল তথ্য পূরণ করুন");
      return;
    }

    const newAsgn: AssignmentItem = {
      id: "asgn-" + Date.now(),
      title,
      description,
      beat,
      assignedTo: { name: assignedTo },
      priority,
      status: "বরাদ্দকৃত",
      deadline: "১৮ অক্টোবর ২০২৬",
    };

    setAssignments([newAsgn, ...assignments]);
    setShowModal(false);
    setTitle("");
    setDescription("");
    toast.success("নতুন অ্যাসাইনমেন্ট সফলভাবে বরাদ্দ করা হয়েছে!");
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    toast.success("অ্যাসাইনমেন্ট স্ট্যাটাস পরিবর্তন করা হয়েছে!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <ListTodo className="h-6 w-6 text-red-600" />
            <span>নিউজরুম অ্যাসাইনমেন্ট ডেস্ক</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            রিপোর্টারদের কাজের দায়িত্ব বণ্টন, সময়সীমা ও অগ্রগতি ট্র্যাকিং
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-sm bg-red-700 hover:bg-red-800 text-white border-none rounded-xl flex items-center gap-1.5 px-4 font-bold shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>নতুন অ্যাসাইনমেন্ট তৈরি</span>
        </button>
      </div>

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignments.map((item) => {
          const isUrgent = item.priority === "জরুরি";
          const isHigh = item.priority === "উচ্চ";
          const isCompleted = item.status === "সম্পন্ন";

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2.5 py-0.5 rounded">
                    {item.beat}
                  </span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      isUrgent
                        ? "bg-rose-100 text-rose-800 animate-pulse"
                        : isHigh
                        ? "bg-amber-100 text-amber-800"
                        : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>

                <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1 text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
                    <User className="h-3.5 w-3.5 text-neutral-400" />
                    <span>প্রতিবেদক: {item.assignedTo.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    <span>শেষ সময়: {item.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Status Switcher */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">স্ট্যাটাস:</span>
                <select
                  value={item.status}
                  onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                  className="select select-xs bg-neutral-100 dark:bg-neutral-800 border-none font-bold rounded-lg"
                >
                  <option value="বরাদ্দকৃত">বরাদ্দকৃত</option>
                  <option value="চলমান">চলমান</option>
                  <option value="সম্পন্ন">সম্পন্ন</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Creating Assignment */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-black text-lg text-neutral-900 dark:text-neutral-100">
              নতুন সংবাদ অ্যাসাইনমেন্ট বরাদ্দ
            </h3>

            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  শিরোনাম / বিষয় *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: দ্রব্যমূল্য মনিটরিং কভারেজ..."
                  className="input input-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  বিস্তারিত বিবরণ ও নির্দেশনা *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="কী কী প্রশ্ন বা উৎস অন্তর্ভুক্ত করতে হবে..."
                  className="textarea textarea-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    বিট (বিভাগ)
                  </label>
                  <select
                    value={beat}
                    onChange={(e) => setBeat(e.target.value)}
                    className="select select-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
                  >
                    <option value="জাতীয়">জাতীয়</option>
                    <option value="রাজনীতি">রাজনীতি</option>
                    <option value="অর্থনীতি">অর্থনীতি</option>
                    <option value="খেলা">খেলা</option>
                    <option value="প্রযুক্তি">প্রযুক্তি</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    প্রতিবেদক নির্বাচন
                  </label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="select select-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
                  >
                    <option value="মাহমুদুর রহমান">মাহমুদুর রহমান</option>
                    <option value="তানভীর হাসান">তানভীর হাসান</option>
                    <option value="শাকিল আহমেদ">শাকিল আহমেদ</option>
                    <option value="রাশেদুল ইসলাম">রাশেদুল ইসলাম</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  অগ্রাধিকার
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="select select-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
                >
                  <option value="স্বাভাবিক">স্বাভাবিক</option>
                  <option value="উচ্চ">উচ্চ</option>
                  <option value="জরুরি">জরুরি</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm btn-ghost rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-red-700 hover:bg-red-800 text-white rounded-xl"
                >
                  বরাদ্দ সম্পন্ন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
