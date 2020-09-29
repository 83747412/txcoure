import tpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../../utlis/tools';

export default () => {
    return {
        name: 'courseList',
        tpl (data) {
            let list = "";

            data.forEach((item) => {
                list += tplReplace(tpl, {
                    id: item.id,
					priceStyle: item.price === '0' ? 'item-free' : 'item-price',
					courseName: item.course_name,
					price: item.price === '0' ? '免费' : '￥' + item.price + '.00',
					img: item.img
                });
            });
            return list;
        }
    }
}