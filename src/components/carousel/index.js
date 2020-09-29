import tpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../utlis/tools';

import list from './list/index';
import indicator from './indicator/index';

export default (swiperData) => {

    const listComponent = list(swiperData),
          indicatorComponent = indicator(swiperData);
   
    return {
        name: 'carousel',
        tpl () {
            return tplReplace(tpl, {
                listWidth: (swiperData.length + 1) * 1200,
                list: listComponent.tpl(),
                indicator: indicatorComponent.tpl()
            });
        }
    }
}