import inquirer from "inquirer";
import colors from "colors";

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${`1.`.red} Crear tarea`,
      },
      {
        value: "2",
        name: `${`2.`.red} Listar tareas`,
      },
      {
        value: "3",
        name: `${`3.`.red} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${`4.`.red} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${`5.`.red} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${`6.`.red} Borrar tarea`,
      },
      {
        value: "0",
        name: `${`0.`.red} Salir`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  //   console.clear();
  console.log("==========================".rainbow);
  console.log("  Seleccione una opción");
  console.log("==========================\n".rainbow);
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

export const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${`ENTER`.green} para continuar`,
    },
  ];
  await inquirer.prompt(question);
};

export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return `Por favor ingrese un valor`;
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

export const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${`0.`.cyan} Cancelar`,
  });

  const preguntas = [
    {
      type: `list`,
      name: `id`,
      message: `Borrar`,
      choices: choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

export const confirmar = async (message) => {
  const question = [
    {
      type: `confirm`,
      name: `ok`,
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);

  return ok;
};

export const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: `checkbox`,
      name: `ids`,
      message: `Selecciones`,
      choices: choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};
