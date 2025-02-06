// "use client";

// import { useParams } from "next/navigation";

// const Page = () => {
  
//   const params = useParams();
//   console.log(params.id);
  
  
//   return (
//     <div>{params.id}</div>
//   )
// }

// export default Page;


"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { MovieType } from "@/app/types/movie-type";
import { ArrowRightIcon } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

interface MovieSectionProps {
  title: string;
  endpoint: string; // TMDB API-н endpoint (e.g., "upcoming", "popular")
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, endpoint }) => {
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
    <div className="px-[5%] sm:px-[10%] flex flex-col gap-8 h-[1000px] overflow-hidden">
      <div className="w-full flex flex-row justify-between items-center px-1 sm:px-5">
        <p className="text-2xl font-bold">{title}</p>
        <p 
          className="flex flex-row gap-2 cursor-pointer"
          onClick={() => push(`/category/${endpoint}`)}
        >
          See more <ArrowRightIcon className="w-5" />
        </p>


      </div>
      <div className="w-full flex flex-wrap gap-[32px] justify-center">
        {movies.map((movie) => (
          <Card key={movie.id} onClick={() => push(`/detail/${movie.id}`)} className="w-[230px] h-[439px] flex flex-col gap-3 overflow-hidden">
            <CardContent className="p-0">
              <Image src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`} alt={movie.title} width={230} height={340} priority />
            </CardContent>
            <CardContent className="px-2 py-0">⭐ {movie.vote_average}</CardContent>
            <CardHeader className="px-2 py-0">{movie.title}</CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;




