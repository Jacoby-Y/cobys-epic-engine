export type DefaultSignalName = ("SetCanvas" | "SetScale");
type SignalFunction = (data?: any) => void;
type CaseListeners = Record<any, SignalFunction[]>;
type SignalType = {
    listeners: {
        [listener_name: string]: SignalFunction[];
    };
    case_listeners: {
        [listener_name: string]: CaseListeners;
    };
    listen(name: any, listener: SignalFunction): () => void;
    listenOn(name: any, value: any, listener: SignalFunction): () => void;
    emit<T = string>(name: T, data?: any): void;
};
declare const signal: SignalType;
export default signal;
