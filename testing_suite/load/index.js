import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // target is the number of VUs making requests
  // duration is the amount of time they have to receive the response before failing

  stages: [
    {duration: '1m', target: 1500},
    {duration: '1m', target: 2000},
    {duration: '1m', target: 2500},
    {duration: '1m', target: 2000},
    {duration: '1m', target: 1500},
  ],
};

export default () => {
  const randomProductId = Math.floor(Math.random() * 100);
  const response = http.get(`http://127.0.0.1:3000/qa/questions?product_id=${randomProductId}&page=1&count=10`);
  // const response = http.get('http://18.221.51.19/qa/questions?product_id=1&page=1&count=10');
  sleep(1);

  const checkResponse = check(response, {
    'status code 200: ': (res) => res.status === 200,
  });
};
