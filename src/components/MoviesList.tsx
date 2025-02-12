"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MovieType } from "@/app/types/movie-type";
import MovieCard from "./MovieCard";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type MoviesListProps = {
  title: string;
  endpoint: string;
}

const MoviesList = ({ title, endpoint }: MoviesListProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${endpoint}?language=en-US&page=1`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (err: unknown) {
        let errorMessage = "An unknown error occurred.";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.status_message || err.message;
        }
        setError(errorMessage);
      }
    };

    fetchMovies();
  }, [endpoint]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex justify-center ">
      <div className="max-w-[1280px] w-full px-[5%] 2xl:px-0 flex flex-col gap-8 h-[980px] overflow-hidden">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="text-2xl font-bold">{title}</p>
          <p 
            className="flex flex-row gap-2 cursor-pointer"
            onClick={() => push(`/category/${endpoint}`)}
          >
            See more <ArrowRightIcon className="w-5" />
          </p>
        </div>
        <div className="w-full flex flex-wrap gap-x-[32px] gap-y-[32px] justify-center">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;

