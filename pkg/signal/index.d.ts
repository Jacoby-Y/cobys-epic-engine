export type DefaultSignalName = ("SetCanvas" | "SetScale");
type SignalFunction = (data: any) => void;
type CaseSignalFunction = () => (void | boolean);
type CaseListeners = Record<any, CaseSignalFunction[]>;
type SignalType = {
    listeners: {
        [listener_name: string]: SignalFunction[];
    };
    case_listeners: {
        [listener_name: string]: CaseListeners;
    };
    listen(name: any, listener: SignalFunction): () => void;
    listenFor(name: any, value: (any | ((value: any) => boolean)), listener: CaseSignalFunction): () => void;
    emit<T = string>(name: T, data?: any): void;
};
declare const signal: SignalType;
export default signal;
