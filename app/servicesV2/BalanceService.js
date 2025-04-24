import Service from './Service';

class BalanceService extends Service {
  addBalance(balance) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().post('Flujos/InsertFlujo', balance);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

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

  getBalance() {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get('Flujos/FormularioTiposBalance');
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getBalanceById(id) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get(`Flujos/${id}`);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  updateBalance(updateBalance) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().post(`Flujos/UpdateFlujo`, updateBalance);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  getBalances() {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get(`Flujos`);
        const { data } = response;
        // console.log(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  deleteBalance(id) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().get(`Flujos/DeleteFlujo/${id}`);
        const { data } = response;
        
        resolve(data);
      } catch (error) {
        // console.log(error.message)
        reject(error);

      }
    });

    return promise;
  }
  
}

export default BalanceService;
