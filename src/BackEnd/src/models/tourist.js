const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tourist.init(sequelize, DataTypes);
}

class tourist extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_tourist: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id_role'
      }
    }
  }, {
    sequelize,
    tableName: 'tourist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tourist" },
        ]
      },
      {
        name: "id_role",
        using: "BTREE",
        fields: [
          { name: "id_role" },
        ]
      },
    ]
  });
  }
}
