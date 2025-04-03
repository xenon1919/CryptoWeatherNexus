export const setupWeatherAlerts = (dispatch) => {
  setInterval(() => {
    const alerts = [
      "Heavy rain expected in London!",
      "Storm warning for New York!",
      "Heatwave alert in Tokyo!",
    ];
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];

    dispatch({
      type: "weather/addWeatherAlert",
      payload: randomAlert,
    });
  }, 30000); // Simulate alerts every 30 seconds
};
