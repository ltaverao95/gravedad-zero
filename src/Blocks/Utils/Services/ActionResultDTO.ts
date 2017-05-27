import { UtilsConstants } from '../constants';

export class ActionResultDTO 
{
    public UIMessage: string = null;
    public StackTrace: string = null;
    public HasErrors: boolean = false;
    public Result: number = UtilsConstants.EnumResult.Success;
    public ResultData: any = null;

    public IsOk() : boolean
    {
        return this.Result === UtilsConstants.EnumResult.Success;
    }

    public HasError() : boolean
    {
        return !this.IsOk();
    }

    public SetError(error) 
    {
        this.Result = UtilsConstants.EnumResult.Error;
        this.UIMessage = error.Message;
        return this;
    }

    public SetErrorAndStackTrace(errorMessage, 
                                 stackTrace) 
    {
        this.StackTrace = stackTrace;
        return this.SetError(errorMessage);
    }
}