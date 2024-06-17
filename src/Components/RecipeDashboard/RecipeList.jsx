import React, { useEffect } from 'react';
import SingleRecipe from './SingleRecipe';

export default function RecipeList({ recipes, loading, fetchInitialRecipes }) {

    useEffect(() => {
        fetchInitialRecipes();
    }, [fetchInitialRecipes]);

    return (
        <div className="flex flex-wrap justify-center gap-4 w-full">
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                    recipes.map((recipe) => (
                        <SingleRecipe key={recipe.id} recipe={recipe} />
                    ))

            )}
        </div>
    );
}
