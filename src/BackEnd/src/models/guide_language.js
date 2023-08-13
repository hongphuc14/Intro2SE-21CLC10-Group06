const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return guide_language.init(sequelize, DataTypes);
}

class guide_language extends Sequelize.Model {
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
    id_lang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'languages',
        key: 'id_lang'
      }
    }
  }, {
    sequelize,
    tableName: 'guide_language',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_guide" },
          { name: "id_lang" },
        ]
      },
      {
        name: "id_lang",
        using: "BTREE",
        fields: [
          { name: "id_lang" },
        ]
      },
    ]
  });
  }
}
