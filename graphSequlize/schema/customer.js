const Sequelize = require('sequelize');
const { mysql } = require('../connection/connection');

const Category = mysql.define('Category', {
    Category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Category_Name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    active: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    }
});

Category.sync({ force: false }).then((res) => {
    console.log('Category Table Create Succesfully');
}).catch((err) => {
    console.log('Error in creating Table', err);
})

module.exports = Category;

