"use client";

import React, { useState, useMemo } from "react";

const CATEGORIES = [
  "All",
  "Health",
  "Wellness",
  "Fitness",
  "Nutrition",
  "Mental Health",
  "Lifestyle",
];

const SAMPLE_POSTS = [
    {
      id: 1,
      category: "Health",
      title: "5 Proven Ways to Boost Your Immune System",
      excerpt: "Simple lifestyle changes to keep illnesses at bay.",
      image:
        "https://cdn.shopify.com/s/files/1/0550/5217/3532/files/Blog-How-to-Boost-Your-Immune-System-Naturally.jpg?v=1636571842",
      author: "Emma Johnson",
      date: "Aug 28, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcedarcide.com%2Fblogs%2Fguides%2Fhow-to-boost-your-immune-system-naturally%3Fsrsltid%3DAfmBOop6wp4yPHxGLUsoFiCsBzkyyLDWrfX1x1x3WX2fjWJGEc5VHloB&psig=AOvVaw0_-tJjtaoDuNnEmD7LuTUk&ust=1754853917762000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIjuyLW6_o4DFQAAAAAdAAAAABAE",
    },
    {
      id: 2,
      category: "Health",
      title: "The Truth About Vitamins and Supplements",
      excerpt: "What you really need for optimal health.",
      image:
        "https://www.checkyourfood.com/content/blob/Newsletters/Blog-Should-you-take-supplements-New-Research-Added.jpg",
      author: "Liam Smith",
      date: "Aug 20, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.checkyourfood.com%2Fblog%2Fblog%2Fshould-you-take-supplements%3Fpreview%3Dfalse&psig=AOvVaw1Lo2-JtP6PnoqywNQUevgz&ust=1754804542950000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMiQ9MKC_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 3,
      category: "Health",
      title: "How Sleep Impacts Your Overall Wellness",
      excerpt: "Exploring the connection between sleep and health.",
      image:
        "https://static.wixstatic.com/media/9d7006_511e4bd05a9d482088532ee19084c153~mv2.jpg/v1/fill/w_568,h_318,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9d7006_511e4bd05a9d482088532ee19084c153~mv2.jpg",
      author: "Sophia Lee",
      date: "Aug 15, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.compasscommunityhealth.org%2Fpost%2Fthe-role-of-sleep-in-overall-wellness&psig=AOvVaw3Ib9OvSvDLSz2ggGwmPtM1&ust=1754804587159000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCKiy1dOC_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 4,
      category: "Health",
      title: "Natural Remedies for Common Ailments",
      excerpt: "Effective herbal treatments and their benefits.",
      image:
        "https://liveright.in/wp-content/uploads/2023/03/2-common-seasonal-diseases-Simple-home-remedies-through-Ayurveda-Blog.png",
      author: "Mason Davis",
      date: "Aug 10, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fliveright.in%2F2023%2F03%2F18%2Fayurvedic-remedies-for-seasonal-diseases%2F&psig=AOvVaw0PC5ip3FSssWtOgfnB4dzS&ust=1754804645584000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPD7qPOC_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 5,
      category: "Health",
      title: "How to Prevent Chronic Diseases Early",
      excerpt: "Lifestyle tips that reduce long-term risks.",
      image:
        "https://recurohealth.com/wp-content/uploads/2023/10/Recuro-Blog-20231019b.jpg",
      author: "Olivia Martinez",
      date: "Aug 04, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Frecurohealth.com%2Fmanaging-chronic-conditions%2F&psig=AOvVaw0nUhBlDg5GK0wbi431qZir&ust=1754804696760000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJDAmZCD_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 6,
      category: "Health",
      title: "The Role of Hydration in Maintaining Health",
      excerpt: "Why drinking water is vital every day.",
      image:
        "https://in.ozonesignature.com/cdn/shop/articles/healthy_skin.jpg?v=1720008170",
      author: "Noah Wilson",
      date: "Jul 29, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.ozonesignature.com%2Fblogs%2Fjournal%2Fthe-role-of-hydration-in-maintaining-healthy-skin%3Fsrsltid%3DAfmBOopezuYD-Fd1EX9TuB2-XU9fdqlB0q3bP6FJdDjgcRE3hEaf1MfT&psig=AOvVaw05e-6nTzhQfw1fgNzTbWFb&ust=1754804754748000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJDiq6KD_Y4DFQAAAAAdAAAAABAE",
    },
  
    // -------- WELLNESS --------
    {
      id: 7,
      category: "Wellness",
      title: "5 Morning Habits to Improve Your Wellness",
      excerpt: "Start your day with intention and clarity.",
      image:
        "https://midwestexpressclinic.com/wp-content/uploads/Blog-Post-4-Instagram-.png",
      author: "Ella Thompson",
      date: "Aug 27, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmidwestexpressclinic.com%2Fhealthy-habits-to-kickstart-the-year%2F&psig=AOvVaw1iUNNNPQZj_WLjwg9xw3cf&ust=1754853828793000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJDXro26_o4DFQAAAAAdAAAAABAE",
    },
    {
      id: 8,
      category: "Wellness",
      title: "Meditation Techniques for Beginners",
      excerpt: "Find peace and focus with simple meditation.",
      image:
        "https://www.smile-education.co.uk/smile/images/Meditation.png",
      author: "James Carter",
      date: "Aug 21, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.smile-education.co.uk%2Fblog%2Ftips-and-tricks%2Fmeditation-tips-for-beginners-%2F&psig=AOvVaw16nYYiVajUKEIjMpq5TdMQ&ust=1754804853146000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLjH5dGD_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 9,
      category: "Wellness",
      title: "How to Cultivate Gratitude Daily",
      excerpt: "Simple steps to boost happiness and mental wellness.",
      image:
        "https://rogersbh.org/wp-content/uploads/2024/11/Gratitude-2.jpg",
      author: "Isabella Roberts",
      date: "Aug 16, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Frogersbh.org%2Fblog%2Fgratitude-and-mental-health-benefits%2F&psig=AOvVaw0EuSAVJxVfPpRPAWpYPkZP&ust=1754804884494000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCKC-keGD_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 10,
      category: "Wellness",
      title: "The Importance of Digital Detox",
      excerpt: "Unplug to recharge your mind and body.",
      image:
        "https://mhcsandiego.com/wp-content/uploads/2024/05/MHC-_Recovered_-blogs-may-05-scaled.jpg",
      author: "Benjamin Walker",
      date: "Aug 11, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmhcsandiego.com%2Fblog%2Fdigital-detox%2F&psig=AOvVaw0lmFj94iW7cH4FzYLcWPBK&ust=1754804927236000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIDtrPmD_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 11,
      category: "Wellness",
      title: "Creating a Balanced Work-Life Routine",
      excerpt: "Tips to keep your personal and professional life aligned.",
      image:
        "https://trackobit.com/wp-content/uploads/Work-Life-Balance.png",
      author: "Amelia Young",
      date: "Aug 05, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftrackobit.com%2Fblog%2Fways-to-improve-work-life-balance&psig=AOvVaw1Wk0ShXQdNNTF33CbfAt-o&ust=1754804968221000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMi3iYiE_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 12,
      category: "Wellness",
      title: "Simple Ways to Practice Self-Care",
      excerpt: "Daily habits that improve your mental and physical health.",
      image:
        "https://lifehackmethod.com/wp-content/uploads/2024/05/01-1-1.webp",
      author: "Lucas Evans",
      date: "Jul 30, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Flifehackmethod.com%2Fblog%2Fradical-self-care%2F&psig=AOvVaw2am_8OhYRwsL9-dqBo0m-1&ust=1754805002768000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMDwtpiE_Y4DFQAAAAAdAAAAABAE",
    },
  
    // -------- FITNESS --------
    {
      id: 13,
      category: "Fitness",
      title: "Strength Training Myths Debunked",
      excerpt:
        "Separating fact from fiction for safe and effective training.",
      image:
        "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/646da03a0a9824001d4f9870.png",
      author: "Grace Turner",
      date: "Aug 22, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvocal.media%2Flongevity%2Fdebunking-common-fitness-myths&psig=AOvVaw3EYwHfgvNsoBGieLoKArww&ust=1754805039427000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNC3oa6E_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 14,
      category: "Fitness",
      title: "The Best Cardio Workouts for Fat Loss",
      excerpt: "Effective exercises to burn calories quickly.",
      image:
        "https://i.ytimg.com/vi/guje_OOuVp8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIkBJlHcQUKZn44dJ18cK6hdVTtg",
      author: "Ethan Martinez",
      date: "Aug 18, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dguje_OOuVp8&psig=AOvVaw3WBLM6DDWbQo26Vs-HU8tF&ust=1754805080329000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNDY18KE_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 15,
      category: "Fitness",
      title: "How to Improve Flexibility Fast",
      excerpt: "Stretching routines to enhance your range of motion.",
      image:
        "https://i.ytimg.com/vi/kZXLH3LyLLo/maxresdefault.jpg",
      author: "Mia Hernandez",
      date: "Aug 14, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.youtube.com%2Fwatch%3Fv%3DkZXLH3LyLLo%26pp%3DygUJI2ZheGFuYWRv&psig=AOvVaw2QdehEvJN8iGbzkhdfC32X&ust=1754805123075000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLCKgdaE_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 16,
      category: "Fitness",
      title: "Nutrition Tips for Muscle Gain",
      excerpt: "Foods and meal plans to build lean muscle.",
      image:
        "https://satvic.in/cdn/shop/articles/2_1100x.png?v=1683830958",
      author: "Oliver Wilson",
      date: "Aug 09, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsatvic.in%2Fblogs%2Fhealth-blog%2Fmuscle-gain-at-home-tips-and-tricks-for-2023&psig=AOvVaw2iqjaEMUV6bfoGauozbvif&ust=1754805168844000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLDZhOiE_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 17,
      category: "Fitness",
      title: "Best Recovery Practices After Workouts",
      excerpt: "How to maximize gains and prevent injury.",
      image:
        "https://getbackintofitness.com/wp-content/uploads/2024/10/science-recovery-best-practices.jpeg",
      author: "Ava Moore",
      date: "Aug 03, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgetbackintofitness.com%2F2024%2F10%2F01%2Fthe-science-of-recovery-best-practices-for-post-workout-muscle-repair%2F&psig=AOvVaw25ixCM3jlqUUEnhZHpcAm8&ust=1754805198954000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJjsgPaE_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 18,
      category: "Fitness",
      title: "Top 5 Home Workouts Without Equipment",
      excerpt: "Stay fit anywhere with these easy exercises.",
      image:
        "https://dwgyu36up6iuz.cloudfront.net/heru80fdn/image/upload/c_fill,d_placeholder_self.png,fl_progressive,g_face,h_450,q_80,w_800/v1615901729/self_sweat-with-self-20-minute-arm-workout.jpg",
      author: "James Taylor",
      date: "Jul 28, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.self.com%2Fgallery%2Fno-equipment-exercises-top-trainers-swear-by&psig=AOvVaw3834HMu7EdeNlCKFhhffld&ust=1754805231458000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCJjGqoiF_Y4DFQAAAAAdAAAAABAE",
    },
  
    // -------- NUTRITION --------
    {
      id: 19,
      category: "Nutrition",
      title: "Superfoods You Should Add to Your Diet",
      excerpt: "Nutrient-packed foods for better health.",
      image:
        "https://www.paycare.org/wp-content/uploads/2023/08/Blog-Header-5-easy-superfoods.png",
      author: "Isabella White",
      date: "Aug 26, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.paycare.org%2Fpaycare-blog-for-you%2F5-easy-superfoods-to-incorporate-into-your-meals%2F&psig=AOvVaw1xeCX16L0uDx44CjZWbOLh&ust=1754805300406000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCODbsqqF_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 20,
      category: "Nutrition",
      title: "How to Read Nutrition Labels Correctly",
      excerpt: "Tips for understanding what's in your food.",
      image:
        "https://cdn.sanity.io/images/263h0ltd/production/4900b22b4f93eb2bf7cce7617efdbfe7af060776-600x400.jpg?w=600&h=400&q=90&fit=fillmax&auto=format",
      author: "Benjamin Garcia",
      date: "Aug 19, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bulknutrients.com.au%2Fblog%2Fwellness%2Fhow-to-read-nutrition-labels-accurately%3Fsrsltid%3DAfmBOorJ9K9IDNabLAthovLSl639mf2bjXdUmznRWX-ekthA3YGiDEPX&psig=AOvVaw3p4YKJ63gFMSXfSrBE3Lqp&ust=1754805335312000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCID21LuF_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 21,
      category: "Nutrition",
      title: "Meal Planning for a Balanced Diet",
      excerpt: "Easy steps to prepare healthy meals weekly.",
      image:
        "https://www.lizshealthytable.com/wp-content/uploads/2021/03/Meal-Planning-1-1-800x800.png",
      author: "Mason Clark",
      date: "Aug 13, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lizshealthytable.com%2F2021%2F03%2F29%2Fmeal-planning-101%2F&psig=AOvVaw3kPxhAYaaR9RVxbafUoIh3&ust=1754805747639000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNj_hYGH_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 22,
      category: "Nutrition",
      title: "The Role of Fiber in Digestion",
      excerpt: "Why fiber is essential for gut health.",
      image:
        "https://www.drnewmed.com/blog/wp-content/uploads/2023/08/The-Role-of-Fiber-in-Digestive-Health-Tips-for-Boosting-Your-Dietary-Fiber-Intake-e1695823303325.jpg",
      author: "Olivia Lewis",
      date: "Aug 08, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.drnewmed.com%2Fblog%2Fthe-role-of-fiber-in-digestive-health-tips-for-boosting-your-dietary-fiber-intake%2F&psig=AOvVaw1X6GjJB9s0iTcu3CJjr2LU&ust=1754805792901000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLisjZKH_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 23,
      category: "Nutrition",
      title: "Hydration and Its Impact on Nutrition",
      excerpt: "How water intake affects nutrient absorption.",
      image:
        "https://www.nutritionnews.abbott/healthy-living/diet-wellness/thirsty-common-hydration-mistakes-you-may-be-making/_jcr_content/root/container/columncontrol/tab_item_no_0/image_copy.coreimg.85.1024.jpeg/1648116201848/electrolytes-explained-930x466.jpeg",
      author: "Noah Walker",
      date: "Aug 02, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nutritionnews.abbott%2Fhealthy-living%2Fdiet-wellness%2Fthirsty-common-hydration-mistakes-you-may-be-making%2F&psig=AOvVaw1j_Nqk-zUa-UUNd8Uj5m2q&ust=1754805822821000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCICFjKKH_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 24,
      category: "Nutrition",
      title: "Plant-Based Diet Benefits Explained",
      excerpt: "Why more people are going plant-based.",
      image:
        "https://sparkfood.com/wp-content/uploads/2024/03/plant-based-food-pyramid.webp",
      author: "Sophia Hall",
      date: "Jul 27, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsparkfood.com%2Fpress%2Fplant-based-food%2F&psig=AOvVaw1O0DQGbw4ynkI5fYvHtzf8&ust=1754805868620000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMjp-rWH_Y4DFQAAAAAdAAAAABAE",
    },
  
    // -------- MENTAL HEALTH --------
    {
      id: 25,
      category: "Mental Health",
      title: "10 Ways to Improve Your Mental Wellbeing",
      excerpt: "Practical tips to boost your mental health daily.",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYOH2jjMAvhXQ9C34_iAuCHGlO2hP-Rb27w3eQPwKtxVdEWxFaLK6yrtN_e9ZyJ0JZwMIlkU8ufsj-gtNC0dcvQDQ5m_mcQ5HrF64FpTqcNVAUNRWPJfs_kOIe_wyHqGhNy-LXnaTw086ZZr1XAM5hjty2STCUSQG5769_O6IvwGAdHpLBgFc2XJ7_yQfP/s1200/how-to-improve-mental-health-10-ways.webp",
      author: "Ella Wright",
      date: "Aug 25, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.livewelltalk.com%2F2020%2F08%2Fhow-to-improve-mental-health-10-ways.html&psig=AOvVaw25KuV2et9BRxTXxtBzVRKN&ust=1754805911129000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPjy_c2H_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 26,
      category: "Mental Health",
      title: "How to Manage Anxiety Effectively",
      excerpt: "Tools and techniques to calm your mind.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFzFILjjfxq1p6bSJOpOIAK0mot5N3F4jfVA&s",
      author: "Jacob Scott",
      date: "Aug 17, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D1007210354744092%26id%3D100063654096608%26set%3Da.136345835163886&psig=AOvVaw1TMhO96dZrKmG4VSdDyCjP&ust=1754805967515000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPDXseWH_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 27,
      category: "Mental Health",
      title: "The Power of Positive Affirmations",
      excerpt: "Rewiring your brain for success and happiness.",
      image:
        "https://i.ytimg.com/vi/XpWdMZfCXNM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA5I3oLgRqYw5GczyJh1N4sIWJleA",
      author: "Mia Allen",
      date: "Aug 12, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DXpWdMZfCXNM&psig=AOvVaw0TdCj18LfKAPq_SVGpABVt&ust=1754805999026000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIiD7vWH_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 28,
      category: "Mental Health",
      title: "Dealing with Burnout: Signs and Solutions",
      excerpt: "How to recognize and recover from burnout.",
      image:
        "https://recruiterflow.com/blog/wp-content/uploads/2024/03/Recruiter-Burnout.png",
      author: "Sophia Harris",
      date: "Aug 07, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Frecruiterflow.com%2Fblog%2Frecruiter-burnout%2F&psig=AOvVaw0TD_U0Gyzie8i0v7lFL4vc&ust=1754806038800000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCNjz6IiI_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 29,
      category: "Mental Health",
      title: "Mindfulness Meditation for Stress Relief",
      excerpt: "Techniques to stay present and calm.",
      image:
        "https://breatheclinicguwahati.com/uploads/blog/15609-meditation.jpg",
      author: "Ethan Baker",
      date: "Aug 01, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbreatheclinicguwahati.com%2Fblog-post%3Ftitle%3Dbreathe-better-how-meditation-and-mindfulness-improve-lung-health&psig=AOvVaw2s9mTArlvf7cxPJrBheKib&ust=1754806079151000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCOjd-puI_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 30,
      category: "Mental Health",
      title: "How Exercise Benefits Mental Health",
      excerpt: "The mind-body connection explained.",
      image:
        "https://www.ukgymequipment.com/blog/wp-content/uploads/2019/05/Blog-illustrations-700x511.png",
      author: "Olivia Scott",
      date: "Jul 26, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ukgymequipment.com%2Fblog%2Fbenefits-of-exercise-to-your-mental-health%2F&psig=AOvVaw0tPhiZdv9jiIZXySfdJsHr&ust=1754806113799000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCMj84qqI_Y4DFQAAAAAdAAAAABAE",
    },
  
    // -------- LIFESTYLE --------
    {
      id: 31,
      category: "Lifestyle",
      title: "Minimalism: Living More with Less",
      excerpt: "How simplifying your life brings joy and freedom.",
      image:
        "https://www.simplyfiercely.com/wp-content/uploads/2021/04/Minimalist-Lifestyle-Guide-How-to-Have-More-of-What-Matters-Main-Image-910x1024.jpg",
      author: "Lily Evans",
      date: "Aug 24, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplyfiercely.com%2Fminimalist-lifestyle%2F&psig=AOvVaw3-07vnY8w2h6i0ovw5z4mZ&ust=1754806165037000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCIiyjMiI_Y4DFQAAAAAdAAAAABAK",
    },
    {
      id: 32,
      category: "Lifestyle",
      title: "Sustainable Living Tips for Beginners",
      excerpt: "Easy changes to reduce your environmental footprint.",
      image:
        "https://ecobravo.co.uk/cdn/shop/articles/eco_friendly_living_1200x1200.jpg?v=1708536153",
      author: "Jack Green",
      date: "Aug 19, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fecobravo.co.uk%2Fblogs%2Fblog%2Fgreen-living-for-beginners-a-step-by-step-guide-to-sustainable-living%3Fsrsltid%3DAfmBOooYwC_MUbLDahrlmQTG_1GjPCAXHeBkzaDQ7w39Ptuih8XfKzn0&psig=AOvVaw3Th3XdmulRayJTOYSMgGBe&ust=1754806230940000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCKjCtOaI_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 33,
      category: "Lifestyle",
      title: "Creating a Cozy Home Environment",
      excerpt: "Decor and habits that promote comfort and calm.",
      image:
        "https://aaft.com/blog/wp-content/uploads/2023/09/interior-design-1024x614.png",
      author: "Emma Brown",
      date: "Aug 14, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Faaft.com%2Fblog%2Finterior%2F5-tips-for-creating-a-cozy-and-inviting-home%2F&psig=AOvVaw3P4AdS_CMlrPD0OTs9WaV7&ust=1754806277307000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPD-2fqI_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 34,
      category: "Lifestyle",
      title: "Digital Minimalism: Reducing Screen Time",
      excerpt: "Tech habits that improve your focus and happiness.",
      image:
        "https://i0.wp.com/readingraphics.com/wp-content/uploads/2023/12/Digital-Minimalism-practices.png?resize=1080%2C625&ssl=1",
      author: "Mason Carter",
      date: "Aug 09, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Freadingraphics.com%2Fbook-summary-digital-minimalism%2F&psig=AOvVaw124jDZJAFqTg4boB5W9sEw&ust=1754806310529000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLi-jYqJ_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 35,
      category: "Lifestyle",
      title: "How to Build a Healthy Morning Routine",
      excerpt: "Start your day energized and focused.",
      image:
        "https://cdn.prod.website-files.com/67859049c02d67b2cfccef08/685c29f0c0f2c1c156127b69_67859049c02d67b2cfccff5f_morning_routines_02.png",
      author: "Sophia White",
      date: "Aug 03, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Freclaim.ai%2Fblog%2Fmorning-routine&psig=AOvVaw13AqEm95c1-OGeWayQLLPJ&ust=1754806345082000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCPCPlZ2J_Y4DFQAAAAAdAAAAABAE",
    },
    {
      id: 36,
      category: "Lifestyle",
      title: "Benefits of Journaling for Mental Clarity",
      excerpt: "How writing daily can improve your mindset.",
      image:
        "https://elisplace.org/wp-content/uploads/2023/08/Therapeutic-Journaling-The-Benefits-1024x768.png",
      author: "Lucas Anderson",
      date: "Jul 28, 2025",
      href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Felisplace.org%2Ftherapeutic-journaling-ink-and-insight%2F&psig=AOvVaw2BBzM_XpFsGztNRSoLjrru&ust=1754806391337000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCKiA6a-J_Y4DFQAAAAAdAAAAABAE",
    },
];

