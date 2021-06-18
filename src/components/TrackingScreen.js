import React, { useCallback, useContext, useState } from 'react';
import { CalCarbonTrackerContext } from '../context/CalCarbonTrackerContext';
import AddMeal from './AddMeal';
import ShowAnalysis from './ShowAnalysis';

const TrackingScreen = () => {
    const [mealType, setMealType] = useState('breakfast');
    const [isOpened, setIsOpened] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const calCarbonTracker = useContext(CalCarbonTrackerContext);

    const onClickAddAction = useCallback(e => {
        setIsOpened(true);
        setMealType(e.target.dataset.mealType);
    }, []);
    const onClickOnAnalysis = useCallback(() => {
        setShowAnalysis(true);
    }, []);

    return (
        <>
            <div className="TrackingContainer">
                <div className="dayNav">
                    <span className="arrowIcn">{`<`}</span>
                    <span className="bold">{new Date().toDateString()}</span>
                </div>
                <div className="analysisContainer">
                    <div className="calCarbonCntContainer">
                        <div>Calories</div>
                        <div>Food Print</div>
                        <div className="bold">{calCarbonTracker.getCalLabel(calCarbonTracker.cal.current)}/{calCarbonTracker.getCalLabel(calCarbonTracker.cal.target)}</div>
                        <div className="bold">{calCarbonTracker.getCarbonScore(calCarbonTracker.carbon.current)}</div>
                    </div>
                    <button className="calCarbonAnalysisBtn greenBtn" onClick={onClickOnAnalysis}>
                        View detailed Analysis
                    </button>
                </div>
                {
                    Object.keys(calCarbonTracker.meal).map( mealId => {
                        const meal = calCarbonTracker.meal[mealId];
                        const currMealCalCnt = meal.dishes.reduce( (acc, dishId) => (acc + meal.dishesInfo[dishId].cal), 0 );
                        // const currMealCarbonCnt = meal.dishes.reduce( (acc, dishId) => (acc + meal.dishesInfo[dishId].carbon), 0 );

                        return (
                            <div className="mealContainer" key={mealId}>
                                <div className="mealHeading">
                                    <span className="mealName bold">{meal.name || meal.id}</span>
                                    <span className="calCnt">{calCarbonTracker.getCalLabel(currMealCalCnt)}/{calCarbonTracker.cal.targetLabel}</span>
                                    <button className="add greenBtn" onClick={onClickAddAction} data-meal-type={mealId}>Add</button>
                                </div>
                                {
                                    meal.dishes.map( dishId => {
                                        const dishInfo = meal.dishesInfo[dishId];
                                        return (
                                            <div className="mealDish" key={mealId + dishId}>
                                                <div className="dishName">
                                                    <img 
                                                        alt={dishInfo.name || dishInfo.id} 
                                                        src="https://picsum.photos/48" 
                                                    />
                                                    <div>{dishInfo.name || dishInfo.id}</div>
                                                </div>
                                                <div className="dishCalCnt">
                                                    <div className="mgB8">{calCarbonTracker.getCalLabel(dishInfo.cal)} {calCarbonTracker.cal.unit}</div>
                                                    <div>Food print: {calCarbonTracker.getCarbonScore(dishInfo.carbon)}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
            {
                isOpened && <AddMeal 
                    open={isOpened} 
                    mealType={mealType} 
                    calCarbonTracker={calCarbonTracker} 
                    setIsOpened={setIsOpened}
                />
            }
            {
                showAnalysis && <ShowAnalysis setShowAnalysis={setShowAnalysis}/>
            }
        </>
    )
}

export default TrackingScreen;