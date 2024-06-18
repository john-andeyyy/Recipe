import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RecipeSingleView() {
    const location = useLocation();
    const { id } = location.state;
    const [recipe, setRecipe] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    const localid = localStorage.getItem('localId');
    const dburl = import.meta.env.VITE_FIREBASE_DB_URL;
    const favoritesURL = `${dburl}/Recipe/${localid}/my-favorite.json`;

    useEffect(() => {
        const fetchRecipeById = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                const fetchedRecipe = {
                    id: data.meals[0].idMeal,
                    image: data.meals[0].strMealThumb,
                    title: data.meals[0].strMeal,
                    description: data.meals[0].strInstructions,
                    youtube: data.meals[0].strYoutube,
                    source: data.meals[0].strSource,
                    area: data.meals[0].strArea
                };
                setRecipe(fetchedRecipe);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await fetch(favoritesURL);
                if (!response.ok) {
                    throw new Error('Failed to fetch favorites');
                }
                const data = await response.json();

                const favoritesArray = data ? Object.entries(data).map(function (entry) {
                    const key = entry[0];
                    const value = entry[1];
                    return { key: key, ...value };
                }) : [];
                
                setFavorites(favoritesArray);
                setIsFavorite(favoritesArray.some(fav => fav.id === id));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        if (id) {
            fetchRecipeById();
            fetchFavorites();
        }
    }, [id, favoritesURL]);

    if (!recipe) {
        return (
            <div className="flex justify-center w-full">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const backbutton = function () {
        const back = localStorage.getItem('back');
        navigate(back);
    };

    const addFavorites = function (recipe) {
        const userData = {
            id: recipe.id,
            title: recipe.title,
        };
        try {
            fetch(favoritesURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Data successfully added:", data);
                    setFavorites(prevFavorites => [...prevFavorites, { key: data.name, ...userData }]);
                    setIsFavorite(true);
                })
                .catch(error => {
                    console.error("Error adding data:", error);
                });
        } catch (error) {
            console.error("Error adding data:", error);
        }
    };

    const removeFavorites = function (idToRemove) {
        const favoriteToRemove = favorites.find(function (fav) {
            return fav.id === idToRemove;
        });

        try {
            fetch(`${dburl}/Recipe/${localid}/my-favorite/${favoriteToRemove.key}.json`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    setFavorites(prevFavorites => {
                        return prevFavorites.filter(function (fav) {
                            return fav.id !== idToRemove;
                        });
                    });
                    setIsFavorite(false);
                })
                .catch(error => {
                    console.error("Error removing data:", error);
                });
        } catch (error) {
            console.error("Error removing data:", error);
        }
    };

    return (
        <div className="p-4">
            <button className="btn bg-neutral py-0 px-5 mb-2" onClick={backbutton}>Back</button>
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{recipe.title}</h1>
                <div className="w-full max-w-3xl mb-4 flex justify-center">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-[22rem] h-[22rem] object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className="w-full max-w-3xl flex justify-between mb-4">
                    {recipe.area && (
                        <div className="flex space-x-2">
                            <button className="btn btn-neutral">{recipe.area}</button>
                        </div>
                    )}
                    <div>
                        {isFavorite ? (
                            <button className="btn btn-neutral" onClick={() => removeFavorites(recipe.id)}>
                                Remove from Favorites
                            </button>
                        ) : (
                            <button className="btn btn-neutral" onClick={() => addFavorites(recipe)}>
                                Add to Favorites
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-full max-w-3xl text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Instructions</h2>
                    <p className="mb-4 text-justify">{recipe.description}</p>
                    <div className="flex justify-center space-x-4 mb-4">
                        {recipe.youtube && (
                            <a href={recipe.youtube} target="_blank" rel="noopener noreferrer">
                                <button className="btn btn-error">Watch on YouTube</button>
                            </a>
                        )}
                        {recipe.source && (
                            <a href={recipe.source} target="_blank" rel="noopener noreferrer">
                                <button className="btn btn-info">View Source</button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
