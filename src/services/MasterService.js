import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class MasterService {

  addVendor = async ({ payload }) => {
    let response = await Helpers.post({
      url: paths.vendor,
      data: payload,
    })
    return response;
  }

  getVendors = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const response = await Helpers.get({
      url: `${paths.vendor}${url_query}`,
    });
    return response;
  }

  getStays = async ({ source = "MASTER" }) => {
    let filter = {};
    switch (source) {
      case "MASTER":
        filter = { type: "MASTER" }
        break;
      case "MARKETPLACE":
        filter = { type: "MARKETPLACE" }
        break;
      default:
        break;
    }
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

  getTransports = async ({ source = "MASTER" }) => {
    let filter = {};
    switch (source) {
      case "MASTER":
        filter = { type: "MASTER" }
        break;
      case "MARKETPLACE":
        filter = { type: "MARKETPLACE" }
        break;
      default:
        break;
    }
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

  getActivities = async ({ source = "MASTER" }) => {
    let filter = {};
    switch (source) {
      case "MASTER":
        filter = { type: "MASTER" }
        break;
      case "MARKETPLACE":
        filter = { type: "MARKETPLACE" }
        break;
      default:
        break;
    }
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

  getVisa = async (id) => {
    const response = await Helpers.get({
      url: `${paths.masterVisa}/${id}`,
    });
    return response;
  }

  addVisa = async ({ payload }) => {
    let response = await Helpers.post({
      url: paths.masterVisa,
      data: payload,
    })
    return response;
  }
  updateMasterVisa = async ({ payload }) => {
    let response = await Helpers.put({
      url: paths.masterVisa,
      data: payload,
    })
    return response;
  }

  getAllVisa = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const response = await Helpers.get({
      url: `${paths.masterVisa}${url_query}`,
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

  getTransport = async (id) => {
    const response = await Helpers.get({
      url: `${paths.masterTransport}/${id}`,
    });
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

}
export default new MasterService();
