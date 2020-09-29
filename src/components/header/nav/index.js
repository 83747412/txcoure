import tpl from './index.tpl';

import './index.scss';

import { tplReplace } from '../../../utlis/tools';

export default () => {
    return {
        name: 'headerNav',
        tpl (fieldData) {
            let list = '';

            fieldData.forEach((item, index) => {
                list += tplReplace(tpl, {
                    field: item.field,
                    fieldName: item.field_name
                });
            });
            return `<ul class="nav-list clearfix">${list}</ul>`;
        }
    }
}