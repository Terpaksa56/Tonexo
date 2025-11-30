import { X, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import { getLyrics } from "@/services/genius";

export function Lyrics() {
  const { currentTrack, toggleLyrics } = usePlayer();
  const [lyrics, setLyrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentTrack) {
      setLoading(true);
      getLyrics(currentTrack.title, currentTrack.artist)
        .then(setLyrics)
        .finally(() => setLoading(false));
    }
  }, [currentTrack]);

  if (!currentTrack) {
    return (
      <div className="fixed right-0 top-0 bottom-24 w-96 bg-player border-l border-border flex flex-col items-center justify-center z-50">
        <p className="text-sm text-muted-foreground">No track playing</p>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 bottom-24 w-96 bg-player border-l border-border flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Lyrics</h2>
        <Button variant="ghost" size="icon" onClick={toggleLyrics}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Current Track Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
        </div>
      </div>

      {/* Lyrics Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : lyrics?.found ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {lyrics.lyrics}
            </p>
            {lyrics.url && (
              <a
                href={lyrics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View full lyrics on Genius
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground text-center">
              Lyrics not available for this track
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
