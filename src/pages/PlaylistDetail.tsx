import { useParams } from "react-router-dom";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackItem } from "@/components/music/TrackItem";
import { mockPlaylists } from "@/services/mockData";

export default function PlaylistDetail() {
  const { id } = useParams();
  const playlist = mockPlaylists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Playlist not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* Playlist Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent p-6 md:p-8 flex items-end gap-6">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-2xl object-cover"
        />
        <div className="flex flex-col justify-end">
          <p className="text-sm font-semibold uppercase mb-2">Playlist</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">{playlist.name}</h1>
          <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
          <p className="text-sm font-semibold">
            Spotify • {playlist.tracks.length} songs
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg hover-scale"
          >
            <Play className="w-6 h-6 fill-current" />
          </Button>
        </div>

        {/* Track List */}
        <div className="space-y-1">
          <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border">
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <Clock className="w-4 h-4 justify-self-end" />
          </div>

          {playlist.tracks.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
