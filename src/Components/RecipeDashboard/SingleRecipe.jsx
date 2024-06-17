import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingleRecipe({ recipe }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/RecipeSingleView', { state: { id: recipe.id } });
    };

        return (
            <>
                <div className="p-3 cursor-pointer" onClick={handleClick} >
                    <div className="card w-56 h-80 bg-base-100 shadow-xl dark:bg-base-900">
                        {/* <h1>{recipe.id}</h1> */}
                        <figure className="h-50 w-50 flex items-center justify-center">
                            <img src={recipe.image} alt={recipe.title} className="max-h-full max-w-full" />
                        </figure>

                        <div className="card-body p-4">
                            <div className="max-h-40 overflow-hidden">
                                <h2 className="card-title text-lg dark:text-white">{recipe.title}</h2>
                                <p className="text-sm text-base-content dark:text-base-100">{recipe.description}</p>
                                <div className="card-actions justify-end mt-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
