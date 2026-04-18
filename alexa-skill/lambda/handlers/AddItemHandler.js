const api = require('../utils/apiClient');

const AddItemHandler = {
  canHandle(input) {
    return (
      input.requestEnvelope.request.type === 'IntentRequest' &&
      input.requestEnvelope.request.intent.name === 'AddItemIntent'
    );
  },
  async handle(input) {
    const slots = input.requestEnvelope.request.intent.slots || {};
    const name = slots.Item?.value;
    const quantity = parseInt(slots.Quantity?.value, 10) || 1;
    const unit = slots.Unit?.value || undefined;

    if (!name) {
      return input.responseBuilder
        .speak('Qual item você gostaria de adicionar à lista?')
        .reprompt('Qual item?')
        .getResponse();
    }

    try {
      await api.addItem(name, quantity, unit);
      const qtdText = quantity > 1 ? `${quantity}${unit ? ` ${unit} de` : ''} ` : '';
      return input.responseBuilder
        .speak(`Adicionei ${qtdText}${name} à lista de compras.`)
        .getResponse();
    } catch {
      return input.responseBuilder
        .speak('Não consegui adicionar o item. Tente novamente.')
        .getResponse();
    }
  },
};

module.exports = AddItemHandler;
