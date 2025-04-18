import { Sheet } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      {/* <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger> */}
      {/* <SheetContent> */}
      <Logo />
      <NavMenu orientation="horizontal" className="mt-12" />
      {/* </SheetContent> */}
    </Sheet>
  );
};
