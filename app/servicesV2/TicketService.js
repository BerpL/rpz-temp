import Service from './Service';

class TicketService extends Service {
  addRecord(ticket) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().post('ingresos', ticket);
        const { data } = response;

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }
}

export default TicketService;
