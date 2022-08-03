import { resolve } from 'path';
import replace from 'replace-in-file';

void (async() =>
{
	const options = {
		files: resolve('my_project_name/src/Shared/Application/Http/AppKoa.ts'),
		from: [`if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
        {
            this.app.use(ContextMikroORMKoaMiddleware);
        }

        `,
		    `import ContextMikroORMKoaMiddleware from '../../Presentation/Middlewares/ContextMikroORMKoaMiddleware';`
		],
		to: ''
	};

	const results = await replace(options);
	console.log(results);
})();
