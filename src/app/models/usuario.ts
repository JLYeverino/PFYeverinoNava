export interface Usuario{
    id: number;
    usuario: string;
    contrasena: string;
    admin: boolean;
    nombre?: string;
    // canLoad: boolean;
    // canActivateChild: boolean;
}