const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return guide_wishlist.init(sequelize, DataTypes);
}

class guide_wishlist extends Sequelize.Model {
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
    id_guide: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tour_guide',
        key: 'id_guide'
      }
    }
  }, {
    sequelize,
    tableName: 'guide_wishlist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tourist" },
          { name: "id_guide" },
        ]
      },
      {
        name: "id_guide",
        using: "BTREE",
        fields: [
          { name: "id_guide" },
        ]
      },
    ]
  });
  }
}
