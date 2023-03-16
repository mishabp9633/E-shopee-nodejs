import axios from 'axios';
import { LocationDataDto } from '@/dtos/utils.dto';
import { Env } from '@/configs/env';

export async function drivingLocationFinder(locationData: LocationDataDto) {

  const originCoordinates = `${locationData.originCoordinates[0]},${locationData.originCoordinates[1]}`
  const destinationCoordinates = `${locationData.destinationCoordinates[0]},${locationData.destinationCoordinates[1]}`

  try {
    const { data } = await axios.post(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originCoordinates}&destinations=${destinationCoordinates}&mode=driving&sensor=false&units=imperial&key=${Env.GOOGLE_MAP_API_KEY}`
    )
    
    const drivingDistance = data.rows[0].elements[0].distance.value / 1000;
    const drivingDuration = data.rows[0].elements[0].duration.text;
    
    console.log('drivingDistance: ', drivingDistance);
    console.log('drivingDuration: ', drivingDuration);
    return {drivingDistance, drivingDuration}
  } catch (error) {
    console.log(error);
  }
}

