const api = require('../utils/apiClient');

const CheckItemHandler = {
  canHandle(input) {
    return (
      input.requestEnvelope.request.type === 'IntentRequest' &&
      input.requestEnvelope.request.intent.name === 'CheckItemIntent'
    );
  },
  async handle(input) {
    const name = input.requestEnvelope.request.intent.slots?.Item?.value;

    if (!name) {
      return input.responseBuilder
        .speak('Qual item você quer marcar como comprado?')
        .reprompt('Qual item?')
        .getResponse();
    }

    try {
      const updated = await api.checkItemByName(name);
      if (!updated) {
        return input.responseBuilder
          .speak(`Não encontrei ${name} na lista.`)
          .getResponse();
      }
      return input.responseBuilder
        .speak(`Marquei ${name} como comprado.`)
        .getResponse();
    } catch {
      return input.responseBuilder
        .speak('Não consegui marcar o item. Tente novamente.')
        .getResponse();
    }
  },
};

module.exports = CheckItemHandler;
