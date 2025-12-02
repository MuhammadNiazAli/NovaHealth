'use client'
import React, { useState, useMemo } from "react";

const categories = [
  "All",
  "Health",
  "Wellness",
  "Fitness",
  "Nutrition",
  "Mental Health",
  "Lifestyle",
];

const allPosts = [
  {
    id: 1,
    category: "Health",
    title: "5 Tips for a Healthier Lifestyle",
    excerpt:
      "Discover simple yet effective tips to improve your daily health and well-being.",
    image:
      "https://www.sweshafoods.com/wp-content/uploads/2023/05/Healthy_Lifestyle_Tips_dd24bb977b.jpg",
    author: "Dr. Sarah Lee",
    date: "Aug 1, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sweshafoods.com%2Funcategorized%2F5-essential-tips-for-embracing-a-healthy-lifestyle%2F&psig=AOvVaw1h2shNB8uLB4QPPOS6Gd18&ust=1754759916733000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIj6pZ7c-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 2,
    category: "Health",
    title: "How to Improve Your Sleep Quality",
    excerpt:
      "Better sleep means better health — here’s how to achieve restful nights naturally.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfMyjsoqch8bCqOdPgXklIHL-HHqKlxgUM-w&s",
    author: "Sophia Turner",
    date: "Jul 10, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sriramakrishnahospital.com%2Fblog%2Fpsychiatry%2Fhow-to-improve-your-sleep-quality-tips-and-tricks%2F&psig=AOvVaw09vMwiKXNcv3LbQWakh0DN&ust=1754759877259000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMjUrIvc-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 3,
    category: "Health",
    title: "Hydration: The Key to Energy & Focus",
    excerpt:
      "Staying hydrated is crucial for health and productivity — here’s why and how.",
    image:
      "https://www.kendalmint.co.uk/cdn/shop/articles/why-you-need-to-focus-on-hydration-285384.jpg?v=1719344853",
    author: "Michael Brown",
    date: "Jul 5, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kendalmint.co.uk%2Fblogs%2Ftips-guides%2Fwhy-you-need-to-focus-on-hydration%3Fsrsltid%3DAfmBOoqfQKSmxOkXl5PEJYLL3DsbndJ4NgbADBZahvwLvavqlIMgKdQF&psig=AOvVaw1aLbesPx9XeE11XMeGIiTt&ust=1754759821572000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPCWqfHb-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 4,
    category: "Health",
    title: "Benefits of Regular Exercise",
    excerpt:
      "Learn how staying active can boost your mood, energy, and overall health.",
    image:
      "https://www.okbima.com/assets/uploads/blog/6f8355b06f32d3fdc75877579f5b1a1f.webp",
    author: "John Smith",
    date: "Jul 28, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.okbima.com%2Fhealth-insurance%2Fblog%2Fregular-exercise-benefits-bid-285&psig=AOvVaw2UvmWDukU_KJbjgdrGic1_&ust=1754759783586000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNiP597b-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 5,
    category: "Wellness",
    title: "Mindfulness Meditation for Beginners",
    excerpt:
      "Start your journey towards inner peace with these simple mindfulness techniques.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdgHjzjbC1k7eAGDZAnsUGwYPDDOzUVYIjqQ&s",
    author: "Dr. Alex Wong",
    date: "Jul 18, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoneopfit.com%2Fblogs%2Fmindfulness-meditation-for-beginners&psig=AOvVaw2pymaYObTEYZ8t9xNsdWzT&ust=1754759732322000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLCk58bb-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 6,
    category: "Wellness",
    title: "Stress Management Techniques",
    excerpt:
      "Effective ways to reduce stress and improve your mental well-being.",
    image:
      "https://static.wixstatic.com/media/adb321_1d3f6341fd73416caaa6afbe496c2aa8~mv2.jpg/v1/fill/w_568,h_320,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/adb321_1d3f6341fd73416caaa6afbe496c2aa8~mv2.jpg",
    author: "Lisa Ray",
    date: "Jul 15, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ihcrc.org%2Fpost%2Fstress-management-techniques&psig=AOvVaw0znhytG130_SehJWramcrf&ust=1754759694610000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPj8zrTb-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 7,
    category: "Wellness",
    title: "Aromatherapy Benefits for Relaxation",
    excerpt:
      "Discover how essential oils can help you relax and improve your mood.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkEehxu1c6I1TtMkPlKrU2RHmNk7G2DFosOg&s",
    author: "Mark Davis",
    date: "Jul 12, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Friversmassagetherapy.ca%2Fnews-podcast%2Faromatherapy-hot-stone-massage-the-ultimate-relaxation-and-wellness-experience&psig=AOvVaw0Fl9d7nYPYtyt1Aviyg2ti&ust=1754759646461000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMC00J3b-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 8,
    category: "Wellness",
    title: "Yoga Poses for Stress Relief",
    excerpt:
      "Simple yoga exercises to calm your mind and body after a long day.",
    image:
      "https://www.arogyayogaschool.com/blog/wp-content/uploads/2017/08/5-Best-Yoga-Poses-For-Stress-Relief.jpg",
    author: "Anna White",
    date: "Jul 9, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.arogyayogaschool.com%2Fblog%2F5-best-yoga-poses-for-stress-relief%2F&psig=AOvVaw1HpIzKj1Cq8YgIEw7BYzQh&ust=1754759595289000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNi234nb-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 9,
    category: "Fitness",
    title: "Home Workout Routines",
    excerpt:
      "Easy and effective workouts you can do without any equipment.",
    image:
      "https://burnlab.co/cdn/shop/articles/Blogs_Banner_4_-min_3bfa562a-b73d-4051-99ef-b842e94adb2a.jpg?v=1677887055",
    author: "Chris Evans",
    date: "Jun 30, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fburnlab.co%2Fblogs%2Fnews%2Fhome-workout-routine%3Fsrsltid%3DAfmBOoqmFAcmxFpHbjN5Igjd71fr4FIVhBZd3hPGdxYuG9UlWkAvkT-t&psig=AOvVaw1RkHGwUR-YDjmPj1_dZRVp&ust=1754759535563000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNCPxeja-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 10,
    category: "Fitness",
    title: "Building Strength Safely",
    excerpt:
      "Tips and techniques for strength training without injury.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJs1L0VHJZ5UDjz5IYD5w-qmV_yX-lWDCV5A&s",
    author: "Rachel Green",
    date: "Jun 25, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhealixtherapy.com%2Funlocking-core-power-pilates%2F&psig=AOvVaw1lAN8a9x6CVIjdaQoo-XiY&ust=1754759478045000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPj0zdTa-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 11,
    category: "Fitness",
    title: "Cardio Workouts for Beginners",
    excerpt:
      "How to get started with cardio exercises for better heart health.",
    image:
      "https://www.nmhfc.com/wp-content/uploads/sites/34/2024/06/PWM-2859325_July16_CardioBeginners_Infograph-scaled.jpg",
    author: "Tom Harris",
    date: "Jun 20, 2025",
    href: "https://www.nmhfc.com/blog/5-cardio-exercises-for-beginners/",
  },
  {
    id: 12,
    category: "Fitness",
    title: "Stretching Exercises to Avoid Injury",
    excerpt:
      "Best stretches to improve flexibility and prevent injuries.",
    image:
      "https://herlongsportspt.com/wp-content/uploads/2024/06/2024_Herlong_Stretching_Blog_Edited.png",
    author: "Nancy Lee",
    date: "Jun 18, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fherlongsportspt.com%2Fblog%2Fstatic-stretching-vs-dynamic-stretching-whats-the-difference%2F&psig=AOvVaw0SHLnyAK5KUrvl2V5POmyI&ust=1754759413564000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCKiKja7a-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 13,
    category: "Nutrition",
    title: "Eating Well on a Budget",
    excerpt:
      "Healthy eating doesn’t have to be expensive. Here’s how to make nutritious meals affordably.",
    image:
      "https://erincliffordwellness.com/wp-content/uploads/2016/03/eating-healthy-on-a-budget.jpg",
    author: "Emily Clark",
    date: "Jul 22, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ferincliffordwellness.com%2Fhealthy-eating-on-a-budget%2F&psig=AOvVaw2ZiZIWX51ueDz-1zc-IcDy&ust=1754759377531000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCODUr53a-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 14,
    category: "Nutrition",
    title: "Superfoods You Should Know",
    excerpt:
      "Boost your diet with these nutrient-rich superfoods.",
    image:
      "https://www.matchabloom.com/cdn/shop/articles/Matcha_bloom_blog_graphics-01.jpg?v=1637617868&width=1500",
    author: "Kevin Smith",
    date: "Jul 20, 2025",
    href: "https://www.matchabloom.com/blogs/body/a-beginners-guide-to-superfoods?srsltid=AfmBOopIJkXLV3A3BGCemHs98RcrZx-cDUCRqjjcbEyFS-Bm_jlimojZ",
  },
  {
    id: 15,
    category: "Nutrition",
    title: "Meal Prep for Busy People",
    excerpt:
      "Save time and eat healthy with these meal prep tips.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14OnzXMkKGLHxLOUB_AO6F8wBIBLf8T1C2w&s",
    author: "Samantha Jones",
    date: "Jul 15, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcentr.com%2Fblog%2Fshow%2F31181%2Fthe-ultimate-meal-prep-guide-for-busy-people&psig=AOvVaw0XADNq6hzBJ6Kk20ndklzk&ust=1754759295170000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPjSqPXZ-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 16,
    category: "Nutrition",
    title: "Vitamins and Supplements Guide",
    excerpt:
      "Understand which vitamins you need for optimal health.",
    image:
      "https://nourishedpear.com/wp-content/uploads/2023/11/Renal-Dietitians-Guide-to-Vitamins-and-Supplements-3-1024x768.jpg",
    author: "David Martin",
    date: "Jul 12, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnourishedpear.com%2Ftag%2Fsupplements%2F&psig=AOvVaw1aUDofOb9CB238pYRP2plY&ust=1754759247832000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCID1sOXZ-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 17,
    category: "Mental Health",
    title: "Overcoming Anxiety Naturally",
    excerpt:
      "Techniques and tips to manage anxiety without medication.",
    image:
      "https://www.yourcounselling.ca/wp-content/uploads/2020/08/sept-10-thegem-blog-default.jpeg",
    author: "Rachel Adams",
    date: "Jul 10, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.yourcounselling.ca%2Fhow-to-manage-anxiety%2F&psig=AOvVaw1XDEvhMSdTQl8jkRs2DPbC&ust=1754759137920000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCOirkM_Z-44DFQAAAAAdAAAAABAE",
  },
  {
    id: 18,
    category: "Mental Health",
    title: "Importance of Therapy",
    excerpt:
      "Why seeing a therapist can help improve your mental health.",
    image:
      "https://www.susanfindlay.co.uk/wp-content/uploads/2021/02/The-Importance-of-Complementary-Therapy-Blog.png",
    author: "John Doe",
    date: "Jul 8, 2025",
    href: "https://www.susanfindlay.co.uk/the-importance-of-complementary-therapy/",
  },
  {
    id: 19,
    category: "Mental Health",
    title: "Self-Care Routines",
    excerpt:
      "Daily habits to maintain good mental health.",
    image:
      "https://cdn.shopify.com/s/files/1/1472/3894/files/26_480x480.jpg?v=1707404175",
    author: "Emily Stone",
    date: "Jul 6, 2025",
    href: "https://www.monsuri.com/blogs/health-and-wellness/embracing-self-love-understanding-what-does-it-mean-to-love-yourself?srsltid=AfmBOopz9Dgcw7XeSrnS_TTs6EbmppuvzpsOxV-4qk1K4DU42CoepI_x",
  },
  {
    id: 20,
    category: "Mental Health",
    title: "Meditation for Stress Relief",
    excerpt:
      "How meditation can reduce stress and improve mental clarity.",
    image:
      "https://nkbmeditation.org/images/image/678e37342807800f0202fc11/image.png",
    author: "David Green",
    date: "Jul 4, 2025",
    href: "https://nkbmeditation.org/blog/meditation-for-working-women",
  },
  {
    id: 21,
    category: "Lifestyle",
    title: "Minimalist Living Tips",
    excerpt:
      "Simplify your life with these minimalist living strategies.",
    image:
      "https://i.ytimg.com/vi/CCOoCIfjURc/maxresdefault.jpg",
    author: "Anna Bell",
    date: "Jul 1, 2025",
    href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.youtube.com%2Fwatch%3Fv%3DCCOoCIfjURc%26pp%3DygUSI21pbmltYWxsaXZpbmd0aXBz&psig=AOvVaw0EZDbYDihYHjTryvDcIGTm&ust=1754758935423000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIC349DY-44DFQAAAAAdAAAAABAK",
  },
  {
    id: 22,
    category: "Lifestyle",
    title: "Work-Life Balance Hacks",
    excerpt:
      "Tips to balance work and personal life effectively.",
    image:
      "https://www.risely.me/wp-content/uploads/2024/06/Risely-Featured-Image-work-life-balance.webp",
    author: "Mark Spencer",
    date: "Jun 28, 2025",
    href: "https://www.risely.me/how-to-manage-work-life-balance/",
  },
  {
    id: 23,
    category: "Lifestyle",
    title: "Traveling Healthy",
    excerpt:
      "How to maintain health while traveling.",
    image:
      "https://dieteticdirections.com/wp-content/uploads/2018/05/Healthy-Vac-.png",
    author: "Lara Croft",
    date: "Jun 25, 2025",
    href: "https://dieteticdirections.com/how-to-eat-well-while-traveling/",
  },
  {
    id: 24,
    category: "Lifestyle",
    title: "Digital Detox Benefits",
    excerpt:
      "Why unplugging can improve your well-being.",
    image:
      "https://www.rollacentre.org/wp-content/uploads/sites/38/2021/09/PWM-1693361_Oct2021_BlogRb_OCT24-30_POST-scaled.jpg",
    author: "Kevin Spacey",
    date: "Jun 22, 2025",
    href: "https://www.rollacentre.org/blog/digital-detox-benefits/",
  },
    {
      id: 25,
      category: "Health",
      title: "Understanding Heart Health Basics",
      excerpt:
        "A beginner’s guide to keeping your heart strong and healthy.",
      image:
        "https://www.clevelandclinicabudhabi.ae/PublishingImages/health-byte/CCAD-Blog-Illustration_health-blog-world-heart-day-power-your-life.png",
      author: "Laura Wilson",
      date: "Aug 5, 2025",
      href: "https://www.clevelandclinicabudhabi.ae/en/health-byte/heart-and-vascular-health/8-top-tips-for-looking-after-your-heart",
    },
    {
      id: 26,
      category: "Health",
      title: "Managing Blood Pressure Naturally",
      excerpt:
        "Simple lifestyle changes that help keep blood pressure in check.",
      image:
        "https://assets.heartfoundation.org.nz/images/all-shared-sections/blogs/smart-swaps.png?mtime=1669000867",
      author: "James Carter",
      date: "Aug 7, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.heartfoundation.org.nz%2Fwellbeing%2Fmanaging-risk%2Fblood-pressure-and-your-heart%2F6-ways-to-lower-your-blood-pressure&psig=AOvVaw3K4jfNw8VL8cFS1qxnKVFj&ust=1754758778225000&source=images&cd=vfe&opi=89978449&ved=0CBYQjhxqFwoTCPjW8f7X-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 27,
      category: "Health",
      title: "Understanding Immune System Boosters",
      excerpt:
        "Natural ways to strengthen your immune defenses all year round.",
      image:
        "https://www.hollywoodpresbyterian.com/wp-content/uploads/2023/02/blog-immune.jpg",
      author: "Megan Foster",
      date: "Aug 10, 2025",
      href: "https://www.hollywoodpresbyterian.com/blog-dietitian-shares-tips-to-boost-your-immune-system/",
    },
    {
      id: 28,
      category: "Health",
      title: "Managing Chronic Pain Effectively",
      excerpt:
        "Explore strategies to reduce and cope with chronic pain daily.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqUZBM3JiO5QB05ntiXn8vXTESwWs97f_AnQ&s",
      author: "Dr. Henry Clark",
      date: "Aug 12, 2025",
      href: "https://www.norms.in/blog/conquering-chronic-pain-a-comprehensive-guide-to-effective-management/",
    },
    {
      id: 29,
      category: "Wellness",
      title: "Journaling for Mental Clarity",
      excerpt:
        "How writing daily can help clear your mind and improve well-being.",
      image:
        "https://openmh.org/wp-content/uploads/2025/03/Blog-posts_OpenMH_Journaling_The-Benefits-of-Journaling-for-Mental-Health.jpg",
      author: "Mia Sanders",
      date: "Aug 4, 2025",
      href: "https://openmh.org/writing-things-down-how-journaling-genuinely-helps-your-mental-health/",
    },
    {
      id: 30,
      category: "Wellness",
      title: "Benefits of Nature Walks",
      excerpt:
        "Explore how spending time in nature boosts your wellness and mood.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxALEhr7hiGG53uEzdrwsIoojg-UGzweQfGA&s",
      author: "David Wright",
      date: "Aug 6, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.gorillajobs.com.au%2F2023%2F08%2F21%2Fhiking-and-healing-the-therapeutic-benefits-of-nature-walks%2F&psig=AOvVaw1C5kG3_EF456nhSSIO-_Zg&ust=1754758562457000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCOi4mZnX-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 31,
      category: "Wellness",
      title: "Guided Relaxation Techniques",
      excerpt:
        "Step-by-step relaxation exercises for busy lifestyles.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJeGxeiVx8cRcCVjev__AHLIcDOBFy5enLhA&s",
      author: "Sophia Carter",
      date: "Aug 8, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fladormir.com.au%2F5-minute-meditation-techniques-to-calm-your-mind%2F%3Fsrsltid%3DAfmBOor9t61i7CEx2ZMH17bzIVKa14z_7pymW99DCM113QEbSWg28pej&psig=AOvVaw1UyIwuA1BtA57R8oU-XsHn&ust=1754758505929000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCODDif3W-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 32,
      category: "Wellness",
      title: "Digital Wellness: Managing Screen Time",
      excerpt:
        "Tips to balance technology use for better mental health.",
      image:
        "https://medsourcelabs.com/wp-content/uploads/2024/06/Digital-Detox-blog-banner1.webp",
      author: "James Lee",
      date: "Aug 10, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedsourcelabs.com%2Fmedsource-labs-corporate-wellness-tips-digital-detox-and-screen-time-management%2F&psig=AOvVaw0OLKHVo6x_wkfJaU9MhhMO&ust=1754758462003000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMDAlejW-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 33,
      category: "Fitness",
      title: "HIIT Workouts for Busy Schedules",
      excerpt:
        "High-intensity interval training routines you can fit in anytime.",
      image:
        "https://www.airrosti.com/wp-content/uploads/2016/01/2022_02_-Workout-on-Busy-Schedule-LinkedIn-Graphic-01-scaled.jpg",
      author: "Olivia Martinez",
      date: "Aug 3, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.airrosti.com%2Fblog%2Fworking-out-with-a-busy-schedule%2F&psig=AOvVaw0rKcF_ggOpdfqg_qke3VE4&ust=1754758408525000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMCZ8M7W-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 34,
      category: "Fitness",
      title: "Strength Training for Seniors",
      excerpt:
        "Safe ways for older adults to build strength and stay active.",
      image:
        "https://images.ctfassets.net/qw8ps43tg2ux/5OKnox3rWZtrHCuUxinU8R/60dbf081a1c1e76b59d64f3baf858ba8/issa_strengthtrainingforseniors_blogheader.jpg",
      author: "George Hill",
      date: "Aug 5, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.issaonline.com%2Fblog%2Fpost%2Fthe-importance-of-strength-training-for-seniors&psig=AOvVaw2lXqEicGtdH7ya4g1b4b00&ust=1754758360298000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCKDD87fW-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 35,
      category: "Fitness",
      title: "Pilates for Core Strength",
      excerpt:
        "Improve your posture and core strength with Pilates exercises.",
      image:
        "https://i.ytimg.com/vi/lqTWfc-mfow/maxresdefault.jpg",
      author: "Emma Johnson",
      date: "Aug 7, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpilateslive.co.uk%2Fpilates-classes%2Fpilates-core-strength-and-stability%2F&psig=AOvVaw3OzbHEWr4DtlpWQYoLCX-e&ust=1754758318541000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNDxxKTW-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 36,
      category: "Fitness",
      title: "Outdoor Running Tips",
      excerpt:
        "How to maximize your outdoor running experience safely and effectively.",
      image:
        "https://macrosinc.net/wp-content/uploads/2024/04/5-trail-running-tips-for-beginners-1024x536.png",
      author: "Liam Walker",
      date: "Aug 9, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmacrosinc.net%2Fblog%2Ftrail-running-tips%2F&psig=AOvVaw0HiJTrL-MZecv-5uxWHuIw&ust=1754758257018000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIDs8YbW-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 37,
      category: "Nutrition",
      title: "Plant-Based Diet Benefits",
      excerpt:
        "Why incorporating more plants into your diet can improve your health.",
      image:
        "https://www.cardiometabolichealth.org/wp-content/uploads/2020/03/BENEFITS-OF-A-PLANT-BASED-DIET-IN-KEEPING-A-HEALTHY-HEART-01.jpg",
      author: "Natalie King",
      date: "Aug 2, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cardiometabolichealth.org%2Fbenefits-of-a-plant-based-diet-in-keeping-a-healthy-heart%2F&psig=AOvVaw0MkG2hvzJrz5SXy0vNNT-l&ust=1754758217858000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJiNx_TV-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 38,
      category: "Nutrition",
      title: "Healthy Smoothie Recipes",
      excerpt:
        "Delicious and nutritious smoothie ideas for energy and wellness.",
      image:
        "https://sweetfreedom.co.uk/cdn/shop/articles/pics_blog_2_1024x.png?v=1730486878",
      author: "Brian Scott",
      date: "Aug 4, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsweetfreedom.co.uk%2Fblogs%2Frecipes%2Fscrumptious-berry-smoothie%3Fsrsltid%3DAfmBOoqt-BdplYjHf1ah88xZ8UBrQx44fq1_e619yJAY8DRqF2tG1T2f&psig=AOvVaw13YO4kayxReYzZZPINk1kM&ust=1754758138449000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJDE883V-44DFQAAAAAdAAAAABAK",
    },
    {
      id: 39,
      category: "Nutrition",
      title: "Reading Nutrition Labels",
      excerpt:
        "Learn to decode food labels to make smarter dietary choices.",
      image:
        "https://cdn.shopify.com/s/files/1/2364/6329/files/How-to-Read-Nutrition-Labels-Blog02-min_1024x1024.jpg?v=1705698455",
      author: "Karen Lee",
      date: "Aug 6, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.primalkitchen.com%2Fblogs%2Frecipes%2Fhow-to-read-a-nutrition-label%3Fsrsltid%3DAfmBOooC_qbgV6KdeCRsBe_UIGMGZeiix3E6HBP077E9Wx52PwxOORjW&psig=AOvVaw2D3lzROnvorlIHp_VtkgFz&ust=1754758105418000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJiVlr7V-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 40,
      category: "Nutrition",
      title: "Gut Health and Nutrition",
      excerpt:
        "Understanding the connection between diet and your gut microbiome.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-cMY0N4SpmIWKv29aZQJEhw58ojBz67ZcAQ&s",
      author: "Samuel Evans",
      date: "Aug 8, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Featsense.com.au%2Fblog%2Foptimising-your-gut-health%2F&psig=AOvVaw1kfL5kGzR9tDFqoY0Psi98&ust=1754758070265000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMDC-63V-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 41,
      category: "Mental Health",
      title: "Building Emotional Resilience",
      excerpt:
        "Strategies to strengthen your ability to cope with life’s challenges.",
      image:
        "https://lh7-rt.googleusercontent.com/docsz/AD_4nXffzxILRvhnUpLPiToDQaVWzWvf3IWa0HVd6N8ZqOBl64REOh7WUcP51AENjHzYl9hKV8XL78z0NZ7MheTf0aEthmN4spMRWlWvJVB4cHi8STW1p3pjtRFqIa9ZGD6yjf3HeSs3AqDMw_cAWYRviyiCGDb8?key=zo0mgAUJC1TOqAXUsXjD8A",
      author: "Rachel Adams",
      date: "Aug 3, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fkapable.club%2Fblog%2Fleadership%2Fhow-to-develop-resilience-as-a-leader-strategies-and-tools%2F&psig=AOvVaw3KeDxboRZyJRI-G6yfD4cj&ust=1754758020038000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNiRp5bV-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 42,
      category: "Mental Health",
      title: "Benefits of Group Therapy",
      excerpt:
        "How sharing experiences in groups can support your mental wellness.",
      image:
        "https://councilforrelationships.org/wp-content/uploads/FI-Blog--1024x1024.jpg",
      author: "John Doe",
      date: "Aug 5, 2025",
      href: "https://councilforrelationships.org/wp-content/uploads/FI-Blog--1024x1024.jpg",
    },
    {
      id: 43,
      category: "Mental Health",
      title: "Sleep and Mental Health",
      excerpt:
        "Exploring the link between good sleep habits and mental wellness.",
      image:
        "https://claytonsleep.com/wp-content/uploads/2024/11/CSI-Blogs-5.png",
      author: "Emily Stone",
      date: "Aug 7, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fclaytonsleep.com%2Fmedia%2Fcsi-blog%2Fpage%2F2%2F&psig=AOvVaw3siZiNsNzN-HrLRX-5bFjA&ust=1754757940132000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLCDtu_U-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 44,
      category: "Mental Health",
      title: "Mindful Breathing Exercises",
      excerpt:
        "Easy breathing techniques to calm your mind in stressful moments.",
      image:
        "https://blog.tcea.org/wp-content/uploads/2022/03/6-activities-mindfulness-classroom-956x1024.png",
      author: "David Green",
      date: "Aug 9, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.tcea.org%2Fsix-mindfulness-activities%2F&psig=AOvVaw0B2v3g8Dc7QfivA2QVa9XZ&ust=1754757915121000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNCRtuPU-44DFQAAAAAdAAAAABAE",
    },  
    {
      id: 45,
      category: "Lifestyle",
      title: "Creating a Capsule Wardrobe",
      excerpt:
        "Simplify your closet with versatile, timeless clothing pieces.",
      image:
        "https://blog.adadeferrari.com/wp-content/uploads/2019/12/How-to-Build-a-Capsule-Wardrobe-for-Travel-blog-1160x720.png",
      author: "Anna Bell",
      date: "Aug 1, 2025",
      href: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fblog.adadeferrari.com%2Fhow-to-build-a-capsule-wardrobe-for-travel%2F&psig=AOvVaw2mIKb7fDiGfELQRTT23lar&ust=1754757890768000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCICd0dfU-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 46,
      category: "Lifestyle",
      title: "Eco-Friendly Home Tips",
      excerpt:
        "Small changes to make your home more environmentally sustainable.",
      image:
        "https://ideal-turf.com/wp-content/uploads/2021/04/Eco-Friendly-Home-Tips-1030x687.jpeg",
      author: "Mark Spencer",
      date: "Aug 3, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fideal-turf.com%2Feco-friendly-home-tips%2F&psig=AOvVaw31RHee2izQPC0K1EyEiTTZ&ust=1754757860860000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMCp2czU-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 47,
      category: "Lifestyle",
      title: "Balancing Technology & Family Time",
      excerpt:
        "How to reduce screen time and connect more with your loved ones.",
      image:
        "https://fastercapital.com/i/Online-wellness--How-to-Improve-Your-Mental-and-Emotional-Well-being-Online--Balancing-Screen-Time-and-Self-Care.webp",
      author: "Lara Croft",
      date: "Aug 5, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffastercapital.com%2Fcontent%2FOnline-wellness--How-to-Improve-Your-Mental-and-Emotional-Well-being-Online.html&psig=AOvVaw1w-p7OGrp_peXHubp5itMU&ust=1754757833001000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJinn7zU-44DFQAAAAAdAAAAABAE",
    },
    {
      id: 48,
      category: "Lifestyle",
      title: "The Art of Slow Living",
      excerpt:
        "Embracing a slower pace for a happier, healthier life.",
      image:
        "https://earthyroute.com/cdn/shop/articles/Blog_Covers_2025_b5048323-ca75-481f-a07e-5ee545d2b5ce_2240x.png?v=1748081531",
      author: "Kevin Spacey",
      date: "Aug 7, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fearthyroute.com%2Fblogs%2Fearthy-route-blogs%2Fthe-art-of-slow-living-why-more-men-are-embracing-it%3Fsrsltid%3DAfmBOopi8vzVUNpzdr5iYg6NbrvXSvjEohUiKSLNd0t1ODEnCon1chOR&psig=AOvVaw3CXS7EnSoELCw9sQvpjBCa&ust=1754757765838000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCOjNpJzU-44DFQAAAAAdAAAAABAE",
    },  
      {
        id: 49,
        category: "Health",
        title: "The Importance of Regular Health Screenings",
        excerpt:
          "Stay ahead of health issues with timely medical screenings.",
        image:
          "https://www.primehealthasheville.com/images/blog/PrimeHealth-Asheville-Rich-Link.6).jpg",
        author: "Dr. Anna Clarke",
        date: "Aug 15, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.primehealthasheville.com%2Fabout-us%2Fblog%2F2024%2Fmay%2Fthe-importance-of-regular-health-screenings%2F&psig=AOvVaw1ptE3h0zAahHnZ7Cwemev4&ust=1754757691114000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCOClvfjT-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 50,
        category: "Health",
        title: "Foods That Naturally Reduce Inflammation",
        excerpt:
          "Discover anti-inflammatory foods that promote better health.",
        image:
          "https://domf5oio6qrcr.cloudfront.net/medialibrary/14953/ftfi0124foodsthatfightinflammationcover.jpg",
        author: "Michael Parker",
        date: "Aug 16, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.health.harvard.edu%2Fstaying-healthy%2Ffoods-that-fight-inflammation-guide&psig=AOvVaw1O9wNcvEGQysfidZCBMg29&ust=1754757795390000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCOjhnarU-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 51,
        category: "Health",
        title: "Understanding Diabetes Prevention",
        excerpt:
          "Tips and lifestyle choices to lower your risk of diabetes.",
        image:
          "https://neelamhospital.com/wp-content/uploads/2025/03/Neelam-1-3.jpg",
        author: "Dr. Samantha Wells",
        date: "Aug 17, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fneelamhospital.com%2Fhow-to-prevent-diabetes%2F&psig=AOvVaw2wMqJr3d50WfAdkpthbfPM&ust=1754760038774000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLDCmNrc-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 52,
        category: "Health",
        title: "Natural Remedies for Common Colds",
        excerpt:
          "Boost your recovery with these effective home remedies.",
        image:
          "https://max-website20-images.s3.ap-south-1.amazonaws.com/medium_Home_Remedies_2_3a862824e8.jpg",
        author: "James Reynolds",
        date: "Aug 18, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.maxhealthcare.in%2Fblogs%2Fcommon-cold-virus-symptoms-and-home-remedies&psig=AOvVaw0FYocwLA7c1cAmOjhrX4q7&ust=1754760913734000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNiD8_nf-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 53,
        category: "Health",
        title: "How Gut Health Affects Your Immune System",
        excerpt:
          "Explore the powerful connection between your gut and immunity.",
        image:
          "https://blumhealthmd.com/wp-content/uploads/2020/04/gut-affects-immune-system-blog.png",
        author: "Olivia Matthews",
        date: "Aug 19, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fblumhealthmd.com%2F2020%2F06%2F16%2Fhow-your-gut-affects-your-immune-system%2F&psig=AOvVaw1nbp4hVBtcl5Xrx27aS_HT&ust=1754761037877000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCODxzrXg-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 54,
        category: "Health",
        title: "Vitamin D: Why You Need It and How to Get Enough",
        excerpt:
          "The essential benefits of vitamin D and how to maintain proper levels.",
        image:
          "https://ukhsa.blog.gov.uk/wp-content/uploads/sites/33/2016/07/vitamin-d.png",
        author: "Dr. Kevin Lee",
        date: "Aug 20, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fukhsa.blog.gov.uk%2F2016%2F07%2F21%2Fexpert-interview-why-we-all-need-vitamin-d%2F&psig=AOvVaw0j1tolJ-jrCPGGRp3B0j4w&ust=1754761117075000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIDz4Nzg-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 55,
        category: "Health",
        title: "Understanding Mental Health Disorders",
        excerpt:
          "An overview of common mental health conditions and support options.",
        image:
          "https://cdn.sanity.io/images/ix6yojsv/production/7059db5e341b0b904db142e9b6222573d8721efd-1600x900.jpg",
        author: "Rachel Kim",
        date: "Aug 21, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcodesupply.co%2Fmental-health-blogs%2F&psig=AOvVaw3CdDWOEAM1KKKSq9Y-cmtM&ust=1754761758469000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLiD3JDj-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 56,
        category: "Health",
        title: "The Role of Antioxidants in Aging",
        excerpt:
          "How antioxidants help slow aging and keep you healthy.",
        image:
          "https://liveforever.club/Images/supplements/antioxidants/role-of-antioxidants-in-ageing-blog.jpg",
        author: "Dr. Nathan Hill",
        date: "Aug 22, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fliveforever.club%2Fblog%2Fantioxidants-in-ageing-and-health&psig=AOvVaw0flxB3RkCPwxvGiSumLdZv&ust=1754761821001000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJiX9Kzj-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 57,
        category: "Wellness",
        title: "Creating a Personal Wellness Routine",
        excerpt:
          "Design a daily routine that nurtures your body and mind.",
        image:
          "https://naturesplus.com/cdn/shop/articles/19-Building_a_Personalized_Wellness_Routine-Email_600x.png?v=1736182030",
        author: "Sophia Young",
        date: "Aug 15, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnaturesplus.com%2Fblogs%2Fwellness%2Fbuilding-a-personalized-wellness-routine%3Fsrsltid%3DAfmBOor-PkB-wR6Dcxe5yTiuyaEecz2tYqO1P7URHDgucvwma1ijn9EM&psig=AOvVaw0qlQQ5kMPAEMUVRtG687gJ&ust=1754761859463000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNC1mLzj-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 58,
        category: "Wellness",
        title: "The Power of Positive Thinking",
        excerpt:
          "How shifting your mindset can improve your overall well-being.",
        image:
          "https://continentalhospitals.com/images/blogs/6ebd5bbe1e653ee2fd062df0a13bb63d.webp",
        author: "Daniel Foster",
        date: "Aug 16, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcontinentalhospitals.com%2Fblog%2Fthe-power-of-positive-thinking-how-it-impacts-your-health%2F&psig=AOvVaw1Pdd6WHFCwRhFBtusOv_kt&ust=1754761889038000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLjrr8vj-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 59,
        category: "Wellness",
        title: "Sleep Hygiene: Tips for Better Rest",
        excerpt:
          "Simple habits to improve your sleep quality and duration.",
        image:
          "https://www.sitnsleep.com/cdn/shop/articles/sns_blog_hygiene_804x484_f52e80d4-9eae-48d0-834b-adb1fa7fbb1c_804x.jpg?v=1744741892",
        author: "Lily Johnson",
        date: "Aug 17, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sitnsleep.com%2Fblogs%2Fblog%2Fsleep-hygiene-tips-for-better-rest-health%3Fsrsltid%3DAfmBOoq79SK8LGpraOTKKO4QlBBozl8i_Mh_VuosThr_icZVUGSlDqTF&psig=AOvVaw0LAjWNQDjVEtBK-Q7k8GLW&ust=1754761936757000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNja_eDj-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 60,
        category: "Wellness",
        title: "How to Practice Gratitude Daily",
        excerpt:
          "Boost happiness and mental health through gratitude exercises.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCggL5z1A7VS0qnQmGXFg5q0Wkte67s_h0ag&s",
        author: "Ella Davis",
        date: "Aug 18, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthelawsongroup.com%2Fweekly-wellness-tips-being-thankful%2F&psig=AOvVaw3nmxIp5Tn9W7I49eWSSRqK&ust=1754761970527000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMC8j_vj-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 61,
        category: "Wellness",
        title: "Using Essential Oils for Emotional Balance",
        excerpt:
          "Discover the calming effects of aromatherapy and essential oils.",
        image:
          "https://pureoilsindia.b-cdn.net/storage/blog/abdc8edd9c7fa2f1261c1bc7fcfc035c.jpg",
        author: "Mark Thompson",
        date: "Aug 19, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pureoilsindia.com%2Fblog%2Fnatural-mood-balancing-oils&psig=AOvVaw0O4dUl4SEPYcysXH2aYs6F&ust=1754762025092000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMj69Y7k-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 62,
        category: "Wellness",
        title: "Building Resilience Through Meditation",
        excerpt:
          "Learn meditation techniques to increase your emotional strength.",
        image:
          "https://blogs.resiliencyprogram.com/wp-content/uploads/2024/07/8.-Mindfulness-and-meditation-1.jpg",
        author: "Julia Martin",
        date: "Aug 20, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fresiliencyprogram.com%2Fblog%2Fthe-role-of-mindfulness-and-meditation-in-building-resilience&psig=AOvVaw1xiVP9f0myrSSKUBekjMGi&ust=1754762098097000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNj4hq7k-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 63,
        category: "Wellness",
        title: "Detox Your Mind with Digital Breaks",
        excerpt:
          "Strategies to reduce digital overload and improve mental clarity.",
        image:
          "https://miro.medium.com/v2/resize:fit:1200/1*KzQ9-zn-mVC43uDSkZxbVg.jpeg",
        author: "Matthew Carter",
        date: "Aug 21, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40vinaythilak002%2Fdigital-detox-2-0-refresh-your-mind-in-the-modern-world-a147498dbcfc&psig=AOvVaw3kCW5kOOsO5onupxcI8QpZ&ust=1754762316568000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCKDm7Zbl-44DFQAAAAAdAAAAABAJ",
      },
      {
        id: 64,
        category: "Wellness",
        title: "Hydrotherapy Benefits for Relaxation",
        excerpt:
          "Explore how water-based therapies improve physical and mental health.",
        image:
          "https://www.penrithphysiotherapy.com.au/wp-content/uploads/2023/08/WHAT-ARE-THE-BENEFITS-OF-1920-%C3%97-1080-px-1-1024x576.jpg",
        author: "Rachel Wilson",
        date: "Aug 22, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.penrithphysiotherapy.com.au%2Fwhat-are-the-benefits-of-hydrotherapy%2F&psig=AOvVaw3seAD0m3A660uJk92lBiEr&ust=1754762358565000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIC_iqrl-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 65,
        category: "Fitness",
        title: "Beginner's Guide to Weightlifting",
        excerpt:
          "Start your strength journey with safe weightlifting tips.",
        image:
          "https://images.squarespace-cdn.com/content/v1/65df0f4e3d072c5d1dceb2b3/1711394859415-JUP1MJFHF8P6EUVC4ZPM/A-beginners-guide-to-weight-training.jpeg",
        author: "Liam Johnson",
        date: "Aug 15, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ebylife.com%2Fblog1%2F2016%2F11%2F7%2Fa-beginners-guide-to-weight-training-and-muscle-gain&psig=AOvVaw3bTSB3wYkFX6IFlIRnRsTO&ust=1754762399881000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPjG5b7l-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 66,
        category: "Fitness",
        title: "Benefits of Swimming for Full Body Fitness",
        excerpt:
          "Discover why swimming is a great workout for all ages.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIkVFVibt5WLFHTfdTt2r5ULyvUB3KsYP1gw&s",
        author: "Emily Roberts",
        date: "Aug 16, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Framagyasportsacademy.com%2Fswimming-as-a-full-body-workout-engaging-every-muscle%2F&psig=AOvVaw3SwOUszB7fI2jXkhollG0u&ust=1754762480429000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPDxq-Tl-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 67,
        category: "Fitness",
        title: "CrossFit: What Beginners Need to Know",
        excerpt:
          "An introduction to CrossFit and how to get started safely.",
        image:
          "https://www.copperjoint.com/wp-content/uploads/2021/04/New-to-CrossFit-8-Top-Tips-for-CrossFit-Beginners_main-26-09-2016.jpg",
        author: "Noah Clark",
        date: "Aug 17, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.copperjoint.com%2Fnew-to-crossfit-8-top-tips-for-crossfit-beginners%2F%3Fsrsltid%3DAfmBOoomey58YcCWkpV80g9ZSN708lbRIsey53SGib1d44O4wu_HSdoI&psig=AOvVaw1iWvUW4JEqM1YpbUt94URc&ust=1754762517866000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNCZiPbl-44DFQAAAAAdAAAAABAK",
      },
      {
        id: 68,
        category: "Fitness",
        title: "Outdoor Cycling Benefits",
        excerpt:
          "Why cycling outdoors is great for fitness and mental health.",
        image:
          "https://rinascltabike.com/wp-content/uploads/2024/03/What-are-the-outdoor-cycling-benefits-for-males.jpg",
        author: "Mia Anderson",
        date: "Aug 18, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Frinascltabike.com%2Fcycling%2Fbenefits%2Fmen%2F&psig=AOvVaw3Ypq3wsxlqrtmG3VSaFT7a&ust=1754762556313000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMCctIjm-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 69,
        category: "Fitness",
        title: "Effective Warm-Up Routines",
        excerpt:
          "Prepare your body and reduce injury risk with these warm-up exercises.",
        image:
          "https://images.ctfassets.net/qw8ps43tg2ux/4yKS4EdRfQJCKKTqpkwqNu/101a560c688cc2bfb4d58c2e27af3433/issa-blogheader-warmupcooldown.jpg?fm=webp&w=1440&q=75",
        author: "Ethan Moore",
        date: "Aug 19, 2025",
        href: "https://images.ctfassets.net/qw8ps43tg2ux/4yKS4EdRfQJCKKTqpkwqNu/101a560c688cc2bfb4d58c2e27af3433/issa-blogheader-warmupcooldown.jpg?fm=webp&w=1440&q=75",
      },
      {
        id: 70,
        category: "Fitness",
        title: "Yoga for Flexibility and Strength",
        excerpt:
          "How regular yoga practice improves overall fitness.",
        image:
          "https://www.arhantayoga.org/wp-content/uploads/2020/09/Ultimate-Guide-to-Yoga-for-Strength-and-Flexibility.jpg",
        author: "Isabella Lewis",
        date: "Aug 20, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.arhantayoga.org%2Fblog%2Fthe-ultimate-guide-to-yoga-for-strength-and-flexibility%2F&psig=AOvVaw2U6ym8JOwm-Ulv6s9bdru2&ust=1754762621856000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMi__Kjm-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 71,
        category: "Fitness",
        title: "Tracking Your Fitness Progress",
        excerpt:
          "Tips and tools to effectively track and measure your workouts.",
        image:
          "https://assets-wp-cdn.onsurity.com/wp/wp-content/uploads/2021/03/27182457/Track-Your-Fitness-Progress-Other-than-Just-Weight.png",
        author: "Jacob Martin",
        date: "Aug 21, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.onsurity.com%2Fblog%2Ffitness-progress%2F&psig=AOvVaw0FPVOsHs_jIkS1QGeftgbh&ust=1754762660993000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPjusbrm-44DFQAAAAAdAAAAABAE",
      },
      {
        id: 72,
        category: "Fitness",
        title: "Strength Training Myths Debunked",
        excerpt:
          "Separating fact from fiction for safe and effective training.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz64uLtgh50npUZlPTbOtlULejWpWF890hIw&s",
        author: "Grace Turner",
        date: "Aug 22, 2025",
        href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.o2fitnessclubs.com%2Fweight-lifting-myths&psig=AOvVaw37J3eBkBIaICzBkaLvpIIH&ust=1754762733150000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJil69zm-44DFQAAAAAdAAAAABAE",
      },
];


