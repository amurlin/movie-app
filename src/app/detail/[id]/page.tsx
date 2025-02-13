"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MovieType } from "@/app/types/movie-type";
import { Button } from "@/components/ui/button";
// import MoviesList from "@/components/MoviesList";
import MovieCard from "@/components/MovieCard";
import DetailSkeleton from "@/components/skeleton/DetailSkeleton";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const MovieDetail = () => {
  const { id } = useParams(); 
  const { push } = useRouter();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [error, setError] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [trailer, setTrailer] = useState<boolean | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieType[]>([]); 
  const [credits, setCredits] = useState<string>(""); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}?language=en-US`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
        console.log("response data :", response.data);

        // Fetch Trailer
        const videoResponse = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        const trailerData = videoResponse.data.results.find(
          (video: any) => video.type === "Trailer"
        );
        if (trailerData) {
          setTrailer(trailerData.key);
        }

        // Fetch Similar Movies
        const similarResponse = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setSimilarMovies(similarResponse.data.results);

        // Fetch Credits (Director, Writers, and Cast)
        const creditsResponse = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setCredits(creditsResponse.data);

        setLoading(false);
      } catch (err: unknown) {
        let errorMessage = "Error";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.status_message || err.message;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  if (loading) return <DetailSkeleton/>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!movie) return <p>Not found.</p>;

  // Extracting the director, writers, and stars (cast)
  const director = credits?.crew?.find((person: any) => person.job === "Director");
  const writers = credits?.crew?.filter((person: any) => person.job === "Writer");
  const stars = credits?.cast?.slice(0, 5); 

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[1280px] px-[5%]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="mt-2">{movie.release_date}</p>
          </div>
          <p className="mt-4">⭐ Rating {movie.vote_average}</p>
        </div>
        <div className="flex flex-col-reverse xl:flex-row justify-between gap-8 xl:gap-none">
          <div className="flex flex-row gap-4">
            <Image
              src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
              alt={movie.title}
              width={290}
              height={430}
              priority
              className="w-[150px] h-[200px] xl:w-[290px] xl:h-[430px]"
            />
            <p className="mt-6 flex xl:hidden">{movie.overview}</p>
          </div>

          <Image 
            src={`${TMDB_IMAGE_SERVICE_URL}/original${movie.backdrop_path}`}
            alt={movie.title}
            width={760}
            height={430}
            className="relative w-full xl:w-[760px]"/>
          <Button className="absolute bottom-0 left-0"></Button>

          <div className="hidden justify-items-center ">
            {trailer ? (
              <div className="">
                <iframe
                  width={760}
                  height={430}
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p>Trailer Not Found</p>
            )}
          </div>
        </div>

        <p className="mt-6 hidden xl:flex">{movie.overview}</p>

        {/* Director, Writers, and Cast */}
        <div className="mt-6 space-y-5 text-foreground mb-8">
          <div className="flex flex-row ">
            <p className="text-md font-semibold w-[100px]">Director</p>
            <p>{director ? director.name : "Not Available"}</p>
          </div>
          <Separator  />
          <div className="flex flex-row">
            <p className="text-md font-semibold w-[100px] ">Writers</p>
            {writers?.map((writer: any, index: number) => (
              <div key={index}>{writer.name}</div>
            ))}
          </div>

          <Separator  />
          <div className="flex flex-row ">
            <p className="text-md font-semibold w-[100px]">Stars</p>
            <div className="flex flex-wrap">
              {stars?.map((star: any, index: number) => (
                <div className="flex flex-1 flex-wrap" key={index}>{star.name} · </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        <div className="mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-semibold">More like this</h2>
            <p 
              className="flex flex-row gap-2 cursor-pointer"
              onClick={() => push(`/category//${id}/similar`)}
            >
              See more <ArrowRightIcon className="w-5" />
            </p>
          </div>
          <div className="w-full flex flex-wrap gap-x-[32px] gap-y-[32px] justify-center">
            {similarMovies.length > 0 ? (
              similarMovies.map((movie: MovieType) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <p>No similar movies found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetail;
