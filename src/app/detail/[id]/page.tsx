// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { MovieType } from "@/app/types/movie-type";

// const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

// export default function MovieDetailPage({ params }: { params: { id: string } }) {
//  const [movie, setMovie] = useState<MovieType | null>(null);
//  const router = useRouter();
//  useEffect(() => {
//    async function fetchMovie() {
//      const res = await fetch(`${TMDB_BASE_URL}/movie/${params.id}?language=en-US`);
//      const data = await res.json();
//      setMovie(data);
//    }
//    fetchMovie();
//  }, [params.id]);
//  if (!movie) return <p>Loading...</p>;
//  return (
// <div className="p-8">
// <h1 className="text-3xl font-bold">{movie.title}</h1>
// <p>{movie.overview}</p>
// <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={() => router.back()}>
//        Буцах
// </button>
// </div>
//  );
// }

"use client";

import { useParams } from "next/navigation";

const Page = () => {
  
  const params = useParams();
  console.log(params.id);
  
  
  return (
    <div>{params.id}</div>
  )
}

export default Page;