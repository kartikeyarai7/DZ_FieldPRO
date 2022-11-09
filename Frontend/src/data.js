const totalSiteOptions = [
  { value: 'Zighoud', label: 'Zighoud' },
  { value: 'Amirouche', label: 'Amirouche' },
  { value: 'Blida', label: 'Blida' },
  { value: 'Ghardaia', label: 'Ghardaia' },
  { value: 'Chlef', label: 'Chlef' },
  { value: 'Tipaza', label: 'Tipaza' },
  { value: 'Boumerdes', label: 'Boumerdes' },
  { value: 'Tizi Ouzou', label: 'Tizi Ouzou' },
  { value: 'Bejaia', label: 'Bejaia' },
  { value: 'Bouira', label: 'Bouira' },
  { value: 'Ain Defla', label: 'Ain Defla' },
  { value: 'Medea', label: 'Medea' },
  { value: 'Djelfa', label: 'Djelfa' },
  { value: 'Tamanrasset', label: 'Tamanrasset' },
  { value: 'Laghouat', label: 'Laghouat' },
  { value: 'Illizi', label: 'Illizi' },
  { value: 'Setif', label: 'Setif' },
  { value: 'Constantine', label: 'Constantine' },
  { value: 'Annaba', label: 'Annaba' },
  { value: 'Jijel', label: 'Jijel' },
  { value: 'Batna', label: 'Batna' },
  { value: 'Biskra', label: 'Biskra' },
  { value: 'Tebessa', label: 'Tebessa' },
  { value: 'El-Oued', label: 'El-Oued' },
  { value: 'B-B-Arreridj', label: 'B-B-Arreridj' },
  { value: 'Bba', label: 'Bba' },
  { value: `M\'Sila`, label: `M\'Sila` },
  { value: 'Oum-El-Bouaghi', label: 'Oum-El-Bouaghi' },
  { value: 'Guelma', label: 'Guelma' },
  { value: 'Skikda', label: 'Skikda' },
  { value: 'Ouargla', label: 'Ouargla' },
  { value: 'El-Tarf', label: 'El-Tarf' },
  { value: 'Souk-Ahras', label: 'Souk-Ahras' },
  { value: 'Mila', label: 'Mila' },
  { value: 'Khenchela', label: 'Khenchela' },
  { value: 'Oran', label: 'Oran' },
  { value: 'Tlemcen', label: 'Tlemcen' },
  { value: 'Sidi-Belabbes', label: 'Sidi-Belabbes' },
  { value: 'Mascara', label: 'Mascara' },
  { value: 'Mostaganem', label: 'Mostaganem' },
  { value: 'Tiaret', label: 'Tiaret' },
  { value: 'Bechar', label: 'Bechar' },
  { value: 'Saida', label: 'Saida' },
  { value: 'Naama', label: 'Naama' },
  { value: 'Ain-Temouchent', label: 'Ain-Temouchent' },
  { value: 'Relizane', label: 'Relizane' },
  { value: 'Adrar', label: 'Adrar' },
  { value: 'El-Bayadh', label: 'El-Bayadh' },
  { value: 'Tissemsilt', label: 'Tissemsilt' },
  { value: 'Tindouf', label: 'Tindouf' }
];

const centralSiteOptions = [
  { value: 'Zighoud', label: 'Zighoud' },
  { value: 'Amirouche', label: 'Amirouche' },
  { value: 'Blida', label: 'Blida' },
  { value: 'Ghardaia', label: 'Ghardaia' },
  { value: 'Chlef', label: 'Chlef' },
  { value: 'Tipaza', label: 'Tipaza' },
  { value: 'Boumerdes', label: 'Boumerdes' },
  { value: 'Tizi Ouzou', label: 'Tizi Ouzou' },
  { value: 'Bejaia', label: 'Bejaia' },
  { value: 'Bouira', label: 'Bouira' },
  { value: 'Ain Defla', label: 'Ain Defla' },
  { value: 'Medea', label: 'Medea' },
  { value: 'Djelfa', label: 'Djelfa' },
  { value: 'Tamanrasset', label: 'Tamanrasset' },
  { value: 'Laghouat', label: 'Laghouat' },
  { value: 'Illizi', label: 'Illizi' }
];

