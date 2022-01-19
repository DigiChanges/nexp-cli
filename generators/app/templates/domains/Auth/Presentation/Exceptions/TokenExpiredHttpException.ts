import { StatusCode } from '@digichanges/shared-experience';
import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import Locales from '../../../App/Presentation/Shared/Locales';

class TokenExpiredHttpException extends ErrorHttpException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.presentation.exceptions.tokenExpired';
        super(StatusCode.HTTP_FORBIDDEN, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

export default TokenExpiredHttpException;
