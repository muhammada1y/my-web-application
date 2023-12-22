// // mp3_schama.js

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize("File");

// class Mp3 extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         title: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         description: {
//           type: DataTypes.TEXT,
//         },
//         file_data: {
//           type: DataTypes.BLOB('long'),
//           allowNull: false,
//         },
//         user_id: {
//           type: DataTypes.INTEGER,
//           references: {
//             model: 'user_info',
//             key: 'user_id',
//           },
//         },
//       },
//       {
//         sequelize,
//         modelName: 'mp3',
//         tableName: 'mp3',
//         timestamps: true,
//       }
//     );
//   }

//   // Additional methods, such as a save method, can be defined here
// }

// module.exports = Mp3;
