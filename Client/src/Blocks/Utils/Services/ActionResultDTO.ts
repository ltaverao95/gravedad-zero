import { UtilsConstants } from '../';

export class ActionResultDTO
{
    public UIMessage: string;
    public StackTrace: string;
    public HasErrors: boolean;
    public Result: UtilsConstants.EnumResult = UtilsConstants.EnumResult.Success;
    public ResultData: any;

    public IsOk(): boolean {
        return this.Result === UtilsConstants.EnumResult.Success;
    }

    public HasError(): boolean {
        return !this.IsOk();
    }

    public SetError(errorMessage: string) {
        this.Result = UtilsConstants.EnumResult.Error;
        this.UIMessage = errorMessage;
        return this;
    }

    public SetErrorAndStackTrace(errorMessage: string,
                                 stackTrace: string) {
        this.StackTrace = stackTrace;
        return this.SetError(errorMessage);
    }
}