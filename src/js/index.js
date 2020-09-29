import $ from 'jquery';

import '../scss/common.css';
import '../scss/iconfont.css';

import header from '../components/header/index';
import footer from '../components/footer/index';
import carousel from '../components/carousel/index';
import indexTitle from '../components/indexTitle/index';
import recomBoard from '../components/recomBoard/index';
import courseList from '../components/courseList/index';

import indexModel from '../models/index';

import Carousel from '../modules/Carousel';

import { CAROUSEL } from '../utlis/config';

import { filterCourseData } from '../lib/course';


;(async ($) => {

    const $app = $('#app'),
          $container = $('<div class="container"></div>');

    const retData = await indexModel.getCourseDatas(),
          { swipers, fields, courses, recomCourses} = retData.result;
    
    const headerComponent = header(fields),
          footerComponent = footer(),
          carouselComponent = carousel(swipers),
          indexTitleComponent = indexTitle(),
          recomBoardComponent = recomBoard(recomCourses),
          courseListComponent = courseList();
    const init = () => {
        render();
        loadModules();
    }

    function render () {
        $container.append(headerComponent.tpl());
        $container.append(carouselComponent.tpl());
        $container.append(indexTitleComponent.tpl('JS++深度前端', true));
        $container.append(recomBoardComponent.tpl());
        $container.append(indexTitleComponent.tpl('前端高薪就业', true));
        $container.append(courseListComponent.tpl(filterCourseData(courses, '0', 5)));
        $container.append(indexTitleComponent.tpl('精品小课', true));
        $container.append(courseListComponent.tpl(filterCourseData(courses, '1', 5)));
        $container.append(indexTitleComponent.tpl('前端基础', true));
        $container.append(courseListComponent.tpl(filterCourseData(courses, '2', 5)));
        $container.append(indexTitleComponent.tpl('全休班体验课', true));
        $container.append(courseListComponent.tpl(filterCourseData(courses, '3', 5)));
        $container.append(footerComponent.tpl());
        $app.append($container);
    }

    function loadModules () {
        new Carousel(CAROUSEL).init();
    }

    init();
})($);