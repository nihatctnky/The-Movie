import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "./../components/Loading";
import MovieList from "./../components/MovieList";

interface Movie {
    id: number;
    title: string;
    description: string;
    year: number;
    image: string;
    rating: number;
    viewCount: number;
    isTrending: boolean;
}

const Home = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        fetch("/movies.json")
            .then((response) => response.json())
            .then((data) => {
                const films: Movie[] = data.films;
                setMovies(films);


                const topRated = films.filter((movie) => movie.rating >= 8.7);
                const popular = films.filter((movie) => movie.viewCount > 10000);
                const trending = films.filter((movie) => movie.isTrending);


                const usedMovies: Set<number> = new Set();

                // **Top Rated** kategorisi için 12 film al
                const topRatedFiltered = topRated.filter((movie) => {
                    if (usedMovies.has(movie.id)) return false;
                    usedMovies.add(movie.id);
                    return true;
                }).slice(0, 12);

                // **Popular** kategorisi için 5 film al
                const popularFiltered = popular.filter((movie) => {
                    if (usedMovies.has(movie.id)) return false;
                    usedMovies.add(movie.id);
                    return true;
                }).slice(0, 5);

                // **Trending** kategorisi için 5 film al
                const trendingFiltered = trending.filter((movie) => {
                    if (usedMovies.has(movie.id)) return false;
                    usedMovies.add(movie.id);
                    return true;
                }).slice(0, 6);
                setTopRatedMovies(topRatedFiltered);
                setPopularMovies(popularFiltered);
                setTrendingMovies(trendingFiltered);

                setLoading(false);
            })
            .catch((error) => {
                console.error("Veri yüklenirken hata oluştu: ", error);
                setLoading(false);
            });
    }, []);

    const handleFavoriteClick = (movieId: number) => {
        const savedFavorites: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");

        const movie = movies.find((movie) => movie.id === movieId);

        if (!movie) {
            toast.error("Film bulunamadı!", {
                position: "top-right",
                autoClose: 3000,
                style: { backgroundColor: "black", color: "red" },
            });
            return;
        }

        if (savedFavorites.some((fav) => fav.id === movieId)) {
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
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold">
                    <span className="text-red-600">Film</span>
                    <span className="text-white"> Listesi</span>
                </h1>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <>
                    <section className="py-8">
                        <h2 className="text-2xl font-bold text-center mb-14">Top Rated</h2>
                        <MovieList movies={topRatedMovies} onFavoriteClick={handleFavoriteClick} />
                    </section>

                    <section className="py-8">
                        <h2 className="text-2xl font-bold text-center mb-14">Popular</h2>
                        <MovieList movies={popularMovies} onFavoriteClick={handleFavoriteClick} />
                    </section>

                    <section className="py-8 mb-10">
                        <h2 className="text-2xl font-bold text-center mb-16">Trending</h2>
                        <MovieList movies={trendingMovies} onFavoriteClick={handleFavoriteClick} />
                    </section>
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
