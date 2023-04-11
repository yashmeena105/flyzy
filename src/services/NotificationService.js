import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class NotificationService {

  getNotifications = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const notifications = await Helpers.get({
      url: `${paths.notification}${url_query}`,
    });
    console.log(notifications);
    return notifications;
  }

  sendNotification = async (payload) => {
    const response = await Helpers.post({
      url: `${paths.messageNotification}`,
      data: payload,
    });
    return response;
  }


}
export default new NotificationService();
