import { createMapping, createOptions, slice } from './utils';

class LiteNode {
    constructor(dom) {
        this.__$$dom = dom || {
            attributes: [],
            children: [],
        };
        this.__$$children = [];
        this.collectAttrs();
    }

    collectAttrs() {
        this.__$$attrsArray = createOptions(this.__$$dom.attributes);
        this.__$$attrsMapping = createMapping(this.__$$attrsArray);
    }

    attr(key) {
        return this.__$$attrsMapping[key];
    }

    attrs(opts = {}) {
        return opts.fmt === 'array' ? this.__$$attrsArray : this.__$$attrsMapping;
    }

    getDom() {
        return this.__$$dom;
    }

    getChildren() {
        this.__$$children = slice(this.__$$dom.children);
        return this.__$$children;
    }
}

export default LiteNode;
