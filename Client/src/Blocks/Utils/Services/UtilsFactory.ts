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
}