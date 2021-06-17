import React, { useCallback, useContext, useState } from 'react';
import { CalCarbonTrackerContext } from '../context/CalCarbonTrackerContext';
import AddMeal from './AddMeal';

const TrackingScreen = () => {
    const [mealType, setMealType] = useState('breakfast');
    const [isOpened, setIsOpened] = useState(false);
    const calCarbonTracker = useContext(CalCarbonTrackerContext);

    console.log(calCarbonTracker.meal, Object.keys(calCarbonTracker.meal));

    const onClickAddAction = useCallback(e => {
        setIsOpened(true);
        setMealType(e.target.dataset.mealType);
    }, []);

    return (
        <>
            <div className="TrackingContainer">
                <div className="weekNav">
                    <div>S</div>
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                    <div>13</div>
                    <div>14</div>
                    <div>15</div>
                    <div>16</div>
                    <div>17</div>
                    <div>18</div>
                    <div>19</div>
                </div>
                <div className="dayNav">
                    <div>{new Date().toDateString()}</div>
                    <div>{new Date().toDateString()}</div>
                    <div>{new Date().toDateString()}</div>
                </div>
                <div className="analysisContainer">
                    <div className="calCarbonCntContainer">
                        <div>Calories</div>
                        <div>Food Print</div>
                        <div>{calCarbonTracker.getCalLabel(calCarbonTracker.cal.current)}/{calCarbonTracker.getCalLabel(calCarbonTracker.cal.target)}</div>
                        <div>{calCarbonTracker.getCarbonScore(calCarbonTracker.carbon.current)}</div>
                    </div>
                    <button className="calCarbonAnalysisBtn greenBtn">
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
                                    <span className="mealName">{meal.name || meal.id}</span>
                                    <span className="calCnt">{calCarbonTracker.getCalLabel(currMealCalCnt)}/{calCarbonTracker.cal.targetLabel}</span>
                                    <button className="add greenBtn" onClick={onClickAddAction} data-meal-type={mealId}>Add</button>
                                </div>
                                {
                                    meal.dishes.map( dishId => {
                                        const dishInfo = meal.dishesInfo[dishId];
                                        return (
                                            <div className="mealDish" key={mealId + dishId}>
                                                <div className="dishName">{dishInfo.name || dishInfo.id}</div>
                                                <div className="dishCalCnt">{calCarbonTracker.getCalLabel(dishInfo.cal)} {calCarbonTracker.cal.unit}</div>
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
        </>
    )
}

export default TrackingScreen;