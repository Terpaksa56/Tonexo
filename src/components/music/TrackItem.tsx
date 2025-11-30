import { Play, Pause } from "lucide-react";
import { Track } from "@/services/mockData";
import { usePlayer } from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";

interface TrackItemProps {
  track: Track;
  index: number;
}

export function TrackItem({ track, index }: TrackItemProps) {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlayPause } = usePlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  const handleClick = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 rounded-md hover:bg-muted/50 group cursor-pointer items-center",
        isCurrentTrack && "bg-muted/50"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center">
        {isCurrentTrack && isPlaying ? (
          <Pause className="w-4 h-4 text-primary" />
        ) : (
          <>
            <span className={cn("text-sm text-muted-foreground group-hover:hidden", isCurrentTrack && "text-primary")}>
              {index + 1}
            </span>
            <Play className="w-4 h-4 text-foreground hidden group-hover:block" />
          </>
        )}
      </div>

      <div className="flex items-center gap-3 overflow-hidden">
        <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded object-cover" />
        <div className="overflow-hidden">
          <p className={cn("text-sm font-medium truncate", isCurrentTrack && "text-primary")}>{track.title}</p>
          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
        </div>
      </div>

      <div className="text-sm text-muted-foreground truncate">{track.album}</div>

      <div className="text-sm text-muted-foreground text-right">{track.duration}</div>
    </div>
  );
}
