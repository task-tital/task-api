import { Utilidades } from '@src/utils/Utils'
const utilsImpl = new Utilidades();

/**
 * Esta clase crea los filtros que se usan después en las querys a la BBDD.
 */
export class PgMap {
    private id: string[];
    private description: string;
    private dateCreate: Date;
    private dateEnd: Date;
    private priority: number;
    private tags: string[];

    constructor() {
        this.id = [];
        this.description = "";
        this.priority = 0;
        this.tags = [];
    }

    /**
     * @param {string} otroId - Valor que se añade a la lista de id.
     * Se añade en la ultima posicion.
     */
    addId(otroId: string) {
        this.id.push(otroId);
    }

    /**
     * Se quita el ultimo elemento de la lista de id.
     */
    removeId() {
        this.id.pop();
    }

    /**
     * @param {string} id - Se quita un elemento determinado de la lista de id.
     */
    removeThisId(id: string) {
        let indiceElemento = this.id.indexOf(id);

        if(indiceElemento !== -1) {
            this.id.splice(indiceElemento);
        }
    }

    /**
     * @param {string} otraDescripcion - Se setea el valor de description.
     */
    setDescription(otraDescripcion : string) {
        this.description = otraDescripcion;
    }

    /**
     * @param {Date} otraFecha - Se setea el valor de dateCreate.
     */
    setDateCreate(otraFecha: Date) {
        this.dateCreate = otraFecha;
    }

    /**
     * @param {Date} otraFecha - Se setea el valor de dateEnd.
     */
    setDateEnd(otraFecha: Date) {
        this.dateEnd = otraFecha;
    }

    /**
     * @param {number} otraPriority - Se setea el valor de priority.
     */
    setPriority(otraPriority: number) {
        this.priority = otraPriority;
    }

    /**
     * @param {string} otroTag - Valor que se añade a la lista de tags.
     * Se añade en la ultima posicion.
     */
    addTag(otroTag: string) {
        this.tags.push(otroTag);
    }

    /**
     * Se quita el ultimo elemento de la lista de tags.
     */
    removeTag() {
        this.tags.pop();
    }

    /**
     * Se quita un elemento determinado de la lista de tags.
     */
    removeThisTag(tag: string) {
        let indiceElemento = this.tags.indexOf(tag);

        if(indiceElemento !== -1) {
            this.tags.splice(indiceElemento);
        }
    }

    /**
     * Comprueba que el valor de id esta seteado.
     */
    isSetId() {
        return this.id.length > 0;
    }

    /**
     * Comprueba que el valor de description esta seteado.
     */
    isSetDescription() {
        return !utilsImpl.stringNuloVacio(this.description);
    }

    /**
     * Comprueba que el valor de dateCreate esta seteado.
     */
    isSetDateCreate() {
        return this.dateCreate !== null && this.dateCreate !== undefined;
    }

    /**
     * Comprueba que el valor de dateEnd esta seteado.
     */
    isSetDateEnd() {
        return this.dateEnd !== null && this.dateEnd !== undefined;
    }

    /**
     * Comprueba que el valor de priority esta seteado.
     */
    isSetPriority() {
        return this.priority !== 0;
    }

    /**
     * Comprueba que el valor de tags esta seteado.
     */
    isSetTags() {
        return this.tags.length > 0;
    }
}