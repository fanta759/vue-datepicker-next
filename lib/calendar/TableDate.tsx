import { format } from 'date-format-parse';
import { usePrefixClass, useLocale, useGetWeek } from '../context';
import { PanelType } from '../type';
import { chunk } from '../util/base';
import { getCalendar } from '../util/date';
import TableHeader, { TableHeaderBaseProps, tableHeaderBaseProps } from './TableHeader';
import { defineVueComponent, keys, withDefault } from '../vueUtil';

export interface TableDateBaseProps {
  showWeekNumber?: boolean;
  isWeekMode?: boolean;
  titleFormat?: string;
  getWeekActive?: (value: Date[]) => boolean;
  getCellClasses?: (value: Date) => string[] | string;
  onSelect?: (value: Date) => void;
  onUpdatePanel?: (value: PanelType) => void;
  onDateMouseEnter?: (value: Date) => void;
  onDateMouseLeave?: (value: Date) => void;
}

export type TableDateProps = TableDateBaseProps & TableHeaderBaseProps;

function TableDate(originalProps: TableDateProps) {
  const props = withDefault(originalProps, {
    calendar: new Date(),
    titleFormat: 'YYYY-MM-DD',
  });
  const prefixClass = usePrefixClass();
  const getWeekNumber = useGetWeek();
  const locale = useLocale().value;

  const { yearFormat, monthBeforeYear, monthFormat = 'MMM', formatLocale } = locale;

  const firstDayOfWeek = formatLocale.firstDayOfWeek || 0;
  let days = locale.days || formatLocale.weekdaysMin;
  days = days.concat(days).slice(firstDayOfWeek, firstDayOfWeek + 7);

  const year = props.calendar.getFullYear();
  const month = props.calendar.getMonth();

  const dates = chunk(getCalendar({ firstDayOfWeek, year, month }), 7);

  const formatDate = (date: Date, fmt: string) => {
    return format(date, fmt, { locale: locale.formatLocale });
  };

  const handlePanelChange = (panel: 'year' | 'month') => {
    props.onUpdatePanel?.(panel);
  };

  const getCellDate = (el: HTMLElement) => {
    const index = el.getAttribute('data-index')!;
    const [row, col] = index.split(',').map((v) => parseInt(v, 10));
    const value = dates[row][col];
    return new Date(value);
  };

  const handleCellClick = (evt: MouseEvent) => {
    props.onSelect?.(getCellDate(evt.currentTarget as HTMLElement));
  };

  const handleMouseEnter = (evt: MouseEvent) => {
    if (props.onDateMouseEnter) {
      props.onDateMouseEnter(getCellDate(evt.currentTarget as HTMLElement));
    }
  };

  const handleMouseLeave = (evt: MouseEvent) => {
    if (props.onDateMouseLeave) {
      props.onDateMouseLeave(getCellDate(evt.currentTarget as HTMLElement));
    }
  };

  const yearLabel = (
    <button
      type="button"
      class={`${prefixClass}-btn ${prefixClass}-btn-text ${prefixClass}-btn-current-year`}
      onClick={() => handlePanelChange('year')}
    >
      {formatDate(props.calendar, yearFormat)}
    </button>
  );

  const monthLabel = (
    <button
      type="button"
      class={`${prefixClass}-btn ${prefixClass}-btn-text ${prefixClass}-btn-current-month`}
      onClick={() => handlePanelChange('month')}
    >
      {formatDate(props.calendar, monthFormat)}
    </button>
  );

  props.showWeekNumber =
    typeof props.showWeekNumber === 'boolean' ? props.showWeekNumber : props.isWeekMode;

  return () => {
    return (
      <div
        class={[
          `${prefixClass}-calendar ${prefixClass}-calendar-panel-date`,
          { [`${prefixClass}-calendar-week-mode`]: props.isWeekMode },
        ]}
      >
        <TableHeader
          type="date"
          calendar={props.calendar}
          onUpdateCalendar={props.onUpdateCalendar}
        >
          {monthBeforeYear ? [monthLabel, yearLabel] : [yearLabel, monthLabel]}
        </TableHeader>
        <div class={`${prefixClass}-calendar-content`}>
          <table class={`${prefixClass}-table ${prefixClass}-table-date`}>
            <thead>
              <tr>
                {props.showWeekNumber && <th class={`${prefixClass}-week-number-header`}></th>}
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dates.map((row, i) => (
                <tr
                  key={i}
                  class={[
                    `${prefixClass}-date-row`,
                    { [`${prefixClass}-active-week`]: props.getWeekActive?.(row) },
                  ]}
                >
                  {props.showWeekNumber && (
                    <td
                      class={`${prefixClass}-week-number`}
                      data-index={`${i},0`}
                      onClick={handleCellClick}
                    >
                      <div>{getWeekNumber(row[0])}</div>
                    </td>
                  )}
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      class={['cell', props.getCellClasses?.(cell)]}
                      title={formatDate(cell, props.titleFormat)}
                      data-index={`${i},${j}`}
                      onClick={handleCellClick}
                      onMouseenter={handleMouseEnter}
                      onMouseleave={handleMouseLeave}
                    >
                      <div>{cell.getDate()}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export const tableDateBaseProps = keys<TableDateBaseProps>()([
  'showWeekNumber',
  'isWeekMode',
  'titleFormat',
  'getWeekActive',
  'getCellClasses',
  'onSelect',
  'onUpdatePanel',
  'onDateMouseEnter',
  'onDateMouseLeave',
]);

export const tableDateProps = [...tableDateBaseProps, ...tableHeaderBaseProps];

export default defineVueComponent(TableDate, tableDateProps);
