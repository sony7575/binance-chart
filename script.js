
const ctx = document.getElementById('priceChart').getContext('2d');

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'BTC/USDT Price',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: {
    scales: {
      x: { display: true },
      y: { display: true }
    }
  }
});

async function fetchPrice() {
  try {
    const res = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=30');
    const data = await res.json();

    const labels = data.map(item => {
      const date = new Date(item[0]);
      return `${date.getHours()}:${date.getMinutes()}`;
    });

    const prices = data.map(item => parseFloat(item[4]));

    chart.data.labels = labels;
    chart.data.datasets[0].data = prices;
    chart.update();
  } catch (err) {
    console.error('Error fetching data', err);
  }
}

fetchPrice();
setInterval(fetchPrice, 60000);
