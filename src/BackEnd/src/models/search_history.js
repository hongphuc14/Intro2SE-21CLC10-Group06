const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return search_history.init(sequelize, DataTypes);
}

class search_history extends Sequelize.Model {
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
    id_des: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'destination',
        key: 'id_des'
      }
    },
    time_search: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'search_history',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tourist" },
          { name: "id_des" },
        ]
      },
      {
        name: "id_des",
        using: "BTREE",
        fields: [
          { name: "id_des" },
        ]
      },
    ]
  });
  }
}
