import { ITokenRepository } from '@digichanges/shared-experience';

import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ITokenDomain from '../Entities/ITokenDomain';

class GetTokenUseCase
{
    @containerFactory(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository<ITokenDomain>;

    async handle(id: string): Promise<ITokenDomain>
    {
        return await this.repository.getOne(id);
    }
}

export default GetTokenUseCase;
