const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tour_category.init(sequelize, DataTypes);
}

class tour_category extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tour_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
    ]
  });
  }
}
