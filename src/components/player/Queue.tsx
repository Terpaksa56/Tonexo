import { X, GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";

export function Queue() {
  const { queue, currentTrack, removeFromQueue, clearQueue, toggleQueue } = usePlayer();

  return (
    <div className="fixed right-0 top-0 bottom-24 w-96 bg-player border-l border-border flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Queue</h2>
        <div className="flex items-center gap-2">
          {queue.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearQueue}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={toggleQueue}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Current Track */}
      {currentTrack && (
        <div className="p-4 border-b border-border">
          <p className="text-xs text-muted-foreground mb-2">Now Playing</p>
          <div className="flex items-center gap-3">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate text-primary">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
          </div>
        </div>
      )}

      {/* Queue List */}
      <div className="flex-1 overflow-y-auto">
        {queue.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Queue is empty</p>
          </div>
        ) : (
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-2 py-2">Next in Queue</p>
            {queue.map((track, index) => (
              <div
                key={`${track.id}-${index}`}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group",
                  "transition-colors"
                )}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromQueue(track.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
