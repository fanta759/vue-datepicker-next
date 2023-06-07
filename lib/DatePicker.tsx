import { FunctionalComponent, h, SetupContext } from 'vue';
import { Assign, PickByValueExact } from 'utility-types';
import Picker, { PickerProps, SlotProps } from './Picker';
import Calendar from './calendar/Calendar';
import CalendarRange from './calendar/CalendarRange';
import TimePanel from './time/TimePanel';
import TimeRange from './time/TimeRange';
import DateTime, { DateTimeProps } from './datetime/DateTime';
import DateTimeRange, { DateTimeRangeProps } from './datetime/DateTimeRange';
import { pick } from './util/base';
import { IconCalendar, IconTime } from './svg';
import { keys, resolveProps } from './vueUtil';

type DatePickerProps = Assign<DateTimeProps, PickerProps>;

type DatePickerRangeProps = {
  range: true;
} & Assign<DateTimeRangeProps, PickerProps>;

export type DatePickerComponentProps = DatePickerProps | DatePickerRangeProps;

const booleanKeys = keys<PickByValueExact<Required<DatePickerComponentProps>, boolean>>()([
  'range',
  'open',
  'appendToBody',
  'clearable',
  'confirm',
  'disabled',
  'editable',
  'multiple',
  'partialUpdate',
  'showHour',
  'showMinute',
  'showSecond',
  'showTimeHeader',
  'showTimePanel',
  'showWeekNumber',
  'use12h',
]);

const formatMap = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  year: 'YYYY',
  month: 'YYYY-MM',
  time: 'HH:mm:ss',
  week: 'w',
};

function DatePicker(originalProps: DatePickerComponentProps, { slots }: SetupContext) {
  const type = originalProps.type || 'date';
  const format = originalProps.format || formatMap[type] || formatMap.date;
  const props = { ...resolveProps(originalProps, booleanKeys), type, format };

  // return () => {
  return (
    <Picker {...pick(props, Picker.props)}>
      {{
        content: (slotProps: SlotProps) => {
          if (props.range) {
            const Content =
              type === 'time' ? TimeRange : type === 'datetime' ? DateTimeRange : CalendarRange;
            return h(Content, pick({ ...props, ...slotProps }, Content.props));
          } else {
            const Content = type === 'time' ? TimePanel : type === 'datetime' ? DateTime : Calendar;
            return h(Content, pick({ ...props, ...slotProps }, Content.props));
          }
        },
        ['icon-calendar']: () => (type === 'time' ? <IconTime /> : <IconCalendar />),
        ...slots,
      }}
    </Picker>
  );
  // };
}

export const datePickerComponentPropsProps = keys<DatePickerComponentProps>()([
  'appendToBody',
  'calendar',
  'clearable',
  'confirm',
  'confirmText',
  'defaultPanel',
  'defaultValue',
  'disabled',
  'disabledDate',
  'disabledTime',
  'editable',
  'format',
  'formatter',
  'getClasses',
  'getYearPanel',
  'hourOptions',
  'hourStep',
  'inputAttr',
  'inputClass',
  'lang',
  'minuteOptions',
  'minuteStep',
  'multiple',
  'onCalendarChange',
  'onChange',
  'onClear',
  'onClickTitle',
  'onClose',
  'onConfirm',
  'onDateMouseEnter',
  'onDateMouseLeave',
  'onInputError',
  'onOpen',
  'onPanelChange',
  'onPick',
  'onShowTimePanelChange',
  'onUpdate:open',
  'onUpdate:value',
  'open',
  'partialUpdate',
  'placeholder',
  'popupClass',
  'popupStyle',
  'prefixClass',
  'range',
  'renderInputText',
  'scrollDuration',
  'secondOptions',
  'secondStep',
  'separator',
  'shortcuts',
  'showHour',
  'showMinute',
  'showSecond',
  'showTimeHeader',
  'showTimePanel',
  'showWeekNumber',
  'timePickerOptions',
  'timeTitleFormat',
  'titleFormat',
  'type',
  'use12h',
  'value',
  'valueType',
]);

// export default defineVueComponent(DatePicker, datePickerComponentPropsProps);

export default DatePicker as FunctionalComponent<DatePickerComponentProps, any>;
