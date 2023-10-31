import { tw } from 'twind';
import { EmptyStateProps } from '../../types';

export function EmptyState(props:EmptyStateProps) {
  const { element } = props;

  return (
    <>
      {element || (
        <p className={tw`grid place-items-center text-gray-400 text-sm`}>
          No options
        </p>
      )}
    </>
  );
}
