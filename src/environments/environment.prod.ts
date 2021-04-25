export const environment = {
  production: true,
  // apiUrl: 'http://ec2-3-17-5-56.us-east-2.compute.amazonaws.com',
  // apiUrl: 'http://localhost:8000',
  apiUrl: 'http://35.193.196.62',
  // oauth: { // Heroku and Localhost API
  //   clientId: '2',
  //   clientSecret: 'DXlqeXqoDpEN50v17s9qO4TaQUqRb46kaTGqnx0r'
  // }
  oauth: { // Amazon Web Services API
    clientId: '2',
    clientSecret: 'tDc7hEvRly7RgpBOlGT6OtNne1no98FP39NaZpkC'
  }
};
