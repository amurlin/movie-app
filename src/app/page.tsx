"use client";

// import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";

const TMDB_BASE_URL= process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN= process.env.TMDB_API_TOKEN;

// type NowPlayingSliderType = {
//   test : boolean;
// };

// const NowPlayingSlider = (props: NowPlayingSliderType) => {
//   const {test} = props;

//   const getNowPlayingMoviesData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `$(TMDB_BASE_URL)/movie/popular?language=en-US&page=1`, {
//           headers: {
//             Authorization: `Bearer ${TMDB_API_TOKEN} `, 
//         },
//       }
//       );
//     }
//   } catch {}
// }

export default function Home() {

  const {error, setError} = useState("");
  const {loading, setLoading} = useState(false);
  const {popularMoviesData, setPopularMoviesData} = useState([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN} `, 
        },
      }
    );
      setPopularMoviesData(response.data.result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)){
        setError(err.response?.data.status_message);
      }
    }
  };

  console.log("this is the error", error);
  console.log("this is the error", popularMoviesData);

  useEffect(() => {
    getMovieData();
  },[]);

  if(loading) {
    return <div>skeleton</div>;
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <Button> hello </Button> */}
    </div>
  );
}
