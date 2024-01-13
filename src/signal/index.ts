
export type DefaultSignalName = ("SetCanvas" | "SetScale");

type SignalFunction = (data: any)=> void;

type SignalType = {
    listeners: {
        [key: string]: SignalFunction[],
    }

    listen<T = string>(name: T, listener: SignalFunction): ()=> void
    emit<T = DefaultSignalName, D = any>(name: T, data?: D): void
    // runBatched(): void
}

const signal: SignalType = {
    listeners: { },

    /** Adds the lister and returns an un-listen function */
    listen(name, listener) {
        if (!Array.isArray(this.listeners[name as unknown as string])) this.listeners[name as unknown as string] = [];
        this.listeners[name as unknown as string]!.push(listener);

        return function() {
            signal.listeners[name as unknown as string]?.splice(signal.listeners[name as unknown as string]!.indexOf(listener));
        }
    },
    emit(name, data = null) {
        const instant = this.listeners[name as unknown as string];
        
        if (instant == undefined) return;
        
        for (let i = 0; i < instant.length; i++) instant[i]?.(data);
    },
}

export default signal;