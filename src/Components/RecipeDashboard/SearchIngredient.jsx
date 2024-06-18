import React, { useState, useEffect } from 'react';
import ViewCategory from './ViewCategory';
import { useNavigate } from 'react-router-dom';

export default function SearchIngredient() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            if (data.meals) {
                const newCategories = data.meals.map(meal => ({
                    id: meal.idCategory,
                    name: meal.strCategory,
                }));
                setCategories(newCategories);

                
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryClick = (name) => {
        // setSelectedCategory(category);
        navigate('/ViewCategory', { state: { name: name } });
    };

    return (
        <div id="body" className="flex flex-col items-center px-5 min-h-screen pt-5">
            <div className="w-full max-w-7xl">
                {error && (
                    <div className="text-center text-red-500">{error}</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                    {loading ? (
                        <div className="col-span-full text-center">Loading...</div>
                    ) : (
                        categories.map((category, index) => (
                            <button
                                key={index}
                                className="btn btn-secondary"
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                {category.name}
                            </button>
                        ))
                    )}
                </div>
                {selectedCategory && <ViewCategory category={selectedCategory} />}
            </div>
        </div>
    );
}
