
const CODES_HTTP = {
    code100:{
        "100":"Respuestas informativas ",
        "102":"Este código indica que el servidor ha recibido la solicitud y aún se encuentra procesandola, por lo que no hay respuesta disponible.",
    },
    code200:{
        "200":"Respuestas satisfactorias, ok",
        "201":"La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello. Ésta es típicamente la respuesta enviada después de una petición PUT.",
        "202":"Accepted, La solicitud se ha recibido, pero aún no se ha actuado.",
        "203":"La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada",
        "204":"La petición se ha completado con éxito pero su respuesta no tiene ningún contenido, aunque los encabezados pueden ser útiles.",
    },
    code300:{
        "300":"Redirecciones, Esta solicitud tiene más de una posible respuesta. User-Agent o el usuario debe escoger uno de ellos. No hay forma estandarizada de seleccionar una de las respuestas.",
        "301":"Este código de respuesta significa que la URI del recurso solicitado ha sido cambiado. Probablemente una nueva URI sea devuelta en la respuesta.",
        "302":"Este código de respuesta significa que el recurso de la URI solicitada ha sido cambiado temporalmente.",

    },
    code400:{
        "400":"Errores de los clientes, Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida.",
        "401":"Es necesario autenticar para obtener la respuesta solicitada. Esta es similar a 403, pero en este caso, la autenticación es posible.",
        "402":"Este código de respuesta está reservado para futuros usos. El objetivo inicial de crear este código fue para ser utilizado en sistemas digitales de pagos.",
        "403":"El cliente no posee los permisos necesarios para cierto contenido",
        "404":"El servidor no pudo encontrar el contenido solicitado.",
        "405":"El método solicitado es conocido por el servidor pero ha sido deshabilitado y no puede ser utilizado. ",
        "409":"conflicto"
    },
    code500:{
        "500":"errores de los servidores,El servidor ha encontrado una situación que no sabe cómo manejarla.",
        "501":"El método solicitado no está soportado por el servidor y no puede ser manejado.",
        "502":"El método solicitado no está soportado por el servidor y no puede ser manejado.",
        "503":"El servidor no está listo para manejar la petición. ",
        "504":"Esta respuesta de error es dada cuando el servidor está actuando como una puerta de enlace y no puede obtener una respuesta a tiempo.",
        "505":"La versión de HTTP usada en la petición no está soportada por el servidor."
    }
}

export default CODES_HTTP;