"use client";

import NowPlayingSlider from "@/components/NowPlayingSlider";
import MovieSection from "@/components/MovieSection";

export default function Home() {
  
  return (
    <div className="flex flex-col sm:gap-16">
      <NowPlayingSlider />
      <MovieSection title="Upcoming" endpoint="upcoming" />;
      <MovieSection title="Popular" endpoint="popular" />;
      <MovieSection title="Top Rated" endpoint="top_rated" />;
    </div>
  );
}
