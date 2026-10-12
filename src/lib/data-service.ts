import { connectDB } from "@/database/mongodb";
import News from "@/models/News";
import Comment from "@/models/Comment";
import Assignment from "@/models/Assignment";
import Advertisement from "@/models/Advertisement";
import Subscriber from "@/models/Subscriber";

export interface ArticleItem {
  id: string;
  title: string;
  slug?: string;
  summary?: string;
  description?: string;
  content?: string;
  text?: string;
  category: string;
  subCategory?: string;
  imageUrl: string;
  imageAlt?: string;
  imageCaption?: string;
  author: {
    name: string;
    avatar?: string;
    designation?: string;
  };
  status: "draft" | "pending" | "revision" | "approved" | "published" | "rejected";
  editorNotes?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isLive?: boolean;
  views: number;
  reactions: {
    like: number;
    love: number;
    sad: number;
    angry: number;
    wow: number;
  };
  tags: string[];
  videoUrl?: string;
  audioUrl?: string;
  publishedAt: string;
  source?: string;
}

// Initial robust seed data with realistic Bangla journalism
const initialLocalNews: ArticleItem[] = [
  {
    id: "news-bd-101",
    title: "বাংলাদেশ ব্যাংকের নতুন আর্থিক নীতিমালা: রিজার্ভ বৃদ্ধি ও মূল্যস্ফীতি নিয়ন্ত্রণে কঠোর নির্দেশনা",
    slug: "bangladesh-bank-new-monetary-policy-reserves-inflation",
    summary: "দেশের সামগ্রিক অর্থনৈতিক স্থিতিশীলতা বজায় রাখতে এবং বৈদেশিক মুদ্রার রিজার্ভ শক্তিশালী করতে নতুন দিকনির্দেশনা ঘোষণা করেছে বাংলাদেশ ব্যাংক।",
    description: "দেশের সামগ্রিক অর্থনৈতিক স্থিতিশীলতা বজায় রাখতে এবং বৈদেশিক মুদ্রার রিজার্ভ শক্তিশালী করতে নতুন দিকনির্দেশনা ঘোষণা করেছে বাংলাদেশ ব্যাংক। বাণিজ্যিক ব্যাংকগুলোতে খেলাপি ঋণ নিয়ন্ত্রণ ও রেমিট্যান্স প্রবাহ ত্বরান্বিত করার ওপর বিশেষ জোর দেওয়া হয়েছে।",
    content: `দেশের সামগ্রিক অর্থনৈতিক স্থিতিশীলতা বজায় রাখতে এবং বৈদেশিক মুদ্রার রিজার্ভ শক্তিশালী করতে নতুন দিকনির্দেশনা ঘোষণা করেছে বাংলাদেশ ব্যাংক। 

আজ এক সংবাদ সম্মেলনে কেন্দ্রীয় ব্যাংকের মুখপাত্র জানান, চলতি অর্থবছরে মূল্যস্ফীতি এক অঙ্কে নামিয়ে আনা এবং ব্যাংকিং খাতে সুশাসন প্রতিষ্ঠা করা তাদের প্রধান লক্ষ্য। এজন্য মুদ্রা সরবরাহ নিয়ন্ত্রণ এবং ডলারের উন্মুক্ত বাজারভিত্তিক বিনিময় হার কার্যকর করার সিদ্ধান্ত নেওয়া হয়েছে।

অর্থনীতিবিদরা বলছেন, এ পদক্ষেপ সময়োপযোগী তবে এর সফল বাস্তবায়ন নির্ভর করবে আর্থিক খাতের দুর্নীতি প্রতিরোধ ও খেলাপি ঋণ আদায়ের সক্রিয় তৎপরতার ওপর। ইতিমধ্যে রপ্তানি আয় ও প্রবাসীদের পাঠানো রেমিট্যান্স প্রবাহে ইতিবাচক ধারা পরিলক্ষিত হচ্ছে।`,
    text: "বাংলাদেশ ব্যাংকের নতুন আর্থিক নীতিমালা: রিজার্ভ বৃদ্ধি ও মূল্যস্ফীতি নিয়ন্ত্রণে কঠোর নির্দেশনা...",
    category: "অর্থনীতি",
    subCategory: "ব্যাংকিং",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "বাংলাদেশ ব্যাংক ও অর্থনীতি",
    imageCaption: "মতিঝিলে বাংলাদেশ ব্যাংক প্রধান কার্যালয়। ছবি: ফাইল",
    author: {
      name: "মাহমুদুর রহমান",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      designation: "প্রধান অর্থ প্রতিবেদক",
    },
    status: "published",
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    views: 14850,
    reactions: { like: 432, love: 120, sad: 15, angry: 8, wow: 89 },
    tags: ["অর্থনীতি", "বাংলাদেশ ব্যাংক", "রিজার্ভ", "মূল্যস্ফীতি"],
    audioUrl: "",
    publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "news-bd-102",
    title: "আইসিটি খাতের যুগান্তকারী অগ্রগতি: দেশীয় সেমিকন্ডাক্টর ও এআই শিল্পে ৫০০ কোটি টাকার নতুন তহবিল",
    slug: "ict-semiconductor-ai-fund-bangladesh",
    summary: "ভবিষ্যতের বৈশ্বিক প্রযুক্তি বিপ্লবে বাংলাদেশকে এগিয়ে নিতে সেমিকন্ডাক্টর চিপ ডিজাইন ও কৃত্রিম বুদ্ধিমত্তা গবেষণায় বিশেষ জাতীয় তহবিল ঘোষণা করা হয়েছে।",
    description: "ভবিষ্যতের বৈশ্বিক প্রযুক্তি বিপ্লবে বাংলাদেশকে এগিয়ে নিতে সেমিকন্ডাক্টর চিপ ডিজাইন ও কৃত্রিম বুদ্ধিমত্তা গবেষণায় বিশেষ জাতীয় তহবিল ঘোষণা করা হয়েছে। বিশ্ববিদ্যালয়ের তরুণ প্রকৌশলীদের জন্য থাকছে আন্তর্জাতিক গবেষণার সুযোগ।",
    content: `ভবিষ্যতের বৈশ্বিক প্রযুক্তি বিপ্লবে বাংলাদেশকে এগিয়ে নিতে সেমিকন্ডাক্টর চিপ ডিজাইন ও কৃত্রিম বুদ্ধিমত্তা গবেষণায় বিশেষ জাতীয় তহবিল ঘোষণা করা হয়েছে। 

হাইটেক পার্ক কর্তৃপক্ষ জানিয়েছে, আগামী তিন বছরে অন্তত ১০ হাজার স্থানীয় সফটওয়্যার এবং হার্ডওয়্যার ইঞ্জিনিয়ারকে ভিএলএসআই এবং এআই আর্কিটেকচারে প্রশিক্ষণ দেওয়া হবে। এতে দেশীয় ফ্রিল্যান্সার এবং স্টার্টআপগুলো আন্তর্জাতিকভাবে বড় আকারের কাজ সম্পন্ন করতে সক্ষম হবে।

প্রযুক্তি বিশেষজ্ঞদের মতে, পোশাক শিল্পের পাশাপাশি প্রযুক্তি রপ্তানিকে বিলিয়ন ডলারের খাতে পরিণত করতে এ ধরনের মেগা উদ্যোগ সময়ের দাবি।`,
    text: "আইসিটি খাতের যুগান্তকারী অগ্রগতি: দেশীয় সেমিকন্ডাক্টর ও এআই শিল্পে নতুন তহবিল...",
    category: "প্রযুক্তি",
    subCategory: "আইটি ও এআই",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "সেমিকন্ডাক্টর চিপ প্রযুক্তি",
    imageCaption: "হাইটেক ল্যাবে মাইক্রোচিপ ডিজাইন কার্যক্রম। ছবি: আইসিটি মন্ত্রণালয়",
    author: {
      name: "তানভীর হাসান",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      designation: "প্রযুক্তি সম্পাদক",
    },
    status: "published",
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    views: 11200,
    reactions: { like: 620, love: 310, sad: 2, angry: 1, wow: 180 },
    tags: ["প্রযুক্তি", "সেমিকন্ডাক্টর", "এআই", "স্টার্টআপ"],
    publishedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "news-bd-103",
    title: "টি-টোয়েন্টি বিশ্বকাপ প্রস্তুতি: শেষ মুহূর্তের নাটকীয় জয়ে সিরিজ নিশ্চিত করল বাংলাদেশ",
    slug: "bangladesh-t20-series-win-world-cup-prep",
    summary: "মিরপুর শের-ই-বাংলা স্টেডিয়ামে টানটান উত্তেজনার ম্যাচে বোলারদের নৈপুণ্যে সফরকারীদের ৪ উইকেটে হারিয়ে ট্রফি নিজেদের করে নিল টাইগাররা।",
    description: "মিরপুর শের-ই-বাংলা স্টেডিয়ামে টানটান উত্তেজনার ম্যাচে বোলারদের নৈপুণ্যে সফরকারীদের ৪ উইকেটে হারিয়ে ট্রফি নিজেদের করে নিল টাইগাররা। শেষ ওভারে দলের প্রয়োজন ছিল ১২ রান, যা ছক্কা হাঁকিয়ে নিশ্চিত করেন মেহেদী হাসান।",
    content: `মিরপুর শের-ই-বাংলা স্টেডিয়ামে টানটান উত্তেজনার ম্যাচে বোলারদের নৈপুণ্যে সফরকারীদের ৪ উইকেটে হারিয়ে ট্রফি নিজেদের করে নিল টাইগাররা। 

টস জিতে প্রথমে ব্যাট করতে নেমে প্রতিপক্ষ সংগ্রহ করেছিল ১৫৪ রান। জবাবে শুরুতে চাপে পড়লেও মিডল অর্ডারে দায়িত্বশীল ব্যাটিং করে জয়ের ভিত গড়ে তোলে বাংলাদেশ দল। শেষ ওভারে শ্বাসরুদ্ধকর পরিস্থিতিতে দুটি বাউন্ডারিতে জয় নিশ্চিত হয়।

ম্যাচসেরা খেলোয়াড় বলেন, 'দলীয় শৃঙ্খলা ও সমর্থকদের অকুণ্ঠ ভালোবাসাই আমাদের এ সাফল্যের মূল প্রেরণা।'`,
    text: "টি-টোয়েন্টি বিশ্বকাপ প্রস্তুতি: শেষ মুহূর্তের নাটকীয় জয়ে সিরিজ নিশ্চিত করল বাংলাদেশ...",
    category: "খেলা",
    subCategory: "ক্রিকেট",
    imageUrl: "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "ক্রিকেট ম্যাচ উদযাপন",
    imageCaption: "জয়োল্লাসে মেতেছেন বাংলাদেশ জাতীয় ক্রিকেট দলের খেলোয়াড়রা। ছবি: ক্রীড়া বিভাগ",
    author: {
      name: "শাকিল আহমেদ",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      designation: "সিনিয়র স্পোর্টস রিপোর্টার",
    },
    status: "published",
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    views: 22400,
    reactions: { like: 1420, love: 890, sad: 5, angry: 3, wow: 340 },
    tags: ["খেলা", "ক্রিকেট", "বাংলাদেশ", "মিরপুর"],
    publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: "news-bd-104",
    title: "জলবায়ু সম্মেলন কপ-৩১: জলবায়ু তহবিলের ন্যায্য হিস্যার দাবিতে বিশ্বমঞ্চে সোচ্চার ঢাকা",
    slug: "cop-climate-summit-dhaka-demands-climate-fund",
    summary: "উপকূলীয় ঝুঁকিপূর্ণ দেশগুলোর পক্ষ থেকে পর্যাপ্ত আর্থিক ক্ষতিপূরণ ও পুনর্বাসন সহায়তার জোর দাবি জানিয়েছেন বাংলাদেশের প্রতিনিধিদল।",
    description: "উপকূলীয় ঝুঁকিপূর্ণ দেশগুলোর পক্ষ থেকে পর্যাপ্ত আর্থিক ক্ষতিপূরণ ও পুনর্বাসন সহায়তার জোর দাবি জানিয়েছেন বাংলাদেশের প্রতিনিধিদল। সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধি ও প্রাকৃতিক দুর্যোগের ক্ষয়ক্ষতি রোধে অবিলম্বে গ্রিন ক্লাইমেট ফান্ডের অর্থ ছাড়ের আহ্বান জানানো হয়।",
    content: `উপকূলীয় ঝুঁকিপূর্ণ দেশগুলোর পক্ষ থেকে পর্যাপ্ত আর্থিক ক্ষতিপূরণ ও পুনর্বাসন সহায়তার জোর দাবি জানিয়েছেন বাংলাদেশের প্রতিনিধিদল। 

আন্তর্জাতিক জলবায়ু সম্মেলনে বাংলাদেশের পরিবেশ উপদেষ্টা বলেন, 'কার্বন নিঃসরণে আমাদের অবদান নগণ্য হওয়া সত্ত্বেও সবচেয়ে বেশি ক্ষতিগ্রস্ত হচ্ছি আমরা। এটা শুধু পরিবেশ নয়, মানবাধিকার ও বেঁচে থাকার লড়াই।'

বিশ্বব্যাংক ও জাতিসংঘের প্রতিনিধিরা বাংলাদেশের দুর্যোগ ব্যবস্থাপনা মডেলের প্রশংসা করে টেকসই বেড়িবাঁধ ও সৌরশক্তি প্রকল্পে নতুন অর্থায়নের আশ্বাস দিয়েছেন।`,
    text: "জলবায়ু সম্মেলন কপ: জলবায়ু তহবিলের ন্যায্য হিস্যার দাবিতে বিশ্বমঞ্চে সোচ্চার ঢাকা...",
    category: "আন্তর্জাতিক",
    subCategory: "পরিবেশ ও কূটনীতি",
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "আন্তর্জাতিক পরিবেশ সম্মেলন",
    imageCaption: "বিশ্ব জলবায়ু শীর্ষ সম্মেলনে উচ্চপর্যায়ের আলোচনা। ছবি: রয়টার্স",
    author: {
      name: "ফারহানা আফরোজ",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      designation: "কূটনৈতিক প্রতিনিধি",
    },
    status: "published",
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    views: 7890,
    reactions: { like: 310, love: 95, sad: 40, angry: 12, wow: 45 },
    tags: ["আন্তর্জাতিক", "জলবায়ু", "পরিবেশ", "জাতিসংঘ"],
    publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "news-bd-105",
    title: "নির্বাচন কমিশনের রোডম্যাপ: স্বচ্ছ ভোটার তালিকা প্রণয়ন ও সীমানা পুনর্নির্ধারণ কার্যক্রম শুরু",
    slug: "election-commission-roadmap-voter-list",
    summary: "সকল রাজনৈতিক দল ও নাগরিক সমাজের সাথে সংলাপে বসে অবাধ, সুষ্ঠু ও নিরপেক্ষ নির্বাচন আয়োজনের অঙ্গীকার পুনর্ব্যক্ত করেছে কমিশন।",
    description: "সকল রাজনৈতিক দল ও নাগরিক সমাজের সাথে সংলাপে বসে অবাধ, সুষ্ঠু ও নিরপেক্ষ নির্বাচন আয়োজনের অঙ্গীকার পুনর্ব্যক্ত করেছে কমিশন। প্রযুক্তিনির্ভর আধুনিক মনিটরিং সেল চালু করার ঘোষণা।",
    content: `সকল রাজনৈতিক দল ও নাগরিক সমাজের সাথে সংলাপে বসে অবাধ, সুষ্ঠু ও নিরপেক্ষ নির্বাচন আয়োজনের অঙ্গীকার পুনর্ব্যক্ত করেছে কমিশন। 

প্রধান নির্বাচন কমিশনার জানান, প্রবাসীদের ভোটাধিকার নিশ্চিত করতে বিশেষ ডিজিটাল পোর্টাল প্রস্তুত করা হচ্ছে। এছাড়া প্রতিটি ভোটকেন্দ্রে পর্যাপ্ত সিসিটিভি ক্যামেরা ও নিরাপত্তা নিশ্চিত করতে আইনশৃঙ্খলা বাহিনীর সাথে সমন্বিত পরিকল্পনা গ্রহণ করা হয়েছে।`,
    text: "নির্বাচন কমিশনের রোডম্যাপ: স্বচ্ছ ভোটার তালিকা প্রণয়ন...",
    category: "রাজনীতি",
    subCategory: "নির্বাচন",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "নির্বাচনী প্রক্রিয়া ও ব্যালট",
    imageCaption: "নির্বাচন ভবনে মতবিনিময় সভায় প্রধান নির্বাচন কমিশনার। ছবি: ফোকাস বাংলা",
    author: {
      name: "রাশেদুল ইসলাম",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      designation: "রাজনৈতিক বিশ্লেষক",
    },
    status: "published",
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    views: 18920,
    reactions: { like: 580, love: 140, sad: 12, angry: 34, wow: 110 },
    tags: ["রাজনীতি", "নির্বাচন কমিশন", "ভোটার তালিকা", "গণতন্ত্র"],
    publishedAt: new Date(Date.now() - 3600000 * 15).toISOString(),
  },
  {
    id: "news-bd-106",
    title: "কান চলচ্চিত্র উৎসবে প্রশংসিত বাংলাদেশি চলচ্চিত্র: লাল গালিচায় দেশের পতাকা",
    slug: "cannes-film-festival-bangladeshi-cinema-acclaimed",
    summary: "আন্তর্জাতিক সিনেমা বোদ্ধাদের মন জয় করে কান চলচ্চিত্র উৎসবের মর্যাদাপূর্ণ বিভাগে বিশেষ সম্মাননা পেল তরুণ পরিচালকের কাহিনীচিত্র।",
    description: "আন্তর্জাতিক সিনেমা বোদ্ধাদের মন জয় করে কান চলচ্চিত্র উৎসবের মর্যাদাপূর্ণ বিভাগে বিশেষ সম্মাননা পেল তরুণ পরিচালকের কাহিনীচিত্র। নদীমাতৃক বাংলার জীবনযাত্রা ও মানুষের সংগ্রামের বাস্তব চিত্র ফুটে উঠেছে সিনেমায়।",
    content: `আন্তর্জাতিক সিনেমা বোদ্ধাদের মন জয় করে কান চলচ্চিত্র উৎসবের মর্যাদাপূর্ণ বিভাগে বিশেষ সম্মাননা পেল তরুণ পরিচালকের কাহিনীচিত্র। 

প্রদর্শনী শেষে টানা পাঁচ মিনিট দাঁড়িয়ে করতালির মাধ্যমে দর্শকদের ভালোবাসা পান শিল্পী ও কলাকুশলীরা। পরিচালক বলেন, 'এটি শুধু আমার একার নয়, পুরো বাংলাদেশের চলচ্চিত্র অঙ্গনের জন্য এক গৌরবময় দিন।'`,
    text: "কান চলচ্চিত্র উৎসবে প্রশংসিত বাংলাদেশি চলচ্চিত্র...",
    category: "বিনোদন",
    subCategory: "চলচ্চিত্র",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "সিনেমা হল ও লাল গালিচা",
    imageCaption: "উৎসব প্রাঙ্গণে লাল গালিচায় বাংলাদেশি টিম। ছবি: এএফপি",
    author: {
      name: "নুসরাত জাহান",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      designation: "সংস্কৃতি প্রতিবেদক",
    },
    status: "published",
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    views: 8940,
    reactions: { like: 710, love: 520, sad: 1, angry: 0, wow: 230 },
    tags: ["বিনোদন", "চলচ্চিত্র", "কান উৎসব", "সংস্কৃতি"],
    publishedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
];

// In-memory memory store instance for lightning-fast reads & writes
class LocalDataStore {
  private newsList: ArticleItem[] = [...initialLocalNews];
  private comments: any[] = [
    {
      id: "comm-1",
      newsId: "news-bd-101",
      userName: "আবদুল্লাহ আল মামুন",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      content: "খুবই চমৎকার ও বাস্তবসম্মত পদক্ষেপ। ব্যাংকিং সেক্টরে কঠোর জবাবদিহিতা নিশ্চিত করা সবচেয়ে জরুরি।",
      likes: 18,
      status: "approved",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      replies: [
        {
          userName: "মাহমুদুর রহমান (প্রতিবেদক)",
          userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          content: "ধন্যবাদ আপনার সুচিন্তিত মতামতের জন্য। নজরদারি বাড়ানো হচ্ছে।",
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: "comm-2",
      newsId: "news-bd-102",
      userName: "সোহেল রানা",
      userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
      content: "আমাদের দেশের তরুণরা চিপ ডিজাইনে অত্যন্ত প্রতিভাবান। সরকারি ফান্ড সময়মতো পেলে অভাবনীয় সাফল্য আসবে।",
      likes: 24,
      status: "approved",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      replies: [],
    },
  ];

  private assignments: any[] = [
    {
      id: "asgn-1",
      title: "জাতীয় বাজেট ২০২৬-২৭: খাতভিত্তিক বরাদ্দ ও নাগরিক প্রত্যাশা",
      description: "অর্থ মন্ত্রণালয় ও শীর্ষ অর্থনীতিবিদদের সাথে কথা বলে বিস্তারিত প্রতিবেদন প্রস্তুত করতে হবে। সাধারণ মানুষের ওপর করের প্রভাব খতিয়ে দেখা জরুরি।",
      beat: "অর্থনীতি",
      assignedTo: { name: "মাহমুদুর রহমান", email: "mahmud@banglanews24.com" },
      assignedBy: { name: "বার্তা সম্পাদক" },
      priority: "জরুরি",
      status: "চলমান",
      deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    },
    {
      id: "asgn-2",
      title: "রাজধানীর বায়ুমান সূচক ও আধুনিক বর্জ্য ব্যবস্থাপনা প্রকল্প",
      description: "দুই সিটি কর্পোরেশনের সাম্প্রতিক পদক্ষেপ এবং বায়ুদূষণ রোধে স্থাপিত মনিটরিং স্টেশনগুলোর কার্যকারিতা নিয়ে অনুসন্ধানমূলক রিপোর্ট।",
      beat: "পরিবেশ",
      assignedTo: { name: "রাশেদুল ইসলাম", email: "rashed@banglanews24.com" },
      assignedBy: { name: "প্রধান বার্তা সম্পাদক" },
      priority: "উচ্চ",
      status: "বরাদ্দকৃত",
      deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
    },
    {
      id: "asgn-3",
      title: "নারী ক্রিকেটে নতুন প্রতিভার উত্থান: অনূর্ধ্ব-১৯ ক্যাম্প রিপোর্ট",
      description: "মিরপুর ক্রিকেট একাডেমিতে চলমান বিশেষ প্রশিক্ষণ ক্যাম্প থেকে প্লেয়ারদের সাক্ষাৎকার ও ফটোস্টোরি সংগ্রহ।",
      beat: "খেলা",
      assignedTo: { name: "শাকিল আহমেদ", email: "shakil@banglanews24.com" },
      assignedBy: { name: "বার্তা সম্পাদক" },
      priority: "স্বাভাবিক",
      status: "সম্পন্ন",
      deadline: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  private ads: any[] = [
    {
      id: "ad-header",
      title: "বাংলাদেশ টেক সামিট ২০২৬",
      advertiser: "আইসিটি বিভাগ ও বাংলাদেশ ইনোভেশন ফোরাম",
      placement: "header_leaderboard",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      targetUrl: "https://banglanews24.com/tech-summit",
      status: "active",
      impressions: 48920,
      clicks: 1420,
    },
    {
      id: "ad-sidebar",
      title: "বিকাশ ক্যাশব্যাক অফার",
      advertiser: "বিকাশ লিমিটেড",
      placement: "sidebar_box",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
      targetUrl: "https://bkash.com",
      status: "active",
      impressions: 31200,
      clicks: 980,
    },
  ];

  private subscribers: any[] = [
    {
      id: "sub-1",
      email: "reader1@example.com",
      name: "তানিম ইসলাম",
      phone: "01711000001",
      plan: "pro_yearly",
      paymentMethod: "bkash",
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: "sub-2",
      email: "corporate@bdtech.com",
      name: "বিডি টেক সল্যুশনস",
      phone: "01819000002",
      plan: "enterprise",
      paymentMethod: "card",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];

  private liveUpdates: any[] = [
    {
      id: "live-1",
      time: "দুপুর ০১:২০",
      title: "প্রধান উপদেষ্টার প্রেস ব্রিফিং শুরু",
      content: "রাষ্ট্রীয় অতিথি ভবনে বিভিন্ন রাজনৈতিক দলের সাথে দ্বিতীয় পর্যায়ের আলোচনা শেষে প্রেস ব্রিফিংয়ে কথা বলছেন প্রধান উপদেষ্টার প্রেস সচিব।",
      badge: "জরুরি",
    },
    {
      id: "live-2",
      time: "দুপুর ১২:৪৫",
      title: "সারাদেশে বিদ্যুৎ সঞ্চালন স্বাভাবিক করার ঘোষণা",
      content: "জাতীয় গ্রিডে ত্রুটি মেরামতের কাজ সফলভাবে সম্পন্ন হয়েছে। সকল সাবস্টেশনে লোড সরবরাহ ধীরে ধীরে স্বাভাবিক হচ্ছে।",
      badge: "সর্বশেষ",
    },
    {
      id: "live-3",
      time: "সকাল ১১:৩০",
      title: "শেয়ারবাজারে সূচকের বড় উত্থান",
      content: "ডিএসই ব্রড ইনডেক্স লেনদেনের প্রথম দুই ঘণ্টায় ৭৫ পয়েন্ট বৃদ্ধি পেয়েছে। প্রাতিষ্ঠানিক বিনিয়োগকারীদের লেনদেনে সক্রিয় অংশগ্রহণ।",
      badge: "অর্থনীতি",
    },
    {
      id: "live-4",
      time: "সকাল ১০:১৫",
      title: "রাজধানীর মোড়ে ট্রাফিক পুলিশের আধুনিক সিগন্যাল টেস্টিং",
      content: "স্বয়ংক্রিয় এআই ট্রাফিক ম্যানেজমেন্ট ক্যামেরার মাধ্যমে বিজয় সরণি ও কারওয়ান বাজারে পরীক্ষামূলক লেন নিয়ন্ত্রণ শুরু হয়েছে।",
      badge: "ঢাকা",
    },
  ];

  private videos: any[] = [
    {
      id: "vid-1",
      title: "বুলেটিন: আজকের শীর্ষ খবর ও রাজনৈতিক পরিস্থিতি পর্যালোচনা",
      category: "সংবাদ বুলেটিন",
      duration: "০৮:৪৫",
      views: "৪৫ হাজার",
      thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      timeAgo: "২ ঘণ্টা আগে",
    },
    {
      id: "vid-2",
      title: "বিশেষ সাক্ষাৎকার: 'বাংলাদেশ ব্যাংক কীভাবে রিজার্ভ রক্ষা করছে' - গভর্নর",
      category: "সাক্ষাৎকার",
      duration: "১৪:২০",
      views: "২৮ হাজার",
      thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      timeAgo: "৪ ঘণ্টা আগে",
    },
    {
      id: "vid-3",
      title: "অনুসন্ধানী রিপোর্ট: তিস্তা ব্যারেজ প্রকল্পের বর্তমান চিত্র ও কৃষকদের অভিমত",
      category: "অনুসন্ধান",
      duration: "১১:১০",
      views: "৬২ হাজার",
      thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      timeAgo: "১ দিন আগে",
    },
  ];

  private podcasts: any[] = [
    {
      id: "pod-1",
      episode: "পর্ব ৪২",
      title: "অর্থনীতির হালচাল: ডলার সংকট কি কাটছে?",
      duration: "২২ মিনিট",
      date: "১২ অক্টোবর ২০২৬",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      description: "দেশের শীর্ষ অর্থনৈতিক বিশ্লেষকদের সাথে নিয়ে বাংলাদেশ ব্যাংকের নতুন মুদ্রা নীতি ও রেমিট্যান্স গতিপ্রকৃতি বিশ্লেষণ।",
      host: "মাহমুদুর রহমান",
    },
    {
      id: "pod-2",
      episode: "পর্ব ৪১",
      title: "টেকটক বাংলা: এআই যুগে সাংবাদিকতার রূপান্তর",
      duration: "১৮ মিনিট",
      date: "১০ অক্টোবর ২০২৬",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      description: "কৃত্রিম বুদ্ধিমত্তা কীভাবে সংবাদ পরিবেশন ও ফ্যাক্ট-চেকিং পরিবর্তন করছে, তা নিয়ে বিশেষ কথিকা।",
      host: "তানভীর হাসান",
    },
  ];

  // News Methods
  getAllNews(): ArticleItem[] {
    return [...this.newsList];
  }

  getNewsById(id: string): ArticleItem | undefined {
    return this.newsList.find((n) => n.id === id || n.slug === id);
  }

  createNews(newsData: Partial<ArticleItem>): ArticleItem {
    const id = "news-cms-" + Date.now();
    const newArticle: ArticleItem = {
      id,
      title: newsData.title || "শিরোনামহীন সংবাদ",
      slug: (newsData.title || "news").toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, "-"),
      summary: newsData.summary || "",
      description: newsData.description || newsData.summary || "",
      content: newsData.content || "",
      text: newsData.content || "",
      category: newsData.category || "জাতীয়",
      subCategory: newsData.subCategory || "",
      imageUrl:
        newsData.imageUrl ||
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
      imageAlt: newsData.imageAlt || newsData.title || "সংবাদ ছবি",
      imageCaption: newsData.imageCaption || "ছবি: বাংলা নিউজ২৪",
      author: newsData.author || {
        name: "নিজস্ব প্রতিবেদক",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        designation: "স্টাফ রিপোর্টার",
      },
      status: newsData.status || "published",
      editorNotes: newsData.editorNotes || "",
      isBreaking: !!newsData.isBreaking,
      isFeatured: !!newsData.isFeatured,
      isTrending: !!newsData.isTrending,
      isLive: !!newsData.isLive,
      views: 1,
      reactions: { like: 0, love: 0, sad: 0, angry: 0, wow: 0 },
      tags: newsData.tags || ["সংবাদ", newsData.category || "জাতীয়"],
      videoUrl: newsData.videoUrl || "",
      audioUrl: newsData.audioUrl || "",
      publishedAt: new Date().toISOString(),
    };

    this.newsList.unshift(newArticle);
    return newArticle;
  }

  updateNews(id: string, updateData: Partial<ArticleItem>): ArticleItem | null {
    const index = this.newsList.findIndex((n) => n.id === id);
    if (index === -1) return null;
    this.newsList[index] = { ...this.newsList[index], ...updateData };
    return this.newsList[index];
  }

  deleteNews(id: string): boolean {
    const initialLen = this.newsList.length;
    this.newsList = this.newsList.filter((n) => n.id !== id);
    return this.newsList.length < initialLen;
  }

  incrementViews(id: string): void {
    const item = this.getNewsById(id);
    if (item) {
      item.views = (item.views || 0) + 1;
    }
  }

  addReaction(id: string, reactionType: "like" | "love" | "sad" | "angry" | "wow"): void {
    const item = this.getNewsById(id);
    if (item && item.reactions) {
      item.reactions[reactionType] = (item.reactions[reactionType] || 0) + 1;
    }
  }

  // Comments
  getComments(newsId: string) {
    return this.comments.filter((c) => c.newsId === newsId);
  }

  addComment(comment: { newsId: string; userName: string; content: string; userAvatar?: string }) {
    const newComment = {
      id: "comm-" + Date.now(),
      newsId: comment.newsId,
      userName: comment.userName,
      userAvatar:
        comment.userAvatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      content: comment.content,
      likes: 0,
      status: "approved",
      createdAt: new Date().toISOString(),
      replies: [],
    };
    this.comments.unshift(newComment);
    return newComment;
  }

  // Assignments
  getAssignments() {
    return [...this.assignments];
  }

  createAssignment(data: any) {
    const newAsgn = {
      id: "asgn-" + Date.now(),
      title: data.title,
      description: data.description,
      beat: data.beat || "জাতীয়",
      assignedTo: data.assignedTo || { name: "প্রতিবেদক", email: "" },
      assignedBy: data.assignedBy || { name: "বার্তা সম্পাদক" },
      priority: data.priority || "স্বাভাবিক",
      status: "বরাদ্দকৃত",
      deadline: data.deadline || new Date(Date.now() + 86400000 * 2).toISOString(),
    };
    this.assignments.unshift(newAsgn);
    return newAsgn;
  }

  updateAssignmentStatus(id: string, status: string) {
    const item = this.assignments.find((a) => a.id === id);
    if (item) {
      item.status = status;
      return item;
    }
    return null;
  }

  // Ads
  getAds() {
    return [...this.ads];
  }

  getAdByPlacement(placement: string) {
    return this.ads.find((a) => a.placement === placement && a.status === "active") || this.ads[0];
  }

  // Subscribers
  getSubscribers() {
    return [...this.subscribers];
  }

  addSubscriber(sub: any) {
    const newSub = {
      id: "sub-" + Date.now(),
      email: sub.email,
      name: sub.name || "",
      phone: sub.phone || "",
      plan: sub.plan || "pro_monthly",
      paymentMethod: sub.paymentMethod || "bkash",
      status: "active",
      createdAt: new Date().toISOString(),
    };
    this.subscribers.unshift(newSub);
    return newSub;
  }

  // Live Updates
  getLiveUpdates() {
    return [...this.liveUpdates];
  }

  addLiveUpdate(update: { title: string; content: string; badge?: string }) {
    const date = new Date();
    const timeStr = date.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
    const item = {
      id: "live-" + Date.now(),
      time: timeStr,
      title: update.title,
      content: update.content,
      badge: update.badge || "লাইভ",
    };
    this.liveUpdates.unshift(item);
    return item;
  }

  // Videos & Podcasts
  getVideos() {
    return [...this.videos];
  }

  getPodcasts() {
    return [...this.podcasts];
  }

  // Analytics Stats
  getAnalytics() {
    const totalViews = this.newsList.reduce((acc, curr) => acc + (curr.views || 0), 125430);
    const activeReaders = Math.floor(Math.random() * 850) + 1200;
    const categoryCounts: Record<string, number> = {};
    this.newsList.forEach((n) => {
      categoryCounts[n.category] = (categoryCounts[n.category] || 0) + 1;
    });

    return {
      activeReaders,
      totalViews,
      totalArticles: this.newsList.length + 46, // combining external + internal
      publishedToday: 18,
      subscribersCount: this.subscribers.length + 1450,
      monthlyRevenue: "৳২,৮৫,৪০০",
      adRevenue: "৳১,৯৫,০০০",
      categoryDistribution: categoryCounts,
      topArticles: this.newsList.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5),
    };
  }
}

// Global Singleton
const globalStore = (global as any).__banglaNewsStore || new LocalDataStore();
if (process.env.NODE_ENV !== "production") {
  (global as any).__banglaNewsStore = globalStore;
}

export const dataStore: LocalDataStore = globalStore;
