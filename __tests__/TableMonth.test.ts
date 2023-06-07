import { mount, VueWrapper } from '@vue/test-utils';
import TableMonth from '../lib/calendar/TableMonth';

let wrapper: VueWrapper<any>;

afterEach(() => {
  wrapper.unmount();
});

describe('TableMonth', () => {
  it('correct render', () => {
    wrapper = mount(TableMonth, {
      props: {
        calendar: new Date(2019, 9, 1, 0, 0, 0),
        getCellClasses: (date: Date) => {
          if (date.getMonth() === 9) {
            return 'active';
          }
          return '';
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
