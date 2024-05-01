export const getColorClass = (value: number): string => {
    if (value === 0) {
        return 'bg-red-200';
    } else if (value < 2) {
        return 'bg-yellow-200';
    } else {
        return 'bg-green-200';
    } 
};
