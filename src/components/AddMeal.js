import React, { useCallback, useMemo, useState } from 'react';
import Overlay from './Overlay';

const AddMeal = ({ open, setIsOpened, mealType = 'breakfast', calCarbonTracker = {}}) => {
    const [searchedQuery, setSearchedQuery] = useState('');

    const onDone = useCallback(() => {
        setIsOpened(false);
    }, []);
    
    const addDish = useCallback(dish => () => {
        calCarbonTracker.addDishToMeal(mealType, dish)
    }, [calCarbonTracker, mealType]);

    const deleteDish = useCallback(dish => () => {
        calCarbonTracker.deleteDishToMeal(mealType, dish)
    }, [calCarbonTracker, mealType]);

    const onSearchInputChange = useCallback( e => {
        setSearchedQuery(e.target.value);
    }, []);

    const dishesList = useMemo(() => {
        if(!searchedQuery){
            return calCarbonTracker.dishes.list;
        }
        const { list, info } = calCarbonTracker.dishes;
        return list.filter( id => {
            const dishInfo = info[id];
            return (dishInfo.name || dishInfo.id).includes(searchedQuery);
        })
    }, [calCarbonTracker, searchedQuery])
    
    return <Overlay isOpened={ open }>
        <div className="addMealContainer">
            <div className="mealName">Add {(calCarbonTracker.meal[mealType].name || calCarbonTracker.meal[mealType].id)}</div>
            <div className="seachContainer">
                <img alt="search food item" src="https://image.flaticon.com/icons/png/512/622/622669.png"/>
                <input placeholder="Search" type="text" onChange={onSearchInputChange}/>
            </div>
            <div className="dishContainer">
                {
                   dishesList.map( dishId =>{
                       const dishInfo = calCarbonTracker.dishes.info[dishId];
                       const isSelected = calCarbonTracker.meal[mealType].dishes.includes(dishId);
                       return (
                            <div className="dishItem" key={dishId}>
                                <div>{dishInfo.name || dishInfo.id}</div>
                                <div className="dishCnt">
                                    {`${dishInfo.cal} ${calCarbonTracker.cal.unit}`}
                                    <div>Food Print: {calCarbonTracker.getCarbonScore(dishInfo.carbon)}</div>
                                </div>
                                {
                                    isSelected 
                                        ? <div className="checkActionBtn" onClick={deleteDish(dishInfo)}>v</div>
                                        : <div className="plusActionBtn" onClick={addDish(dishInfo)}>+</div>
                                }
                            </div>
                       )
                   }) 
                }
            </div>
            <button 
                type="button" 
                className="doneBtn"
                onClick={onDone}
            >
                Done
            </button>
        </div>

    </Overlay>;
}

export default AddMeal;