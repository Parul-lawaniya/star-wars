import { useState, useEffect } from 'react';
import { fetchCompleteCharacterDetails, formatDate } from '../services/api';

// Color mapping for species (same as CharacterCard)
const colorMap = {
  human: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    bgDark: 'bg-blue-900',
    bgMedium: 'bg-blue-200',
    bgMediumDark: 'bg-blue-700',
    border: 'border-blue-200',
    borderDark: 'border-blue-700',
    borderAccent: 'border-blue-300',
    borderAccentDark: 'border-blue-700',
    text: 'text-blue-800',
    textDark: 'text-blue-200',
  },
  droid: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-50',
    bgDark: 'bg-purple-900',
    bgMedium: 'bg-purple-200',
    bgMediumDark: 'bg-purple-700',
    border: 'border-purple-200',
    borderDark: 'border-purple-700',
    borderAccent: 'border-purple-300',
    borderAccentDark: 'border-purple-700',
    text: 'text-purple-800',
    textDark: 'text-purple-200',
  },
  wookiee: {
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    bgDark: 'bg-amber-900',
    bgMedium: 'bg-amber-200',
    bgMediumDark: 'bg-amber-700',
    border: 'border-amber-200',
    borderDark: 'border-amber-700',
    borderAccent: 'border-amber-300',
    borderAccentDark: 'border-amber-700',
    text: 'text-amber-800',
    textDark: 'text-amber-200',
  },
  twilek: {
    bg: 'bg-pink-500',
    bgLight: 'bg-pink-50',
    bgDark: 'bg-pink-900',
    bgMedium: 'bg-pink-200',
    bgMediumDark: 'bg-pink-700',
    border: 'border-pink-200',
    borderDark: 'border-pink-700',
    borderAccent: 'border-pink-300',
    borderAccentDark: 'border-pink-700',
    text: 'text-pink-800',
    textDark: 'text-pink-200',
  },
  hutt: {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    bgDark: 'bg-emerald-900',
    bgMedium: 'bg-emerald-200',
    bgMediumDark: 'bg-emerald-700',
    border: 'border-emerald-200',
    borderDark: 'border-emerald-700',
    borderAccent: 'border-emerald-300',
    borderAccentDark: 'border-emerald-700',
    text: 'text-emerald-800',
    textDark: 'text-emerald-200',
  },
  yodaspecies: {
    bg: 'bg-lime-500',
    bgLight: 'bg-lime-50',
    bgDark: 'bg-lime-900',
    bgMedium: 'bg-lime-200',
    bgMediumDark: 'bg-lime-700',
    border: 'border-lime-200',
    borderDark: 'border-lime-700',
    borderAccent: 'border-lime-300',
    borderAccentDark: 'border-lime-700',
    text: 'text-lime-800',
    textDark: 'text-lime-200',
  },
  trandoshan: {
    bg: 'bg-red-500',
    bgLight: 'bg-red-50',
    bgDark: 'bg-red-900',
    bgMedium: 'bg-red-200',
    bgMediumDark: 'bg-red-700',
    border: 'border-red-200',
    borderDark: 'border-red-700',
    borderAccent: 'border-red-300',
    borderAccentDark: 'border-red-700',
    text: 'text-red-800',
    textDark: 'text-red-200',
  },
  moncalamari: {
    bg: 'bg-cyan-500',
    bgLight: 'bg-cyan-50',
    bgDark: 'bg-cyan-900',
    bgMedium: 'bg-cyan-200',
    bgMediumDark: 'bg-cyan-700',
    border: 'border-cyan-200',
    borderDark: 'border-cyan-700',
    borderAccent: 'border-cyan-300',
    borderAccentDark: 'border-cyan-700',
    text: 'text-cyan-800',
    textDark: 'text-cyan-200',
  },
  rodian: {
    bg: 'bg-green-500',
    bgLight: 'bg-green-50',
    bgDark: 'bg-green-900',
    bgMedium: 'bg-green-200',
    bgMediumDark: 'bg-green-700',
    border: 'border-green-200',
    borderDark: 'border-green-700',
    borderAccent: 'border-green-300',
    borderAccentDark: 'border-green-700',
    text: 'text-green-800',
    textDark: 'text-green-200',
  },
  default: {
    bg: 'bg-gray-500',
    bgLight: 'bg-gray-50',
    bgDark: 'bg-gray-900',
    bgMedium: 'bg-gray-200',
    bgMediumDark: 'bg-gray-700',
    border: 'border-gray-200',
    borderDark: 'border-gray-700',
    borderAccent: 'border-gray-300',
    borderAccentDark: 'border-gray-700',
    text: 'text-gray-800',
    textDark: 'text-gray-200',
  },
};

