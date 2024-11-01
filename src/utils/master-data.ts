// import mongoose from 'mongoose';
// import YourModel from './models/YourModel'; // Adjust the import as needed

// async function insertMasterData() {
//   await mongoose.connect('mongodb://localhost:27017/yourDatabase', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const existingData = await YourModel.findOne({
//     /* your condition to check existing data */
//   });
//   if (existingData) {
//     console.log('Master data already exists. Skipping insertion.');
//     return;
//   }

//   const masterData = [
//     // Your master data here
//   ];

//   await YourModel.insertMany(masterData);
//   console.log('Master data inserted successfully.');

//   await mongoose.disconnect();
// }

// insertMasterData().catch(console.error);

// "scripts": {
//     "insert-master-data": "tsc && node dist/insertMasterData.js"
// }

// npm run insert-master-data
