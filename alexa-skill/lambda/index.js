const Alexa = require('ask-sdk-core');
const LaunchHandler = require('./handlers/LaunchHandler');
const AddItemHandler = require('./handlers/AddItemHandler');
const RemoveItemHandler = require('./handlers/RemoveItemHandler');
const ListItemsHandler = require('./handlers/ListItemsHandler');
const CheckItemHandler = require('./handlers/CheckItemHandler');

const HelpHandler = {
  canHandle(input) {
    return (
      input.requestEnvelope.request.type === 'IntentRequest' &&
      input.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    );
  },
  handle(input) {
    return input.responseBuilder
      .speak(
        'Você pode dizer: adiciona leite à lista, remove pão da lista, ' +
        'o que está na lista, ou marca leite como comprado.'
      )
      .reprompt('O que você gostaria de fazer?')
      .getResponse();
  },
};

const CancelStopHandler = {
  canHandle(input) {
    const { intent } = input.requestEnvelope.request;
    return (
      input.requestEnvelope.request.type === 'IntentRequest' &&
      (intent.name === 'AMAZON.CancelIntent' || intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(input) {
    return input.responseBuilder.speak('Até logo!').getResponse();
  },
};

const ErrorHandler = {
  canHandle: () => true,
  handle(input, error) {
    console.error('Alexa error:', error);
    return input.responseBuilder
      .speak('Ocorreu um erro. Por favor, tente novamente.')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchHandler,
    AddItemHandler,
    RemoveItemHandler,
    ListItemsHandler,
    CheckItemHandler,
    HelpHandler,
    CancelStopHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
