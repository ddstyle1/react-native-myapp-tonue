import React from 'react';
import { View, StyleSheet } from 'react-native';
import BaseView from '../BaseView';
import DatePicker from '../../components/DatePicker';
import System from '../../utils/System';

const px2dp = (val) => System.px2dp(val)


const HEADER_HEIGHT = 46;
const CALENDAR_HEIGHT = 226;
export default class DatePickerDemo extends BaseView {

  constructor(props) {
    super(props);
    this.navBarTitle = `${props.route.params?.['tonue']}组件详情`;
    this.navBarStyle = {
      height: px2dp(56),
      backgroundColor: '#F5F6FA'
    }
  }

  componentDidMount = () => {
    const { route } = this.props;
    const TouneName = route.params['tonue'];
  }

  jumpToPage = (page, params) => {
    // const { navigation } = this.props
    // navigate(`${page}`, params);
  }

  renderContent() {
    return (
      <View style={{ flex: 1, marginHorizontal: 12 }}>

        <DatePicker
          calendarWidth={336}
          Height={HEADER_HEIGHT + CALENDAR_HEIGHT}
          CALENDAR_HEIGHT={CALENDAR_HEIGHT}
          HEADER_HEIGHT={HEADER_HEIGHT}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txt: {
    height: px2dp(700),
  },
  box: {
    width: 330,
    height: 50,
    backgroundColor: '#F5F6FA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 8,
    marginTop: 10,
  }
})
