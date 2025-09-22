export type MovieListItem = {
  id: string;                
  title: string;
  year: string;
  poster: string | null;
};

export type MovieDetails = {
  imdbID: string;
  Title: string;
  Year: string;
  Plot?: string;
  Director?: string;      
  Actors?: string;         
  Genre?: string;          
  Runtime?: string;        
  Poster?: string;         
  Rated?: string;
  Released?: string;
  Language?: string;
  Country?: string;
  Ratings?: { Source: string; Value: string }[];
};