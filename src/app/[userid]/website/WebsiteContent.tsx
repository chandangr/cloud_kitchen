"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeroBackgroundSection } from "@/components/hero-background-section";
import { ThreeDCard } from "@/components/three-d-card";
import { MenuBoard } from "@/components/menu-board";
import { MenuItem } from "@/services/websiteBuilderService";

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

export default function WebsiteContent({ 
  websiteData, 
  onChangePage, 
  menuItems = [] 
}: { 
  websiteData: WebsiteData; 
  onChangePage: () => void;
  menuItems?: MenuItem[];
}) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      color: "#fbbf24",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="h-full w-full p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="relative p-4 rounded h-screen"
        variants={itemVariants}
      >
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
      </motion.div>
      
      <motion.div 
        className="p-4 bg-white rounded flex flex-col md:flex-row mt-10 mb-10 items-center justify-between"
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="w-full md:w-1/2 h-[40vh]"
          variants={slideInVariants}
        >
          <motion.h2
            className="text-2xl font-bold"
            style={{ color: websiteData.introSection.introTitleColor }}
            variants={fadeInUpVariants}
          >
            {websiteData.introSection.introTitle}
          </motion.h2>
          <motion.p
            className="mt-4 overflow-hidden line-clamp-5"
            style={{
              color: websiteData.introSection.introDescriptionColor,
            }}
            variants={fadeInUpVariants}
          >
            {websiteData.introSection.introDescription}
          </motion.p>
          <motion.div variants={fadeInUpVariants}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button className="mt-4" onClick={onChangePage}>
                Read More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div 
          className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0"
          variants={slideInRightVariants}
        >
          {websiteData.introSection.introMedia && (
            <motion.div
              variants={scaleVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ThreeDCard
                buttonText="Read More"
                imageUrl={websiteData.introSection.introMedia}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      
      {websiteData.introMediaSection.introImage && (
        <motion.a
          href="#"
          className="block h-screen w-full relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          variants={itemVariants}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
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
        </motion.a>
      )}
      
      {websiteData.featuredMenuSection.featuredImage && (
        <motion.div 
          className="p-8 bg-white rounded mt-4 flex flex-col md:flex-row h-[60vh]"
          variants={itemVariants}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="w-full md:w-1/2 mb-4 md:mb-0"
            variants={slideInVariants}
          >
            <motion.h2
              className="text-2xl font-bold"
              style={{
                color: websiteData.featuredMenuSection.featuredTitleColor,
              }}
              variants={fadeInUpVariants}
            >
              {websiteData.featuredMenuSection.featuredTitle}
            </motion.h2>
            <motion.p
              className="mt-4 overflow-hidden line-clamp-5"
              style={{
                color: websiteData.featuredMenuSection.featuredDescriptionColor,
              }}
              variants={fadeInUpVariants}
            >
              {websiteData.featuredMenuSection.featuredDescription}
            </motion.p>
            <motion.div variants={fadeInUpVariants}>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  className="mt-4"
                  onClick={onChangePage}
                >
                  Full Menu
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 flex justify-center items-center"
            variants={slideInRightVariants}
          >
            <motion.div
              variants={scaleVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <MenuBoard
                height="50vh"
                className="w-full rounded-lg shadow-xl p-4"
                menuItems={menuItems}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      <motion.div 
        className="p-4 bg-black text-white rounded shadow mt-4 flex flex-col md:flex-row justify-between gap-8"
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeInUpVariants}>
          <motion.h3 
            className="text-lg font-semibold"
            variants={fadeInUpVariants}
          >
            QUICK LINKS
          </motion.h3>
          <motion.ul 
            className="mt-2"
            variants={containerVariants}
          >
            {["About Us", "Privacy Policy", "Refund Policy", "Shipping Policy", "Terms and Conditions"].map((link, index) => (
              <motion.li 
                key={link}
                variants={linkVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                {link}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        
        <motion.div variants={fadeInUpVariants}>
          <motion.h3 
            className="text-lg font-semibold"
            variants={fadeInUpVariants}
          >
            LOCATION
          </motion.h3>
          <motion.p 
            className="mt-2"
            variants={fadeInUpVariants}
          >
            {websiteData.footerSection.location}
          </motion.p>
        </motion.div>
        
        <motion.div variants={fadeInUpVariants}>
          <motion.h3 
            className="text-lg font-semibold"
            variants={fadeInUpVariants}
          >
            WE ARE SOCIAL
          </motion.h3>
          <motion.div 
            className="mt-2 flex space-x-4"
            variants={containerVariants}
          >
            <motion.a
              href={websiteData.footerSection.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              whileHover="hover"
              className="cursor-pointer"
            >
              Instagram
            </motion.a>
            <motion.a
              href={websiteData.footerSection.facebook}
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              whileHover="hover"
              className="cursor-pointer"
            >
              Facebook
            </motion.a>
          </motion.div>
          <motion.div variants={fadeInUpVariants}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button className="mt-4" onClick={onChangePage}>
                Leave Us Your Feedback
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 