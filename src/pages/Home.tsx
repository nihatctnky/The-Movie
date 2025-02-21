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
                setFilteredMovies(data.films); // Başlangıçta tüm filmleri göster
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
                    position: "top-right", // Sağ üst köşe
                    autoClose: 3000, // 3 saniye açık kalsın
                    style: { backgroundColor: "black", color: "red" }, // Arka plan siyah, yazı kırmızı
                });
            } else {
                savedFavorites.push(movie);
                localStorage.setItem("favorites", JSON.stringify(savedFavorites));
                toast.success(`${movie.title} favorilere eklendi!`, {
                    position: "top-right", // Sağ üst köşe
                    autoClose: 3000, // 3 saniye açık kalsın
                    style: { backgroundColor: "black", color: "red" }, // Arka plan siyah, yazı kırmızı
                });
            }
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Header onSearch={handleSearch} /> {/* Arama fonksiyonunu Header bileşenine geçirdik */}
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold">
                    <span className="text-red-600">Film</span>
                    <span className="text-white"> Listesi</span>
                </h1>
            </div>

            {loading ? (
                <Loading /> // Yükleniyor componentini göster
            ) : (
                <MovieList movies={filteredMovies} onFavoriteClick={handleFavoriteClick} />
            )}

            {/* ToastContainer: Toastify uyarılarını göstermek için */}
            <ToastContainer
                position="top-right" // Sağ üst köşe
                autoClose={3000} // 3 saniye sonra kaybolacak
                hideProgressBar={true} // İlerleme çubuğunu gizle
                newestOnTop={true} // En yeni toast, üstte gözüksün
                closeButton={false} // Kapatma butonunu kaldır
                style={{ backgroundColor: 'black', color: 'red' }} // Arka plan siyah, yazı kırmızı
            />
        </div>
    );
};

export default Home;
