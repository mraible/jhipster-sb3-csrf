import { IPlace, NewPlace } from './place.model';

export const sampleWithRequiredData: IPlace = {
  id: 'ae9b0593-d623-4594-8ede-f045b1567131',
  name: 'invoice woman',
};

export const sampleWithPartialData: IPlace = {
  id: 'c49467c4-2b18-4601-a66b-5d8a15c9a7cd',
  name: 'Southeast',
  numberOfSeats: 55252,
  shortName: 'Handmade Shanna',
  colorBackground: 'synthesizing Concrete',
};

export const sampleWithFullData: IPlace = {
  id: '17fcf32d-cc33-4390-946f-491b92a79bfb',
  name: 'protocol Gasoline payment',
  numberOfSeats: 89670,
  shortName: 'male Nihonium',
  colorBackground: 'for',
  colorText: 'pixel eyeballs Creative',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewPlace = {
  name: 'silver aliquam',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
