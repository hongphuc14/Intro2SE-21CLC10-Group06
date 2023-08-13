const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tour.init(sequelize, DataTypes);
}

class tour extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_tour: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_company: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id_company'
      }
    },
    name: {
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
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tour_category',
        key: 'id_category'
      }
    },
    num_max: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    schedule: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    included: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    not_included: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ggmap_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    free_cancellation: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tour',
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
      {
        name: "id_company",
        using: "BTREE",
        fields: [
          { name: "id_company" },
        ]
      },
      {
        name: "id_des",
        using: "BTREE",
        fields: [
          { name: "id_des" },
        ]
      },
      {
        name: "id_category",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
    ]
  });
  }
}
