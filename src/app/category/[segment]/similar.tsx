"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MovieType } from "@/app/types/movie-type";
import MovieCard from "@/components/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const CategoryPage = () => {
  const { segment } = useParams(); // URL-аас ангиллын нэрийг авах
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      if (!segment) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${segment}?language=en-US&page=1`, // Ангиллын нэрийг динамикаар солих
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err: unknown) {
        let errorMessage = "Error.";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.status_message || err.message;
        }
        setError(errorMessage);
      }
      setLoading(false);
    };

    fetchCategoryMovies();
  }, [segment]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-[5%] sm:px-[12%] dark:bg-black  flex flex-col gap-8">
      <h1 className="text-2xl font-bold capitalize">{segment}</h1>
      <div className="flex flex-wrap gap-[32px] justify-center">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Not found.</p>
        )}
      </div>
      <div className="w-full flex justify-end mb-[32px] sm:mb-[76px]">
      <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
      </Pagination>
      </div>
    </div>
  );
};

export default CategoryPage;



