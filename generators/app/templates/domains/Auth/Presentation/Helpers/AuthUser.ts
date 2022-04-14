import TypeAuth from '../../Domain/Types/TypeAuth';
import Auth from '../../Domain/Types/Auth';<% if (http == "Koa") { %>
import { ParameterizedContext } from 'koa';<% } %>

export const AuthUser  = <T extends Auth = Auth >(request: Request | <% if (http == "Koa") { %>ParameterizedContext | <% } %>any, type: TypeAuth = 'authUser'): T =>
{
    return request[type];
};
