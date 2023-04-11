import { PanToolAltRounded } from '@mui/icons-material';
import { summarizeDestinations } from 'utils/stringFunctions';
import Helpers from '../Config/helpers';
import paths from './apiConstants'
import LeadService from './LeadService';

/**
 * @param payload
 */
class ItineraryService {

  addItinerary = async ({ payload }) => {
    let response = await Helpers.post({
      url: paths.itinerary,
      data: payload,
    })
    return response;
  }

  getItineraries = async ({ source = "MASTER", lead_id = null }) => {
    let filter = {};
    switch (source) {
      case "MASTER":
        filter = { type: "MASTER" }
        break;
      case "MARKETPLACE":
        filter = { type: "MARKETPLACE" }
        break;
      case "LEAD":
        filter = { type: "LEAD", lead_id }
        break;
      default:
        break;
    }
    console.log("filter", filter);
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const response = await Helpers.get({
      url: `${paths.itinerary}${url_query}`,
    });
    return response;
  }

  getConfirmedItinerary = async (leadId) => {
    let info = { success: false, error: "No confirmed Itineraries" }
    const itineraries = await Helpers.get({
      url: `${paths.itinerary}?lead_id=${leadId}&is_confirmed=true`,
    });
    console.log("itineraries", itineraries);
    if (itineraries.success && itineraries.data.length > 0)
      info = itineraries.data[0]
    const components = await Helpers.get({
      url: `${paths.itineraryComponents}/${info.id}`,
    });
    let obj;
    let response = { days: {}, dayOrder: [], dayComponents: {}, info: {}, cost: 0 };
    if (itineraries.success && components.success) {
      obj = {
        info: info,
        components: components.data ?? [],
        days: info?.days ?? [],
      }
      response.info = obj.info
      obj.days.forEach(day => {
        let componentIds = []
        day.components.forEach(c => {
          componentIds.push(c);
        })
        day.componentIds = componentIds;
        delete day.components;
        response.days[day._id] = day
        response.dayOrder.push(day._id);
      })
      obj.components.forEach(component => {
        // if (!component.is_deleted)
        response.dayComponents[component._id] = component
        let cost = 0;
        component.items_selected.forEach(item => { cost += item.quantity * item.price })
        response.cost += cost
      })
      delete response.info?.days
      response = {
        success: true, data: response
      }
      return response;
    } else {
      return info;
    }
  }

  getItinerary = async (id) => {
    const info = await Helpers.get({
      url: `${paths.itinerary}/${id}`,
    });
    const components = await Helpers.get({
      url: `${paths.itineraryComponents}/${id}`,
    });
    let obj;
    let response = { days: {}, dayOrder: [], dayComponents: {}, info: {}, cost: 0 };
    if (info.success && components.success) {
      obj = {
        info: info.data[0],
        components: components.data ?? [],
        days: info.data[0]?.days ?? [],
      }
      response.info = obj.info
      obj.days.forEach(day => {
        let componentIds = []
        day.components.forEach(c => {
          componentIds.push(c);
        })
        day.componentIds = componentIds;
        delete day.components;
        response.days[day._id] = day
        response.dayOrder.push(day._id);
      })
      obj.components.forEach(component => {
        // if (!component.is_deleted)
        response.dayComponents[component._id] = component
        let cost = 0;
        component.items_selected.forEach(item => { cost += item.quantity * item.price })
        response.cost += cost
      })
      delete response.info?.days
      response = {
        success: true, data: response
      }
      return response;
    } else {
      return info;
    }
  }

  updateItinerary = async ({ payload, id }) => {
    let response = await Helpers.put({
      url: `${paths.itinerary}/details/${id}`,
      data: payload,
    })
    return response;
  }

  updateDay = async ({ payload, _id }) => {
    let response = await Helpers.put({
      url: `${paths.itineraryDay}/${_id}`,
      data: payload,
    })
    return response;
  }

  getItineraryComponents = async (id) => {
    const response = await Helpers.get({
      url: `${paths.itinerary}/${id}/components`,
    });
    return response;
  }

