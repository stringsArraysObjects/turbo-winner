exports.handler = async () => {
  const mySecret = process.env.MONGODB_URI;
  return {
    statusCode: 200,
    body: `server.js ${mySecret}`
  };
};
