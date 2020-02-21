import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { getConnection } from './database/database.providers';

export async function loadFixtures(name: string): Promise<any> {
  const dbConnection = await getConnection();

  let items: any[] = [];
  try {
    const file: any = yaml.safeLoad(
      fs.readFileSync(`./fixtures/${name}.yml`, 'utf8'),
    );
    console.log(file);
    items = file['fixtures'];
  } catch (e) {
    console.log('fixtures error', e);
  }

  if (!items) {
    return;
  }

  items.forEach(async (item: any) => {
    console.log(item);
    const entityName = Object.keys(item)[0];
    const data = item[entityName];
    await dbConnection
      .createQueryBuilder()
      .insert()
      .into(entityName)
      .values(data)
      .execute();
  });
}

loadFixtures('offices');
