import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class LocationService {

  searchLocations = async (filter = {}) => {
    const locations = await Helpers.post({
      url: `${paths.getDestinations}`,
      data: { search_text: filter?.search_text ?? "" }
    });
    return locations;
  }


}
export default new LocationService();
