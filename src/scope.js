class Scope {
    constructor(parent, id) {
        this.$$watchers = [];
        this.$$children = [];
        this.$parent = parent || null;
        this.$id = id || Scope.__id;
    }

    $new() {
        Scope.__id += 1;

        const newScope = new Scope(this, Scope.__id);
        this.$$children.push(newScope);
        return newScope;
    }

    $watch(exp, fn) {
        this.$$watchers.push({
            exp,
            fn,
            last: this.$eval(exp),
        })
    }

    $digest() {
        let i = 0;
        let dirty;

        do {
            dirty = false;
            while (i < this.$$watchers.length) {
                const watcher = this.$$watchers[i];
                const last = watcher.last;
                const current = this.$eval(watcher.exp);

                if (last !== current) {
                    dirty = true;
                    watcher.last = current;
                    watcher.fn(current, last);
                }

                i += 1;
            }
        } while (dirty);

        this._$digestChildrent();
    }

    _$digestChildrent() {
        if (this.$$children.length) {
            let i = 0;

            while (i < this.$$children.length) {
                const child = this.$$children[i];
                child.$digest();

                i += 1;
            }
        }
    }

    $eval(exp) {
        try {
            if (typeof exp === 'function') {
                return exp.call(this);
            } else {
                const executor = new Function(`return this.${exp}`);
                return executor.call(this);
            }
        } catch (err) {
            console.error(err);
        }
    }

    $destroy() {
        const parent = this.$parent;

        this.$parent = undefined;
        this.$$children = undefined;
        this.$$watchers = undefined;
        this.$id = undefined;

        if (parent) {
            const children = parent.$$children;
            const scopeIndex = children.indexOf(this);
            children.splice(scopeIndex, 1);
        }
    }
}

Scope.__id = 0;

export default Scope
