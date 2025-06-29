"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeroBackgroundSection } from "@/components/hero-background-section";
import { ThreeDCard } from "@/components/three-d-card";
import { MenuBoard } from "@/components/menu-board";

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
    <div className="h-full w-full p-4">
      <div className="relative p-4 bg-white rounded h-screen">
        <HeroBackgroundSection
          title={websiteData.headerSection.title}
          titleColor={websiteData.headerSection.titleColor}
          subtitleColor={websiteData.headerSection.subtitleColor}
          subtitleText={websiteData.headerSection.subtitle}
          descriptionColor={websiteData.headerSection.descriptionColor}
          descriptionText={websiteData.headerSection.description}
          companyLogo={websiteData.headerSection.companyLogo}
          backgroundImage={websiteData.headerSection.headerBackground}
        />
      </div>
      <div className="p-4 bg-white rounded flex flex-col md:flex-row mt-[18rem]">
        <div className="w-full md:w-1/2 h-[40vh]">
          <h2
            className="text-2xl font-bold"
            style={{ color: websiteData.introSection.introTitleColor }}
          >
            {websiteData.introSection.introTitle}
          </h2>
          <p
            className="mt-4 overflow-hidden line-clamp-5"
            style={{
              color: websiteData.introSection.introDescriptionColor,
            }}
          >
            {websiteData.introSection.introDescription}
          </p>
          <Button className="mt-4" onClick={() => window.location.href = '/plp'}>Read More</Button>
        </div>
        <div className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
          {websiteData.introSection.introMedia && (
            <ThreeDCard
              buttonText="Read More"
              imageUrl={websiteData.introSection.introMedia}
              onClick={() => window.location.href = '/plp'}
            />
          )}
        </div>
      </div>
      {websiteData.introMediaSection.introImage && (
        <a
          href="#"
          className="block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4"
        >
          <motion.img
            src={websiteData.introMediaSection.introImage}
            width="100%"
            height="100%"
            alt="Intro Image"
            className="object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </a>
      )}
      {websiteData.featuredMenuSection.featuredImage && (
        <div className="p-4 bg-white rounded mt-4 flex flex-col md:flex-row h-[60vh]">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2
              className="text-2xl font-bold"
              style={{
                color: websiteData.featuredMenuSection.featuredTitleColor,
              }}
            >
              {websiteData.featuredMenuSection.featuredTitle}
            </h2>
            <p
              className="mt-4 overflow-hidden line-clamp-5"
              style={{
                color: websiteData.featuredMenuSection.featuredDescriptionColor,
              }}
            >
              {websiteData.featuredMenuSection.featuredDescription}
            </p>
            <Button
              className="mt-4"
              onClick={() => window.location.href = '/plp'}
            >
              Full Menu
            </Button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <MenuBoard
              height="50vh"
              className="w-full rounded-lg shadow-xl p-4"
            />
          </div>
        </div>
      )}
      <div className="p-4 bg-black text-white rounded shadow mt-4 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h3 className="text-lg font-semibold">QUICK LINKS</h3>
          <ul className="mt-2">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>Shipping Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">LOCATION</h3>
          <p className="mt-2">{websiteData.footerSection.location}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">WE ARE SOCIAL</h3>
          <div className="mt-2 flex space-x-4">
            <a
              href={websiteData.footerSection.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={websiteData.footerSection.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
          <Button className="mt-4" onClick={() => window.location.href = '/plp'}>Leave Us Your Feedback</Button>
        </div>
      </div>
    </div>
  );
} 