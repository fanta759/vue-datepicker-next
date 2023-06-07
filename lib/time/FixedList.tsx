import { ScrollbarVertical } from '../scrollbar/ScrollbarVertical';
import { usePrefixClass } from '../context';
import { withDefault, keys, defineVueComponent } from '../vueUtil';

export interface FixedListItem {
  value: Date;
  text: string;
}

export interface FixedListProps {
  options?: FixedListItem[];
  getClasses?: (v: Date, type: string) => string;
  onSelect?: (v: Date, type: string) => void;
}

// TODO: 可否简化为 单列 Column
function FixedList(originalProps: FixedListProps) {
  const props = withDefault(originalProps, {});
  const prefixClass = usePrefixClass();

  return () => {
    return (
      <ScrollbarVertical>
        {props.options?.map((item) => (
          <div
            key={item.text}
            class={[`${prefixClass}-time-option`, props.getClasses?.(item.value, 'time')]}
            onClick={() => props.onSelect?.(item.value, 'time')}
          >
            {item.text}
          </div>
        ))}
      </ScrollbarVertical>
    );
  };
}

export const fixedListProps = keys<FixedListProps>()(['getClasses', 'onSelect', 'options']);

export default defineVueComponent(FixedList, fixedListProps);