  getStays = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const response = await Helpers.get({
      url: `${paths.masterStay}${url_query}`,
    });
    return response;
  }
  getTransports = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const response = await Helpers.get({
      url: `${paths.masterTransport}${url_query}`,
    });
    return response;
  }

  getActivity = async (id) => {
    const response = await Helpers.get({
      url: `${paths.masterActivity}/${id}`,
    });
    return response;
  }

  addActivity = async ({ payload }) => {
    let response = await Helpers.post({
      url: paths.masterActivity,
      data: payload,
    })
    return response;
  }
  updateMasterActivity = async ({ payload }) => {
    let response = await Helpers.put({
      url: paths.masterActivity,
      data: payload,
    })
    return response;
  }

  getActivities = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const response = await Helpers.get({
      url: `${paths.masterActivity}${url_query}`,
    });
    return response;
  }

  getStay = async (id) => {
    const response = await Helpers.get({
      url: `${paths.masterStay}/${id}`,
    });
    return response;
  }

  addStay = async ({ payload }) => {
    let response = await Helpers.post({
      url: paths.masterStay,
      data: payload,
    })
    return response;
  }
  updateMasterStay = async ({ payload }) => {
    let response = await Helpers.put({
      url: paths.masterStay,
      data: payload,
    })
    return response;
  }
  addTransport = async ({ payload }) => {
    let response = await Helpers.post({
      url: paths.masterTransport,
      data: payload,
    })
    return response;
  }
  updateMasterTransport = async ({ payload }) => {
    let response = await Helpers.put({
      url: paths.masterTransport,
      data: payload,
    })
    return response;
  }



  addDayComponent = async (payload) => {
    console.log("add Day component payload", payload);
    let url = "";
    switch (payload.type) {
      case "STAY":
        url = paths.dayStay
        break;
      case "FLIGHT":
        url = paths.dayFlight
        break;
      case "ACTIVITY":
        url = paths.dayActivity
        break;
      case "TRANSPORT":
        url = paths.dayTransport
        break;
      case "VISA":
        url = paths.dayVisa
        break;
      default:
        break;
    }
    let response = await Helpers.post({
      url, data: {
        day_id: payload.dayId,
        vendor_id: payload.data.company_id,
        master_component_id: payload.data._id,
        items_selected: payload?.data?.items_selected
      }
    })
    return response;
  }

  updateDayComponent = async (payload) => {
    console.log("update Day component payload", payload);
    let url = "";
    switch (payload.type) {
      case "STAY":
        url = paths.dayStay
        break;
      case "FLIGHT":
        url = paths.dayFlight
        break;
      case "ACTIVITY":
        url = paths.dayActivity
        break;
      case "TRANSPORT":
        url = paths.dayTransport
        break;
      case "VISA":
        url = paths.dayVisa
        break;
      default:
        break;
    }
    let response = await Helpers.put({
      url, data: payload
    })
    return response;
  }

  deleteDayComponent = async (payload) => {
    console.log(payload);
    let response = await Helpers.delete({ url: `${paths.dayComponent}/${payload.id}`, data: { type: payload?.type } })
    return response;
  }

  /**
   * @param {position} position START, END 
   * @param {itineraryId} itineraryId
   */
  addExtraDay = async ({ position, itineraryId }) => {
    let response = await Helpers.post({ url: paths.itineraryDay, data: { itinerary_id: itineraryId, position } })
    return response;
  }


  addLeadItinerary = async ({ leadId }) => {
    let resp1 = await LeadService.getLead(leadId);
    if (resp1.success) {
      let ldt = resp1.data
      const payload = {
        ...ldt,
        type: "PERSONAL",
        start_date_utc: ldt?.travel_dates[0],
        name: ldt?.customer_name + "'s itinerary - " + summarizeDestinations(ldt?.destinations ?? [])
      }
      const resp2 = await this.addItinerary({ payload });
      return resp2;
    }
    return resp1;
  }

  confirmItinerary = async (id) => {
    let response = await Helpers.post({ url: `${paths.confirmItinerary}/${id}` })
    return response;
  }

  sendRequestToVendors = async ({ unconfirmed }) => {
    console.log("payload", unconfirmed);
    let response = await Helpers.post({ url: paths.marketplaceVendorLead, data: unconfirmed })
    return response
  }

  saveProposal = async (payload) => {
    let response = await Helpers.post({ url: `${paths.proposal}`, data: payload });
    return response;
  }

  createProposalLink = async (payload) => {
    let response = await Helpers.post({ url: `${paths.proposal}`, data: payload });
    return response;
  }

  getProposal = async ({ _id }) => {
    let response = await Helpers.get({ url: `${paths.proposal}/${_id}` });
    return response;
  }

}
export default new ItineraryService();
