import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/20"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/20"
          onClick={() => navigate(1)}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-sm font-semibold" onClick={() => navigate("/login")}>
          Sign up
        </Button>
        <Button className="rounded-full bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8">
          Log in
        </Button>
      </div>
    </header>
  );
}
