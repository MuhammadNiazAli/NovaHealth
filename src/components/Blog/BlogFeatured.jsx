import React from "react";

const featuredPosts = [
  {
    id: 1,
    title: "5 Tips for a Healthier Lifestyle",
    excerpt:
      "Discover simple yet effective tips to improve your daily health and well-being.",
    image:
      "https://myblessedlife.net/wp-content/uploads/2014/09/Simple-Healthy-Lifestyle-Tips.jpg",
    author: "Dr. Sarah Lee",
    date: "Aug 1, 2025",
    href: "https://www.ucsfhealth.org/education/healthy-lifestyles-healthy-outlook",
  },
  {
    id: 2,
    title: "The Benefits of Regular Exercise",
    excerpt:
      "Learn how staying active can boost your mood, energy, and overall health.",
    image:
      "https://images.squarespace-cdn.com/content/v1/57f3cead15d5dbffa42d1d54/1530267449951-2Z8VAQOOM8NIO3S4ADHM/Blog1.jpg",
    author: "John Smith",
    date: "Jul 28, 2025",
    href: "https://www.tiyara.org/blog/the-benefits-of-physical-activity?gad_source=1&gad_campaignid=12420763395&gbraid=0AAAAABmBtEld2GlnT7Mg_M6r0xAN4Ht5D&gclid=CjwKCAjwwNbEBhBpEiwAFYLtGChiVMJrpQ643l5uFoct9ISyiyJ4Se98zZPWMOwzzYmrMpvSskTuBhoCoq4QAvD_BwE",
  },
  {
    id: 3,
    title: "Eating Well on a Budget",
    excerpt:
      "Healthy eating doesn’t have to be expensive. Here’s how to make nutritious meals affordably.",
    image:
      "https://somatus.com/wp-content/uploads/2023/03/Kidneys-in-the-Kitchen-Blog-Squares-1.png",
    author: "Emily Clark",
    date: "Jul 22, 2025",
    href: "https://somethingnutritiousblog.com/eating-healthy-on-a-budget/",
  },
  {
    id: 4,
    title: "Mindfulness Meditation for Beginners",
    excerpt:
      "Start your journey towards inner peace with these simple mindfulness techniques.",
    image:
      "https://enlight8.com/wp-content/uploads/2016/09/enlight8.com-8-Ways-to-Mindfulness_Meditation-banner.jpg",
    author: "Dr. Alex Wong",
    date: "Jul 18, 2025",
    href: "https://meditofoundation.org/meditation-challenge?gad_source=1&gad_campaignid=11849372101&gbraid=0AAAAACeDZVC1lHZw3CSiMeeTBH-eSPXPI&gclid=CjwKCAjwwNbEBhBpEiwAFYLtGO9dE3Mu3kCb0JlR3jH5-f8aDS3rgdzSTxAvb9DtG1kmOL0CsIYe2hoCNDgQAvD_BwE",
  },
  {
    id: 5,
    title: "How to Improve Your Sleep Quality",
    excerpt:
      "Better sleep means better health — here’s how to achieve restful nights naturally.",
    image:
      "https://www.netmeds.com/images/cms/magefan_blog/Insomnia.jpg",
    author: "Sophia Turner",
    date: "Jul 10, 2025",
    href: "https://www.nature.com/articles/d41586-025-00966-8?utm_source=googleads&utm_medium=cpc_search&utm_campaign=MLSR_OUTLK_AWA1_GL_PCFU_CFULF_SLEEP_0425&gad_source=1&gad_campaignid=22693948280&gbraid=0AAAAADBiRD2P6MhfVoE_tHZ3SKBlQcY9J&gclid=CjwKCAjwwNbEBhBpEiwAFYLtGGPyiwmkHbq5z3UeY2Q4nEH0sZE6nL0L-JzW2KYvuOWcM3sLl-x45xoC6TwQAvD_BwE",
  },
  {
    id: 6,
    title: "Hydration: The Key to Energy & Focus",
    excerpt:
      "Staying hydrated is crucial for health and productivity — here’s why and how.",
    image:
      "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/2147510459/images/3f25f8-3b6c-d4ec-ceee-f48a5375ad6_Placeholder_Image_8_.png",
    author: "Michael Brown",
    date: "Jul 5, 2025",
    href: "https://www.redbull.com/nl-nl/energydrink?utm_source=google&utm_medium=cpc&utm_campaign=sea-always-on&utm_content=generic&rbcid=22410950871&utm_source=Adwords&utm_medium=g&utm_campaign=22410950871&utm_content=752095776605&gad_source=1&gad_campaignid=22410950871&gbraid=0AAAAADHM10GOo8vSnGoEkvcUnu23OWVp_&gclid=CjwKCAjwwNbEBhBpEiwAFYLtGAnpCEuIxlFyQAUaA_eNJNd0MGMOhq39uoehxBNqAXmLqRQFNPMCIxoCV5MQAvD_BwE",
  },
];

const BlogFeatured = () => {
  return (
    <section
      aria-label="Featured Blog Posts"
      className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Featured <span className="text-blue-700">Articles</span>
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPosts.map(({ id, title, excerpt, image, author, date, href }) => (
          <article
            key={id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 flex flex-col"
          >
            {/* Post image with subtle zoom on hover */}
            <a
              href={href}
              className="block relative overflow-hidden"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </a>

            {/* Post content */}
            <div className="p-6 flex flex-col flex-grow">
              <a
                href={href}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 leading-snug line-clamp-2"
                aria-label={`Read full article: ${title}`}
              >
                {title}
              </a>

              <p className="mt-4 text-gray-600 flex-grow leading-relaxed line-clamp-3">
                {excerpt}
              </p>

              {/* Author and publication date */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                <span>
                  By <strong className="text-gray-800 font-medium">{author}</strong>
                </span>
                <time dateTime={new Date(date).toISOString()}>{date}</time>
              </div>

              {/* Read More button with smooth arrow animation */}
              <a
                href={href}
                className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
                aria-label={`Read full article: ${title}`}
              >
                Read More
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogFeatured;
