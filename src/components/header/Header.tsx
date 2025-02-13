"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Film, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { MovieType } from "@/app/types/movie-type";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "lucide-react";
import { HeaderSearch } from "./HeaderSearch";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type GenreType = { id: number; name: string };

const Header = () => {
  const { setTheme, theme } = useTheme();
  const { push } = useRouter();
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<MovieType[]>([]);

  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

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

  useEffect(() => {
    getGenresList();
  }, []);

  const handleGenreSelection = (genreId: string) => () => {
    const updatedGenres = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((item) => item !== genreId)
      : [...selectedGenreIds, genreId];

    setSelectedGenreIds(updatedGenres);

    const queryParams = new URLSearchParams();
    queryParams.set("genreIds", updatedGenres.join(","));
    push(`/genres?${queryParams.toString()}`);

    
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
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      //setLoading(false);
    };

    fetchMovies();
  }, [searchValue]);

  

  return (
    <>
      <div className="sticky top-0 w-screen h-[59px] flex z-10 bg-white dark:bg-[#09090B]">
        <div className="flex flex-col w-full  justify-center items-center gap-4">
          <div className="max-w-[1280px] w-full px-[5%] 2xl:px-0 flex flex-row items-center justify-between">
            <div
              className="flex flex-row text-[#4338CA] gap-2 cursor-pointer"
              onClick={() => {
                push("/");
              }}
            >
              <Film />
              <h4 className="italic font-bold">Movie Z</h4>
            </div>
            <div className="md:flex gap-3 hidden relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9">
                    <ChevronDown />
                    Genre
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[500px] h-[300px]">
                  <DropdownMenuLabel className="text-2xl">
                    Genres
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="text-md font-normal">
                    See lists of movies by genre
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex flex-wrap gap-7 ">
                    {genres.length > 0 &&
                      genres.map((item) => {
                        const genreId = item.id.toString();
                        const isSelected = selectedGenreIds.includes(genreId);
                        return (
                          <Badge
                            onClick={handleGenreSelection(genreId)}
                            // variant={"outline"}
                            key={item.id}
                            className={`cursor-pointer px-3 py-1 rounded-full ${
                              isSelected
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : ""
                            }`}
                          >
                            {item.name}
                          </Badge>
                        );
                      })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                placeholder="Search"
                className="w-[379px] h-9"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="w-9 h-9 md:hidden flex">
                <Search />
              </Button>
              {theme === "dark" ? (
                <Button
                  variant="outline"
                  className="w-9 h-9"
                  onClick={() => setTheme("light")}
                >
                  <Sun />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-9 h-9"
                  onClick={() => setTheme("dark")}
                >
                  <Moon />
                </Button>
              )}
            </div>

            {/* search */}
            {/* {loading && <p>Loading ...</p>} */}
          </div>
        </div>
      </div>
      <HeaderSearch movies={movies} />
     </>
  );
};

export default Header;
