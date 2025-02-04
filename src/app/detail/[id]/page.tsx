// "use client";

// import { useParams } from "next/navigation";

// const Page = () => {
  
//   const params = useParams();
//   console.log(params.id);
  
  
//   return (
//     <div>{params.id}</div>
//   )
// }

// export default Page;

// /pages/detail/[id].tsx

// /pages/detail/[id].tsx



// "use client";

// import { useParams } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { MovieType } from "@/app/types/movie-type";

// const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
// const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
// const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

// const MovieDetail = () => {
//   const { id } = useParams(); // URL-с movieId-г авна
//   const [movie, setMovie] = useState<MovieType | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       setLoading(true);
//       try {
//         // Таны өгсөн эндпоинтыг ашиглаж байна
//         const response = await axios.get(
//           `${TMDB_BASE_URL}/movie/${id}?language=en-US`,  // endpoint-ийг ашиглаж байна
//           {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${TMDB_API_TOKEN}`,
//             },
//           }
//         );
//         setMovie(response.data);
//         setLoading(false);
//       } catch (err: unknown) {
//         let errorMessage = "Тодорхойгүй алдаа гарлаа.";
//         if (axios.isAxiosError(err)) {
//           errorMessage = err.response?.data?.status_message || err.message;
//         }
//         setError(errorMessage);
//         setLoading(false);
//       }
//     };

//     if (id) fetchMovieDetails();
//   }, [id]);

//   if (loading) return <p>Тамирлаж байна...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   if (!movie) return <p>Кино олдсонгүй.</p>;

//   return (
//     <div className="movie-detail">
//       <h1 className="text-4xl font-bold">{movie.title}</h1>
//       <div className="flex gap-6 mt-4">
//         <Image
//           src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
//           alt={movie.title}
//           width={230}
//           height={340}
//           priority
//         />
//         <div>
//           <p className="text-lg font-semibold">Тайлбар:</p>
//           <p>{movie.overview}</p>
//           <p className="mt-4">⭐ Үнэлгээ: {movie.vote_average}</p>
//           <p className="mt-2">Гарсан огноо: {movie.release_date}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetail;


// /pages/detail/[id].tsx

"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MovieType } from "@/app/types/movie-type"; // MovieType-ийг импортоор авна

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const MovieDetail = () => {
  const { id } = useParams(); // URL-с movieId-г авна
  const [movie, setMovie] = useState<MovieType | null>(null); // MovieType-ийг ашиглаж байна
  const [error, setError] = useState<string>(""); // error-ийн төрөл нь string
  const [loading, setLoading] = useState<boolean>(false); // loading-ийн төрөл нь boolean
  const [trailer, setTrailer] = useState<string | null>(null); // трейлерийн key хадгалах хувьсагч

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
        const trailerData = videoResponse.data.results.find((video: any) => video.type === "Trailer");
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
    <div className="movie-detail">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <div className="flex gap-6 mt-4">
        <Image
          src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
          alt={movie.title}
          width={230}
          height={340}
          priority
        />
        <div>
          <p className="text-lg font-semibold">Тайлбар:</p>
          <p>{movie.overview}</p>
          <p className="mt-4">⭐ Үнэлгээ: {movie.vote_average}</p>
          <p className="mt-2">Гарсан огноо: {movie.release_date}</p>
          
          {/* Трейлерийн хэсэг
          {trailer ? (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Трейлер</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>Трейлер байхгүй.</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

