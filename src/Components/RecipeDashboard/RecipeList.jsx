import React from 'react';
import SingleRecipe from './SingleRecipe';

export default function RecipeList({ recipes, loading }) {
    return (
        <div className="flex flex-wrap justify-center gap-4 w-full">
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                recipes.map((recipe, index) => (
                    <SingleRecipe key={index} recipe={recipe} />
                ))
            )}
        </div>
    );
}
