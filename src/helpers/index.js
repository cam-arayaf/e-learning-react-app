const jsonParseException = obj => { 
    try {
        return Number(obj) ? null : JSON.parse(obj);
    } catch (error) {
        return null;
    }
}

export const validateSelectedCourses = (selectedCourses = localStorage.getItem('selectedCourses')) =>
    !jsonParseException(selectedCourses)
    || !JSON.parse(selectedCourses).length ? localStorage.removeItem('selectedCourses')
    : JSON.parse(selectedCourses);

export const validateTotal = (total = localStorage.getItem('total')) =>
    !Number(total) ? localStorage.removeItem('total')
    : Number(total);