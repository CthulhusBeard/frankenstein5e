import * as StatBlock from './statblock.js';
window.StatBlock = StatBlock;

import * as SampleMonsters from './samplemonsters';
window.SampleMonsters = SampleMonsters;

import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
Chart.register(DoughnutController, ArcElement, Tooltip);
window.Chart = Chart;