import $ from 'jquery';

import '../scss/common.css';
import '../scss/iconfont.css';

import header from '../components/header/index';
import footer from '../components/footer/index';
import indexTitle from '../components/indexTitle/index';
import listNav from '../components/listNav/index';
import courseList from '../components/courseList/index';
import noDataTip from '../components/noDataTip/index';

import indexModel from '../models/index';

import { getUrlQueryValue } from '../utlis/tools';

import { filterCourseData } from '../lib/course';

import CourseTab from '../modules/CourseTab';

;(async ($) => {

    
    const $app = $('#app'),
          $container = $('<div class="container"></div>');

    const queryField = getUrlQueryValue('field') || 'all';

    const retFieldData = await indexModel.getCourseFields(),
          retCourseData = await indexModel.getCourses(queryField),
          fields = retFieldData.result,
          courses = retCourseData.result;

    const headerComponent = header(fields),
          indexTitleComponent = indexTitle(),
          listNavComponent = listNav(fields, queryField),
          courseListComponent = courseList(),
          noDataTipComponent = noDataTip(),
          footerComponent = footer();
          
    
    const init = () => {
        render();
        loadModules();
    }

    function render () {
        $container.append(headerComponent.tpl());
        $container.append(indexTitleComponent.tpl('全部课程', false));
        $container.append(listNavComponent.tpl());
        $container.append(courses.length > 0 ? courseListComponent.tpl(filterCourseData(courses, queryField)) : noDataTipComponent.tpl());
        $container.append(footerComponent.tpl());
        $app.append($container);
    }

    function loadModules () {
        new CourseTab().init();
    }

    init();
})($);