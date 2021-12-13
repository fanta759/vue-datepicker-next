import DatePicker from 'vue-datepicker-next';

var locale = {
  months: ['januaro', 'februaro', 'marto', 'aprilo', 'majo', 'junio', 'julio', 'aŭgusto', 'septembro', 'oktobro', 'novembro', 'decembro'],
  monthsShort: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aŭg', 'sep', 'okt', 'nov', 'dec'],
  weekdays: ['dimanĉo', 'lundo', 'mardo', 'merkredo', 'ĵaŭdo', 'vendredo', 'sabato'],
  weekdaysShort: ['dim', 'lun', 'mard', 'merk', 'ĵaŭ', 'ven', 'sab'],
  weekdaysMin: ['di', 'lu', 'ma', 'me', 'ĵa', 've', 'sa'],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 7
};

const lang = {
    formatLocale: locale,
    yearFormat: 'YYYY',
    monthFormat: 'MMM',
    monthBeforeYear: true,
};
DatePicker.locale('eo', lang);

export { lang as default };
