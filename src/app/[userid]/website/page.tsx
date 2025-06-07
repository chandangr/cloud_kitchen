import { getWebsiteDataByUserId } from "@/services/websiteBuilderService";
import WebsiteContent from "./WebsiteContent";

export default async function WebsitePage({ params }: { params: { userid: string } }) {
  try {
    const websiteData = await getWebsiteDataByUserId(params.userid);
    
    if (!websiteData?.website_data) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="w-full max-w-md rounded-lg border p-6">
            <p className="text-center text-red-500">No website data found</p>
          </div>
        </div>
      );
    }

    return <WebsiteContent websiteData={websiteData.website_data} />;
  } catch (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg border p-6">
          <p className="text-center text-red-500">Failed to load website data</p>
        </div>
      </div>
    );
  }
} 