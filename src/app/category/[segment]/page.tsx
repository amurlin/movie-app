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
        `${TMDB_BASE_URL}${endpoint}`,
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
    <div className="flex justify-center">
          <div className="flex flex-col w-[1080px]">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="mt-2">{movie.release_date}</p>
              </div>
              <p className="mt-4">⭐ Rating {movie.vote_average}</p>
            </div>
            <div className="flex flex-row justify-between">
            <Image
                src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                width={290}
                height={430}
                priority
              />
              {/* <Image 
                src={`${TMDB_IMAGE_SERVICE_URL}/original${movie.backdrop_path}`}
                alt={movie.title}
                width={760}
                height={430}/> */}
        
                {trailer ? (
                  <div className="">
                    <iframe
                      width={760}
                      height={430}
                      src={`https://www.youtube.com/embed/${trailer}`}
                      title="Movie Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <p>Trailer Not Found</p>
                )}
            </div>
            <p>{movie.overview}</p>
          </div>
            
        </div>
  );
};

export default Upcoming;