const BASE_URL = 'http://localhost:3000/';

const API = {
    getCourseDatas: BASE_URL + 'course/get_course_datas',
    getCourses: BASE_URL + 'course/get_courses/',
    getCourseFields: BASE_URL + 'course/get_course_fields'

}

const CAROUSEL = {
    autoplay: true,
    duration: 5000
}
export {
    API,
    CAROUSEL
}