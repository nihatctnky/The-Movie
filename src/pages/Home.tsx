import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./../componets/Header";
import Loading from "./../componets/Loading";
import MovieList from "./../componets/MovieList";

interface Movie {
    id: number;
    title: string;
    description: string;
    year: number;
    image: string;
}

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/movies.json")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.films);
                setFilteredMovies(data.films);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Veri yüklenirken hata oluştu: ", error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (query: string) => {
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    const handleFavoriteClick = (movieId: number) => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const movie = movies.find((movie) => movie.id === movieId);

        if (movie) {
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
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Header onSearch={handleSearch} />
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold">
                    <span className="text-red-600">Film</span>
                    <span className="text-white"> Listesi</span>
                </h1>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <MovieList movies={filteredMovies} onFavoriteClick={handleFavoriteClick} />
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
