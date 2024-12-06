import { dataSource } from '../dataSource';
import { buildSystemPulseService } from '../modules/systemPulse';

async function checkSystemPulses() {
    const systemPulseService = buildSystemPulseService();
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    console.log('Checking systemPulses...');

    await systemPulseService.checkAllSystemPulses();

    console.log('Done!');
}

checkSystemPulses();