const POSTS_PER_PAGE = 6;

export default function UniqueBlogLatestPosts() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filteredPosts = useMemo(() => {
    let filtered = SAMPLE_POSTS;

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [category, search]);

  React.useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE);
  }, [category, search]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const canLoadMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((count) => Math.min(count + POSTS_PER_PAGE, filteredPosts.length));
  };

  return (
    <section className="max-w-6xl mx-auto px-5 py-12 font-sans">
      {/* Header with Search and Title */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 select-none">
          Latest Articles
        </h2>
        <input
          type="search"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search blog posts"
          className="w-full md:w-72 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 placeholder-gray-400 transition shadow-sm hover:shadow-md"
        />
      </header>

      {/* Categories pills */}
      <nav
        aria-label="Blog categories"
        className="flex flex-wrap justify-center md:justify-start gap-3 mb-10"
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat === category;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-current={isActive ? "true" : undefined}
              className={`relative px-5 py-2 rounded-full font-semibold text-sm transition-transform duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400
              `}
            >
              {cat}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-white shadow"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-20 select-none">
          No posts found matching your criteria.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.slice(0, visibleCount).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
              tabIndex={0}
              aria-label={`Read full article: ${post.title}`}
            >
              <a href={post.href} className="relative group block overflow-hidden flex-shrink-0 aspect-[4/3]">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-700 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg select-none">
                  {post.category}
                </span>
              </a>

              <div className="flex flex-col flex-grow p-5">
                <h3 className="text-lg font-bold mb-2 leading-snug text-gray-900 hover:text-blue-600 transition-colors">
                  <a href={post.href} aria-label={`Read full article: ${post.title}`}>
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="mt-auto flex flex-wrap gap-3 items-center text-gray-500 text-sm select-none">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span>By <strong>{post.author}</strong></span>
                  </span>

                  <time dateTime={post.date} className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {formatDate(post.date)}
                  </time>

                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    {post.readingTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Load More */}
      {canLoadMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            aria-label="Load more posts"
            className="px-12 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
