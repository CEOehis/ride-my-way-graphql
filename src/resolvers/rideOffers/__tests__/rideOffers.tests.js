import { runQuery, resetDB } from '../../../../test/helpers';
import { User, RideOffer, sequelize } from '../../../database/models';

describe('Ride Offers', () => {
  let user;
  beforeEach(async () => {
    await resetDB();
    user = await User.create({
      username: 'testuser',
      fullName: 'test user',
      password: 'password',
      email: 'testuser@mail.com'
    });
  });;

  afterEach(async () => {
    await resetDB();
  });

  it('should create a ride offer', async () => {
    const result = await runQuery(`
      mutation newRide($input: NewRideOffer!) {
        rideOffer: createRideOffer(input: $input) {
          id
          origin
          destination
          departureDate
          departureTime
          availableSeats
          offeredBy {
            id
            username
            fullName
            email
            phone
          }
        }
      }
    `, {input: {
          "origin": "Lagos",
          "destination": "Nairobi",
          "departureDate": "2019-02-19",
          "departureTime": "19:56:00",
          "availableSeats": "3"
        }
      }, user);

    expect(result.errors).toBeUndefined();
    expect(typeof result.data.rideOffer).toBe('object');
    expect(result.data.rideOffer).toHaveProperty('origin', 'Lagos');
  });


  it('should return error for unathenticated user', async () => {
    const result = await runQuery(`
      mutation newRide($input: NewRideOffer!) {
        rideOffer: createRideOffer(input: $input) {
          id
          origin
          destination
          departureDate
          departureTime
          availableSeats
          offeredBy {
            id
            username
            fullName
            email
            phone
          }
        }
      }
    `, {input: {
          "origin": "Lagos",
          "destination": "Nairobi",
          "departureDate": "2019-02-19",
          "departureTime": "19:56:00",
          "availableSeats": "3"
        }
      });

    expect(result.errors).toBeDefined();
    expect(result.errors[0].message).toEqual('You are not authenticated');
  });
});
