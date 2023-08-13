const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return guide_booking.init(sequelize, DataTypes);
}

class guide_booking extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_guidebooking: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_guidetime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'guide_time',
        key: 'id_guidetime'
      }
    },
    id_tourist: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tourist',
        key: 'id_tourist'
      }
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    meeting_point: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'guide_booking',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_guidebooking" },
        ]
      },
      {
        name: "id_tourist",
        using: "BTREE",
        fields: [
          { name: "id_tourist" },
        ]
      },
      {
        name: "id_guidetime",
        using: "BTREE",
        fields: [
          { name: "id_guidetime" },
        ]
      },
    ]
  });
  }
}
