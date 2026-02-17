export interface PortError {
    errorCode: string;
    description?: string;
    error?: any;
}

export type PortResult<T, E> = 
    | { success: true; data: T }
    | { success: false; data: E }