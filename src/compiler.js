import {createAttrsObj, getAttrs, getChildren} from "./domkit";

class Compiler {
    bootstrap(root, rootScope) {
        this.compile(root, rootScope);
    }

    compile(dom, scope) {
        const attrs = getAttrs(dom);
        const attrsMapping = createAttrsObj(attrs);
        const children = getChildren(dom);
        let currentScope = scope;
        let scopeHasOverwrited = false;
        let i = 0;

        while (i < attrs.length) {
            const attr = attrs[i];
            const provider = this.provider.get(attr.name);

            if (provider) {
                const directive = provider();

                if (directive && directive.scope === true && scopeHasOverwrited === false) {
                    currentScope = scope.$new();
                    scopeHasOverwrited = true;
                }

                directive.link(dom, currentScope, attrsMapping);
            }

            i += 1;
        }

        i = 0;

        while (i < children.length) {
            const child = children[i];
            this.compile(child, currentScope);

            i += 1;
        }
    }

    queryValidProviderByAttrs(attrs) {
        const providers = attrs.map(this.provider.get).filter((each) => !each);
        const scopedProviders = providers.filter((provider) => provider.scope === true);
        const unscopedProviders = providers.filter((provider) => provider !== true);
        return [...scopedProviders, ...unscopedProviders];
    }

    setProvider(provider) {
        this.provider = provider;
    }
}

export default Compiler
