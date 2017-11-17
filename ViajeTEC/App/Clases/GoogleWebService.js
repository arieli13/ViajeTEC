//https://developers.google.com/maps/documentation/distance-matrix/intro?hl=es-419
//

export default class GWS{
    static obtenerNombre(latitud, longitud){
        return new Promise((resolve, reject)=>{
            var direccion = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+String(latitud)+','+String(longitud)+'&sensor=false';
            fetch(direccion,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(responseJson => {
                var datos = responseJson._bodyInit;
                datos = JSON.parse(datos);
                datos = datos.results[0].formatted_address.split(",").slice(0, -1).join();
                datos = datos.split(",");
                if(datos.length>=2){
                    datos = datos[0]+","+datos[1];
                    resolve( datos.substring(0, 30) )
                }
                resolve( datos[0] );
            })
            .catch(error => {
                resolve( 'N/A' );
            });
        });
    }

    static obtenerDistancia(lat1, lon1, lat2, lon2){
        //https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=9.449062, -84.023436&destinations=9.449442, -84.023321&key=AIzaSyCbXwGwLjBx_ARPhbLz7kN3DkOggArKKhQ
        return new Promise((resolve, reject)=>{
            var direccion = 'https:maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+String(lat1)+','+String(lon1)+'&destinations='+String(lat2)+','+String(lon2)+'&key=AIzaSyCbXwGwLjBx_ARPhbLz7kN3DkOggArKKhQ';
            fetch(direccion,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(responseJson => {
                var datos = responseJson._bodyInit;
                datos = JSON.parse(datos);
                datos = datos.rows[0].elements[0].distance.value;
                resolve( datos );
            })
            .catch(error => {
                resolve( '1' );
            });
        });
    
    }
}