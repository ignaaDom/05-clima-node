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
                
                const lugarSel = lugares.find(l => l.id === id);

                console.log('\nInformacion de la ciudad\n'.green);
                console.log(`Ciudad: ${lugarSel.nombre}`);
                console.log(`Lat: ${lugarSel.lat}`);
                console.log(`Lang: ${lugarSel.lng}`);
                console.log(`Temperatura: `);
                console.log(`Mínima: `);
                console.log(`Máxima: `);
            break;
        }

        await pausa();
    }while(opcion !== 0);
}

main();