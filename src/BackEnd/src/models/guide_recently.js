const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return guide_recently.init(sequelize, DataTypes);
}

class guide_recently extends Sequelize.Model {
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
    },
    time_view: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'guide_recently',
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
