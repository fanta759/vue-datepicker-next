import { usePrefixClass, useLocale } from '../context';
import { PanelType } from '../type';
import { chunk } from '../util/base';
import { createDate } from '../util/date';
import TableHeader, { TableHeaderBaseProps, tableHeaderBaseProps } from './TableHeader';
import { withDefault, keys, defineVueComponent } from '../vueUtil';

export interface TableMonthBaseProps {
  getCellClasses?: (v: Date) => string[] | string;
  onSelect?: (v: Date) => void;
  onUpdatePanel?: (v: PanelType) => void;
}

export type TableMonthProps = TableMonthBaseProps & TableHeaderBaseProps;

function TableMonth(originalProps: TableMonthProps) {
  const props = withDefault(originalProps, {
    calendar: new Date(),
  });
  const prefixClass = usePrefixClass();
  const locale = useLocale().value;
  const months = locale.months || locale.formatLocale.monthsShort;

  const getDate = (month: number) => {
    return createDate(props.calendar.getFullYear(), month);
  };

  const handleClick = (evt: MouseEvent) => {
    const target = evt.currentTarget as HTMLElement;
    const month = target.getAttribute('data-month')!;
    props.onSelect?.(getDate(parseInt(month, 10)));
  };

  return () => {
    return (
      <div class={`${prefixClass}-calendar ${prefixClass}-calendar-panel-month`}>
        <TableHeader
          type="month"
          calendar={props.calendar}
          onUpdateCalendar={props.onUpdateCalendar}
        >
          <button
            type="button"
            class={`${prefixClass}-btn ${prefixClass}-btn-text ${prefixClass}-btn-current-year`}
            onClick={() => props.onUpdatePanel?.('year')}
          >
            {props.calendar.getFullYear()}
          </button>
        </TableHeader>
        <div class={`${prefixClass}-calendar-content`}>
          <table class={`${prefixClass}-table ${prefixClass}-table-month`}>
            {chunk(months, 3).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => {
                  const month = i * 3 + j;
                  return (
                    <td
                      key={j}
                      class={['cell', props.getCellClasses?.(getDate(month))]}
                      data-month={month}
                      onClick={handleClick}
                    >
                      <div>{cell}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  };
}

export const tableMonthBaseProps = keys<TableMonthBaseProps>()([
  'getCellClasses',
  'onSelect',
  'onUpdatePanel',
]);

export const tableMonthProps = [...tableMonthBaseProps, ...tableHeaderBaseProps];

export default defineVueComponent(TableMonth, tableMonthProps);
