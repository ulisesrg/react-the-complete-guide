import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        setIsloading(true);
        setError(null);

        try {
            const response = await fetch('https://swapi.dev/api/films');
            // simulating a request with error:
            // const response = await fetch('https://swapi.dev/api/film');
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();

            const transformedMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date,
                };
            });
            setMovies(transformedMovies);
        } catch (error) {
            setError(error.message);
        }

        setIsloading(false);
    }, []);

    /*
        As we pass fetchMoviesHandler as a dependency (because in other projects the functions could change)
        and it is a function (and an object too), it will allways check that a previous instance of it 
        is different that the current one, so we use useCallback above
    */
    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    let content = <p>Found no movies.</p>;

    if (movies.length > 0) {
        content = <MoviesList movies={movies} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
