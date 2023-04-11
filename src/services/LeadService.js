import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class LeadService {

  addLead = async ({ payload }) => {
    let lead = await Helpers.post({
      url: paths.lead,
      data: payload,
    })
    console.log(lead);
    return lead;
  }

  updateLead = async ({ payload }) => {
    let lead = await Helpers.put({
      url: `${paths.lead}/${payload.lead_id}`,
      data: payload,
    })
    console.log(lead);
    return lead;
  }

  getLeads = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const leads = await Helpers.get({
      url: `${paths.lead}${url_query}`,
    });
    return leads;
  }

  getLead = async (id) => {
    const lead = await Helpers.get({
      url: `${paths.lead}/${id}`,
    });
    return lead;
  }

  getChatRooms = async (lead_id) => {
    let response = await Helpers.get({ url: `${paths.chatrooms}/${lead_id}` });
    return response;
  }
  getQueryChatRooms = async () => {
    let response = await Helpers.get({ url: `${paths.querychatrooms}` });
    return response;
  }


}
export default new LeadService();
