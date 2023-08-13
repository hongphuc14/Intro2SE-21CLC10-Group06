const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tour_booking.init(sequelize, DataTypes);
}

class tour_booking extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_tour_booking: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tour: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tour',
        key: 'id_tour'
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
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    num_tourist: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    free_cancel: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tour_booking',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tour_booking" },
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
        name: "id_tour",
        using: "BTREE",
        fields: [
          { name: "id_tour" },
        ]
      },
    ]
  });
  }
}
