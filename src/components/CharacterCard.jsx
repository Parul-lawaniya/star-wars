// Color mapping for species
const colorMap = {
  human: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    bgDark: 'bg-blue-900',
    bgMedium: 'bg-blue-200',
    bgMediumDark: 'bg-blue-700',
    border: 'border-blue-200',
    borderDark: 'border-blue-700',
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
    text: 'text-gray-800',
    textDark: 'text-gray-200',
  },
};

const getColorClasses = (species) => {
  const speciesKey = species.toLowerCase().replace(/[^a-z0-9]/g, '');
  
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

const CharacterCard = ({ character, onClick }) => {
  const speciesDisplay = 'Human';
  
  const colors = getColorClasses(speciesDisplay);

  // Generate a random image ID based on character name for consistency
  const imageId = character.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
  const imageUrl = `https://picsum.photos/seed/${imageId}/400/300`;

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg shadow-lg cursor-pointer
        transform transition-all duration-300 hover:scale-105 hover:shadow-xl
        ${colors.border} dark:${colors.borderDark}
        bg-gradient-to-br ${colors.bgLight} dark:${colors.bgDark}
      `}
    >
      <div className="aspect-w-16 aspect-h-9 w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className={`p-4 ${colors.bgLight} dark:${colors.bgDark}`}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {character.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${colors.bgMedium} ${colors.text}
            dark:${colors.bgMediumDark} dark:${colors.textDark}
          `}>
            {speciesDisplay}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {character.films?.length || 0} {character.films?.length === 1 ? 'film' : 'films'}
          </span>
        </div>
      </div>
      
      {/* Accent border */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${colors.bg}`}></div>
    </div>
  );
};

export default CharacterCard;
