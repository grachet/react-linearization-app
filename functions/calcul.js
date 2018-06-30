let ten_HN = new Array(0, 107, 395, 787, 1307, 2789, 3309, 3701, 3989, 4096);	//Hauteur normalisée sur 10 points ( / 4096)
let ten_VN = new Array(0, 23, 196, 544, 1120, 2976, 3552, 3900, 4073, 4096);	//Volume normalisé sur 10 points ( / 4096)


let PLECH = 0;						//   Pleine échelle du capteur
let HAUT = 1;						//   Hauteur de la cuve
let VOLUME = 2;						//   Volume de la cuve

let param_val = new Array(3);				// Valeurs des paramètres

let nbPnt = 10;						// Nombre de points pour la linéarisation
let coma = 0;						// Position de la virgule en fonction du volume de la cuve


let SigMin = 4.00;
let SigMax = 20.00;


export default {

    getAbaqueCylinder: (value) => {

        const pointsAbaque = [];
        let hauteur = value.hauteur;
        let volume = value.volume;


        for (var i = 0; i < ten_HN.length; i++) {
            pointsAbaque.push({
                hauteur: (hauteur * ten_HN[i] / 4096).toFixed(3),
                volume: (volume * ten_VN[i] / 4096).toPrecision(4)
            })
        }

        console.log(pointsAbaque);
        return pointsAbaque;
    },

    getResult: () => {


    },

    format4dig: (num, volumeMax) => {

        let zstr;
        let coma;

            if      (volumeMax >= 1000) coma = 0;
            else if (volumeMax >= 100)  coma = 1;
            else if (volumeMax >= 10)   coma = 2;
            else                  coma = 3;



        if (coma === 0) {
            if (num < 10) zstr = "000";
            else if (num < 100) zstr = "00";
            else if (num < 1000) zstr = "0";
            else zstr = "";
        }
        else if (coma === 1) {
            if (num < 10) zstr = "00";
            else if (num < 100) zstr = "0";
            else zstr = "";
        }
        else if ((coma === 2) && (num < 10))
            zstr = "0";
        else
            zstr = "";

        return zstr + num.toFixed(coma);
    }


}


