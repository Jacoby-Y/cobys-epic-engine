type SignalFunction = (data: any)=> void;

interface SignalProps {
    listeners: {
        [key: string]: SignalFunction[],
    }

    listen<T = string>(name: T, listener: SignalFunction): ()=> void
    emit<T = string>(name: T, data?: any): void
    // runBatched(): void
}

const signal: SignalProps = {
    listeners: { },

    /** Adds the lister and returns an un-listen function */
    listen(name, listener) {
        if (!Array.isArray(this.listeners[name as string])) this.listeners[name as string] = [];
        this.listeners[name as string]!.push(listener);

        return function() {
            signal.listeners[name as string]?.splice(signal.listeners[name as string]!.indexOf(listener));
        }
    },
    emit(name, data = null) {
        const instant = this.listeners[name as string];
        
        if (instant == undefined) return;
        
        for (let i = 0; i < instant.length; i++) instant[i]?.(data);
    },
}

export default signal;