const POSTS_INCREMENT = 12;

const ModernFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(POSTS_INCREMENT);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filter posts based on category and search term
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    if (selectedCategory !== "All") {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lower) ||
          post.excerpt.toLowerCase().includes(lower)
      );
    }

    return posts;
  }, [selectedCategory, searchTerm]);

  // Reset visibleCount when filters change
  React.useEffect(() => {
    setVisibleCount(POSTS_INCREMENT);
  }, [selectedCategory, searchTerm]);

  // Handler for loading more posts
  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate async loading (e.g. API fetch)
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + POSTS_INCREMENT, filteredPosts.length)
      );
      setLoadingMore(false);
    }, 800); // smooth loading delay
  };

  // Posts to actually display
  const postsToShow = filteredPosts.slice(0, visibleCount);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 my-[-30px]">
      {/* Search + Categories Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Search input */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="search"
            placeholder="Search posts..."
            className="w-full border border-gray-300 rounded-full py-2 pl-3 pr-10 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search posts"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition text-sm"
            >
              &#10005;
            </button>
          )}
        </div>

        {/* Categories nav */}
        <nav
          aria-label="Categories"
          className="w-full sm:w-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ul className="flex gap-4 whitespace-nowrap border-b border-gray-200 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = cat === selectedCategory;
              return (
                <li key={cat}>
                  <button
                    className={`relative pb-1 font-semibold transition-colors text-xs sm:text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                      isActive
                        ? "text-blue-600 after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-blue-600"
                        : "text-gray-600 hover:text-blue-500"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {cat}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        {selectedCategory !== "All" && (
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium select-none">
            <span>{selectedCategory}</span>
            <button
              aria-label={`Remove filter ${selectedCategory}`}
              onClick={() => setSelectedCategory("All")}
              className="hover:text-blue-900 transition text-sm"
            >
              &#10005;
            </button>
          </div>
        )}
        {searchTerm.trim() !== "" && (
          <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium select-none">
            <span>Search: "{searchTerm}"</span>
            <button
              aria-label="Clear search filter"
              onClick={() => setSearchTerm("")}
              className="hover:text-gray-900 transition text-sm"
            >
              &#10005;
            </button>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {postsToShow.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No posts found matching your filters.
          </p>
        ) : (
          postsToShow.map(
            ({ id, title, excerpt, image, author, date, href }) => (
              <article
                key={id}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
              >
                <a
                  href={href}
                  className="block aspect-[4/3] overflow-hidden relative"
                  aria-label={`Read full article: ${title}`}
                >
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold line-clamp-2">
                    {title}
                  </h3>
                </a>
                <div className="p-5">
                  <p className="text-gray-700 text-sm line-clamp-3">{excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500 select-none">
                    <span>
                      By <strong className="text-gray-900">{author}</strong>
                    </span>
                    <time dateTime={new Date(date).toISOString()}>{date}</time>
                  </div>
                </div>
              </article>
            )
          )
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 text-white font-semibold rounded-md transition"
            aria-label="Load more posts"
          >
            {loadingMore ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      {/* Scrollbar CSS */}
      <style jsx>{`
        /* Hide scrollbar for Webkit-based browsers */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default ModernFilter;
