import { PlaylistCard } from "@/components/music/PlaylistCard";
import { mockPlaylists } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Library() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Library</h1>
        <Button variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Create Playlist
        </Button>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>
    </div>
  );
}
