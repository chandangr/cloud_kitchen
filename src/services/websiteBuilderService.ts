import { supabase } from "@/lib/supabase";

// Base interfaces for website sections
export interface HeaderSection {
  title: string;
  subtitle: string;
  description: string;
  headerBackground: string;
  companyLogo: string;
  titleColor: string;
  subtitleColor: string;
  descriptionColor: string;
}

export interface IntroSection {
  introTitle: string;
  introDescription: string;
  introMedia: string;
  introTitleColor: string;
  introDescriptionColor: string;
}

export interface IntroMediaSection {
  introImage: string;
}

export interface FeaturedMenuSection {
  featuredTitle: string;
  featuredDescription: string;
  featuredImage: string;
  featuredTitleColor: string;
  featuredDescriptionColor: string;
}

export interface FooterSection {
  location: string;
  instagram: string;
  facebook: string;
}

// Main website data interface
export interface WebsiteBuilderData {
  id?: string;
  user_id: string;
  website_name?: string;
  description?: string;
  website_logo?: string;
  created_at?: string;
  website_data: {
    user_id: string;
    headerSection: HeaderSection;
    introSection: IntroSection;
    introMediaSection: IntroMediaSection;
    featuredMenuSection: FeaturedMenuSection;
    footerSection: FooterSection;
  }
}

// Restaurant data interface
export interface RestaurantData {
  id: string;
  user_id: string;
  website_name: string;
  description: string;
  website_logo?: string;
  created_at: string;
}

// Menu item interface
export interface MenuItem {
  id: string;
  user_id: string;
  dish_name: string;
  dish_recipe?: string;
  dish_price: number;
  category?: string;
  dish_image?: string;
  is_available?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Supabase error interface
export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

// API response interfaces
export interface ApiResponse<T> {
  data: T | null;
  error: SupabaseError | null;
}

// Function return types
export type WebsiteDataResult = WebsiteBuilderData | null;
export type RestaurantDataResult = RestaurantData[];
export type MenuItemsResult = MenuItem[];

export async function getWebsiteDataByUserId(
  userId: string
): Promise<WebsiteDataResult> {
  try {
    const { data, error }: ApiResponse<WebsiteBuilderData> = await supabase
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

    return data;
  } catch (error) {
    console.error("Error fetching website data:", error);
    throw error;
  }
}

export async function getAllRestaurants(): Promise<RestaurantDataResult> {
  try {
    const { data, error }: ApiResponse<RestaurantData[]> = await supabase
      .from("cloud_kitchen_website")
      .select("id, user_id, website_name, description, website_logo, created_at");

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
}

export async function getRestaurantByID(userId: string): Promise<WebsiteDataResult> {
  try {
    const { data, error }: ApiResponse<WebsiteBuilderData> = await supabase
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

    return data;
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    throw error;
  }
}

export async function getRestaurantMenuItems(userId: string): Promise<MenuItemsResult> {
  try {
    const { data, error }: ApiResponse<MenuItem[]> = await supabase
      .from("dish_item")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching restaurant menu items:", error);
    throw error;
  }
}