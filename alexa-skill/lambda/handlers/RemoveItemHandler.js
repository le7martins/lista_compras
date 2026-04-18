const api = require('../utils/apiClient');

const RemoveItemHandler = {
  canHandle(input) {
    return (
      input.requestEnvelope.request.type === 'IntentRequest' &&
      input.requestEnvelope.request.intent.name === 'RemoveItemIntent'
    );
  },
  async handle(input) {
    const name = input.requestEnvelope.request.intent.slots?.Item?.value;

    if (!name) {
      return input.responseBuilder
        .speak('Qual item você quer remover?')
        .reprompt('Qual item?')
        .getResponse();
    }

    try {
      const removed = await api.removeItemByName(name);
      if (!removed) {
        return input.responseBuilder
          .speak(`Não encontrei ${name} na lista.`)
          .getResponse();
      }
      return input.responseBuilder
        .speak(`Removi ${name} da lista.`)
        .getResponse();
    } catch {
      return input.responseBuilder
        .speak('Não consegui remover o item. Tente novamente.')
        .getResponse();
    }
  },
};

module.exports = RemoveItemHandler;
