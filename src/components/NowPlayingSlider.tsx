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
  const { push } = useRouter();

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

  console.log('TMDB Base URL:', TMDB_BASE_URL);
console.log('TMDB API Token:', TMDB_API_TOKEN);



  return (
    <Carousel className="w-[100vw] max-w-lg">
      <CarouselContent>
        {nowPlayingData.map((movie) => (
          <CarouselItem key={movie.id} onClick={() => push(`/detail/${movie.id}`)}>
            <div className="p-1">
              <Card className="cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Image
                    src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full"
                    width={500} height={200}
                  />
                  <CardHeader className="text-center font-semibold">{movie.title}</CardHeader>
                  <p className="text-sm">⭐ {movie.vote_average}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default NowPlayingSlider;
