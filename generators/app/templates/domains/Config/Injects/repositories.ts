
export enum REPOSITORIES  {
    IItemRepository = 'IItemRepository',
    IUserRepository = 'IUserRepository',
    IRoleRepository = 'IRoleRepository',<% if (fileDomain) { %>
    IFileRepository = 'IFileRepository',<% } %>
    ITokenRepository = 'ITokenRepository',
    INotificationRepository = 'INotificationRepository'
}
