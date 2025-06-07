import { supabase } from "@/lib/supabase";

interface WebsiteBuilderData {
  website_data: {
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
}


export async function getWebsiteDataByUserId(
  userId: string
): Promise<WebsiteBuilderData | null> {
  try {
    const { data, error } = await supabase
      .from("cloud_kitchen_website")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No data found
        return null;
      }
      throw error;
    }

    return data as WebsiteBuilderData;
  } catch (error) {
    console.error("Error fetching website data:", error);
    throw error;
  }
}