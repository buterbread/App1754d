import endlessChapters from '../config/endlessChapters';
import relaxChapters from '../config/relaxChapters';

const roadmap = [{
  loop: true,
  type: 'relax',
  label: 'Relax',
  chaptersConfig: relaxChapters,
  index: 1,
  chaptersMap: [
    { id: 'relaxChapter1', available: true },
  ],
},
{
  loop: false,
  type: 'endless',
  label: 'Endless',
  index: 2,
  chaptersConfig: endlessChapters,
  chaptersMap: [
    { id: 'endlessChapter1', available: true },
    { id: 'endlessChapter2', available: true },
  ],
},
{
  loop: false,
  type: 'puzzle',
  label: 'Puzzle',
  index: 3,
  chaptersMap: [
    { id: 'puzzleChapter1', available: true },
    { id: 'puzzleChapter2', available: false },
    { id: 'puzzleChapter3', available: false },
    { id: 'puzzleChapter4', available: false },
  ],
},
{
  loop: false,
  type: 'tactics',
  label: 'Tactics',
  index: 4,
  chaptersMap: [
    { id: 'tacticsChapter1', available: true },
    { id: 'tacticsChapter2', available: false },
    { id: 'tacticsChapter3', available: false },
    { id: 'tacticsChapter4', available: false },
  ],
}];

export default roadmap;
