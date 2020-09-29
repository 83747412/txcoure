import tpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../utlis/tools';

import logo from './logo/index';
import nav from './nav/index';

export default (fieldData) => {
    const logoComponent = logo(),
          navComponent = nav();
    return {
        name: 'header',
        tpl () {
            return tplReplace(tpl, {
                logo: logoComponent.tpl(),
                nav: navComponent.tpl(fieldData)
            });
        }
    }
}