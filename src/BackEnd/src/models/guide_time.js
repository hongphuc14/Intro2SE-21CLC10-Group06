const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return guide_time.init(sequelize, DataTypes);
}

class guide_time extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_guidetime: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    id_guide: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tour_guide',
        key: 'id_guide'
      }
    },
    guide_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    guide_session: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'guide_time',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_guidetime" },
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
