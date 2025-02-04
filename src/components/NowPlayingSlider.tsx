// "use client";

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { MovieType } from "@/app/types/movie-type";
// import Image from "next/image";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useRouter } from "next/navigation";

// const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
// const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
// const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

// const NowPlayingSlider = () => {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [nowPlayingData, setNowPlayingData] = useState<MovieType[]>([]);
//   const { push } = useRouter();

//   const getNowPlayingMoviesData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${TMDB_API_TOKEN}`,
//           },
//         }
//       );

//       setNowPlayingData(response.data.results);
//       setLoading(false);
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.status_message || "Error fetching movies");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getNowPlayingMoviesData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <Carousel className="w-[100vw] max-screen m-0 relative">
//       <CarouselContent>
//         {nowPlayingData.map((movie) => (
//           <CarouselItem
//             key={movie.id}
//             onClick={() => push(`/detail/${movie.id}`)}
//             className=""
//           >
//             <Card className="cursor-pointer">
//               <CardContent className="flex flex-col justify-center p-0 gap-4">
//                 <div
//                   style={{
//                     position: "relative",
//                     width: "100vw",
//                     height: "600px",
//                   }}
//                 >
//                   <Image
//                     src={`${TMDB_IMAGE_SERVICE_URL}/original${movie.backdrop_path}`}
//                     alt={movie.title}
//                     layout="fill"
//                     style={{ width: "100%", height: "100%" }}
//                     objectFit="cover"
//                   />
//                 </div>
//                 <div className="absolute hidden sm:flex flex-col gap-1 w-[300px] items-start text-white ">
//                   <p className="p-0 text-sm">Now playing:</p>
//                   <CardHeader className="text-center text-2xl font-semibold p-0">
//                     {movie.title}
//                   </CardHeader>
//                   <div className="flex flex-row items-center">
//                     <p className="text-2xl p-0">⭐</p>
//                     <p className="text-md p-0">{movie.vote_average}</p>
//                     <p className="text-xs text-gray-400">/10</p>
//                   </div>
//                   <p className="h-[120px] overflow-hidden text-sm">
//                     {movie.overview}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious className="absolute left-4 top-1/2 w-12 h-12 bg-black/50 text-white rounded-full sm:flex hidden items-center justify-center hover:bg-black/70 transition z-10" />
//       <CarouselNext className="absolute right-4 top-1/2  w-12 h-12 bg-black/50 text-white rounded-full sm:flex hidden items-center justify-center hover:bg-black/70 transition z-10 " />
//     </Carousel>
//   );
// };

// export default NowPlayingSlider;


// // Avtomataar guideg bolgoh!
// // carousel deer auto gek baidag 

"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { MovieType } from "@/app/types/movie-type";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";  // Import autoplay plugin

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const NowPlayingSlider = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieType[]>([]);
  const { push } = useRouter();

  // Initialize the autoplay plugin
  const autoplayPlugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const getNowPlayingMoviesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.results);
      setLoading(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.status_message || "Error fetching movies");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNowPlayingMoviesData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Carousel
      className="w-[100vw] max-screen m-0 relative"
      plugins={[autoplayPlugin.current]} // Apply autoplay to the carousel
      onMouseEnter={autoplayPlugin.current.stop}  // Pause on hover
      onMouseLeave={autoplayPlugin.current.reset} // Reset autoplay when hover ends
    >
      <CarouselContent>
        {nowPlayingData.map((movie) => (
          <CarouselItem
            key={movie.id}
            onClick={() => push(`/detail/${movie.id}`)}
          >
            <div className="">
              <Card className="cursor-pointer">
                <CardContent className="flex flex-col justify-center p-0 gap-4">
                  <div
                    style={{
                      position: "relative",
                      width: "100vw",
                      height: "600px",
                    }}
                  >
                    <Image
                      src={`${TMDB_IMAGE_SERVICE_URL}/original${movie.backdrop_path}`}
                      alt={movie.title}
                      layout="fill"
                      style={{ width: "100%", height:'100%' }}
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute hidden sm:flex flex-col gap-1 w-[300px] items-start text-white ">
                    <p className="p-0 text-sm">Now playing:</p>
                    <CardHeader className="text-center text-2xl font-semibold p-0">
                      {movie.title}
                    </CardHeader>
                    <div className="flex flex-row items-center">
                      <p className="text-2xl p-0">⭐</p>
                      <p className="text-md p-0">{movie.vote_average}</p>
                      <p className="text-xs text-gray-400">/10</p>
                    </div>
                    <p className="h-[120px] overflow-hidden text-sm">
                      {movie.overview}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 w-12 h-12 bg-black/50 text-white rounded-full sm:flex hidden items-center justify-center hover:bg-black/70 transition z-10" />
      <CarouselNext className="absolute right-4 top-1/2  w-12 h-12 bg-black/50 text-white rounded-full sm:flex hidden items-center justify-center hover:bg-black/70 transition z-10 " />
    </Carousel>
  );
};

export default NowPlayingSlider;
