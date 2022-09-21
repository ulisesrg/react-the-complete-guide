import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // true because in this app it will be loading from the beginning
    const [httpError, setHttpError] = useState(); // undefined in this case

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                'https://react-complete-guide-htt-c56f1-default-rtdb.firebaseio.com/meals.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        /* 
            This won't work because fetchMeals is an async function that returns a promise.
            We could await fetchMeals but that will lead us to make the anonymous function (first argument)
            of useEffect an async function and we are not allowed to do that (it would return another promise).
            So we use .then and .catch as regular promises
        */
        // try {
        //     fetchMeals();
        // } catch (error) {
        //     setIsLoading(true);
        //     setHttpError(error.message);
        // }

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return <p className={classes.MealsLoading}>Loading...</p>;
    }

    if (httpError) {
        return <p className={classes.MealsError}>{httpError}</p>;
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            // we could pass the whole meal as meal={meal}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
