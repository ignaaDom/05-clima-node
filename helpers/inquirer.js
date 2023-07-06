const colors = require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ],
    }
];

const inquirerMenu = async()=>{
    console.clear();

    console.log('========================='.green);
    console.log('  Seleccione una opcion  '.white);
    console.log('=========================\n'.green);

    const {opcion}  = await inquirer.prompt(preguntas);

    return opcion;
}

// Muestra una pausa para que no se termine de una el proceso
const pausa = async()=>{
    const preguntaPausa = [
        {
            type: 'input',
            name: 'opcion',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];
    const {opcion} = await inquirer.prompt(preguntaPausa);
    console.log('\n');
    return opcion;
}

// Espera un mensaje. Si o si se tiene que ingresar algo porque sino no continua
const leerInput = async(message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0) return 'Por favor ingrese un valor'
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoConfirmar = async(tareas = [])=>{
    const choices = tareas.map( (tarea,i) =>{
        return {
            value: tarea.id,
            name: `${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];
    const {ids} = await inquirer.prompt(question);
    return ids;
}

const listarLugares = async(lugares = [])=>{

    const choices = lugares.map( (lugar,i) =>{
        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ];

    const {id} = await inquirer.prompt(question);

    return id;
}

const confirmar = async(message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

// Exporta las siguientes funciones
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    listadoConfirmar
}