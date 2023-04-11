import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class PaymentsService {

  addPayments = async ({ payload }) => {
    let payments = await Helpers.post({
      url: paths.payments,
      data: payload,
    })
    console.log(payments);
    return payments;
  }

  updatePayments = async ({ payload }) => {
    let payments = await Helpers.put({
      url: `${paths.payments}/${payload.payments_id}`,
      data: payload,
    })
    console.log(payments);
    return payments;
  }

  getPaymentss = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const paymentss = await Helpers.get({
      url: `${paths.payments}${url_query}`,
    });
    return paymentss;
  }

  getPayments = async (id) => {
    const payments = await Helpers.get({
      url: `${paths.payments}/${id}`,
    });
    return payments;
  }

  getChatRooms = async (payments_id) => {
    let response = await Helpers.get({ url: `${paths.chatrooms}/${payments_id}` });
    return response;
  }
  getQueryChatRooms = async () => {
    let response = await Helpers.get({ url: `${paths.querychatrooms}` });
    return response;
  }


}
export default new PaymentsService();
