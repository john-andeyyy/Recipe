import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RecipeSingleView() {
    const location = useLocation();
    const { id } = location.state;
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

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

        if (id) {
            fetchRecipeById();
        }
    }, [id]);

    if (!recipe) {
        return (
            <div className="flex justify-center w-full">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    const backbutton = () =>{
        const back = localStorage.getItem('back')

        navigate(back)

    }

    return (
        <div className="p-4">
            <button className="btn bg-neutral py-0 px-5 mb-2"
                onClick={() => {
                   backbutton()
                }}
            >Back</button>

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
                        <button className="btn btn-neutral">Add to Favorites</button>
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
