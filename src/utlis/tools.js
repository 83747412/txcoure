function tplReplace (template, replaceObject) {
    return template().replace(/{{(.*?)}}/g, (node, key) =>{
        return replaceObject[key];
    });
} 

function getUrlQueryValue (key) {

    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
          res = window.location.search.substr(1).match(reg);
    return res != null ? decodeURIComponent(res[2]) : null;
}

function getTarget (ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement;
    return tar;
}

export {
    tplReplace,
    getUrlQueryValue,
    getTarget
};