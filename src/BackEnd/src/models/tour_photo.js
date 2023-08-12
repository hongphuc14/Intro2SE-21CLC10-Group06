const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tour_photo.init(sequelize, DataTypes);
}

class tour_photo extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_tour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tour',
        key: 'id_tour'
      }
    },
    photo_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tour_photo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tour" },
        ]
      },
    ]
  });
  }
}
