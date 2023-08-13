const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return guide_attraction.init(sequelize, DataTypes);
}

class guide_attraction extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_guide: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tour_guide',
        key: 'id_guide'
      }
    },
    id_attraction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    photo_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'guide_attraction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_guide" },
          { name: "id_attraction" },
        ]
      },
    ]
  });
  }
}
