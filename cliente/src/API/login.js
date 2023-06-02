import {instancia} from "./api"

const getUsuario = (data) => {
    return instancia.get(`/credenciales/${data.user}/${data.pass}`).then(res => {
        return res.data;
    }
    ).catch(err => console.err("error al obtener credenciales" + err))
}

export {getUsuario};