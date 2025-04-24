import Storage from 'storage';
import Service from './Service';
import chalk from 'chalk';

// TODO: esta logica agrega los modulos que corresponden a los roles pero no es lo que el servicio esta devolviendo
const acceso = [
  {
      "id": 7,
      "nombre": "Acces",
      "estado": true,
      "accesible": true,
      "subModulos": [
          {
              "id": 1,
              "nombre": "Users",
              "estado": true,
              "accesible": false,
              "url": "/admin/user",
              "iconUrl": null
          },
          {
              "id": 2,
              "nombre": "Groups",
              "estado": true,
              "accesible": false,
              "url": "/admin/group",
              "iconUrl": null
          },
          {
              "id": 5,
              "nombre": "Access",
              "estado": true,
              "accesible": false,
              "url": "/admin/access",
              "iconUrl": null
          },
          {
              "id": 15,
              "nombre": "Folder Access",
              "estado": true,
              "accesible": false,
              "url": "/admin/folderaccess",
              "iconUrl": null
          }
      ],
      "url": "",
      "iconUrl": "https://res.cloudinary.com/dfxv7hzza/image/upload/v1554314970/global.svg"
  },
  {
      "id": 8,
      "nombre": "Administration",
      "estado": true,
      "accesible": true,
      "subModulos": [
          {
              "id": 16,
              "nombre": "Diagram Permissions",
              "estado": true,
              "accesible": false,
              "url": "/admin/diagramsaccess",
              "iconUrl": null
          },
          {
              "id": 17,
              "nombre": "Video Permissions",
              "estado": true,
              "accesible": false,
              "url": "/admin/videoaccess",
              "iconUrl": null
          },
          {
              "id": 3,
              "nombre": "Media",
              "estado": true,
              "accesible": false,
              "url": "/admin/media",
              "iconUrl": null
          },
          {
              "id": 4,
              "nombre": "File Manager",
              "estado": true,
              "accesible": false,
              "url": "/admin/archives",
              "iconUrl": null
          }
      ],
      "url": null,
      "iconUrl": "https://res.cloudinary.com/dfxv7hzza/image/upload/v1554315147/folder.svg"
  },
  {
      "id": 9,
      "nombre": "Control",
      "estado": true,
      "accesible": true,
      "subModulos": [
          {
              "id": 7,
              "nombre": "P&ID",
              "estado": true,
              "accesible": false,
              "url": "/admin/pids",
              "iconUrl": null
          },
          {
            "id": 6,
            "nombre": "Control Process",
            "estado": true,
            "accesible": false,
            "url": "/admin/control",
            "iconUrl": null
        }
      ],
      "url": null,
      "iconUrl": "https://res.cloudinary.com/dfxv7hzza/image/upload/v1554315229/controls.svg"
  },
  {
      "id": 10,
      "nombre": "Interface",
      "estado": true,
      "accesible": true,
      "subModulos": [],
      "url": null,
      "iconUrl": null
  },
  {
      "id": 12,
      "nombre": "Interactive",
      "estado": true,
      "accesible": true,
      "subModulos": [
          {
              "id": 8,
              "nombre": "Virtual 3D Tour ",
              "estado": true,
              "accesible": false,
              "url": "/admin/videos",
              "iconUrl": null
          },
          {
              "id": 9,
              "nombre": "Flow Diagrams",
              "estado": true,
              "accesible": false,
              "url": "/admin/diagrams",
              "iconUrl": null
          },
          {
              "id": 14,
              "nombre": "Mass Balance",
              "estado": true,
              "accesible": false,
              "url": "/admin/balances",
              "iconUrl": null
          }
      ],
      "url": null,
      "iconUrl": "https://res.cloudinary.com/dfxv7hzza/image/upload/v1554315317/interactive.svg"
  },
  {
      "id": 13,
      "nombre": "Evaluations",
      "estado": true,
      "accesible": true,
      "subModulos": [
          {
              "id": 10,
              "nombre": "Question",
              "estado": true,
              "accesible": false,
              "url": "/admin/question",
              "iconUrl": null
          },
          {
              "id": 11,
              "nombre": "Evaluations",
              "estado": true,
              "accesible": false,
              "url": "/admin/quizzes",
              "iconUrl": null
          },
          {
              "id": 12,
              "nombre": "Reports",
              "estado": true,
              "accesible": false,
              "url": "/admin/quizzes/reports",
              "iconUrl": null
          }
      ],
      "url": null,
      "iconUrl": "https://res.cloudinary.com/dfxv7hzza/image/upload/v1554315317/rating.svg"
  }
]
class AccountService extends Service {
  access() {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get('account/access');
        const { data } = response;
        // Actualizar submódulos en `data` usando `acceso`
        const updatedData = data.map((dataItem) => {
          const accesoItem = acceso.find((a) => a.id === dataItem.id);
          if (accesoItem) {
            return { ...dataItem, subModulos: accesoItem.subModulos };
          }
          return dataItem;
        });
        console.log(updatedData)
        
        Storage.saveModulesAccess(updatedData);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  me() {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get('account/me');
        const { data } = response;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  isAuthotized(url) {
    let urlProtected = url;

    const accesses = Storage.getModulesAccess();

    if (urlProtected.includes('admin')) {
      const modulesAvaliable = accesses.filter(a => a.accesible);

      const modulo = modulesAvaliable.find(a => {
        if (urlProtected.includes('/admin/quiz')) {
          urlProtected = '/admin/quiz';
        }
        const subModulo = a.subModulos.find(b => b.url.includes(urlProtected));

        if (subModulo) {
          return subModulo;
        }

        return false;
      });

      if (!modulo) {
        return false;
      }
      return modulo.accesible;
    }
    const module = accesses.find(a => a.nombre === 'Interface');

    if (!module) return false;
    return module.accesible;
  }

  hasAdmin() {
    const accesses = Storage.getModulesAccess();

    let hasAccess = false;

    accesses.forEach(a => {
      if (a.nombre !== 'Interface') {
        if (a.accesible && !hasAccess) {
          hasAccess = true;
        }
      }
    });

    return hasAccess;
  }

  hasModule(moduleName) {
    const accesses = Storage.getModulesAccess();

    const access = accesses.find(a => a.nombre === moduleName);

    return access.accesible;
  }

  allowedModules() {
    const accesses = Storage.getModulesAccess();

    const access = accesses.filter(
      a => a.accesible && a.nombre !== 'Interface',
    );

    return access;
  }

  allowInterfaceView() {
    const accesses = Storage.getModulesAccess();

    const access = accesses.filter(
      a => a.accesible && a.nombre === 'Interface',
    );

    if (access.length === 0) {
      return false;
    }

    return access[0].accesible;
  }

  firstAdminRoute() {
    const modules = this.allowedModules();
    if (!modules) {
      return '/';
    }

    if (!modules[0].subModulos.length) {
      return '/';
    }

    return modules[0].subModulos[0].url;
  }
}

export default AccountService;
