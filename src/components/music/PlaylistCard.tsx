import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Playlist } from "@/services/mockData";

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="bg-card hover:bg-card/80 p-4 rounded-lg cursor-pointer transition-all group hover-lift relative"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      <div className="relative mb-4">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-md"
        />
        <Button
          size="icon"
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Play className="w-5 h-5 fill-current" />
        </Button>
      </div>
      <h3 className="font-semibold text-base mb-2 truncate">{playlist.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{playlist.description}</p>
    </Card>
  );
}
