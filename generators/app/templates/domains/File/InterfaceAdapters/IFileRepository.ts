import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import IBaseRepository from '../../App/InterfaceAdapters/IBaseRepository';
import IFileDomain from './IFileDomain';

interface IFileRepository extends IBaseRepository<IFileDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default IFileRepository;
