import React, { useCallback, useMemo, useState } from 'react';
import { ContextCalCarbonTrackerProvider } from './CalCarbonTrackerContext';

const DISH_LIST = ['bread', 'milk', 'eggs'];
const DISH_TYPE = {
    'bread': {
        id: 'bread',
        name: 'Bread', 
        cal: 200,
        carbon: 10
    },
    'milk': {
        id: 'milk',
        name: 'Milk',
        cal: 400,
        carbon: 30
    },
    'eggs': {
        id: 'eggs',
        name: 'Eggs',
        cal: 500,
        carbon: 60
    }
}

const getCalLabel = count => `${count || 0}`;

const getCarbonScore = count => {
    if(count >= 0 && count <  50) {
        return 'Low';
    } 
    else if(count >= 50 && count <=  100) {
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
        current: 200,
        currentLabel: '200',
        target: 2000,
        targetLabel: '2000',
        unit: 'Cal'
    },
    carbon: {
        current: 10,
        currentLabel: getCarbonScore(10),
        target: 100,
        targetLabel: getCarbonScore(100)
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
    dishes: {
        list: DISH_LIST,
        info: DISH_TYPE
    },
    getCarbonScore,
    getCalLabel
}

const CalCarbonTrackerProvider = ({children = null}) => {
    const [contextValue, setContextValue] = useState(defaultObject);

    const addDishToMeal = useCallback((mealType, dish) => {
        setContextValue(addDishToMealContext(mealType, dish, contextValue));
    }, [contextValue]);

    const deleteDishToMeal = useCallback((mealType, dish) => {
        setContextValue(deleteDishToMealContext(mealType, dish, contextValue));
    }, [contextValue]);

    const contextValueWithFunctions = useMemo(() => {
        return {
            ...contextValue,
            addDishToMeal,
            deleteDishToMeal
        }
    }, [contextValue, addDishToMeal, deleteDishToMeal])
    
    console.log('children::: ', children);
    return (
        <ContextCalCarbonTrackerProvider value={contextValueWithFunctions}>
            {Number.isNaN(children) ? null : children}
        </ContextCalCarbonTrackerProvider>
    )
};

export default CalCarbonTrackerProvider;




