import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Music, ListMusic, Clock } from "lucide-react";
import { getAuthUrl } from "@/services/spotify";

export default function Profile() {
  const { user, token, logout } = useSpotifyAuth();

  if (!token || !user) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <Card className="p-8 max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold">Connect to Spotify</h2>
          <p className="text-muted-foreground">
            Sign in with your Spotify account to access your playlists and start playing music.
          </p>
          <Button
            onClick={() => window.location.href = getAuthUrl()}
            className="w-full"
          >
            Connect Spotify Account
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-4xl font-bold">
          {user.display_name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase mb-2">Profile</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{user.display_name || 'User'}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span>{user.followers?.total || 0} Followers</span>
            <span>•</span>
            <span className="text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Account Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Type</span>
            <span className="font-medium capitalize">{user.product || 'Free'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Country</span>
            <span className="font-medium">{user.country || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-medium text-xs">{user.id}</span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Tracks Played</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <ListMusic className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Playlists</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">0h</p>
              <p className="text-sm text-muted-foreground">Listening Time</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          variant="destructive"
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Disconnect Spotify
        </Button>
      </div>
    </div>
  );
}