const getColorClasses = (species) => {
  const speciesKey = species?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
  
  // Handle special cases
  if (speciesKey.includes('yoda') || speciesKey.includes('yodas')) {
    return colorMap.yodaspecies;
  }
  if (speciesKey.includes('human')) {
    return colorMap.human;
  }
  if (speciesKey.includes('droid')) {
    return colorMap.droid;
  }
  if (speciesKey.includes('wookiee')) {
    return colorMap.wookiee;
  }
  if (speciesKey.includes('twilek')) {
    return colorMap.twilek;
  }
  if (speciesKey.includes('hutt')) {
    return colorMap.hutt;
  }
  if (speciesKey.includes('trandoshan')) {
    return colorMap.trandoshan;
  }
  if (speciesKey.includes('moncalamari')) {
    return colorMap.moncalamari;
  }
  if (speciesKey.includes('rodian')) {
    return colorMap.rodian;
  }
  
  return colorMap.default;
};

const CharacterDetails = ({ character, onClose }) => {
  const [completeCharacter, setCompleteCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (character && character.url) {
      loadCharacterDetails(character.url);
    }
  }, [character]);

  const loadCharacterDetails = async (characterUrl) => {
    setLoading(true);
    setError(null);
    try {
      const details = await fetchCompleteCharacterDetails(characterUrl);
      setCompleteCharacter(details);
    } catch (err) {
      setError('Failed to load character details. Please try again.');
      console.error('Error fetching character details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!character) return null;

  const colors = getColorClasses(completeCharacter?.species || 'Unknown');
  
  // Generate a random image ID based on character name for consistency
  const imageId = character.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
  const imageUrl = `https://picsum.photos/seed/${imageId}/600/400`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className={`
          relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl
          max-w-3xl w-full max-h-[95vh] overflow-hidden
          border-2 ${colors.borderAccent} dark:${colors.borderAccentDark}
          transform transition-all duration-300 ease-out
          flex flex-col
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200 dark:border-gray-700"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header Image */}
        <div className="relative h-80 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={imageUrl}
            alt={character.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
          {/* Accent Bar */}
          <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${colors.bg} shadow-lg`}></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 text-xl">
                  Loading character details...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-5 bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl mb-6 shadow-sm">
              <p className="text-red-800 dark:text-red-200 font-semibold mb-3">{error}</p>
              <button
                onClick={() => loadCharacterDetails(character.url)}
                className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Character Details */}
          {!loading && !error && completeCharacter && (
            <>
              {/* Name Header */}
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-3 tracking-tight">
                  {completeCharacter.name}
                </h2>
                {/* Species Badge */}
                <span className={`
                  inline-block px-5 py-2.5 rounded-full text-sm font-bold
                  ${colors.bgMedium} ${colors.text}
                  dark:${colors.bgMediumDark} dark:${colors.textDark}
                  shadow-sm
                `}>
                  {completeCharacter.species || 'Unknown'}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <DetailItem label="Height" value={`${completeCharacter.height} cm`} colors={colors} />
                <DetailItem label="Mass" value={`${completeCharacter.mass} kg`} colors={colors} />
                <DetailItem label="Birth Year" value={completeCharacter.birth_year} colors={colors} />
                <DetailItem label="Gender" value={completeCharacter.gender} colors={colors} />
                <DetailItem label="Eye Color" value={completeCharacter.eye_color} colors={colors} />
                <DetailItem label="Hair Color" value={completeCharacter.hair_color} colors={colors} />
                <DetailItem label="Skin Color" value={completeCharacter.skin_color} colors={colors} />
                <DetailItem label="Films" value={`${completeCharacter.films?.length || 0} ${completeCharacter.films?.length === 1 ? 'film' : 'films'}`} colors={colors} />
                <DetailItem label="Date Added" value={formatDate(completeCharacter.created)} />
              </div>

              {/* Homeworld Section */}
              {completeCharacter.homeworld && (
                <div className={`
                  mb-8 p-6 rounded-xl border-2 shadow-md
                  ${colors.bgLight} dark:${colors.bgDark}
                  ${colors.border} dark:${colors.borderDark}
                  bg-opacity-50 dark:bg-opacity-30
                `}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-5 flex items-center gap-2">
                    Homeworld
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem label="Name" value={completeCharacter.homeworld.name} colors={colors} />
                    <DetailItem label="Population" value={completeCharacter.homeworld.population} colors={colors} />
                    <DetailItem label="Terrain" value={completeCharacter.homeworld.terrain} colors={colors} />
                    <DetailItem label="Climate" value={completeCharacter.homeworld.climate} colors={colors} />
                  </div>
                </div>
              )}

              {/* Films List */}
              {completeCharacter.films && completeCharacter.films.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                    Films Appeared In
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {completeCharacter.films.map((film, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                      >
                        {film}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value}) => (
  <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-semibold">{label}</p>
    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{value || 'N/A'}</p>
  </div>
);

export default CharacterDetails;
