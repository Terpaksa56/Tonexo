import { Home, Search, Library, Plus, Heart, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainLinks = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Library, label: "Your Library", path: "/library" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Sidebar() {
  return (
    <aside className="w-60 bg-sidebar h-full flex flex-col p-6 gap-6">
      <div className="flex items-center gap-2 px-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground">S</span>
        </div>
        <span className="text-xl font-bold">Spotify</span>
      </div>

      <nav className="flex flex-col gap-4">
        {mainLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="flex items-center gap-4 px-2 py-3 rounded-md text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
            activeClassName="text-sidebar-foreground bg-sidebar-accent"
          >
            <link.icon className="w-6 h-6" />
            <span className="font-semibold">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <Separator className="bg-sidebar-border" />

      <div className="flex flex-col gap-4">
        <Button variant="ghost" className="justify-start gap-4 px-2 text-sidebar-foreground/70 hover:text-sidebar-foreground">
          <Plus className="w-6 h-6" />
          <span className="font-semibold">Create Playlist</span>
        </Button>
        <Button variant="ghost" className="justify-start gap-4 px-2 text-sidebar-foreground/70 hover:text-sidebar-foreground">
          <Heart className="w-6 h-6" />
          <span className="font-semibold">Liked Songs</span>
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {["Discover Weekly", "Release Radar", "Daily Mix 1", "Daily Mix 2", "Your Top Songs 2024"].map((playlist) => (
            <button
              key={playlist}
              className="text-left px-2 py-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors rounded-md"
            >
              {playlist}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
