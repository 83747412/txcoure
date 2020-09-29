function filterCourseData (data, field, limit) {

    const _arr = data.filter((item) => {
        if(field === 'all'){
            return true;
        }
        
        return item.field === field;
    });
    return limit ? _arr.slice(0, limit) : _arr;
}

export {
    filterCourseData
}