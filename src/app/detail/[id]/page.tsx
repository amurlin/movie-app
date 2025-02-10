"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MovieType } from "@/app/types/movie-type";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const MovieDetail = () => {
  const { id } = useParams(); // URL-с movieId-г авна
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [error, setError] = useState<string>(""); // error-ийн төрөл нь string
  const [loading, setLoading] = useState<boolean>(false); // loading-ийн төрөл нь boolean
  const [trailer, setTrailer] = useState<string | null>(null);

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

        // Трейлерийн мэдээллийг авах
        const videoResponse = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        // Трейлерийг тогтоох
        const trailerData = videoResponse.data.results.find(
          (video: any) => video.type === "Trailer"
        );
        if (trailerData) {
          setTrailer(trailerData.key);
        }

        setLoading(false);
      } catch (err: unknown) {
        let errorMessage = "Тодорхойгүй алдаа гарлаа.";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.status_message || err.message;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!movie) return <p>Кино олдсонгүй.</p>;

  return (
    <div className="flex justify-center relative">
      <div className="flex flex-col w-[1280px]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="mt-2">{movie.release_date}</p>
          </div>
          <p className="mt-4">⭐ Rating {movie.vote_average}</p>
        </div>
        <div className="flex flex-row justify-between">
          <Image
            src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
            alt={movie.title}
            width={290}
            height={430}
            priority
          />
          <Image 
            src={`${TMDB_IMAGE_SERVICE_URL}/original${movie.backdrop_path}`}
            alt={movie.title}
            width={760}
            height={430}/>
          

          <div className="absolute hidden justify-items-center ">
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
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
