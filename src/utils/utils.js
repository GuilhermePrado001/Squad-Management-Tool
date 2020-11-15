export const GetAliasName = (player_name) => {

    if (!player_name)
        return "NF"

    var splited_name = player_name.split(' ');

    if (splited_name.length == 1) {
        let firstLetter = splited_name[0].substring(0, 1);

        return firstLetter.concat(firstLetter)
    }

    let firstLetter = splited_name[0].substring(0, 1);
    let secondLetter = splited_name[splited_name.length - 1].substring(0, 1);

    return firstLetter.concat(secondLetter)
}

export const AvgArrayCalc = (array) => {

    if (!array)
        return;

    var total = 0;

    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }

    var result = total / array.length

    return result.toFixed(1);
}

export const MostPickedPlayer = (array) => {

    var mf = 1;
    var m = 0;
    var item;

    for (var i = 0; i < array.length; i++) {
        for (var j = i; j < array.length; j++) {
            if (array[i] == array[j])
                m++;

            if (mf < m) {
                mf = m;
                item = array[i];
            }
        }
        m = 0;
    }
    console.log(item)
    return item;
}

export const LessPickedPlayer = (array) => {

    var mif = Number.POSITIVE_INFINITY;
    var m = 0;
    var itemin;

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[i] == array[j])
                m++;
        }
        if (mif > m) {
            mif = m;
            itemin = array[i];
        }

        m = 0;
    }

    return itemin
} 

export const SortFunc = (a , b) => {

    if(a.ageAvg > b.ageAvg) return -1;
    if(a.ageAvg < b.ageAvg) return 1;

    return 0;
}