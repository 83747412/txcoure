import tpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../../utlis/tools';

export default () => {
    return {
        name: 'list',
        tpl (fieldData, queryField) {
            let list = "";

            list += tplReplace(tpl, {
                tabLkStyle: queryField === 'all' ? 'tab-item-lk current' : 'tab-item-lk',
                field: 'all',
                fieldName: '全部'
            });

            fieldData.forEach((item, index) => {
                list += tplReplace(tpl, {
                    tabLkStyle: queryField !== 'all' ? (item.field === queryField ? 'tab-item-lk current' : 'tab-item-lk') : 'tab-item-lk',
                    field: item.field,
                    fieldName: item.field_name
                });
            });
            return list;
        }
    }
}