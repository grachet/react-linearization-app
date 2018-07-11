import link from './Link'

export default {
    homeL1: 'Cette application vous facilite la mise en oeuvre de la linéarisation du volume des cuves.',
    homeL2: '1. Saisissez vos données dans l\'onglet paramètres',
    homeL3: '2. Si votre cuve est cylindrique tout est calculé automatiquement. Sinon, vous devez remplir l\'abaque à partir de votre documentation. ',
    homeL4: '3. Visualisez les valeurs dans l\'onglet résultat.',


    paramInput1: 'Pleine échelle du capteur (m)',
    paramInput2: 'Hauteur de cuve (m)',
    paramInput3: 'Volume de cuve (m3 ou L)',
    paramCylinderText: 'Si votre cuve est cylindrique, l\'abaque sera calculée automatiquement.',

    abaqueHelp1: 'Vous devez ajouter les points de votre abaque avec le bouton (+) car votre cuve n\'est pas cylindrique. ',

    //link.linkALP842 sert à afficher le text 'HITEC ALP842' vers le lien du fichier Link.js (important)
    resultText: 'Les valeurs ci-dessous sont celles à entrer dans un afficheur ' + link.linkALP842 + '.',
    abaqueModalText: 'Ajouter un point',
    abaqueModalInput1: 'Volume (m3 ou L)',
    abaqueModalInput2: 'Hauteur (m)',

    tooBigEchelle: 'L\'échelle est  trop grande !',
    tooBigHauteur: 'La hauteur est trop grande !',
    tooBigVolume: 'Le volume est trop grand !',

    notNumber: 'Ce n\'est pas un nombre !',


    longNoEchelle: 'L\'échelle est nulle !',
    longNoHauteur: 'La hauteur est nulle !',
    longNoVolume: 'Le volume est nul !',

    noParams: 'Vous devez d\'abord ajouter des paramètres',
    noData: 'Vous devez d\'abord ajouter votre abaque comme votre cuve n\'est pas cylindrique',

};
