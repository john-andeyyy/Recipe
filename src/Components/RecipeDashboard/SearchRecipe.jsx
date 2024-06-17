import React from 'react'
import RecipeList from './RecipeList'

export default function SearchRecipe() {
    return (
        <div id="body">
            <div id="search" className='flex justify-center w-full'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <h1 className="text-xl font-semibold">Find Recipe</h1>
                    </div>
                    <input type="search" placeholder="Recepe keyword" className="input input-bordered w-full max-w-xs" />
                </label>

                <div className='flex flex-col items-center px-5  min-h-screen pt-'>
                    <div className='w-full max-w-7xl'>
                        <div className="flex flex-wrap justify-center gap-4 py-5">
                            <RecipeList/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
