const fs = require('fs');

const axios = require('axios').default;

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.leerDB();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'proximity': 'ip',
            'language': 'es'
        }
    }

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es',
        }
    }

    get capitalizarHistorial(){
        for(let i = 0; i < this.historial.length;i++){
            this.historial[i] = this.historial[i].replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        }
        return this.historial;
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

    async climaLugar(lat,lon){
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather,lat,lon}
            });

            const resp = await instance.get();
            const {weather,main} = resp.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max
            };

        }catch(err){
            return [];
        }
    }

    agregarHistorial(lugar = ''){

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.capitalizarHistorial
        };

        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }

    async leerDB(){
        if(!fs.existsSync(this.dbPath)) return null;
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info);
    
        console.log(data);
    
        this.historial = data.historial;
    }

}

module.exports = Busquedas;