import FollowFindYou from "../imagenes/Follow_Find_You.jpg";
import OneOfAKind from "../imagenes/One_of_a_Kind_by_Monsta_X.png"
import Unfold from "../imagenes/Unfold.png"
import "../estilos/Tarjeta.css"

const imagenes = {FollowFindYou, OneOfAKind, Unfold};

function Tarjeta(props) {
    return(
        <div className="contenedor-tarjeta">
            <img className="imagen-tarjeta" src={imagenes[props.imagen]} alt='Imagen de la portada del album ${props.nombre}' />
            <div className="contenedor-texto-tarjeta">
                <p className="titulo-tarjeta"><strong>{props.nombre}</strong></p>
                <p className="subtitulo-tarjeta">{props.año}</p>
                <p className="texto-tarjeta">{props.texto}</p>
            </div>
        </div>
    );
}

export default Tarjeta;