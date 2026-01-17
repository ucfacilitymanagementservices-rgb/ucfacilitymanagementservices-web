import { useState, useEffect } from 'react';
import { Play, X, Loader2, Youtube } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
  description: string;
  publishedAt: string;
}

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
        const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();

        const formattedVideos: Video[] = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
          videoId: item.id.videoId,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
        }));

        setVideos(formattedVideos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError('Failed to load videos. Please try again later.');
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 z-0">
          <img
            src="/gsf-us-cellular_3.3.4.jpg"
            alt="UCFMS Videos"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Youtube size={80} className="text-white mx-auto mb-6 animate-fade-in" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Our Videos
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 animate-fade-in-delay">
            Watch our latest videos and learn about our facility management services
          </p>
        </div>
      </section>

      {loading && (
        <section className="py-32 bg-white">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading videos...</p>
          </div>
        </section>
      )}

      {error && (
        <section className="py-32 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-12">
              <p className="text-red-600 text-xl font-semibold mb-4">Unable to Load Videos</p>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && videos.length === 0 && (
        <section className="py-32 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-12">
              <Youtube size={64} className="text-blue-600 mx-auto mb-6" />
              <p className="text-gray-700 text-xl font-semibold mb-2">No Videos Available</p>
              <p className="text-gray-600">Please check back later for new content.</p>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && videos.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Our Video Gallery
              </h2>
              <p className="text-lg text-gray-600">
                Watch how we deliver excellence in facility management
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video.id)}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-blue-900/90 group-hover:via-blue-900/60 transition-all duration-300" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-all transform group-hover:scale-110 border-2 border-white">
                        <Play size={28} className="text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want to See More?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our YouTube channel for the latest updates and facility management insights
          </p>
          <a
            href={`https://youtube.com/channel/${import.meta.env.VITE_YOUTUBE_CHANNEL_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 text-white text-xl font-bold rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <Youtube size={28} />
            Subscribe on YouTube
          </a>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-5xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 p-2 hover:bg-white/20 rounded-lg transition-colors group"
            >
              <X size={32} className="text-white group-hover:text-red-500 transition-colors" />
            </button>
            <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videos.find(v => v.id === selectedVideo)?.videoId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s backwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
