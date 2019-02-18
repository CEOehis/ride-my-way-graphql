import { generate } from 'shortid';

module.exports = (sequelize, DataTypes) => {
  const RideOffer = sequelize.define('RideOffer', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'origin must be provided'
        },
      },
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'destination must be provided'
        },
      },
    },
    departureDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: true,
        isDate: {
          msg: 'departure date must be of the format YYYY-MM-DD'
        },
      }
    },
    departureTime: {
      allowNull: false,
      type: DataTypes.TIME,
      validate: {
        isValidTime(time) {
          const regex = /^\d{2}:(\d{2}:)?\d{2}$/;
          if (!regex.test(time)) {
            throw new Error('departure time must be of the format hh:mm:ss');
          }
        },
        notEmpty: {
          msg: 'departure time must be provided'
        },
      }
    },
    availableSeats: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1],
          msg: 'There should be at least one available seat'
        },
        max: {
          args: [10],
          msg: 'Available seats should not be more than 10',
        }
      }
    }
  }, {});
  RideOffer.associate = function(models) {
    const { User } = models;
    RideOffer.belongsTo(User, {
      foreignKey: 'userId'
    });
  };

  RideOffer.beforeCreate((ride) => {
    ride.id = generate();
  })
  return RideOffer;
};
