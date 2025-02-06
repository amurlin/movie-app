"use client";

import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MovieType } from "../types/movie-type";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
//const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type GentesType = { id: number; name: string};


const Page = () => {
const { push } = useRouter();
const searchParams = useSearchParams();
const [genres, setGenres] = useState<GentesType[]>([]);
const [ movie, setMovie] = useState<MovieType[]>([]);
const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
const searchedGenreIds = searchParams.get("genreIds")

const getGenresList = async () => {
    await axios 
        .get(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
            headers : {
                "Content-Type": "application/json",
                Authorization: `Baerer ${TMDB_API_TOKEN}`,
            },
        })
        .then((response) => {
            setGenres(response.data.genres);
        })
        .catch((error) => {
            console.log("Axios error:", error);
        })
};

const getMoviesByGenres = async () => {
    await axios 
        .get(`${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${searchedGenreIds}&page=1`, { //${page}
            headers : {
                "Content-Type": "application/json",
                Authorization: `Baerer ${TMDB_API_TOKEN}`,
            },
        })
        .then((response) => {
            console.log(response);
            setMovie(response.data.results);
        })
        .catch((error) => {
            console.log("Axios error:", error);
        })
};

useEffect(() => {
    getGenresList()
}, []);

useEffect(() => {
    getMoviesByGenres()
}, [searchedGenreIds]);

const handleGenreSelection = (genreId: string) => () => {
    const updatedGenres = selectedGenreIds.includes(genreId) 
    ? selectedGenreIds.filter((item) => item !== genreId)
    : [...selectedGenreIds, genreId];

    setSelectedGenreIds(updatedGenres);

    const queryParams = new URLSearchParams();
    queryParams.set("genresId", updatedGenres.join(","));
    const newPath = queryParams.toString();

    push(`/genres?${newPath}`);
};

  return (
    <div className="">
        <div>
            {genres.length > 0 &&
               genres?.map((item) => {
                const genreId = item.id.toString();
                const isSelected = selectedGenreIds.includes(genreId);
                return (
                    <Badge 
                    onClick={handleGenreSelection(genreId)}
                    variant="outline"
                    key={item.name}
                    className={`${
                        isSelected 
                        ? "bg-black text-white dark:bg-white dark:text-black" 
                        : ""
                    } rounded-full cursor-pointer`}>
                        {item.name}
                    </Badge>
                );
             })}
        </div>
        <Separator orientation="vertical"/>
        <div className="col-span-2">
            {movie?.length > 0 && 
                movie.map((item) => {
                    return <div key={item.original_title}> {item.original_title} </div>
                })}
        </div>
    </div>
  );
};

export default Page