const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

async function callAPI() {

    let data = null;

    try {
        const response = await fetch(urlApi);
        data = await response.json();
    }
    catch (error) {
        const response = await fetch("../amazing.json");
        data = await response.json();
        console.log(error);
    };

    // First table

    const tbodyContainer1 = document.getElementById("tbody-container-1");

    printTableData1(data.events);

    function printTableData1(arr) {

        let eventWithHighestAttendance = highestAttendance(arr);
        let eventWithLowestAttendance = lowestAttendance(arr);
        let eventWithLargerCapacity = largerCapacity(arr);

        tbodyContainer1.innerHTML += `
        <tr>
            <td> ${eventWithHighestAttendance.name} (${((eventWithHighestAttendance.assistance / eventWithHighestAttendance.capacity) * 100).toFixed(2)}%)</td>
            <td> ${eventWithLowestAttendance.name} (${(eventWithLowestAttendance.assistance / eventWithLowestAttendance.capacity) * 100}%)</td>
            <td> ${eventWithLargerCapacity.name} (${eventWithLargerCapacity.capacity})</td>
        </tr>`
    };

    function highestAttendance(arr) {
        let highestPercentage = arr.filter(event => event.date < data.currentDate)
            .reduce((acc, curr) => (acc.assistance / acc.capacity) * 100 >= (curr.assistance / curr.capacity) * 100 ? acc : curr);
        return highestPercentage
    };

    function lowestAttendance(arr) {
        let lowestPercentage = arr.filter(event => event.date < data.currentDate)
            .reduce((acc, curr) => (acc.assistance / acc.capacity) * 100 <= (curr.assistance / curr.capacity) * 100 ? acc : curr);
        return lowestPercentage
    };

    function largerCapacity(arr) {
        let larger = arr.reduce((acc, curr) => acc.capacity > curr.capacity ? acc : curr);
        return larger
    };

    // Second table

    const tbodyContainer2 = document.getElementById("tbody-container-2");

    printTableData2(data.events);

    function printTableData2(arr) {

        let tableData = "";
        let upcomingEvents = arr.filter(event => event.date >= data.currentDate);
        let statistics = statisticsByCategory(upcomingEvents);

        statistics.forEach(element => {
            tableData += `
            <tr>
                <td> ${element.category} </td>
                <td> $${element.revenues} </td>
                <td> ${(element.percentageOfAttendance / element.count).toFixed(2)}% </td>                
            </tr> `
        });

        tbodyContainer2.innerHTML = tableData;

        function statisticsByCategory(arr) {
            let statisticsArr = [];

            arr
                .map(event => ({
                    category: event.category,
                    revenues: event.estimate * event.price,
                    percentageOfAttendance: (event.estimate / event.capacity) * 100,
                }))
                .forEach(event => {
                    const statisticIndex = statisticsArr.findIndex(element => element.category === event.category);

                    if (statisticIndex === -1) {
                        statisticsArr.push({
                            count: 1,
                            category: event.category,
                            revenues: event.revenues,
                            percentageOfAttendance: event.percentageOfAttendance,
                        });
                    } else {
                        const statistic = statisticsArr.at(statisticIndex);

                        statisticsArr.splice(statisticIndex, 1, {
                            count: statistic.count + 1,
                            category: statistic.category,
                            revenues: statistic.revenues + event.revenues,
                            percentageOfAttendance: statistic.percentageOfAttendance + event.percentageOfAttendance,
                        });
                    };
                });
            return statisticsArr
        };
    };

    // Third table

    const tbodyContainer3 = document.getElementById("tbody-container-3");

    printTableData3(data.events);

    function printTableData3(arr) {

        let tableData = "";
        let pastEvents = arr.filter(event => event.date < data.currentDate);
        let statistics = statisticsByCategory(pastEvents);

        statistics.forEach(element => {
            tableData += `
            <tr>
                <td> ${element.category} </td>
                <td> $${element.revenues} </td>
                <td> ${(element.percentageOfAttendance / element.count).toFixed(2)}% </td>                
            </tr> `
        });

        tbodyContainer3.innerHTML = tableData;

        function statisticsByCategory(arr) {
            let statisticsArr = [];

            arr
                .map(event => ({
                    category: event.category,
                    revenues: event.assistance * event.price,
                    percentageOfAttendance: (event.assistance / event.capacity) * 100,
                }))
                .forEach(event => {
                    const statisticIndex = statisticsArr.findIndex(element => element.category === event.category);

                    if (statisticIndex === -1) {
                        statisticsArr.push({
                            count: 1,
                            category: event.category,
                            revenues: event.revenues,
                            percentageOfAttendance: event.percentageOfAttendance,
                        });
                    } else {
                        const statistic = statisticsArr.at(statisticIndex);

                        statisticsArr.splice(statisticIndex, 1, {
                            count: statistic.count + 1,
                            category: statistic.category,
                            revenues: statistic.revenues + event.revenues,
                            percentageOfAttendance: statistic.percentageOfAttendance + event.percentageOfAttendance,
                        });
                    };
                });
            return statisticsArr
        };
    };
};

callAPI();