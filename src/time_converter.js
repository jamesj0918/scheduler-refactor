//day:start:end
//mon tue wed thu fri
export default ({
    time_to_location(day, start, end) {
    let start_time_index;
    let end_time_index;

        if(start === "09:00:00") {start_time_index = 1;}
        else if(start === "09:30:00") {start_time_index = 2;}
        else if(start === "10:00:00") {start_time_index = 3;}
        else if(start === "10:30:00") {start_time_index = 4;}
        else if(start === "11:00:00") {start_time_index = 5;}
        else if(start === "11:30:00") {start_time_index = 6;}
        else if(start === "12:00:00") {start_time_index = 7;}
        else if(start === "12:30:00") {start_time_index = 8;}
        else if(start === "13:00:00") {start_time_index = 9;}
        else if(start === "13:30:00") {start_time_index = 10;}
        else if(start === "14:00:00") {start_time_index = 11;}
        else if(start === "14:30:00") {start_time_index = 12;}
        else if(start === "15:00:00") {start_time_index = 13;}
        else if(start === "15:30:00") {start_time_index = 14;}
        else if(start === "16:30:00") {start_time_index = 15;}
        else if(start === "17:00:00") {start_time_index = 16;}
        else if(start === "17:30:00") {start_time_index = 17;}
        else if(start === "18:00:00") {start_time_index = 18;}
        else if(start === "18:30:00") {start_time_index = 19;}
        else if(start === "19:00:00") {start_time_index = 20;}
        else if(start === "19:30:00") {start_time_index = 21;}
        else if(start === "20:00:00") {start_time_index = 22;}
        else if(start === "20:30:00") {start_time_index = 23;}
        else if(start === "21:00:00") {start_time_index = 24;}

    if(end === "09:00:00") {end_time_index = 1;}
    else if(end === "09:30:00") {end_time_index = 2;}
    else if(end === "10:00:00") {end_time_index = 3;}
    else if(end === "10:30:00") {end_time_index = 4;}
    else if(end === "11:00:00") {end_time_index = 5;}
    else if(end === "11:30:00") {end_time_index = 6;}
    else if(end === "12:00:00") {end_time_index = 7;}
    else if(end === "12:30:00") {end_time_index = 8;}
    else if(end === "13:00:00") {end_time_index = 9;}
    else if(end === "13:30:00") {end_time_index = 10;}
    else if(end === "14:00:00") {end_time_index = 11;}
    else if(end === "14:30:00") {end_time_index = 12;}
    else if(end === "15:00:00") {end_time_index = 13;}
    else if(end === "15:30:00") {end_time_index = 14;}
    else if(end === "16:30:00") {end_time_index = 15;}
    else if(end === "17:00:00") {end_time_index = 16;}
    else if(end === "17:30:00") {end_time_index = 17;}
    else if(end === "18:00:00") {end_time_index = 18;}
    else if(end === "18:30:00") {end_time_index = 19;}
    else if(end === "19:00:00") {end_time_index = 20;}
    else if(end === "19:30:00") {end_time_index = 21;}
    else if(end === "20:00:00") {end_time_index = 22;}
    else if(end === "20:30:00") {end_time_index = 23;}
    else if(end === "21:00:00") {end_time_index = 24;}



    let day_index;

    if (day === "월") {day_index = 1;}
    else if (day === "화") {day_index = 2;}
    else if (day === "수") {day_index = 3;}
    else if (day === "목") {day_index = 4;}
    else if (day === "금") {day_index = 5;}

    end_time_index--;

    const location = [
        {day_index, start_time_index},
        {day_index, end_time_index}
    ];

    return location;
},

    time_to_format(start_time, end_time){
        if (start_time.day === end_time.day){
            return start_time.day+':'+start_time.time+':'+end_time.time;
        }
        else{
            alert("옳바르지 않은 시간형식 입니다.");
        }
    },

    index_to_time(location){
        let day;
        let time;

        if (location.day_index === 1){day = "mon";}
        else if (location.day_index === 2){day = "tue";}
        else if (location.day_index === 3){day = "wed";}
        else if (location.day_index === 4){day = "thu";}
        else if (location.day_index === 5){day = "fri";}

        if (location.time_index === 1){time = "0900";}
        else if (location.time_index === 2){time = "0930";}
        else if (location.time_index === 3){time = "1000";}
        else if (location.time_index === 4){time = "1030";}
        else if (location.time_index === 5){time = "1100";}
        else if (location.time_index === 6){time = "1130";}
        else if (location.time_index === 7){time = "1200";}
        else if (location.time_index === 8){time = "1230";}
        else if (location.time_index === 9){time = "1300";}
        else if (location.time_index === 10){time = "1330";}
        else if (location.time_index === 11){time = "1400";}
        else if (location.time_index === 12){time = "1430";}
        else if (location.time_index === 13){time = "1500";}
        else if (location.time_index === 14){time = "1530";}
        else if (location.time_index === 15){time = "1600";}
        else if (location.time_index === 16){time = "1630";}
        else if (location.time_index === 17){time = "1700";}
        else if (location.time_index === 18){time = "1730";}
        else if (location.time_index === 18){time = "1800";}
        else if (location.time_index === 20){time = "1830";}
        else if (location.time_index === 21){time = "1900";}
        else if (location.time_index === 22){time = "2000";}
        else if (location.time_index === 23){time = "2030";}
        else if (location.time_index === 24){time = "2100";}

        return {day, time};
    },
    index_to_single_time(location){
        const day = this.index_to_time(location).day;
        const start = this.index_to_time(location).time;
        let end;
        if (start === "0900" || start === "0930"){
            if (parseInt(start) % 100 === 0){
                end = "0"+(parseInt(start)+30).toString();
            }
            else{
                end = (parseInt(start)+70).toString();
            }
        }
        else{
            if (parseInt(start) % 100 === 0){
                end = (parseInt(start)+30).toString();
            }
            else{
                end = (parseInt(start)+70).toString();
            }
        }
        return {day, start, end};
    }
})