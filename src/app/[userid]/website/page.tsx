"use client";

import React from "react";
import { getWebsiteDataByUserId, getRestaurantMenuItems, MenuItem } from "@/services/websiteBuilderService";
import WebsiteContent from "./WebsiteContent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PageParams {
  userid: string;
}

export default function WebsitePage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const [websiteData, setWebsiteData] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const userId = unwrappedParams.userid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch website data and menu items in parallel
        const [websiteDataResult, menuItemsResult] = await Promise.all([
          getWebsiteDataByUserId(userId),
          getRestaurantMenuItems(userId)
        ]);
        
        console.log('websiteData', websiteDataResult);
        console.log('menuItems', menuItemsResult);
        
        setWebsiteData(websiteDataResult);
        setMenuItems(menuItemsResult);
      } catch (err) {
        setError('Failed to load website data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const onChangePage = () => {
    router.push(`/pdp/partner/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg border p-6">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !websiteData?.website_data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg border p-6">
          <p className="text-center text-red-500">
            {error || "No website data found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <WebsiteContent 
      websiteData={websiteData.website_data} 
      onChangePage={onChangePage} 
      menuItems={menuItems}
    />
  );
} 