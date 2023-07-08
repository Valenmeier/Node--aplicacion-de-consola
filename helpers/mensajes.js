import colors from "colors";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const mostrarMenu = async () => {
  console.clear();
  console.log("==========================".rainbow);
  console.log("  Seleccione una opción");
  console.log("==========================\n".rainbow);

  console.log(`${`1.`.magenta} Crear tarea`);
  console.log(`${`2.`.magenta} Listar tareas`);
  console.log(`${`3.`.magenta} Listar tareas completadas`);
  console.log(`${`4.`.magenta} Listar tareas pendientes`);
  console.log(`${`5.`.magenta} Completar tarea(s)`);
  console.log(`${`6.`.magenta} Borrar tarea`);
  console.log(`${`0.`.magenta} Salir\n`);
  const rl = readline.createInterface({ input, output });
  const opt = await rl.question(`Selecciona una opción: `);
  rl.close();
  return opt;
};

export const pausa = async () => {
  const rl = readline.createInterface({ input, output });
  const opt = await rl.question(
    `\nPresione ${`ENTER`.green} para continuar:\n `
  );

  rl.close();
};
