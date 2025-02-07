"use client";

import NowPlayingSlider from "@/components/NowPlayingSlider";
import MoviesList from "@/components/MoviesList";

export default function Home() {
  
  return (
    <div className="flex flex-col sm:gap-16">
      <NowPlayingSlider />
      <MoviesList title="Upcoming" endpoint="upcoming" />;
      <MoviesList title="Popular" endpoint="popular" />;
      <MoviesList title="Top Rated" endpoint="top_rated" />;
    </div>
  );
}
