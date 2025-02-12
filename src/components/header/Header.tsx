"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Film, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter,  } from "next/navigation"; //useSearchParams
// import axios from "axios";
import { MovieType } from "@/app/types/movie-type";
import Image from "next/image";
import { ArrowRightIcon, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Badge } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type GenreType = { id: number; name: string };
// type Checked = DropdownMenuCheckboxItemProps["checked"]

const Header = () => {
  const { setTheme, theme } = useTheme();
  const { push } = useRouter();
  const [genres, setGenres] = useState<GenreType[]>([]);
  // const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<MovieType[]>([]);

  // const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  // const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  // const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  //const searchParams = useSearchParams();
  //const searchedGenreIds = searchParams.get("genreIds") || "";
  

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

  // const getMoviesByGenres = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${searchedGenreIds}&page=1`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${TMDB_API_TOKEN}`,
  //         },
  //       }
  //     );
  //     setMovies(response.data.results);
  //   } catch (error) {
  //     console.log("Axios error:", error);
  //   }
  // };

  return (
    <div className="sticky top-0 w-screen h-[59px] flex z-10 bg-white dark:bg-[#09090B]">
      <div className="flex flex-col w-full justify-center items-center h-full gap-4">
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
            {/* <Select onValueChange={handleGenreSelect} value={selectedGenre}>
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
            </Select> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <ChevronDown />
                  Genre
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Genres</DropdownMenuLabel>
                <DropdownMenuLabel className="text-[12px] font-normal">See lists of movies by genre</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="col-span-1 gap-7 ">
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
        {movies.length > 0 && (
          <div className="w-[530px] flex justify-center p-0 bg-black ">
            <div className=" w-[530px] bg-white dark:bg-black p-6 shadow-lg mt-2 rounded-lg flex flex-col border-solid border-[1px] border-[#27272A]">
              {movies.slice(0, 5).map(
                (
                  movie // ehnii 5
                ) => (
                  <div key={movie.id} className="flex flex-col">
                    <div
                      className="flex items-center py-2 gap-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => push(`/detail/${movie.id}`)}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={70}
                        height={100}
                        className="w-[80px] h-[110px] object-cover rounded-md"
                      />
                      <div className="w-full flex flex-row justify-between h-[120px] relative"  >
                        {/* onClick={() => push(`/category/${endpoint}`)}> */}
                        <div>
                          <div className="flex flex-col gap-2">
                            <p className="text-[20px] font-semibold ">
                              {movie.title}
                            </p>
                            <div className="flex flex-row items-center">
                              <p className="text-md p-0">⭐</p>
                              <p className="text-md p-0">
                                {movie.vote_average}
                              </p>
                              <p className="text-xs text-gray-400">/10</p>
                            </div>
                          </div>
                          <p className="text-md ">
                            {movie.release_date?.substring(0, 4)}
                          </p>
                        </div>
                        <p className=" absolute right-0 bottom-0 flex flex-row gap-2 cursor-pointer items-center text-[14px]">
                          See more <ArrowRightIcon className="w-4" />
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
