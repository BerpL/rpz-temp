import Service from './Service';

class GroupService extends Service {
  getTree() {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get('arbolflujos/archives');
        const { data } = response;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getGrupos(idGrupo, idArbol) {
    // console.log(idGrupo, idArbol)
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        // console.log('pidiendo info', `grupos/${idGrupo}/arbol/${idArbol}`)
        const response = await self
          .fetchApi()
          .get(`grupos/${idGrupo}/arbol/${idArbol}`);
        const { data } = response;
        // console.log(data.data)
        resolve(data);
      } catch (error) {
        console.log('rechazado');
        reject(error);
      }
    });

    return promise;
  }

  updateGroup(idGroup, jsonArbol) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self
          .fetchApi()
          .post(`grupos/AccesByGroup/${idGroup}`, jsonArbol);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getGruposPid(idGrupo, idArbolPid) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        // console.log('pidiendo info', `grupos/${idGrupo}/arbol/${idArbol}`)
        const response = await self
          .fetchApi()
          .get(`grupos/${idGrupo}/arbolPid/${idArbolPid}`);
        const { data } = response;
        // console.log(data.data)
        resolve(data);
      } catch (error) {
        console.log('rechazado');
        reject(error);
      }
    });

    return promise;
  }

  updateGroupPid(idGroup, jsonArbol) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self
          .fetchApi()
          .post(`grupos/AccesPidByGroup/${idGroup}`, jsonArbol);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getGruposProcesos(idGrupo, idArbolProceso) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        // console.log('pidiendo info', `grupos/${idGrupo}/arbol/${idArbol}`)
        const response = await self
          .fetchApi()
          .get(`grupos/${idGrupo}/arbolProcesos/${idArbolProceso}`);
        const { data } = response;
        // console.log(data.data)
        resolve(data);
      } catch (error) {
        console.log('rechazado');
        reject(error);
      }
    });

    return promise;
  }

  updateGroupProcesos(idGroup, jsonArbol) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self
          .fetchApi()
          .post(`grupos/AccesProccessByGroup/${idGroup}`, jsonArbol);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }
  
}

export default GroupService;
