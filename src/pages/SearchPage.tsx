import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PlaylistCard } from "@/components/music/PlaylistCard";
import { mockPlaylists, mockTracks } from "@/services/mockData";
import { TrackItem } from "@/components/music/TrackItem";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredPlaylists = query
    ? mockPlaylists.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredTracks = query
    ? mockTracks.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.artist.toLowerCase().includes(query.toLowerCase()) ||
          t.album.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const categories = [
    { name: "Pop", color: "bg-rose-500", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
    { name: "Hip-Hop", color: "bg-orange-500", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop" },
    { name: "Rock", color: "bg-red-500", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop" },
    { name: "Electronic", color: "bg-purple-500", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop" },
    { name: "Jazz", color: "bg-blue-500", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop" },
    { name: "Classical", color: "bg-indigo-500", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-12 bg-card text-base"
        />
      </div>

      {!query ? (
        <>
          <section>
            <h2 className="text-2xl font-bold mb-4">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={cn(
                    "relative rounded-lg overflow-hidden cursor-pointer hover-scale h-40",
                    category.color
                  )}
                >
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute bottom-0 right-0 w-24 h-24 object-cover rotate-12 translate-x-4 translate-y-4"
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {filteredTracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Songs</h2>
              <div className="space-y-1">
                {filteredTracks.map((track, index) => (
                  <TrackItem key={track.id} track={track} index={index} />
                ))}
              </div>
            </section>
          )}

          {filteredPlaylists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          )}

          {filteredTracks.length === 0 && filteredPlaylists.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found for "{query}"</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
