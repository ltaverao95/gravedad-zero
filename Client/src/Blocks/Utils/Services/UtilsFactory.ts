export class UtilsFactory 
{
    public IsUndefinedOrNull(objToValidate: any) : boolean
    {
        return (objToValidate === null ||
                objToValidate === undefined);
    }

    public IsValidNumber(numberToValidate: number) : boolean
    {
        return !(this.IsUndefinedOrNull(numberToValidate) ||
                 isNaN(numberToValidate));
    }

    public IsValidString(stringToValidate: string) : boolean
    {
        return !(this.IsUndefinedOrNull(stringToValidate) ||
                 stringToValidate === "" ||
                 stringToValidate.length === 0);
    }

    public IsArrayNullOrEmpty(arrayToValidate: Array<any>) : boolean
    {
        return !(this.IsUndefinedOrNull(arrayToValidate) ||
                 arrayToValidate.length === 0);
    }

    public GetCurrentDate(): string
    {
        let date = new Date();
        
        let days: string = date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
        let hours: string = date.getHours() < 10 ? "0" + date.getHours() : date.getHours().toString();
        let minutes: string = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes().toString();

        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + days + " " + hours + ":" + minutes;
    }
}