const openDatabase = async () => {
  const request = indexedDB.open("miBaseDeDatos", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    db.close();
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("venta")) {
      const objectStore = db.createObjectStore("venta");
      objectStore.createIndex("ruta", "ruta", { unique: false });
      objectStore.createIndex("modelo", "modelo", { unique: false });
      objectStore.createIndex("precio", "precio", { unique: false });
      objectStore.createIndex("marca", "marca", { unique: false });
      objectStore.createIndex("imei", "imei", { unique: false });
      objectStore.createIndex("color", "color", { unique: false });
      objectStore.createIndex("id", "id", {unique : true});
    }
  };

  request.onerror = function (event) {
    console.log("Error al abrir la base de datos", event.target.error);
  };
};

const agregarElemento = (elemento) => {
  const request = indexedDB.open("miBaseDeDatos", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["venta"], "readwrite");
    const objectStore = transaction.objectStore("venta");

    const addRequest = objectStore.add(elemento);

    addRequest.onsuccess = function (event) {
      console.log("Elemento agregado correctamente");
      db.close();
    };

    addRequest.onerror = function (event) {
      console.log("Error al agregar el elemento", event.target.error);
      db.close();
    };
  };

  request.onerror = function (event) {
    console.log("Error al abrir la base de datos", event.target.error);
  };
};

const eliminarElemento = (id) => {
  const request = indexedDB.open("miBaseDeDatos", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["venta"], "readwrite");
    const objectStore = transaction.objectStore("venta");

    const deleteRequest = objectStore.delete(id);

    deleteRequest.onsuccess = function (event) {
      console.log("Elemento eliminado correctamente");
      db.close();
    };

    deleteRequest.onerror = function (event) {
      console.log("Error al eliminar el elemento", event.target.error);
      db.close();
    };
  };

  request.onerror = function (event) {
    console.log("Error al abrir la base de datos", event.target.error);
  };
};

const actualizarElemento = (elemento) => {
  const request = indexedDB.open("miBaseDeDatos", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["venta"], "readwrite");
    const objectStore = transaction.objectStore("venta");

    const idAActualizar = elemento.id; // ID del elemento que deseas actualizar

    const getRequest = objectStore.get(idAActualizar);

    getRequest.onsuccess = function (event) {
      const ventaData = event.target.result;

      if (ventaData) {
        // Actualizar solo los campos de color y IMEI
        ventaData.color = elemento.color;
        ventaData.imei = elemento.imei;

        const updateRequest = objectStore.put(ventaData);

        updateRequest.onsuccess = function (event) {
          console.log("Elemento actualizado correctamente");
          db.close();
        };

        updateRequest.onerror = function (event) {
          console.log("Error al actualizar el elemento", event.target.error);
          db.close();
        };
      } else {
        console.log("Elemento no encontrado");
        db.close();
      }
    };

    getRequest.onerror = function (event) {
      console.log("Error al obtener el elemento", event.target.error);
      db.close();
    };
  };

  request.onerror = function (event) {
    console.log("Error al abrir la base de datos", event.target.error);
  };
};

const getElementos = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("miBaseDeDatos", 1);
    const elementos = [];

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["venta"], "readonly");
      const objectStore = transaction.objectStore("venta");
      const cursorRequest = objectStore.openCursor(null, "next");

      cursorRequest.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          elementos.push(cursor.value);
          cursor.continue();
        } else {
          resolve(elementos);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
};

const limpiarTabla = () => {
  const request = indexedDB.open("miBaseDeDatos", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["venta"], "readwrite");
    const objectStore = transaction.objectStore("venta");

    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = function (event) {
      console.log('Tabla "venta" limpiada correctamente');
    };

    clearRequest.onerror = function (event) {
      console.log('Error al limpiar la tabla "venta"', event.target.error);
    };

    transaction.oncomplete = function () {
      db.close();
    };
  };

  request.onerror = function (event) {
    console.log("Error al abrir la base de datos", event.target.error);
  };
};

export default openDatabase;
export {
  agregarElemento,
  eliminarElemento,
  actualizarElemento,
  getElementos,
  limpiarTabla,
};
