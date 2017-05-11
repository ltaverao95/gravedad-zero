export class UtilsFactory 
{
    public IsUndefinedOrNull(objToValidate: any) : boolean
    {
        return (objToValidate === null ||
                objToValidate === undefined);
    }

    public IsValidString(stringToValidate: string) : boolean
    {
        return !(this.IsUndefinedOrNull(stringToValidate) ||
                 stringToValidate === "" ||
                 stringToValidate.length === 0);
    }

    public IsArrayNullOrEmpty(arrayToValidate: any) : boolean
    {
        return !(this.IsUndefinedOrNull(arrayToValidate) ||
                 arrayToValidate.length === 0);
    }
}