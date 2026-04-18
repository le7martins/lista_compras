const api = require('../utils/apiClient');

const ListItemsHandler = {
  canHandle(input) {
    return (
      input.requestEnvelope.request.type === 'IntentRequest' &&
      input.requestEnvelope.request.intent.name === 'ListItemsIntent'
    );
  },
  async handle(input) {
    try {
      const items = await api.getItems();
      const pending = items.filter((i) => !i.checked);

      if (!pending.length) {
        return input.responseBuilder
          .speak('Sua lista de compras está vazia.')
          .getResponse();
      }

      const listed = pending.map((i) => i.name).join(', ');
      const count = pending.length;
      return input.responseBuilder
        .speak(`Você tem ${count} ${count === 1 ? 'item' : 'itens'} na lista: ${listed}.`)
        .getResponse();
    } catch {
      return input.responseBuilder
        .speak('Não consegui ler a lista agora. Tente novamente.')
        .getResponse();
    }
  },
};

module.exports = ListItemsHandler;
