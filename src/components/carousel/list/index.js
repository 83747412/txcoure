import tpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../../utlis/tools';
export default (swiperData) => {
    return {
        name: 'carousleList',
        tpl () {
            let list = '';
            const firstData = swiperData[0];

            swiperData.forEach((item) => {
                list += tplReplace(tpl, {
                    courseId: item.course_id,
                    cousrseName: item.course_name,
                    img: item.img
                });
            });

            list += tplReplace(tpl, {
                courseId: firstData.course_id,
                cousrseName: firstData.course_name,
                img: firstData.img
            })

            return list;
        }
    }
}