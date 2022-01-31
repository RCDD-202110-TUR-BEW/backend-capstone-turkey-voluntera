const { MongoClient } = require('mongodb');

const connectMongo = async () => {
  const uri =
    'mongodb+srv://volunterarecoded:12345voluntera@cluster0.diiga.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Atlas database connected successfully');
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

module.exports = connectMongo;
