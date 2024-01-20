const signal = {
    listeners: {},
    case_listeners: {},
    /** Adds the lister and returns an un-listen function */
    listen(name, listener) {
        if (!Array.isArray(this.listeners[name]))
            this.listeners[name] = [];
        this.listeners[name].push(listener);
        return function () {
            signal.listeners[name]?.splice(signal.listeners[name].indexOf(listener));
        };
    },
    listenFor(name, value, listener) {
        if (this.case_listeners[name] == undefined)
            this.case_listeners[name] = {};
        if (this.case_listeners[name][value] == undefined)
            this.case_listeners[name][value] = [];
        this.case_listeners[name][value].push(listener);
        return function () {
            signal.case_listeners[name][value]?.splice(signal.case_listeners[name][value].indexOf(listener));
            if (signal.case_listeners[name][value].length == 0) {
                delete signal.case_listeners[name][value];
            }
        };
    },
    emit(name, data = null) {
        const listener = this.listeners[name];
        const case_listeners = this.case_listeners[name];
        if (listener == undefined)
            return;
        for (let i = 0; i < listener.length; i++) {
            const cases = case_listeners?.[data];
            if (cases != undefined) {
                let skip_default_listener = false;
                for (let j = 0; j < cases.length; j++) {
                    if (cases[j]() === true)
                        skip_default_listener = true;
                }
                if (skip_default_listener)
                    continue;
            }
            listener[i]?.(data);
        }
    },
};
export default signal;
