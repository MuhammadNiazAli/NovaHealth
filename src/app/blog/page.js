"use client";

import React from "react";

// Components import karo
import BlogHero from "@/components/Blog/BlogHero";
import BlogFeatured from "@/components/Blog/BlogFeatured";
import BlogCategories from "@/components/Blog/BlogCategories";
import BlogLatestPosts from "@/components/Blog/BlogLatestPosts";
import BlogAuthors from "@/components/Blog/BlogAuthors";
import BlogHealthTips from "@/components/Blog/BlogHealthTips";
import BlogTestimonials from "@/components/Blog/BlogTestimonials";
import BlogStats from "@/components/Blog/BlogStats";
import BlogNewsletter from "@/components/Blog/BlogNewsletter";

const BlogPage = () => {
  return (
    <div>
      <BlogHero />
      <BlogFeatured />
      <BlogCategories />
      <BlogLatestPosts />
      <BlogAuthors />
      <BlogHealthTips />
      <BlogTestimonials />
      <BlogStats />
      <BlogNewsletter />
    </div>
  );
};

export default BlogPage;
