"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { MovieType } from "@/app/types/movie-type";

const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

interface MovieCardProps {
  movie: MovieType;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { push } = useRouter();

  return (
    <Card 
      key={movie.id} 
      onClick={() => push(`/detail/${movie.id}`)} 
      className="w-[230px] h-[439px] flex flex-col gap-3 overflow-hidden cursor-pointer"
    >
      <CardContent className="p-0">
        <Image 
          src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`} 
          alt={movie.title} 
          width={230} 
          height={340} 
          priority 
        />
      </CardContent>
      <CardContent className="px-2 py-0">⭐ {movie.vote_average}</CardContent>
      <CardHeader className="px-2 py-0">{movie.title}</CardHeader>
    </Card>
  );
};

export default MovieCard;
