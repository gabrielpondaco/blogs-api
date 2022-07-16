const { DataTypes } = require('sequelize')

const attributes = {
  postId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "BlogPosts",
      key: "id"
    },
  },
  categoryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "Categories",
      key: "id"
    },
  },
}

module.exports = (sequelize) => {
  const PostCategories = sequelize.define('PostCategory', attributes, { tableName: 'PostCategories', timestamps: false });

  PostCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { 
      through: PostCategories,
      foreignKey: 'postId',
      otherKey:'categoryId',
      as: 'categories',
    });
    models.BlogPost.belongsToMany(models.Category, { 
      through: PostCategories,
      foreignKey: 'categoryId', 
      otherKey:'postId',
      as: 'posts',
    });
  };

  return PostCategories;
}; 