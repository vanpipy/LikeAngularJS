import {getFunctionParams} from "./utils";

class Provider {
    constructor() {
        this.__$$providers = {};
    }

    get(name) {
        return this.__$$providers[name];
    }

    annotate(fn, deps) {
        const params = getFunctionParams(fn);
        const executors = params.map((name) => {
            const dep = deps[name] ? deps[name] : this.get(name);

            if (dep) {
                return dep;
            } else {
                throw new Error(`Cannot find the ${name}`);
            }
        });
        return executors;
    }

    invoke(fn, deps) {
        const executors = this.annotate(fn, deps);
        return fn.apply(null, executors);
    }

    directive(name, fn) {
        this.register(name, fn)
    }

    controller(name, fn) {
        this.register(name, fn)
    }

    service(name, fn) {
        this.register(name, fn);
    }

    register(name, fn) {
        this.__$$providers[name] = fn;
    }
}

export default Provider
