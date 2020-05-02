const dev_url = 'http://localhost:3001/';
const prod_url = 'https://e-learning-api.herokuapp.com/';
export const base_url = process.env.NODE_ENV === 'development' ? dev_url : prod_url;