import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "./../components/Loading";
import MovieList from "./../components/MovieList";
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetTrendingMoviesQuery } from "../redux/movieReducer";
import { Movie } from "../redux/movieReducer/types";

import { api } from "../api";


interface HomeProps {
    movies: Movie[] | undefined;
    searchQuery: string;
    selectedGenre: { id: number; name: string };
    setSelectedGenre: (genre: { id: number; name: string }) => void;
}

const Home = ({ movies, searchQuery, selectedGenre, setSelectedGenre }: HomeProps) => {


    const [categories, setCategories] = useState([]);

    const [filterMovies, setFilterMovies] = useState<Movie[]>([]);

    useEffect(() => {
        api.get("/genre/movie/list", {
            params: {
                language: "tr"
            }
        })
            .then((res) => { setCategories(res.data.genres) })
            .catch((err) => { console.log(err) })
    }, [])

    useEffect(() => {
        if (selectedGenre) {
            api.get(`/discover/movie?with_genres=${selectedGenre.id}`, {

            })
                .then((res) => { setFilterMovies(res.data.results) })
                .catch((err) => { console.log(err) })
        }
    }, [selectedGenre])

    // const { data: moviesByGenre, isLoading: isLoadingMoviesByGenre } =
    //     useGetMoviesByGenreQuery(selectedGenre?.id ?? 0);

    const { data: topRatedMovies, isLoading: isLoadingTopRated } =
        useGetTopRatedMoviesQuery({ page: 1 });
    const { data: popularMovies } =
        useGetPopularMoviesQuery({ page: 1 });
    const { data: trendingMovies } =
        useGetTrendingMoviesQuery({ page: 1 });

    const handleFavoriteClick = (movie: Movie) => {
        const savedFavorites: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");

        console.log("fav movie", movie);
        if (savedFavorites.some((fav) => fav.id === movie.id)) {
            toast.info("Bu film zaten favorilere ekli!", {
                position: "top-right",
                autoClose: 3000,
                style: { backgroundColor: "black", color: "red" },
            });
        } else {
            savedFavorites.push(movie);
            localStorage.setItem("favorites", JSON.stringify(savedFavorites));
            toast.success(`${movie.title} favorilere eklendi!`, {
                position: "top-right",
                autoClose: 3000,
                style: { backgroundColor: "black", color: "red" },
            });
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">

            <div className="flex flex-wrap justify-center">
                {
                    categories.map((category: any) => (
                        <button key={category.id} onClick={() => setSelectedGenre(category)} className="bg-red-600 text-white p-2 rounded-lg m-2">{category.name}</button>
                    ))
                }
            </div>

            {isLoadingTopRated ? (
                <Loading />
            ) : (
                <>
                    {
                        selectedGenre.id !== 0 ? (
                            <section className="py-8">
                                <h2 className="text-2xl font-bold text-center mb-14">
                                    {selectedGenre.name}
                                </h2>
                                <MovieList movies={filterMovies} onFavoriteClick={handleFavoriteClick} />
                            </section>
                        ) :
                            movies && searchQuery !== "" ? (
                                <section className="py-8">
                                    <h2 className="text-2xl font-bold text-center mb-14">
                                        Search Results For {searchQuery}
                                    </h2>
                                    <MovieList movies={movies} onFavoriteClick={handleFavoriteClick} />
                                </section>
                            ) : (
                                <>
                                    <section className="py-8">
                                        <h2 className="text-2xl font-bold text-center mb-14">Top Rated</h2>
                                        <MovieList movies={topRatedMovies?.results} onFavoriteClick={handleFavoriteClick} />
                                    </section>

                                    <section className="py-8">
                                        <h2 className="text-2xl font-bold text-center mb-14">Popular</h2>
                                        <MovieList movies={popularMovies?.results} onFavoriteClick={handleFavoriteClick} />
                                    </section>

                                    <section className="py-8 mb-10">
                                        <h2 className="text-2xl font-bold text-center mb-16">Trending</h2>
                                        <MovieList movies={trendingMovies?.results} onFavoriteClick={handleFavoriteClick} />
                                    </section>
                                </>
                            )}
                </>
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={true}
                closeButton={false}
                style={{ backgroundColor: 'black', color: 'red' }}
            />
        </div>
    );
};

export default Home;
