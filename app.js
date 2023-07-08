import colors from "colors";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} from "./helpers/inquirer.js";
import { Tarea } from "./models/tarea.js";
import { Tareas } from "./models/tareas.js";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        console.log(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3": //Listar completadas
        tareas.listarPendientesCompletadas(true);
        break;
      case "4": //Listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case "5": // completado | pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6": //borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== 0) {
          const ok = await confirmar(`¿Estas seguro de borrarlo?`);
          if (ok) {
            tareas.borrarTarea(id);
            console.log(`Tarea borrada correctamente`.cyan);
          }
        }

        break;
      default:
        break;
    }
    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== `0`);
};

main();
