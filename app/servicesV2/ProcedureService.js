import Service from './Service';

class ProcedureService extends Service {
  getTree() {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get('arbolproceso/archives');
        const { data } = response;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getProcedure(id) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get(`procesos/${id}`);
        const { data } = response;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getProcedureMediaType(id) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get(`procesos/${id}/tipomedios`);
        const { data } = response;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getProcedureMediaById(id, idMedia) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self
          .fetchApi()
          .get(`procesos/${id}/medios/${idMedia}`);
        const { data } = response;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }
}

export default ProcedureService;
