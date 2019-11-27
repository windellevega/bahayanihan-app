export const environment = {
  production: true,
  // apiUrl: 'http://ec2-3-17-5-56.us-east-2.compute.amazonaws.com',
  // apiUrl: 'http://localhost:8000',
  apiUrl: 'http://ec2-3-17-5-56.us-east-2.compute.amazonaws.com',
  // oauth: { // Heroku and Localhost API
  //   clientId: '2',
  //   clientSecret: 'DXlqeXqoDpEN50v17s9qO4TaQUqRb46kaTGqnx0r'
  // }
  oauth: { // Amazon Web Services API
    clientId: '2',
    clientSecret: 'DXlqeXqoDpEN50v17s9qO4TaQUqRb46kaTGqnx0r'
  }
};
