import tpl from './index.tpl';
import './index.scss';

import list from './list/index';

import { tplReplace } from '../../utlis/tools';

export default (recomCourseData) => {

    const listComponent = list(recomCourseData);
    return {
        name: 'recomBoard',
        tpl () {
            return tplReplace(tpl, {
                list: listComponent.tpl()
            });
        }
    }
}