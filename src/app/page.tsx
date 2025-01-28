import { Button } from "@/components/ui/button";

export default function Home() {
  const TMDB_BASE_URL= process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN= process.env.TMDB_API_TOKEN;

  const getMovieData = async () => {
    try {
      const response = axios.get(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {headers: {Authorization: `Bearer ${TMDB_API_TOKEN} ` }})
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button> hello </Button>
    </div>
  );
}
