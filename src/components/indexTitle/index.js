import tpl from './index.tpl';
import moreTpl from './tpl/more.tpl';
import './index.scss';


import { tplReplace } from '../../utlis/tools';

export default () => {
    return {
        name: 'indexTitle',
        tpl(titleText, showMore){
            return tplReplace(tpl, {
                titleText,
                more: showMore ? moreTpl() : ''
            });
        }
    }
}