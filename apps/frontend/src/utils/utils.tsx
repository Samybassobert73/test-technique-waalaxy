export const getColorClass = (value: number): string => {
    if (value === 0) {
        return 'text-white bg-[#E84855]';
    } else if (value < 2) {
        return 'text-white bg-[#FAA916]';
    } else {
        return 'text-white bg-[#1B998B]';
    } 
};
