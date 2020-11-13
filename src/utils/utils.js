export const GetAliasName = (player_name) =>{
   
    if(!player_name)
        return "NF"

    var splited_name = player_name.split(' ');

    if(splited_name.length == 1){
        let firstLetter = splited_name[0].substring(0,1);

        return firstLetter.concat(firstLetter)
    }

    let firstLetter = splited_name[0].substring(0,1);
    let secondLetter = splited_name[splited_name.length - 1].substring(0,1);
    
    return firstLetter.concat(secondLetter)
}

export const AvgArrayCalc = (array) => {

    if(!array)
        return;

    var total = 0;

    for(var i = 0; i < array.length; i++) {
        total += array[i];
    }

    return total / array.length;
}