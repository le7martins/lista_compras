const LaunchHandler = {
  canHandle(input) {
    return input.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(input) {
    const speech = 'Bem-vindo à lista de compras! Você pode adicionar itens, remover, ou pedir para eu ler a lista.';
    return input.responseBuilder
      .speak(speech)
      .reprompt('O que você gostaria de fazer?')
      .getResponse();
  },
};

module.exports = LaunchHandler;
