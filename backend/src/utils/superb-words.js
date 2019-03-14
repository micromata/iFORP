const words = [
  'Blendend',
  'Brillant',
  'Cool',
  'Episch',
  'Erhaben',
  'Erstaunlich',
  'Erstklasig',
  'Exquisit',
  'Fabelhaft',
  'Fantastisch',
  'Glänzend',
  'Göttlich',
  'Großartig',
  'Herrlich',
  'Hervorragend',
  'Legendär',
  'Leuchtend',
  'Lobenswert',
  'Majestätisch',
  'Makellos',
  'Ordentlich',
  'Perfekt',
  'Phänomenal',
  'Schick',
  'Schön',
  'Sensationell',
  'Spektakulär',
  'Stilvoll',
  'Stylisch',
  'Transzendent',
  'Ultimativ',
  'Unglaublich',
  'Unwirklich',
  'Wunderbar',
  'Wundersam'
];

const getRandomNumber = max => Math.floor(Math.random() * Math.floor(max));

export const randomSuperbWord = () => {
  return words[getRandomNumber(words.length - 1)];
};
