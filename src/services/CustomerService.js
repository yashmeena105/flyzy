import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class CustomerService {

  getCustomers = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const customers = await Helpers.get({
      url: `${paths.customer}${url_query}`,
    });
    console.log(customers);
    return customers;
  }


}
export default new CustomerService();
