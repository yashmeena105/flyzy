import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class QueryService {

  addQuery = async ({ payload }) => {
    console.log("payload", payload);
    let response = await Helpers.post({ url: paths.marketplaceVendorLead, data: payload })
    return response
  }

  updateQuery = async ({ payload }) => {
    let query = await Helpers.put({
      url: `${paths.query}/${payload.query_id}`,
      data: payload,
    })
    console.log(query);
    return query;
  }

  getAllQuery = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const querys = await Helpers.get({
      url: `${paths.query}${url_query}`,
    });
    return querys;
  }

  getQuery = async (id) => {
    const query = await Helpers.get({
      url: `${paths.query}/${id}`,
    });
    return query;
  }


}
export default new QueryService();
