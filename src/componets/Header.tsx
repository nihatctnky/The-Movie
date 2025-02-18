

const Header = () => {
    return (
        <header className="bg-gray-700 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">The Movie App</h1>

                <ul className="flex space-x-6">
                    <li><a href="/" className="hover:text-yellow-500">Home</a></li>
                    <li><a href="/favorites" className="hover:text-yellow-500">Favorites</a></li>
                </ul>

            </div>
        </header>
    );
};

export default Header;
