import { FaHome } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { FC } from "react";

interface HeaderProps {
    onSearch: (query: string) => void;
}

const Header: FC<HeaderProps> = ({ onSearch }) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <header className="p-3 flex justify-between items-center gap-5 bg-black">
            <div className="p-2 cursor-pointer hover:opacity-80">
                <Link to="/">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold flex items-center gap-1">
                        <span className="text-red-600">Film</span> <span className="text-white">Listesi</span>
                    </h1>
                </Link>
            </div>

            <div className="flex items-center gap-2 w-full md:w-3/4 justify-center p-2">
                <input
                    type="text"
                    placeholder="Search Movies..."
                    className="w-full md:w-3/4 border rounded-md px-3 py-2 outline-none text-black shadow-lg shadow-red-600"
                    onChange={handleSearch}
                />
                <CiSearch size={28} color="white" />
            </div>

            <div className="flex gap-6 items-center mx-auto">
                <div className="flex gap-6 items-center text-white">
                    <Link to="/" className="hover:text-red-500">
                        <FaHome size={28} />
                    </Link>
                    <Link to="/favorites" className="hover:text-red-500">
                        <MdFavoriteBorder size={28} />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
