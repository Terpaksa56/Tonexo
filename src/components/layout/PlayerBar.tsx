import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, ListMusic, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/usePlayer";
import { Queue } from "@/components/player/Queue";
import { Lyrics } from "@/components/player/Lyrics";
import { cn } from "@/lib/utils";

export function PlayerBar() {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    volume, 
    repeat, 
    shuffle,
    showLyrics,
    showQueue,
    togglePlayPause, 
    setProgress, 
    setVolume,
    playNext,
    playPrevious,
    toggleRepeat,
    toggleShuffle,
    toggleLyrics,
    toggleQueue,
  } = usePlayer();

  if (!currentTrack) {
    return (
      <div className="h-24 bg-player border-t border-border flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Select a track to start playing</p>
      </div>
    );
  }

  return (
    <>
      {showQueue && <Queue />}
      {showLyrics && <Lyrics />}
      
      <div className="h-24 bg-player border-t border-border px-4 flex items-center justify-between gap-4">
      {/* Track Info */}
      <div className="flex items-center gap-4 w-1/4">
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-md object-cover"
        />
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-semibold truncate">{currentTrack.title}</span>
          <span className="text-xs text-muted-foreground truncate">{currentTrack.artist}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center gap-2 w-2/4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("w-8 h-8", shuffle && "text-primary")}
            onClick={toggleShuffle}
          >
            <Shuffle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8" onClick={playPrevious}>
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:text-background"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8" onClick={playNext}>
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("w-8 h-8", repeat !== 'off' && "text-primary")}
            onClick={toggleRepeat}
          >
            <Repeat className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-2xl">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, '0')}
          </span>
          <Slider
            value={[progress]}
            max={180}
            step={1}
            onValueChange={(value) => setProgress(value[0])}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("w-8 h-8", showLyrics && "text-primary")}
          onClick={toggleLyrics}
        >
          <Mic2 className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("w-8 h-8", showQueue && "text-primary")}
          onClick={toggleQueue}
        >
          <ListMusic className="w-4 h-4" />
        </Button>
        <Volume2 className="w-4 h-4" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
          className="w-24"
        />
      </div>
    </div>
    </>
  );
}
