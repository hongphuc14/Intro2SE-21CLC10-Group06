const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return guide_license.init(sequelize, DataTypes);
}

class guide_license extends Sequelize.Model {
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
    file_path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'guide_license',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_guide" },
        ]
      },
    ]
  });
  }
}
