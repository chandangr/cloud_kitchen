"use client";

import React from "react";

import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const menuItems: { title: string; href: string; description: string }[] = [
  {
    title: "Our Kitchens",
    href: "/kitchens",
    description:
      "Explore our state-of-the-art cloud kitchen facilities and available spaces.",
  },
  {
    title: "Services",
    href: "/services",
    description:
      "Comprehensive solutions for food businesses including kitchen space, delivery, and management tools.",
  },
  {
    title: "Partner With Us",
    href: "/partner",
    description:
      "Join our network of successful food entrepreneurs and expand your business.",
  },
  {
    title: "Food Safety",
    href: "/food-safety",
    description:
      "Learn about our commitment to maintaining the highest standards of food safety and hygiene.",
  },
  {
    title: "Success Stories",
    href: "/success-stories",
    description:
      "Discover how restaurants and food brands have grown with our cloud kitchen solutions.",
  },
  {
    title: "Technology",
    href: "/technology",
    description:
      "Our cutting-edge kitchen management and order processing systems.",
  },
];

export function NavigationMenuBar() {
  return (
    <div className="m-5 flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full p-2">
        <div>
          <a href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-8 w-8" />
            <span className="font-bold text-xl">One Stop Cloud Kitchen</span>
          </a>
        </div>
        <NavigationMenu className="relative z-50">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/plp">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="z-50">
                About Us
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Icons.logo className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Cloud Kitchen Hub
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Empowering food entrepreneurs with modern kitchen
                          spaces and comprehensive business solutions.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/about" title="Our Story">
                    Leading the revolution in modern food delivery and kitchen
                    operations.
                  </ListItem>
                  <ListItem href="/locations" title="Locations">
                    Find our cloud kitchen facilities across the city.
                  </ListItem>
                  <ListItem href="/team" title="Our Team">
                    Meet the experts behind our successful operations.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="z-50">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {menuItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="z-50">
                Help
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white">
                <ul className="grid w-[400px] gap-3 p-4">
                  <ListItem href="/help/faq" title="FAQ">
                    Frequently asked questions about our services and
                    operations.
                  </ListItem>
                  <ListItem href="/help/support" title="Support Center">
                    Get assistance with your kitchen operations and technical
                    issues.
                  </ListItem>
                  <ListItem href="/help/resources" title="Resources">
                    Helpful guides and documentation for kitchen partners.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="z-50">
                Contact
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white">
                <ul className="grid w-[400px] gap-3 p-4">
                  <ListItem href="/contact/sales" title="Sales Inquiries">
                    Interested in our kitchen spaces? Talk to our sales team.
                  </ListItem>
                  <ListItem href="/contact/partnership" title="Partnership">
                    Explore business collaboration opportunities.
                  </ListItem>
                  <ListItem href="/contact/support" title="Technical Support">
                    Get help with technical issues and platform support.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="h-[1px] bg-gray-200"></div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
