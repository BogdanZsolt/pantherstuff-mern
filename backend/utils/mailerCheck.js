import axios from 'axios';

let headers = {
  'X-Version': '2022-10-01', // lock to a specific version of the API
  'X-Requested-With': 'XMLHttpRequest',
  Content_type: 'application/json',
};

const handleResponse = (response) => {
  if (response.status === 200) {
    return {
      data: response.data,
      statusCode: response.status,
    };
  } else if (response.status === 201) {
    return {
      data: response.data,
      statusCode: response.status,
      message: 'Resource was created',
    };
  } else if (response.status === 202) {
    return {
      data: response.data,
      statusCode: response.status,
      message:
        'The request was accepted and further actions are taken in the background',
    };
  } else if (response.status === 204) {
    return {
      data: response.data,
      statusCode: response.status,
      message: 'The request was accepted and there is no content to return',
    };
  } else if (response.status === 400) {
    throw 'Bad request';
  } else if (response.status === 401) {
    throw 'Invalid API key';
  } else if (response.status === 402) {
    throw 'Not enough credits';
  } else if (response.status === 403) {
    throw 'Forbidden';
  } else if (response.status === 404) {
    throw 'Not found';
  } else if (response.status === 405) {
    throw 'Method not allowed';
  } else if (response.status === 408) {
    throw 'Request timeout';
  } else if (response.status === 409) {
    throw 'Verification already started';
  } else if (response.status === 422) {
    throw 'Unprocessable entity';
  } else if (response.status === 500) {
    throw 'Internal server error';
  } else if (response.status === 502) {
    throw 'Bad gateway';
  } else if (response.status === 503) {
    throw 'Service unavailable';
  } else if (response.status === 504) {
    throw 'Gateway timeout';
  } else {
    throw 'Oops something went wrong, please try again later or contact support here: https://www.mailercheck.com/support';
  }
};

class Mailercheck {
  constructor(config) {
    this.api_key = config.api_key;
    this.basePath = 'https://app.mailercheck.com/api';
    headers.Authorization = `Bearer ${this.api_key}`;
  }

  async checkEmail({ email }) {
    const response = await axios.post(
      this.basePath + '/check/single',
      { email },
      { headers }
    );
    return handleResponse(response);
  }

  async createList({ name, emails }) {
    if (!name) name = new Date().toISOString(); // if no name is provided, default to ISODate
    const body = { name, emails };
    const response = await axios.post(this.basePath + '/lists', body, {
      headers,
    });
    return handleResponse(response);
  }

  async verifyList({ id }) {
    const response = await axios.put(
      this.basePath + '/lists/' + id + '/verify',
      {},
      { headers }
    );
    return handleResponse(response);
  }

  async getList({ id }) {
    const response = await axios.get(this.basePath + '/lists/' + id, {
      headers,
    });
    return handleResponse(response);
  }

  async getListResults({ id, page, result }) {
    let params = {};
    if (page) params.page = page;
    if (result) params.result = result;
    const response = await axios.get(
      this.basePath + '/lists/' + id + '/results',
      { headers, params }
    );
    return handleResponse(response);
  }

  async getCreditBalance() {
    const response = await axios.get(this.basePath + '/credits', { headers });
    return handleResponse(response);
  }
}

export default Mailercheck;
