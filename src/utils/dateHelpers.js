// utils/dateHelpers.js
export const getCurrentWeekRange = () => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

export const getAdjacentWeek = (currentWeek, direction) => {
    const modifier = direction === 'prev' ? -7 : 7;
    const newStart = new Date(currentWeek.start);
    newStart.setDate(newStart.getDate() + modifier);
    // console.log(newStart);
    
    const newEnd = new Date(newStart);
    newEnd.setDate(newStart.getDate() + 6);
    newEnd.setHours(23, 59, 59, 999);

    return {
        start: newStart,
        end: newEnd
    };
};

export const formatDateRange = (start, end) => {
    const options = { month: 'short', day: 'numeric' };
    const startDate = new Date(start).toLocaleDateString('en-US', options);
    const endDate = new Date(end).toLocaleDateString('en-US', options);
    return `${startDate} - ${endDate}`;
};



export const startEndDate = (date) => {
    const options = { month: 'short', day: 'numeric' };
    const startDate = new Date(date).toLocaleDateString('en-US', options);
    return `${startDate}`;
};




