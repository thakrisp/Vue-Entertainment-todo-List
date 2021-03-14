import axios from 'axios';

const url = 'items';

class ListService {
  static getList() {
    return axios.get(url).then((res) => res.data);
  }

  //Create item
  static insertItem(text) {
    return axios.post(url, {
      text,
    });
  }

  //Delete item
  static delteItem(id) {
    return axios.delete(`${url}${id}`, {
      id,
    });
  }
}

export default ListService;
