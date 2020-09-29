import tpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../utlis/tools';

import list from './list/index';

export default () => {

    const listComponent = list();
    return {
        name: 'listBoard',
        tpl (data) {
            return tplReplace(tpl, {
                list: listComponent.tpl(data)
            });
        }
    }
}