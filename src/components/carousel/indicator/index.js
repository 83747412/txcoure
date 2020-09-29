import tpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../../utlis/tools';

export default (swiperData) => {
    let list = '',
        item;
        
    return {
        name: 'carouselIndicator',
        tpl () {
            for(let i = 0; i < swiperData.length; i++){
                item = swiperData[i];
                
                list += tplReplace(tpl, {
                    indicatorItemStyle: !i ? 'indicator-item current' : 'indicator-item'
                });
            }
            return list;
        }
    }
}