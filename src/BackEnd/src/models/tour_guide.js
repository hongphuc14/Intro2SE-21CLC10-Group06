const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tour_guide.init(sequelize, DataTypes);
}

class tour_guide extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_guide: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fullname: {
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_des: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'destination',
        key: 'id_des'
      }
    },
    experience: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price_per_session: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    free_cancellation: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'tour_guide',
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
      {
        name: "id_role",
        using: "BTREE",
        fields: [
          { name: "id_role" },
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
