import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { getTokenFromUrl, getSpotifyApi } from "@/services/spotify";
import { Loader2 } from "lucide-react";

export default function SpotifyCallback() {
  const navigate = useNavigate();
  const { setToken, setUser } = useSpotifyAuth();

  useEffect(() => {
    const token = getTokenFromUrl();
    
    if (token) {
      setToken(token);
      window.history.replaceState({}, document.title, "/");
      
      // Fetch user profile
      const api = getSpotifyApi(token);
      api.getCurrentUser()
        .then((user) => {
          setUser(user);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [setToken, setUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Connecting to Spotify...</p>
      </div>
    </div>
  );
}
