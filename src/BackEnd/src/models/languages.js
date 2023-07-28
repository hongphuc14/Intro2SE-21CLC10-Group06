const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return languages.init(sequelize, DataTypes);
}

class languages extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_lang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lang_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'languages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_lang" },
        ]
      },
    ]
  });
  }
}
