import angular from 'angular';
import apollo from 'angular1-apollo';
import gql from 'graphql-tag';

import '../style/app.css';

import { client } from './apollo';

const fragment = gql`
  fragment BasicMessage on Message {
    id
    text
  }
`;
const query = gql`
  query getHello {
    hello
  }
`;

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor(apollo) {
    this.hello = 'loading...';
    this.apollo = apollo;
  }

  $onInit() {
    this.apollo.query({
      query: gql`
        query getHello {
          hello {
            ...BasicMessage
          }
        }
        
        ${fragment}
      `
    }).then(response => {
      console.log('response', response);
      this.hello = response.data.hello.text;
    });
  }
}

AppCtrl.$inject = ['apollo'];

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [ apollo ])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .config(['apolloProvider', (apolloProvider) => {
    apolloProvider.defaultClient(client);
  }])

export default MODULE_NAME;