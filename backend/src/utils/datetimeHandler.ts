export default class DatetimeHandler {
    public handler(datetime: Date) {
        const splittedObject = datetime.toString().split(" ")

        if (splittedObject.length === 1) {
            const splittedShortDate = splittedObject[0].toString().split("/");
            const shortDateDay:number = +splittedShortDate[0];
            const shortDateMonth:number = +splittedShortDate[1];
            const shortDateYear:number = +splittedShortDate[2];

            const newShortDate = new Date(shortDateYear, shortDateMonth - 1, shortDateDay);
            newShortDate.setHours(newShortDate.getHours() - 3);
            return newShortDate;
        }

        const splittedDate = datetime.toString().slice(0, 10).split("/");
        const day:number = +splittedDate[0];
        const month:number = +splittedDate[1];
        const year:number = +splittedDate[2];
        
        const splittedTime = datetime.toString().slice(11).split(":");
        const hour:number = +splittedTime[0];
        const minutes:number = +splittedTime[1];
        const seconds:number = +splittedTime[2];

        const newDate = new Date(year, month - 1, day, hour, minutes, seconds);
        newDate.setHours(newDate.getHours() - 3);
        return newDate;
    }
}