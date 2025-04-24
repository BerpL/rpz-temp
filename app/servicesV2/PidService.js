import Service from './Service';

class PidService extends Service {
  getTree() {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get('arbolpids/archives');
        const { data } = response;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getPid(id) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get(`pids/${id}`);
        const { data } = response;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }
}

export default PidService;
