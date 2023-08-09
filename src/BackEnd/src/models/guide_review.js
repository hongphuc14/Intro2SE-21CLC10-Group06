const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return guide_review.init(sequelize, DataTypes);
}

class guide_review extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_guidebooking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'guide_booking',
        key: 'id_guidebooking'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reply_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    report: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    report_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    report_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'guide_review',
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
    ]
  });
  }
}
