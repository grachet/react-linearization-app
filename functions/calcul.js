

export default {

    getAbaqueCylinder: (value) => {

        let ten_HN = new Array(0, 107, 395, 787, 1307, 2789, 3309, 3701, 3989, 4096);	//Hauteur normalisée sur 10 points ( / 4096)
        let ten_VN = new Array(0, 23, 196, 544, 1120, 2976, 3552, 3900, 4073, 4096);	//Volume normalisé sur 10 points ( / 4096)

        const pointsAbaque = [];
        let hauteur = value.hauteur;
        let volume = value.volume;


        for (var i = 0; i < ten_HN.length; i++) {
            pointsAbaque.push({
                hauteur: (hauteur * ten_HN[i] / 4096).toFixed(3),
                volume: (volume * ten_VN[i] / 4096).toPrecision(4)
            })
        }

        return pointsAbaque;
    },

    format4dig: (num, volumeMax) => {

        let zstr;
        let coma;

            if      (volumeMax >= 1000) coma = 0;
            else if (volumeMax >= 100)  coma = 1;
            else if (volumeMax >= 10)   coma = 2;
            else                  coma = 3;

            if (volumeMax === -9999) {
                coma = 2;
            }


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

        console.log(coma, 'coma')

        return zstr + (num*1).toFixed(coma);
    },

    clearNumber: (num) => {
        var chaine = num.replace(',','.');
        chaine = chaine.replace(' ','');
        return parseFloat(chaine);
    }







}


