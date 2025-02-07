"use client";

import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { MovieType } from "../types/movie-type";
import MovieCard from "@/components/MovieCard"; // MovieCard-ыг импортлож байна

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type GenresType = { id: number; name: string };

const Page = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const searchedGenreIds = searchParams.get("genreIds") || "";

  const getGenresList = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      });
      setGenres(response.data.genres);
    } catch (error) {
      console.log("Axios error:", error);
    }
  };

  const getMoviesByGenres = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${searchedGenreIds}&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log("Axios error:", error);
    }
  };

  useEffect(() => {
    getGenresList();
  }, []);

  useEffect(() => {
    getMoviesByGenres();
  }, [searchedGenreIds]);

  const handleGenreSelection = (genreId: string) => () => {
    const updatedGenres = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((item) => item !== genreId)
      : [...selectedGenreIds, genreId];

    setSelectedGenreIds(updatedGenres);

    const queryParams = new URLSearchParams();
    queryParams.set("genreIds", updatedGenres.join(","));
    push(`/genres?${queryParams.toString()}`);
  };

  return (
    <div className="px-6 py-4">
      <div className="flex flex-wrap gap-2">
        {genres.length > 0 &&
          genres.map((item) => {
            const genreId = item.id.toString();
            const isSelected = selectedGenreIds.includes(genreId);
            return (
              <Badge
                onClick={handleGenreSelection(genreId)}
                variant="outline"
                key={item.id}
                className={`cursor-pointer px-3 py-1 rounded-full ${
                  isSelected ? "bg-black text-white dark:bg-white dark:text-black" : ""
                }`}
              >
                {item.name}
              </Badge>
            );
          })}
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.length > 0
          ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          : <p className="text-gray-500">No movies found</p>}
      </div>
    </div>
  );
};

export default Page;
