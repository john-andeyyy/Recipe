import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRandomRecipe = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            if (!response.ok) {
                throw new Error('Failed to fetch random recipe');
            }
            const data = await response.json();
            const newRecipe = {
                id: data.meals[0].idMeal,
                image: data.meals[0].strMealThumb,
                title: data.meals[0].strMeal,
            };
            return newRecipe;
        } catch (error) {
            console.error('Error fetching recipe:', error);
            return null;
        }
    };

    const fetchInitialRecipes = async () => {
        setLoading(true);
        const recipePromises = [];
        for (let i = 0; i < 8; i++) {
            recipePromises.push(fetchRandomRecipe());
        }

        try {
            const fetchedRecipes = await Promise.all(recipePromises);
            const filteredRecipes = fetchedRecipes.filter(recipe => recipe !== null);
            setRecipes(filteredRecipes);
        } catch (error) {
            console.error('Error fetching initial recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialRecipes();
    }, []);

    return (
        <div className='flex flex-col items-center px-5 min-h-screen pt-'>
            <div className='w-full max-w-7xl'>
                <div className="flex flex-wrap justify-center gap-4 py-5">
                    {loading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <RecipeList recipes={recipes} loading={loading} />
                    )}
                </div>
            </div>
        </div>
    );
}
