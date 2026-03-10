export type UsecaseOutput<T, E> = 
    | { success: true; data: T }
    | { success: false; data: E }