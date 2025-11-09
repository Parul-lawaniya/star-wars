import { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard';
import CharacterDetails from './components/CharacterDetails';
import Login from './components/Login';
import { fetchCharacters } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in (from localStorage)
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const pageSize = 10;

  // Only load characters if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCharacters(currentPage, searchQuery);
    } else {
      setLoading(false);
    }
  }, [currentPage, searchQuery, isAuthenticated]);

  const loadCharacters = async (page, query = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCharacters(page, query);
      setCharacters(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
      setTotalCount(data.count);
    } catch (err) {
      setError('Failed to load characters. Please try again later.');
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    // Reset app state
    setCharacters([]);
    setCurrentPage(1);
    setSearchQuery('');
    setSearchInput('');
    setSelectedCharacter(null);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && nextPage) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'prev' && previousPage) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 dark:bg-gray-950 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold">
                Star Wars Characters
              </h1>
              <p className="text-gray-300 mt-2">
                Explore the galaxy of characters
              </p>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center gap-2 whitespace-nowrap"
              title="Logout"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  placeholder="Search characters by name..."
                  className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </form>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {totalCount > 0 ? (
                  <>
                    Found <span className="font-semibold text-blue-600 dark:text-blue-400">{totalCount}</span> result{totalCount !== 1 ? 's' : ''} for "{searchQuery}"
                  </>
                ) : (
                  <>
                    No results found for "{searchQuery}"
                  </>
                )}
              </p>
              <button
                onClick={handleClearSearch}
                className="mt-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 text-xl">
                Loading characters...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800 dark:text-red-200 font-semibold">
                {error}
              </p>
            </div>
            <button
              onClick={() => loadCharacters(currentPage, searchQuery)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Characters Grid */}
        {!loading && !error && characters.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {characters.map((character) => (
                <CharacterCard
                  key={character.url}
                  character={character}
                  onClick={() => handleCharacterClick(character)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages} ({totalCount} total characters)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange('prev')}
                  disabled={!previousPage}
                  className={`
                    px-4 py-2 rounded-lg font-semibold transition-colors
                    ${
                      !previousPage
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                    }
                  `}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange('next')}
                  disabled={!nextPage}
                  className={`
                    px-4 py-2 rounded-lg font-semibold transition-colors
                    ${
                      !nextPage
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                    }
                  `}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && characters.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              No characters found.
            </p>
          </div>
        )}
      </main>

      {/* Character Details Modal */}
      {selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
