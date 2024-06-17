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

    return (
        <div className="p-4">
            <button className="btn bg-neutral py-0 px-5 mb-2"
                onClick={() => {
                    navigate('/dashboard')
                }}
            >Back</button>

            <div id="body" className="flex flex-col items-center  mt-0 md:p-8 lg:p-12">

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{recipe.title}</h1>
                <div id="image" className="w-full max-w-3xl mb-4 flex justify-center">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-[22rem] h-[22rem] object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div id="buttons" className="w-full max-w-3xl flex justify-between mb-4">
                    <div id="left" className="flex space-x-2">
                        {recipe.area && (
                            <button className="btn btn-neutral">{recipe.area}</button>
                        )}
                    </div>
                    <div id="right">
                        <button className="btn btn-neutral">Add to Favorites</button>
                    </div>
                </div>
                <div id="bottom" className="w-full max-w-3xl text-center">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Instruction</h1>
                    <div id="full-Instruction" className="text-left">
                        <p className="mb-4 text-justify">{recipe.description}</p>
                        <div className="flex justify-center space-x-4">
                            <a href={recipe.youtube}><button className="btn btn-error">Youtube</button></a>
                            <a href={recipe.source}><button className="btn btn-info">Source</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
