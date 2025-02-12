"use client";

import axios from "axios";
import { useParams } from "next/navigation";
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
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
//import { Link } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const NowPlayingSlider = () => {
  const { id } = useParams(); // URL-с movieId-г авна
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieType[]>([]);
  const { push } = useRouter();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  //const [trailer, setTrailer] = useState<string | null>(null);

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

      // // Трейлерийн мэдээллийг авах
      // const videoResponse = await axios.get(
      //   `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
      //   {
      //     headers: {
      //       Accept: "application/json",
      //       Authorization: `Bearer ${TMDB_API_TOKEN}`,
      //     },
      //   }
      // );
      // // Трейлерийг тогтоох
      // const trailerData = videoResponse.data.results.find(
      //   (video: any) => video.type === "Trailer"
      // );
      // if (trailerData) {
      //   setTrailer(trailerData.key);
      // }


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

  const truncate = (input: string) =>
    input?.length > 200 ? `${input.substring(0, 180)}...` : input;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[100vw] max-screen m-0 relative mt-[30px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {nowPlayingData.map((movie) => (
          <CarouselItem
            key={movie.id}
            onClick={() => push(`/detail/${movie.id}`)}
          >
            <Card className="cursor-pointer border-none dark:bg-[#09090B] shadow-none">
              <CardContent className="flex flex-col justify-center p-0 gap-4 border-none">
                <div
                  style={{
                    position: "relative",
                    width: "100vw",
                    height: "auto",
                    maxHeight: "700px",
                    boxSizing: "border-box",
                  }}
                >
                  <Image
                    src={`${TMDB_IMAGE_SERVICE_URL}/original${movie.backdrop_path}`}
                    alt={movie.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    objectFit="cover"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="absolute hidden md:flex flex-col ml-[150px] gap-1 w-[300px] items-start text-white">
                  <p className="p-0 text-sm">Now playing:</p>
                  <CardHeader className="text-center text-2xl font-semibold p-0">
                    {movie.title}
                  </CardHeader>
                  <div className="flex flex-row items-center">
                    <p className="text-2xl p-0">⭐</p>
                    <p className="text-md p-0">{movie.vote_average}</p>
                    <p className="text-xs text-gray-400">/10</p>
                  </div>
                  <p className=" text-sm">
                    {truncate(movie.overview)}
                  </p>
                  <Button className="h-9 bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white"> 
                    <Play/> 
                    Watch trailer 
                  </Button>
                </div>
                <div className="flex md:hidden flex-row justify-between items-start gap-1 px-[5%]">
                  <div className="flex flex-col gap-3 items-start w-[300px]">
                    <h3 className="p-0 text-md">Now playing:</h3>
                    <CardHeader className="text-center font-semibold text-2xl p-0">
                      {movie.title}
                    </CardHeader>
                    <p className="text-sm">
                    {truncate(movie.overview)}
                    </p>
                    <Button 
                    className="h-9 bg-[#F4F4F5] dark:bg-[#27272A] text-[#18181B] dark:text-white"
                    onClick={() => push(`${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`)}
                     > 
                    {/* <Link href="`${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`">Login</Link> */}
                    <Play/> 
                    Watch trailer 
                  </Button>
                  </div>
                  <div className="flex flex-row items-center">
                    <p className="text-2xl p-0">⭐</p>
                    <p className="text-md p-0">{movie.vote_average}</p>
                    <p className="text-xs text-gray-400">/10</p>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 w-8 h-8 rounded-full md:flex hidden items-center justify-center  transition z-10" />
      <CarouselNext className="absolute right-4 top-1/2 w-8 h-8 rounded-full md:flex hidden items-center justify-center transition z-10" />
    </Carousel>
  );
};

export default NowPlayingSlider;
