import { UnabledRandom } from '../icons/UnabledRandom';
import { usePlayerStore } from '../store/playerStore';

export function RandomPlayButton() {
  const { random, setRandom } = usePlayerStore((state) => state);

  const handleClick = async () => {
    setRandom(!random);
  };

  return (
    <button aria-label='random songs' onClick={handleClick}>
      {<UnabledRandom className={random ? 'text-green-500' : ''} />}
    </button>
  );
}
