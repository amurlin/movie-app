"use client";

// import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { MovieType } from "@/app/types/movie-type";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

console.log(TMDB_API_TOKEN);

const Upcoming = () => {
  const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [nowPlayingData, setNowPlayingData] = useState<MovieType[]>([]);
  
    const getNowPlayingMoviesData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN} `,
            },
          }
        );
        console.log(response)
        setNowPlayingData(response.data.results);
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
  
    console.log(nowPlayingData);

    const { push } = useRouter();

  const movieData = [
    { id: 1, title: "name", img: "image"},
    { id: 1, title: "name", img: "image"},
    { // genre_ids: (4) [28, 878, 35, 10751],
      id: 939243,
      original_language: "en",
      original_title : "Sonic the Hedgehog 3",
      overview: "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
      popularity: 4739.045,
      poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
      release_date: "2024-12-19",
      title: "Sonic the Hedgehog 3",
      video: false,
      vote_average: 7.9,
      vote_count: 1208 },
    
  ];
  
    return (
        <div className="flex flex-row">
            {movieData.map((movie, index) => {
            return (
            <div key={index}>
                <Card key={index} onClick={() => push(`/detail/5${movie.id}`)}  >
                <CardContent >
                    {/* <Image href={movies.poster_path} /> */}
                </CardContent>
                <CardHeader>{movie.title}</CardHeader>
                <CardContent>{movie.vote_average}</CardContent>
            </Card>
            </div>
            
            )
        })}
        </div>
    );
}

export default Upcoming