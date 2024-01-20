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
    listenOn(name, value, listener) {
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
            listener[i]?.(data);
            case_listeners?.[data]?.forEach(fn => fn());
        }
    },
};
export default signal;
