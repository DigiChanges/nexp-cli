import readInfoJsonNexp from './readInfoJsonNexp.js';

const getChoices = async() =>
{
    const { orm, http } = await readInfoJsonNexp();

    const orms = orm.map(element => ({ name: element, value: element }));
    const https = http.map(element => ({ name: element, value: element }));

    return {
      orms,
      https
    };
};

export default getChoices;
