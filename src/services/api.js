// SWAPI API service
const BASE_URL = 'https://swapi.dev/api';

// Simple helper to fetch any URL
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  return response.json();
};

// Fetch characters with pagination and search
export const fetchCharacters = async (page = 1, searchQuery = '') => {
  try {
    const query = searchQuery?.trim() ? `search=${encodeURIComponent(searchQuery.trim())}&` : '';
    const url = `${BASE_URL}/people/?${query}page=${page}`;
    const data = await fetchData(url);
    
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

// Fetch complete character details with all related data
export const fetchCompleteCharacterDetails = async (characterUrl) => {
  try {
    // Fetch character
    const character = await fetchData(characterUrl);
    
    // Fetch homeworld if exists
    const homeworld = character.homeworld 
      ? await fetchData(character.homeworld)
      : null;

    // Fetch species (empty array means Human)
    let species = 'Human';
    if (character.species?.length > 0) {
      const speciesData = await fetchData(character.species[0]);
      species = speciesData.name;
    }
    
    // Fetch all films
    const films = await Promise.all(
      character.films.map(url => fetchData(url))
    );
    
    // Return combined data
    return {
      ...character,
      homeworld: homeworld 
        ? {
            name: homeworld.name,
            terrain: homeworld.terrain,
            climate: homeworld.climate,
            population: homeworld.population,
          }
        : {
            name: 'Unknown',
            terrain: 'Unknown',
            climate: 'Unknown',
            population: 'Unknown',
          },
      species: species,
      films: films.map(film => film.title),
    };
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error;
  }
};

// Format date as dd-MM-yyyy
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
