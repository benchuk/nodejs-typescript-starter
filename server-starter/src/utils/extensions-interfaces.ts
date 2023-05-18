export { }
declare global {
    namespace Express {
        interface Response {
            Res200: (msg: string, data?: any) => void;
            Res400: (msg: string) => void;
            Res401: (msg: string) => void;
            Res404: (msg: string) => void;
            Res500: (msg: string) => void;
        }
        interface User {
            id: string;
        }
    }
}