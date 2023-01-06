export const getAttrs = (dom) => {
    const attrs = Array.prototype.slice.call(dom.attributes);
    return attrs.map((attr) => ({
        name: attr.name,
        value: attr.value,
    }));
};

export const createAttrsObj = (attrsArr = [], k = 'name', v = 'value') => {
    return attrsArr.reduce((result, attr) => {
        result[attr[k]] = attr[v];
        return result;
    }, {});
};

export const getChildren = (dom) => {
    return Array.prototype.slice.call(dom.children);
};
