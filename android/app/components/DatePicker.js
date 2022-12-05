import React, { PureComponent } from 'react';
import { View, StyleSheet, Image,Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CalendarList, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.fr = {
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  dayNames: ['日', '一', '二', '三', '四', '五', '六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
};
LocaleConfig.defaultLocale = 'fr';

class DatePickerV2 extends PureComponent {
  static propTypes = {
    getMonthWeek: PropTypes.func,
    onPress: PropTypes.func,
    showMore: PropTypes.func,
    calendarWidth: PropTypes.number,
    height: PropTypes.number, // 日历
    headerHeight: PropTypes.number,
    calendarHeight: PropTypes.number,
    getCalendarHeight: PropTypes.func,
  };

  static defaultProps = {
    getMonthWeek: () => { },
    showMore: () => { },
    onPress: () => { },
    headerHeight: 39.7,
    calendarHeight: 216,
    height: 262,
    getCalendarHeight: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      taDay: '', // 表示当前日期
      calendarOffsetY: props.headerHeight, // 日历上移偏移量
      currentHeight: 2 * props.headerHeight, // 日历收起 整体高度
      arrowTop: props.headerHeight + 5,
      showMore: true,
      pastScrollRange: 0, // 可以左滑与否
      futureScrollRange: 1, // 可以右滑与否
      viewHeight: 46,
    };
  };

  componentDidMount() {
    const { onPress, getCalendarHeight } = this.props;
    const { selected, arrowTop } = this.state;
    // 获取当天日期
    const day = this.formatDate(new Date());
    // const day = '2022-06-08';
    getCalendarHeight(arrowTop);
    this.setState({ selected: day, taDay: day }, () => {
      this.getMonthWeek(selected || day);
      onPress(this.state.selected);
    });
  }

  // 根据当前日期获取日历向上偏移量
  getMonthWeek = (theDate) => {
    const currentDay = new Date(theDate);
    let scrollAmount = 0;
    // 获取该日期所在周的周六，如2019.5月的周六有4号、11号、18号、25号、31号
    const theSaturday = currentDay.getDate() + (6 - currentDay.getDay());
    const week = Math.ceil(theSaturday / 7);
    scrollAmount += 46 * week;
    this.setState({
      calendarOffsetY: this.props.headerHeight - scrollAmount + 18,
      currentHeight: this.getscrollAmount(theDate),
    });
    return scrollAmount;
  }

  getscrollAmount = (theDate) => {
    const currentDay = new Date(theDate);
    let scrollAmount = 0;
    // 获取该日期所在周的周六，如2019.5月的周六有4号、11号、18号、25号、31号
    const theSaturday = currentDay.getDate() + (6 - currentDay.getDay());
    const week = Math.ceil(theSaturday / 7);
    scrollAmount += 46 * week;
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
    const { headerHeight, getCalendarHeight } = this.props;
    const { selected, showMore } = this.state;
    this.getMonthWeek(selected);
    this.setState({
      currentHeight: this.getscrollAmount(selected),
      showMore: !showMore,
      arrowTop: headerHeight + 5,
      futureScrollRange: 0,
      viewHeight: 46,
    }, () => { getCalendarHeight(this.state.arrowTop); });
  }

  showMore = () => {
    const { calendarHeight, getCalendarHeight } = this.props;
    const { showMore } = this.state;
    this.setState({
      calendarOffsetY: 0,
      arrowTop: calendarHeight,
      currentHeight: calendarHeight,
      showMore: !showMore,
      futureScrollRange: 1,
      viewHeight: 226,
    }, () => { getCalendarHeight(this.state.arrowTop); });
  }

  render() {
    const { selected, pastScrollRange, futureScrollRange, currentHeight, showMore, arrowTop, calendarOffsetY, viewHeight } = this.state;
    const { onPress, calendarWidth, headerHeight, calendarHeight } = this.props;
    const markedDates = {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#FF8E4A',
        selectedTextColor: 'white',
        customStyles: {
          container: {
            width: 26,
            height: 26,
            borderRadius: 26,
          },
        },
      },
    };
    return (
      <>
        <View style={{ backgroundColor: '#F5F6FA', zIndex: 10 }}>
          <CalendarList
            theme={{
              calendarBackground: '#F5F6FA',
              textSectionTitleDisabledColor: '#999',
              textColor: '#333',
              'stylesheet.calendar.header': {
                dayHeader: {
                  fontSize: 10,
                  color: '#333',
                },
                week: {
                  marginTop: 5,
                  marginHorizontal: 18,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              },
            }}
            disabledDaysIndexes={[0, 6]}
            style={{ height: headerHeight, borderRadius: 8, borderColor: 'red' }}
            renderHeader={() => { return null; }}
          />
        </View>
        <View style={styles.container}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              height: viewHeight,
              zIndex: 8,
              marginHorizontal: 12,
              backgroundColor: '#FFF',
              width: 336,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: calendarOffsetY,
              height: currentHeight,
              zIndex: 9,
              // marginHorizontal: 12,
            }}
          >
            <CalendarList
              onDayPress={(day) => {
                this.setState({ selected: day.dateString }, () => {
                  onPress(this.state.selected);
                });
              }}
              theme={{
                calendarBackground: 'transparent',
                todayTextColor: '#FF8E4A',
                textDayFontSize: 13,
                textDisabledColor: '#999',
                'stylesheet.calendar.header': {
                  dayTextAtIndex0: {
                    color: 'red',
                  },
                  dayTextAtIndex6: {
                    color: 'blue',
                  },
                },
              }}
              disabledDaysIndexes={[0, 6]}
              markingType={'custom'}
              showWeekNumbers={false}
              // Enable horizontal scrolling, default = false
              horizontal={true}
              // Enable paging on horizontal, default = false
              pagingEnabled={true}
              minDate={this.formatDate(new Date())}
              // Set custom calendarWidth.
              // calendarWidth={calendarWidth}
              calendarHeight={headerHeight + calendarHeight}
              calendarStyle={{ fontSize: 11 }}
              pastScrollRange={pastScrollRange}
              futureScrollRange={futureScrollRange}
              shouldHideExtraDays={false}
              headerStyle={{ height: 0 }}
              scrollsToTop={true}
              scrollEnabled={!showMore}
              markedDates={markedDates}
              renderHeader={() => { return null; }}
            />
          </View>
          <View style={{ position: 'absolute', top: arrowTop, alignItems: 'center', zIndex: 9, marginHorizontal: 12 }}>
            <View style={{ ...styles.arrow, width: 336, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
              <TouchableOpacity
                style={{
                  height: 45,
                  width: 336,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={showMore ? () => { this.showMore(); } : () => { this.Combine(); }}
                hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
              >
                <Text>{showMore?'下拉':'上滑'}</Text>
                {/* <Image style={{ width: 8, height: 5 }} source={showMore ? ImageAssets.pos.Showmore : ImageAssets.pos.hideMore} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default DatePickerV2;

const styles = StyleSheet.create({
  container: {
    position: 'relative',

  },
  arrow: {
    height: 40,
    backgroundColor: '#FFF',
    textAlign: 'center',
    alignItems: 'center',
  },
});
