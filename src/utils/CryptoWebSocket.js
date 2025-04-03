export const setupCryptoWebSocket = (dispatch) => {
  const coins = ["btcusdt", "ethusdt", "adausdt"];
  const sockets = {};

  coins.forEach((coin) => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@trade`);

    ws.onopen = () => console.log(`WebSocket Connected: ${coin}`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        dispatch({
          type: "crypto/updateCryptoPrice",
          payload: { id: coin.slice(0, -4), current_price: parseFloat(data.p) },
        });
      } catch (error) {
        console.error(`Error parsing WebSocket message for ${coin}:`, error);
      }
    };

    ws.onerror = (error) => console.error(`WebSocket Error (${coin}):`, error);

    ws.onclose = (event) =>
      console.log(`WebSocket closed (${coin}): Code ${event.code}`);

    sockets[coin] = ws;
  });

  return () => Object.values(sockets).forEach((ws) => ws.close());
};
