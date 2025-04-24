import Service from './Service';

class ControlGroupService extends Service {
  getAllByParent(id) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get(`grupocontrol/${id}/all`);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getEtiquetaModulo(id) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self
          .fetchApi()
          .get(`grupocontrol/${id}/etiquetamodulo`);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }
}

export default ControlGroupService;
