const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tour_wishlist.init(sequelize, DataTypes);
}

class tour_wishlist extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_tourist: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tourist',
        key: 'id_tourist'
      }
    },
    id_tour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tour',
        key: 'id_tour'
      }
    }
  }, {
    sequelize,
    tableName: 'tour_wishlist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tourist" },
          { name: "id_tour" },
        ]
      },
      {
        name: "id_tour",
        using: "BTREE",
        fields: [
          { name: "id_tour" },
        ]
      },
    ]
  });
  }
}
