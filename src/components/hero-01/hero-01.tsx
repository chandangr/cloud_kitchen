import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";

const Hero01 = () => {
  return (
    <div className="flex items-center justify-center px-6 h-screen">
      <div className="text-center max-w-2xl">
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
          Just released v1.0.0
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Welcome to Our Home Cloud Kitchen
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Discover a variety of delicious meals prepared with the freshest
          ingredients, delivered straight to your door.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href="/plp">
            <Button size="lg" className="rounded-full text-base">
              Order Now <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" /> Watch Our Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero01;
