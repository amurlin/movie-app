"use client";

import axios from "axios";
import { useState, useEffect } from "react";
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

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const NowPlayingSlider = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieType[]>([]);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const { push } = useRouter();
  // const totalSlides = nowPlayingData.length;

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  //   }, 5000); // 5000ms буюу 5 секунд тутам шилжих
  //   // Тогтмол шилжүүлгийг зогсоох
  //   return () => clearInterval(interval);
  // }, [totalSlides]); // totalSlides өөрчлөгдсөн үед шинэ интервал үүсгэгдэнэ

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  //   console.log('TMDB Base URL:', TMDB_BASE_URL);
  // console.log('TMDB API Token:', TMDB_API_TOKEN);

  return (
    <Carousel className="w-[100vw] max-screen m-0 relative">
      <CarouselContent className="">
        {nowPlayingData.map((movie) => (
          <CarouselItem
            key={movie.id}
            onClick={() => push(`/detail/${movie.id}`)}
            className=""
          >
            <div className="">
              <Card className="cursor-pointer">
                <CardContent className="flex flex-col justify-center p-0 gap-4">
                  <div
                    style={{
                      position: "relative",
                      width: "100vw",
                      height: "600px",
                      // object-fit: "cover"
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
                  <div className="flex sm:hidden flex-row justify-between items-start gap-1 px-[5%]">
                    <div className="flex flex-col items-start w-[300px]">
                      <h3 className="p-0 text-md">Now playing:</h3>
                      <CardHeader className="text-center font-semibold text-2xl p-0 mb-3">
                        {movie.title}
                      </CardHeader>
                      <p className="h-[120px] overflow-hidden text-sm">
                        {movie.overview}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <p className="text-2xl p-0">⭐</p>
                      <p className="text-md p-0">{movie.vote_average}</p>
                      <p className="text-xs text-gray-400">/10</p>
                    </div>
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

// Avtomataar guideg bolgoh!
// carousel deer auto gek baidag 
