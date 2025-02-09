"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Film, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MovieType } from "@/app/types/movie-type";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type GenreType = { id: number; name: string };

const Header = () => {
  const { setTheme, theme } = useTheme();
  const { push } = useRouter();
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/genre/movie/list?language=en-US`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
    push(`/genres?genreIds=${genreId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchValue.trim() === "") {
        setMovies([]);
        return;
      }

      //setLoading(true);
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results); // Хариуны үр дүнг хадгална
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      //setLoading(false);
    };

    fetchMovies();
  }, [searchValue]);

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


  return (
    <div className="sticky top-0 w-screen h-[59px] flex flex-row items-center justify-between px-[5%] sm:px-[12%] z-10 bg-white dark:bg-black">
      <div className="flex flex-row text-[#4338CA] gap-2">
        <Film />
        <h4 className="italic font-bold">Movie Z</h4>
      </div>
      <div className="lg:flex gap-3 hidden relative">
          <Select onValueChange={handleGenreSelect} value={selectedGenre}>
            <SelectTrigger className="w-[97px] h-9 ">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Genres</SelectLabel>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search"
            className="w-[379px] h-9"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      <div className="flex gap-3">
        <Button variant="outline" className="w-9 h-9 lg:hidden flex">
          <Search />
        </Button>
        {theme === "dark" ? (
          <Button variant="outline" className="w-9 h-9" onClick={() => setTheme("light")}>
            <Sun />
          </Button>
        ) : (
          <Button variant="outline" className="w-9 h-9" onClick={() => setTheme("dark")}>
            <Moon />
          </Button>
        )}
        </div>

      {/* search */}
      {/* {loading && <p>Loading ...</p>} */}
      {movies.length > 0 && (
        <div className=" absolute w-full flex left-[35%] top-[59px]">
          <div className=" w-[530px] bg-white dark:bg-black shadow-lg mt-2 rounded-lg flex flex-col">
          {movies.slice(0, 5).map((movie: any) => ( // ehnii 5
              <div
                key={movie.id}
                className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => push(`/detail/${movie.id}`)} 
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={70}
                  height={100}
                  className="w-[80px] h-[110px] object-cover rounded-md"
                />
                <div className="flex flex-col justify-between h-[120px]"
                  onClick={() => push(`/category/${endpoint}`)}>
                  <div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[20px] font-semibold ">{movie.title}</p>
                    <div className="flex flex-row items-center">
                      <p className="text-md p-0">⭐</p>
                      <p className="text-md p-0">{movie.vote_average}</p>
                      <p className="text-xs text-gray-400">/10</p>
                    </div>
                  </div>
                  <p className="text-md ">{movie.release_date?.substring(0, 4)}</p>
                  </div>
                  <p 
                    className="flex flex-row gap-2 cursor-pointer"
                  >
                    See more <ArrowRightIcon className="w-5" />
                  </p>
                </div>
              </div>
            ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Header;




// mobile responsive deer search button darah uyd deerees 