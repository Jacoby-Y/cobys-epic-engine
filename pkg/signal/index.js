const signal = {
    listeners: {},
    /** Adds the lister and returns an un-listen function */
    listen(name, listener) {
        if (!Array.isArray(this.listeners[name]))
            this.listeners[name] = [];
        this.listeners[name].push(listener);
        return function () {
            signal.listeners[name]?.splice(signal.listeners[name].indexOf(listener));
        };
    },
    emit(name, data = null) {
        const instant = this.listeners[name];
        if (instant == undefined)
            return;
        for (let i = 0; i < instant.length; i++)
            instant[i]?.(data);
    },
};
export default signal;
