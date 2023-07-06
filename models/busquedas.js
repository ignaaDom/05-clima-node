const axios = require('axios').default;

class Busquedas {
    historial = [];

    constructor(){
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'proximity': 'ip',
            'language': 'es'
        }
    }

    async ciudad(lugar = ''){

        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();


            return resp.data.features.map((l) => ({
                id: l.id,
                nombre: l.place_name,
                lng: l.center[0],
                lat: l.center[1]
            }));
        }catch(err){ 
            return [];
        }
    }
}

module.exports = Busquedas;