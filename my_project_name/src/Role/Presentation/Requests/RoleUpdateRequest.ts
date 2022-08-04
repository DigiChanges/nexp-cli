import { decorate, Mixin } from 'ts-mixer';
import RoleUpdatePayload from '../../Domain/Payloads/RoleUpdatePayload';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import RoleRepRequest from './RoleRepRequest';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

class RoleUpdateRequest extends Mixin(RoleRepRequest, IdRequest) implements RoleUpdatePayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
        this._permissions = data.permissions;
    }

    @decorate(ArrayMinSize(1))
    @decorate(IsArray())
    @decorate(IsString({
        each: true
    }))
    get permissions(): string[]
    {
        return this._permissions;
    }
}

export default RoleUpdateRequest;
