import $ from 'jquery';
import { API } from '../utlis/config';
class IndexModel {
    getCourseDatas () {
        return $.ajax({
            url: API.getCourseDatas,
            type: 'GET',
            dataType: 'JSONP'
        });
    }

    getCourses (field) {
        return $.ajax({
            url: `${API.getCourses}${field}`,
            type: 'GET',
            dataType: 'JSONP'
        });
    }

    getCourseFields () {
        return $.ajax({
            url: API.getCourseFields,
            type: 'GET',
            dataType: 'JSONP'
        });
    }
}

export default new IndexModel();