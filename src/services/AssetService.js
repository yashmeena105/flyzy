import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class AssetService {

  addAsset = async ({ payload }) => {
    let asset = await Helpers.post({
      url: paths.libraryAsset,
      data: payload,
    })
    return asset;
  }

  getAssets = async (filter = {}) => {
    // JSON to url query convertor
    let url = new URL('http://placeholder');
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        url.searchParams.set(key, filter[key])
      }
    });
    let url_query = Object.keys(filter).length ? `?${url.search.slice(1)}` : "";
    const assets = await Helpers.get({
      url: `${paths.libraryAsset}${url_query}`,
    });
    return assets;
  }

  deleteAsset = async ({ uid }) => {
    let asset = await Helpers.delete({
      url: paths.libraryAsset,
      data: { uid },
    })
    return asset;
  }

}
export default new AssetService();
