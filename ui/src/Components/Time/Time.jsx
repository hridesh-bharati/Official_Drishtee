import React, { useState, useEffect } from 'react';
export default function Time() {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        function updateEverySecond() { setCurrentTime(new Date()); }
        updateEverySecond();
        const intervalId = setInterval(updateEverySecond, 1000); return () => clearInterval(intervalId);
    }, []);
    return (<div><div className='d-inline p-2 rounded-1'>{`${currentTime.toLocaleTimeString()}`} </div></div>);
}
