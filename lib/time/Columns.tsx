import { usePrefixClass } from '../context';
import { ScrollbarVertical } from '../scrollbar/ScrollbarVertical';
import { withDefault, keys, defineVueComponent } from '../vueUtil';

export type ColumnType = 'hour' | 'minute' | 'second' | 'ampm';

export type ColumnItem = {
  value: Date;
  text: string;
};

export type ColumnOption = { type: ColumnType; list: ColumnItem[] };
export interface ColumnProps {
  options?: ColumnOption[];
  getClasses?: (v: Date, type: string) => string;
  onSelect?: (v: Date, type: string) => void;
}

function Columns(originalProps: ColumnProps) {
  const props = withDefault(originalProps, {});

  const prefixClass = usePrefixClass();

  const handleSelect = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    const currentTarget = evt.currentTarget as HTMLElement;
    if (target.tagName.toUpperCase() !== 'LI') return;
    const type = currentTarget.getAttribute('data-type')!;
    const col = parseInt(currentTarget.getAttribute('data-index')!, 10);
    const index = parseInt(target.getAttribute('data-index')!, 10);
    if (props.options) {
      const value = props.options[col].list[index].value;
      props.onSelect?.(value, type);
    }
  };

  return () => {
    return (
      <div class={`${prefixClass}-time-columns`}>
        {props.options?.map((col, i) => (
          <ScrollbarVertical key={col.type} class={`${prefixClass}-time-column`}>
            <ul
              class={`${prefixClass}-time-list`}
              data-index={i}
              data-type={col.type}
              onClick={handleSelect}
            >
              {col.list.map((item, j) => (
                <li
                  key={item.text}
                  data-index={j}
                  class={[`${prefixClass}-time-item`, props.getClasses?.(item.value, col.type)]}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </ScrollbarVertical>
        ))}
      </div>
    );
  };
}

export const columnProps = keys<ColumnProps>()(['getClasses', 'onSelect', 'options']);

export default defineVueComponent(Columns, columnProps);
