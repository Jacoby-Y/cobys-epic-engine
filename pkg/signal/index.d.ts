export type DefaultSignalName = ("SetCanvas" | "SetScale");
type SignalFunction = (data: any) => void;
type SignalType = {
    listeners: {
        [key: string]: SignalFunction[];
    };
    listen<T = string>(name: T, listener: SignalFunction): () => void;
    emit<T = DefaultSignalName, D = any>(name: T, data?: D): void;
};
declare const signal: SignalType;
export default signal;
