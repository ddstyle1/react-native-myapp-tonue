import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import PropTypes from 'prop-types';




LocaleConfig.locales.fr = {
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  dayNames: ['日', '一', '二', '三', '四', '五', '六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
};
LocaleConfig.defaultLocale = 'fr';

class DatePicker extends PureComponent {

  static propTypes = {
    getMonthWeek: PropTypes.func,
    onPress: PropTypes.func,
    showMore: PropTypes.func,
    calendarWidth: PropTypes.number,
    Height: PropTypes.number,
    HEADER_HEIGHT: PropTypes.number,
    CALENDAR_HEIGHT: PropTypes.number,
  };

  static defaultProps = {
    getMonthWeek: () => { },
    showMore: () => { },
    onPress: () => { },
    HEADER_HEIGHT: 46,
    CALENDAR_HEIGHT: 216,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      taDay: '', // 表示当前日期
      calendarOffsetY: props.HEADER_HEIGHT,
      calendarHeight: 2 * props.HEADER_HEIGHT,
      arrowTop: 2 * props.HEADER_HEIGHT,
      showMore: true,
    };
  };

  componentDidMount() {
    const { onPress } = this.props;
    const { selected } = this.state;
    const day = this.formatDate(new Date());
    this.setState({ selected: day, taDay: day }, () => {
      this.getMonthWeek(selected || day);
    });
  }

  getMonthWeek = (theDate) => {
    const currentDay = new Date(theDate);
    let scrollAmount = 0;
    // 获取该日期所在周的周六，如2019.5月的周六有4号、11号、18号、25号、31号
    const theSaturday = currentDay.getDate() + (6 - currentDay.getDay());
    const week = Math.ceil(theSaturday / 7);
    scrollAmount += 46 * week;
    console.log(scrollAmount, 'scrollAmount');
    this.setState({ calendarOffsetY: this.props.HEADER_HEIGHT - scrollAmount }, () => {
      console.log(this.state.calendarOffsetY);
    })
    return scrollAmount;
  }

  getscrollAmount = (theDate) => {
    const currentDay = new Date(theDate);
    let scrollAmount = 0;
    // 获取该日期所在周的周六，如2019.5月的周六有4号、11号、18号、25号、31号
    const theSaturday = currentDay.getDate() + (6 - currentDay.getDay());
    const week = Math.ceil(theSaturday / 7);
    scrollAmount += 46 * week;
    console.log(scrollAmount, 'scrollAmount');
    return scrollAmount;
  }

  formatDate = (date) => {
    const seperator1 = '-';
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();

    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }
    const currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }


  Combine = () => {
    const { HEADER_HEIGHT, CALENDAR_HEIGHT } = this.props;
    this.getMonthWeek(this.state.selected);
    this.setState({
      calendarHeight: this.getscrollAmount(this.state.selected),
      showMore: !this.state.showMore,
      arrowTop: 2 * HEADER_HEIGHT
    })
  }

  showMore = () => {
    const { HEADER_HEIGHT, CALENDAR_HEIGHT } = this.props;
    this.setState({
      calendarOffsetY: 0,
      arrowTop: CALENDAR_HEIGHT + HEADER_HEIGHT,
      calendarHeight: CALENDAR_HEIGHT,
      showMore: !this.state.showMore
    });
    console.log('展开日期');
  }

  render() {
    const { selected, taDay, calendarHeight, showMore, arrowTop, calendarOffsetY } = this.state;
    console.log(calendarOffsetY, 'calendarOffsetY');
    const { getMonthWeek, onPress, showMorefunc, calendarWidth, HEADER_HEIGHT, CALENDAR_HEIGHT } = this.props;
    const markedDates = {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#FF8E4A',
        selectedTextColor: 'white',
      },
    };
    return (
      <View style={styles.container}>
        <CalendarList
          theme={{
            backgroundColor: '#000',
          }}
          style={{ height: HEADER_HEIGHT, zIndex: 10 }}
          renderHeader={() => { return null; }}

        />
        <View
          style={{
            position: 'absolute',
            top: calendarOffsetY + HEADER_HEIGHT,
            height: calendarHeight,
            // zIndex: 10
          }}
        >
          <CalendarList
            onDayPress={(day) => {
              this.setState({ selected: day.dateString }, () => {
                // getMonthWeek(this.state.selected);
                onPress(this.state.selected);
              });
              console.log(day);
            }}
            theme={{
              calendarBackground: '#fff',
              todayTextColor: '#FF8E4A',
            }}
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
            // Set custom calendarWidth.
            calendarWidth={calendarWidth}
            calendarHeight={HEADER_HEIGHT + CALENDAR_HEIGHT}
            pastScrollRange={1}
            futureScrollRange={0}
            shouldHideExtraDays={false}
            headerStyle={{ height: 0 }}
            scrollsToTop={true}
            markedDates={markedDates}
            renderHeader={() => { return null; }}
          />
        </View>
        <View style={{ position: 'absolute', top: arrowTop, alignItems: 'center', }}>
          {showMore && <Text style={{ height: 30, backgroundColor: '#fff', width: calendarWidth, textAlign: 'center' }} onPress={() => { this.showMore(); }}>展开</Text>}
          {!showMore && <Text style={{ height: 30, backgroundColor: '#fff', width: calendarWidth, textAlign: 'center' }} onPress={() => { this.Combine(); }}>收起</Text>}
        </View>
      </View>
    );
  }
}

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});
