"use client";

interface WebsiteData {
  user_id: string;
  headerSection: {
    title: string;
    subtitle: string;
    description: string;
    headerBackground: string;
    companyLogo: string;
    titleColor: string;
    subtitleColor: string;
    descriptionColor: string;
  };
  introSection: {
    introTitle: string;
    introDescription: string;
    introMedia: string;
    introTitleColor: string;
    introDescriptionColor: string;
  };
  introMediaSection: {
    introImage: string;
  };
  featuredMenuSection: {
    featuredTitle: string;
    featuredDescription: string;
    featuredImage: string;
    featuredTitleColor: string;
    featuredDescriptionColor: string;
  };
  footerSection: {
    location: string;
    instagram: string;
    facebook: string;
  };
}

export default function WebsiteContent({ websiteData }: { websiteData: WebsiteData }) {
  return (
    <div className="min-h-screen">
      <header className="relative py-20" style={{ backgroundColor: websiteData?.headerSection?.headerBackground }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            {websiteData.headerSection.companyLogo && (
              <img
                src={websiteData.headerSection.companyLogo}
                alt="Company Logo"
                className="h-20 w-20 object-contain"
              />
            )}
          </div>
          <h1 className="mt-6 text-center text-4xl font-bold" style={{ color: websiteData.headerSection.titleColor }}>
            {websiteData.headerSection.title}
          </h1>
          <h2 className="mt-4 text-center text-2xl" style={{ color: websiteData.headerSection.subtitleColor }}>
            {websiteData.headerSection.subtitle}
          </h2>
          <p className="mt-4 text-center text-lg" style={{ color: websiteData.headerSection.descriptionColor }}>
            {websiteData.headerSection.description}
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: websiteData.introSection.introTitleColor }}>
                {websiteData.introSection.introTitle}
              </h2>
              <p className="mt-4 text-lg" style={{ color: websiteData.introSection.introDescriptionColor }}>
                {websiteData.introSection.introDescription}
              </p>
            </div>
            <div className="flex items-center justify-center">
              {websiteData.introMediaSection.introImage && (
                <img
                  src={websiteData.introMediaSection.introImage}
                  alt="Intro"
                  className="max-h-96 w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold" style={{ color: websiteData.featuredMenuSection.featuredTitleColor }}>
            {websiteData.featuredMenuSection.featuredTitle}
          </h2>
          <p className="mt-4 text-center text-lg" style={{ color: websiteData.featuredMenuSection.featuredDescriptionColor }}>
            {websiteData.featuredMenuSection.featuredDescription}
          </p>
          {websiteData.featuredMenuSection.featuredImage && (
            <div className="mt-8 flex justify-center">
              <img
                src={websiteData.featuredMenuSection.featuredImage}
                alt="Featured Menu"
                className="max-h-96 w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-bold">Location</h3>
              <p className="mt-2">{websiteData.footerSection.location}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Follow Us</h3>
              <div className="mt-2 flex gap-4">
                {websiteData.footerSection.instagram && (
                  <a
                    href={websiteData.footerSection.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                  >
                    Instagram
                  </a>
                )}
                {websiteData.footerSection.facebook && (
                  <a
                    href={websiteData.footerSection.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 