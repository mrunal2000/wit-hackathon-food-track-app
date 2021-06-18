import React, { useCallback } from 'react';
import Overlay from './Overlay';

const ShowAnalysis = ({ setShowAnalysis}) => {
    const onDone = useCallback(() => {
        setShowAnalysis(false);
    }, []);
    return <Overlay  isOpened={true}>
        <div className="TrackingContainer">
            <div className="dayNav">
                <span className="arrowIcn diff" onClick={onDone}>{`<`}</span>
                <span className="bold">{new Date().toDateString()}</span>
            </div>
            <div className="cropImg">
                <img 
                    alt=""
                    className="staticImage" 
                    src="https://i.imgur.com/ETCTdYv.png"
                />
            </div>
        </div>
    </Overlay>
};

export default ShowAnalysis;