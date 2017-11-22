import { UtilsConstants } from '../';

export class ActionResultDTO
{
    public UIMessage: string = null;
    public StackTrace: string = null;
    public HasErrors: boolean = false;
    public Result: UtilsConstants.EnumResult = UtilsConstants.EnumResult.Success;
    public ResultData: any = null;

    public IsOk(): boolean {
        return this.Result === UtilsConstants.EnumResult.Success;
    }

    public SetError(errorMessage: string) {
        this.Result = UtilsConstants.EnumResult.Error;
        this.HasErrors = true;
        this.UIMessage = errorMessage;
        return this;
    }

    public SetErrorAndStackTrace(errorMessage: string,
                                 stackTrace: string) {
        this.StackTrace = stackTrace;
        return this.SetError(errorMessage);
    }
}