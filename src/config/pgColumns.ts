import {config } from 'dotenv';
config();

export class PgColumns {
    columnas: string[] = process.env.PG_COLUMNS_NAMES.split(",");

    getNumeroColumnas() {
        return this.columnas.length;
    }

    getNombreColumna(posicion: number) {
        if(posicion < this.getNumeroColumnas()) {
            return this.columnas[posicion];
        } else {
            throw new Error("El número de columnas es mayor al permitido");
        }
    }

    esColumnaPermitida(columna: string) {
        let salida: boolean = false;
        for(let iterador in this.columnas) {
            if(iterador === columna) {
                salida = true;
                break;
            }
        }

        return salida;
    }

    esListaPermitida(columnas: string[]) {

    }
}