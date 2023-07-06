require('dotenv').config();

const colors = require('colors');
const inquirer = require('inquirer');

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');


const main = async()=>{
    let opcion;

    const busquedas = new Busquedas();

    do{
        opcion = await inquirerMenu();

        switch(opcion){
            case 1:
                //Mostrar mensaje

                const termino = await leerInput('Ingrese un lugar: ');

                console.log();

                const lugares = await busquedas.ciudad(termino);

                const id = await listarLugares(lugares);

                if(id !== 0){
                    const lugarSel = lugares.find(l => l.id === id);

                    busquedas.agregarHistorial(lugarSel.nombre);

                    const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);

                    console.clear();

                    console.log('\nInformacion de la ciudad\n'.green);
                    console.log(`Ciudad: ${lugarSel.nombre}`.green);
                    console.log(`Lat: ${lugarSel.lat}`);
                    console.log(`Lang: ${lugarSel.lng}`);
                    console.log(`Temperatura: ${clima.temp}`);
                    console.log(`Mínima: ${clima.temp_min}`);
                    console.log(`Máxima: ${clima.temp_max}`);
                    console.log(`Info del clima: ${clima.desc}`);
                }
            break;
            case 2:
                busquedas.capitalizarHistorial.forEach((lugar,i)=>{
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
            break;
        }

        await pausa();
    }while(opcion !== 0);
}

main();