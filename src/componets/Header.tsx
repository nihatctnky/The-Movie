import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-black text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    <Link to="/" className="text-red-600 hover:text-white">
                        <span className="text-red-600">Film</span> <span className="text-white">Listesi</span>
                    </Link>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-red-600 transition-colors duration-300"
                            >
                                Ana Sayfa
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/favorites"
                                className="text-white hover:text-red-600 transition-colors duration-300"
                            >
                                Favoriler
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
