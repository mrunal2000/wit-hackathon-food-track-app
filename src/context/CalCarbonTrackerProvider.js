import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextCalCarbonTrackerProvider } from './CalCarbonTrackerContext';

const getCalLabel = count => `${count || 0}`;

const getCarbonScore = count => {
    if(count >= 0 && count <  2) {
        return 'Low';
    } 
    else if(count >= 2 && count <  4) {
        return 'High';
    }
    else {
        return 'Very High';
    }
};

const addDishToMealContext = (mealType, dish, contextValue) => {
    const newChangedValue = {
        ...contextValue,
        cal: {
            ...contextValue.cal,
            current: contextValue.cal.current + dish.cal,
            currentLabel: `${contextValue.cal.current + dish.cal}`
        },
        carbon: {
            ...contextValue.carbon,
            current: contextValue.carbon.current + dish.carbon,
            currentLabel: `${getCarbonScore(contextValue.carbon.current + dish.carbon)}`
        },
        meal: {
            ...contextValue.meal,
            [mealType]: {
                ...contextValue.meal[mealType],
                dishes: [...contextValue.meal[mealType].dishes, dish.id],
                dishesInfo: {
                    ...contextValue.meal[mealType].dishesInfo,
                    [dish.id]: {
                        ...dish
                    }
                }
            }
        }
    };
    const newContextValue = {
        ...contextValue,
        ...newChangedValue
    };
    return newContextValue;
};

const deleteDishToMealContext = (mealType, dish, contextValue) => {
    const dishIndex = contextValue.meal[mealType].dishes.indexOf(dish.id);

    contextValue.meal[mealType].dishes.splice(dishIndex, 1);

    const { [dish.id]: removedDish, ...restDishesInfo} = contextValue.meal[mealType].dishesInfo;
    const newChangedValue = {
        ...contextValue,
        cal: {
            ...contextValue.cal,
            current: contextValue.cal.current - dish.cal,
            currentLabel: `${contextValue.cal.current - dish.cal}`
        },
        carbon: {
            ...contextValue.carbon,
            current: contextValue.carbon.current - dish.carbon,
            currentLabel: `${getCarbonScore(contextValue.carbon.current - dish.carbon)}`
        },
        meal: {
            ...contextValue.meal,
            [mealType]: {
                ...contextValue.meal[mealType],
                dishes: [...contextValue.meal[mealType].dishes],
                dishesInfo: {
                    ...restDishesInfo
                }
            }
        }
    };
    const newContextValue = {
        ...contextValue,
        ...newChangedValue
    };

    return newContextValue;
}

export const defaultObject = {
    cal: {
        current: 0,
        currentLabel: '0',
        target: 2000,
        targetLabel: '2000',
        unit: 'Cal'
    },
    carbon: {
        current: 0,
        currentLabel: getCarbonScore(0),
        target: 6,
        targetLabel: getCarbonScore(6)
    },
    meal: {
        'breakfast': {
            id: 'breakfast',
            name: 'Breakfast',
            dishes: [],
            dishesInfo: {}
        },
        'lunch': {
            id: 'lunch',
            name: 'Lunch',
            dishes: [],
            dishesInfo: {}
        },
        'dinner': {
            id: 'dinner',
            name: 'Dinner',
            dishes: [],
            dishesInfo: {}
        }
    },
    dishes : {
        list: [],
        info: {}
    },
    // dishes: {
    //     list: DISH_LIST,
    //     info: DISH_TYPE
    // },
    getCarbonScore,
    getCalLabel
}

const CalCarbonTrackerProvider = ({children = null}) => {
    const [contextValue, setContextValue] = useState(defaultObject);

    useEffect(() => {
        fetch('https://food-plan-tracker-boring-topi-ht.eu-gb.mybluemix.net/GetStartedJava/api/items')
            .then(res => res.json())
            .then(data => {
                setContextValue({
                    ...contextValue,
                    dishes : {
                        list: data.map(item => item.id),
                        info: data.reduce((acc, item) => {
                            acc[item.id] = {
                                ...item,
                                cal: item.calorie,
                                carbon: item.carbonFootPrint
                            };
                            return acc;
                        }, {})
                    }
                })
            });
    }, []);

    const addDishToMeal = useCallback((mealType, dish) => {
        setContextValue(addDishToMealContext(mealType, dish, contextValue));
    }, [contextValue]);

    const deleteDishToMeal = useCallback((mealType, dish) => {
        setContextValue(deleteDishToMealContext(mealType, dish, contextValue));
    }, [contextValue]);

    contextValue.addDishToMeal = addDishToMeal;
    contextValue.deleteDishToMeal = deleteDishToMeal;

    const contextValueWithFunctions = useMemo(() => {
        return {
            ...contextValue,
            addDishToMeal,
            deleteDishToMeal
        }
    }, [contextValue, addDishToMeal, deleteDishToMeal])
    
    return (
        <ContextCalCarbonTrackerProvider value={contextValueWithFunctions}>
            {Number.isNaN(children) ? null : children}
        </ContextCalCarbonTrackerProvider>
    )
};

export default CalCarbonTrackerProvider;




