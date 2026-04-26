const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 EstateIntel Backend running at http://localhost:${PORT}`);
  console.log(`   → Resources API: http://localhost:${PORT}/api/resources`);
});
