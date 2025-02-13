import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { MovieType } from "@/app/types/movie-type";

export const HeaderSearch = ({ movies }: { movies: MovieType[] }) => {
  const { push } = useRouter();

  return (
    <div className="self-center fixed top-18 z-20 flex justify-center w-full">    
      {movies.length > 0 && (
        <div className=" w-[530px] bg-white p-6 shadow-lg rounded-lg flex flex-col border-solid border-[1px] dark:bg-[#09090B] dark:border-[#27272A]">
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
                  <div className="w-full flex flex-row justify-between h-[120px] relative">
                    {/* onClick={() => push(`/category/${endpoint}`)}> */}
                    <div>
                      <div className="flex flex-col gap-2">
                        <p className="text-[20px] font-semibold ">
                          {movie.title}
                        </p>
                        <div className="flex flex-row items-center">
                          <p className="text-md p-0">⭐</p>
                          <p className="text-md p-0">{movie.vote_average}</p>
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
      )}
    </div>
  );
};
