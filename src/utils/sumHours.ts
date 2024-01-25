import { type Song } from '../lib/data';

export default function sumarHoras(array: Song[]) {
  let suma = 0;
  let result = '';

  for (var j = 0; j < array.length; j++) {
    const duration = parseInt(array[j]?.duration);

    suma += duration;
  }

  if (suma / 60 >= 0) {
    return (result = Math.round(suma / 60) + 'm');
  }

  return (result = Math.round(suma) + 's');
}
