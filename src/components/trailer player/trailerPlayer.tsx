
// const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
// const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
// const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;


// // Trailer
//       const videoResponse = await axios.get(
//         `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${TMDB_API_TOKEN}`,
//           },
//         }
//       );
//       
//       const trailerData = videoResponse.data.results.find(
//         (video: any) => video.type === "Trailer"
//       );
//       if (trailerData) {
//         setTrailer(trailerData.key);
//       }
