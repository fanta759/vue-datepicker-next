import { SetupContext } from 'vue';
import ButtonIcon from './ButtonIcon';
import { setMonth, setYear } from '../util/date';
import { usePrefixClass } from '../context';
import { keys, defineVueComponent, withDefault } from '../vueUtil';

export interface TableHeaderBaseProps {
  calendar?: Date;
  onUpdateCalendar?: (value: Date) => void;
}

export interface TableHeaderProps extends TableHeaderBaseProps {
  type?: 'date' | 'month' | 'year';
}

function TableHeader(originalProps: TableHeaderProps, { slots }: SetupContext) {
  const props = withDefault(originalProps, {
    calendar: new Date(),
    type: 'date',
  });
  const prefixClass = usePrefixClass();

  const lastMonth = () => {
    if (props.calendar) {
      props.onUpdateCalendar?.(setMonth(props.calendar, (v) => v - 1));
    }
  };
  const nextMonth = () => {
    if (props.calendar) {
      props.onUpdateCalendar?.(setMonth(props.calendar, (v) => v + 1));
    }
  };
  const lastYear = () => {
    if (props.calendar) {
      props.onUpdateCalendar?.(setYear(props.calendar, (v) => v - 1));
    }
  };
  const nextYear = () => {
    if (props.calendar) {
      props.onUpdateCalendar?.(setYear(props.calendar, (v) => v + 1));
    }
  };

  const lastDecade = () => {
    if (props.calendar) {
      props.onUpdateCalendar?.(setYear(props.calendar, (v) => v - 10));
    }
  };

  const nextDecade = () => {
    if (props.calendar) {
      props.onUpdateCalendar?.(setYear(props.calendar, (v) => v + 10));
    }
  };

  return () => {
    return (
      <div class={`${prefixClass}-calendar-header`}>
        <ButtonIcon
          value="double-left"
          onClick={props.type === 'year' ? lastDecade : lastYear}
        ></ButtonIcon>
        {props.type === 'date' && <ButtonIcon value="left" onClick={lastMonth}></ButtonIcon>}
        <ButtonIcon
          value="double-right"
          onClick={props.type === 'year' ? nextDecade : nextYear}
        ></ButtonIcon>
        {props.type === 'date' && <ButtonIcon value="right" onClick={nextMonth}></ButtonIcon>}
        <span class={`${prefixClass}-calendar-header-label`}>{slots.default?.()}</span>
      </div>
    );
  };
}

export const tableHeaderBaseProps = keys<TableHeaderBaseProps>()(['calendar', 'onUpdateCalendar']);

export const tableHeaderProps = keys<TableHeaderProps>()([...tableHeaderBaseProps, 'type']);

export default defineVueComponent(TableHeader, tableHeaderProps);
