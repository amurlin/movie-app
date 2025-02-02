"use client";

import NowPlayingSlider from "@/components/NowPlayingSlider";
import Upcoming from "@/components/Upcoming";

export default function Home() {
  
  return (
    <div className="flex flex-col sm:gap-16">
      <NowPlayingSlider />
      <Upcoming />
    </div>
  );
}
