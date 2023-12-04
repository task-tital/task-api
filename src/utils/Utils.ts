export class Utilidades {
    /**
     * Metodo que comprueba si el string pasado como argumento tiene un valor.
     */
    stringNuloVacio(valor: string) {
        let salida = false;

        if(valor == null || valor == undefined) {
            salida = true;
        }
        if(valor == "") {
            salida = true;
        }

        return salida;
    }
}