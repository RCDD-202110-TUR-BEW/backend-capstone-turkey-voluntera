const { MongoClient } = require('mongodb');

const connectMongo = async () => {
  const mri =
    'mongodb+srv://volunterarecoded:12345voluntera@cluster0.diiga.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(mri);
  try {
    await client.connect();
    console.log('database connected successfully');
    // await  listDatabases(client);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
// connectMongo().catch(console.error);
