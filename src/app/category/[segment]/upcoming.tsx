"use client";

// import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { MovieType } from "@/app/types/movie-type";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

console.log(TMDB_API_TOKEN);

const Upcoming = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieType[]>([]);
  const { push } = useRouter();

  const getNowPlayingMoviesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN} `,
          },
        }
      );
      console.log(response);
      setNowPlayingData(response.data.results);
      setLoading(false);
    } catch (err: unknown) {
      let errorMessage: string;

      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.status_message);

        errorMessage =
          err.response?.data?.statusMessage ||
          err.message ||
          "An unknown Axios error occurred.";
        setError(errorMessage);
      }
    }
  };

  useEffect(() => {
    getNowPlayingMoviesData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  console.log(nowPlayingData);

  return (
    <div> 
    <h3>Upcoming</h3>
      <h3>Upcoming</h3>
      <div className="flex flex-wrap gap-[32px] items-center">
          {nowPlayingData.map((movie, index) => {
              return (
                <div key={index} className="px-0">
                  <Card key={index} onClick={() => push(`/detail/5${movie.id}`)} className="w-[230px] h-[439px] flex flex-col gap-3 overflow-hidden" >
                    <CardContent className="p-0">
                      <Image  src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`} alt="movie image" width={230} height={340} />
                      <Image  src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`} alt="movie image" width={230} height={340} priority />
                    </CardContent>
                    <CardContent className="px-2 py-0">⭐ {movie.vote_average}</CardContent>
                    <CardHeader className="px-2 py-0">{movie.title}</CardHeader>
                  </Card>
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default Upcoming;