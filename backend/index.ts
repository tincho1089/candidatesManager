import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import mongoose from 'mongoose';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { candidates } from './testData';
import { ICandidate } from './models';
const dbContext = process.argv[2] == 'mongodb' ? 'mongodb' : 'localhost';

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });

  mongoose.connect(`mongodb://${dbContext}:27017/myapp`);

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );


  // Obtener la referencia a la base de datos y la colección
  const db = mongoose.connection;
  const colection = db.collection('candidates');

  const options = { maxTimeMS: 60000 }; 
  
  if (!db.collection('candidates')) {
    db.createCollection('candidates');
    console.log("La colección 'Candidates' se ha creado correctamente.");
  }
  const countDocuments = await colection.countDocuments({}, options);

  if (countDocuments === 0) {
    const newCandidates = candidates.map((candidate: ICandidate) => {
      if (candidate.hasOwnProperty('id')) {
        delete candidate['id'];
      }
      return candidate;
    });
    const resultado = await colection.insertMany(newCandidates);
    console.log(`Se insertaron ${resultado.insertedCount} documentos en la colección.`);
  } else {
    console.log(`La colección ya tiene documentos. No se insertó nada.`);
  }
}

startServer();
