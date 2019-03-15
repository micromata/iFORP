const words = [
  'Blendend',
  'Brillant',
  'Cool',
  'Episch',
  'Erhaben',
  'Erstaunlich',
  'Erstklassig',
  'Exquisit',
  'Fabelhaft',
  'Fantastisch',
  'Genial',
  'Glänzend',
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
  'Toll',
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
