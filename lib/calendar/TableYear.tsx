import { usePrefixClass } from '../context';
import { chunk, last } from '../util/base';
import { createDate } from '../util/date';
import TableHeader, { TableHeaderBaseProps, tableHeaderBaseProps } from './TableHeader';
import { withDefault, keys, defineVueComponent } from '../vueUtil';

export interface TableYearBaseProps {
  getCellClasses?: (v: Date) => string[] | string;
  getYearPanel?: (v: Date) => number[][];
  onSelect?: (v: Date) => void;
}

export type TableYearProps = TableYearBaseProps & TableHeaderBaseProps;

const getDefaultYears = (calendar: Date) => {
  const firstYear = Math.floor(calendar.getFullYear() / 10) * 10;
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(firstYear + i);
  }
  return chunk(years, 2);
};

function TableYear(originalProps: TableYearProps) {
  const props = withDefault(originalProps, {
    getCellClasses: () => [],
    getYearPanel: getDefaultYears,
    calendar: new Date(),
  });

  const prefixClass = usePrefixClass();

  const getDate = (year: number) => {
    return createDate(year, 0);
  };

  const handleClick = (evt: MouseEvent) => {
    const target = evt.currentTarget as HTMLElement;
    const year = target.getAttribute('data-year')!;
    props.onSelect?.(getDate(parseInt(year, 10)));
  };

  const years = props.getYearPanel(new Date(props.calendar));
  const firstYear = years[0][0];
  const lastYear = last(last(years));

  return () => {
    return (
      <div class={`${prefixClass}-calendar ${prefixClass}-calendar-panel-year`}>
        <TableHeader
          type="year"
          calendar={props.calendar}
          onUpdateCalendar={props.onUpdateCalendar}
        >
          <span>{firstYear}</span>
          <span class={`${prefixClass}-calendar-decade-separator`}></span>
          <span>{lastYear}</span>
        </TableHeader>
        <div class={`${prefixClass}-calendar-content`}>
          <table class={`${prefixClass}-table ${prefixClass}-table-year`}>
            {years.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    class={['cell', props.getCellClasses(getDate(cell))]}
                    data-year={cell}
                    onClick={handleClick}
                  >
                    <div>{cell}</div>
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  };
}

export const tableYearBaseProps = keys<TableYearBaseProps>()([
  'getCellClasses',
  'getYearPanel',
  'onSelect',
]);

export const tableYearProps = [...tableYearBaseProps, ...tableHeaderBaseProps];

export default defineVueComponent(TableYear, tableYearProps);
