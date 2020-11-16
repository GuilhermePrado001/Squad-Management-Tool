//Make the alias with name, for example Guilherme Prado => GP
export const getAliasName = (name) => {

    if (!name)
        return null

    var splited_name = name.split(' ');

    if (splited_name.length == 1) {
        let firstLetter = splited_name[0].substring(0, 1);

        return firstLetter.concat(firstLetter)
    }

    let firstLetter = splited_name[0].substring(0, 1);
    let secondLetter = splited_name[splited_name.length - 1].substring(0, 1);

    return firstLetter.concat(secondLetter)
}

//Calc the Avarage in a number array
export const avgArrayCalc = (array) => {

    if (!array)
        return;

    var total = 0;

    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }

    var result = total / array.length

    if(!result)
        return 0;

    return result.toFixed(1);
}

//Get the most picked player
export const mostPickedPlayer = (array) => {

    var mf = 1;
    var m = 0;
    var item;

    for (var i = 0; i < array.length; i++) {
        for (var j = i; j < array.length; j++) {
            if (array[i].player_name == array[j].player_name)
                m++;

            if (mf < m) {
                mf = m;
                item = array[i].player_name;
            }
        }
        m = 0;
    }
   
    return item;
}

//Get the less picked player
export const lessPickedPlayer = (array) => {

    var mif = Number.POSITIVE_INFINITY;
    var m = 0;
    var itemin;

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[i].player_name == array[j].player_name)
                m++;
        }
        if (mif > m) {
            mif = m;
            itemin = array[i].player_name;
        }

        m = 0;
    }

    return itemin;
} 

//Sort an array
export const sortFunc = (a , b) => {

    if(a.ageAvg > b.ageAvg) return -1;
    if(a.ageAvg < b.ageAvg) return 1;

    return 0;
}