const westSiteOptions = [
  { value: 'Oran', label: 'Oran' },
  { value: 'Tlemcen', label: 'Tlemcen' },
  { value: 'Sidi-Belabbes', label: 'Sidi-Belabbes' },
  { value: 'Mascara', label: 'Mascara' },
  { value: 'Mostaganem', label: 'Mostaganem' },
  { value: 'Tiaret', label: 'Tiaret' },
  { value: 'Bechar', label: 'Bechar' },
  { value: 'Saida', label: 'Saida' },
  { value: 'Naama', label: 'Naama' },
  { value: 'Ain-Temouchent', label: 'Ain-Temouchent' },
  { value: 'Relizane', label: 'Relizane' },
  { value: 'Adrar', label: 'Adrar' },
  { value: 'El-Bayadh', label: 'El-Bayadh' },
  { value: 'Tissemsilt', label: 'Tissemsilt' },
  { value: 'Tindouf', label: 'Tindouf' }
];

const eastSiteOptions = [
  { value: 'Setif', label: 'Setif' },
  { value: 'Constantine', label: 'Constantine' },
  { value: 'Annaba', label: 'Annaba' },
  { value: 'Jijel', label: 'Jijel' },
  { value: 'Batna', label: 'Batna' },
  { value: 'Biskra', label: 'Biskra' },
  { value: 'Tebessa', label: 'Tebessa' },
  { value: 'El-Oued', label: 'El-Oued' },
  { value: 'Bba', label: 'Bba' },
  { value: 'B-B-arreridj', label: 'B-B-Arreridj' },
  { value: `M\'Sila`, label: `M\'Sila` },
  { value: 'Oum-El-Bouaghi', label: 'Oum-El-Bouaghi' },
  { value: 'Guelma', label: 'Guelma' },
  { value: 'Skikda', label: 'Skikda' },
  { value: 'Ouargla', label: 'Ouargla' },
  { value: 'El-Tarf', label: 'El-Tarf' },
  { value: 'Souk-Ahras', label: 'Souk-Ahras' },
  { value: 'Mila', label: 'Mila' },
  { value: 'Khenchela', label: 'Khenchela' }
];

const totalSiteOptionsArr = ['-', 'Zighoud', 'Amirouche', 'Blida', 'Bba', 'Ghardaia', 'Chlef', 'Tipaza', 'Boumerdes', 'Tizi Ouzou', 'Bejaia', 'Bouira', 'Ain Defla', 'Medea', 'Djelfa', 'Tamanrasset', 'Laghouat', 'Illizi', 'Setif', 'Constantine', 'Annaba', 'Jijel', 'Batna', 'Biskra', 'Tebessa', 'El-Oued', 'B-B-Arreridj', `M\'Sila`, 'Oum-El-Bouaghi', 'Guelma', 'Skikda', 'Ouargla', 'El-Tarf', 'Souk-Ahras', 'Mila', 'Khenchela', 'Oran', 'Tlemcen', 'Sidi-Belabbes', 'Mascara', 'Mostaganem', 'Tiaret', 'Bechar', 'Saida', 'Naama', 'Ain-Temouchent', 'Relizane', 'Adrar', 'El-Bayadh', 'Tissemsilt', 'Tindouf'];

const westSiteOptionsArr = ['-', 'Oran', 'Tlemcen', 'Sidi-Belabbes', 'Mascara', 'Mostaganem', 'Tiaret', 'Bechar', 'Saida', 'Naama', 'Ain-Temouchent', 'Relizane', 'Adrar', 'El-Bayadh', 'Tissemsilt', 'Tindouf'];

const centralSiteOptionsArr = ['-', 'Zighoud', 'Amirouche', 'Blida', 'Bba', 'Ghardaia', 'Chlef', 'Tipaza', 'Boumerdes', 'Tizi Ouzou', 'Bejaia', 'Bouira', 'Ain Defla', 'Medea', 'Djelfa', 'Tamanrasset', 'Laghouat', 'Illizi'];

const eastSiteOptionsArr = ['-', 'Setif', 'Constantine', 'Annaba', 'Jijel', 'Batna', 'Biskra', 'Tebessa', 'El-Oued', 'B-B-Arreridj', `M\'Sila`, 'Oum-El-Bouaghi', 'Guelma', 'Skikda', 'Ouargla', 'El-Tarf', 'Souk-Ahras', 'Mila', 'Khenchela'];

const areaOptions = ['-', 'Central', 'East', 'West'];

const productOptions = ['C1', 'C4', 'C5'];

const activityOptions = ['PM', 'Ins', 'CM', 'INSP', 'Shadowing'];

const weekCount = ['-', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

export { totalSiteOptions, eastSiteOptions, westSiteOptions, centralSiteOptions, totalSiteOptionsArr, eastSiteOptionsArr, westSiteOptionsArr, centralSiteOptionsArr, weekCount, areaOptions, productOptions, activityOptions };
