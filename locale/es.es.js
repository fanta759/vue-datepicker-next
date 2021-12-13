import DatePicker from 'vue-datepicker-next';

var locale = {
  months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  weekdaysMin: ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá'],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 1
};

const lang = {
    formatLocale: locale,
    yearFormat: 'YYYY',
    monthFormat: 'MMM',
    monthBeforeYear: true,
};
DatePicker.locale('es', lang);

export { lang as default };
