declare type SignalFunction = (data: any) => void;
declare type SignalType = {
    listeners: {
        [key: string]: SignalFunction[];
    };
    listen<T = string>(name: T, listener: SignalFunction): () => void;
    emit<T = string>(name: T, data?: any): void;
};
declare const signal: SignalType;
export default signal;
